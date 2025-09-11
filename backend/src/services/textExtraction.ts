import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';
import logger from '../utils/logger';
import { ExtractedText, PDFTextItem, ProcessedTextItem } from '../types';

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = require.resolve('pdfjs-dist/build/pdf.worker.js');

export class TextExtractionService {
  /**
   * Extract text from uploaded file based on file type
   */
  async extractText(file: Express.Multer.File): Promise<ExtractedText> {
    logger.info(`Starting text extraction for file: ${file.originalname}`, {
      fileSize: file.size,
      mimeType: file.mimetype
    });

    try {
      let content: string;
      let extractionMethod: string;
      let pageCount: number | undefined;

      switch (file.mimetype) {
        case 'application/pdf':
          const pdfResult = await this.extractFromPDF(file.buffer);
          content = pdfResult.content;
          extractionMethod = 'PDF coordinate-based extraction';
          pageCount = pdfResult.pageCount;
          break;

        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
          content = await this.extractFromDOCX(file.buffer);
          extractionMethod = 'DOCX mammoth extraction';
          break;

        case 'application/msword':
          content = await this.extractFromDOC(file.buffer);
          extractionMethod = 'DOC placeholder';
          break;

        case 'text/plain':
          content = await this.extractFromTXT(file.buffer);
          extractionMethod = 'Direct text conversion';
          break;

        default:
          throw new Error(`Unsupported file type: ${file.mimetype}`);
      }

      // Clean up extracted text
      const cleanedContent = this.cleanText(content);
      const wordCount = this.countWords(cleanedContent);

      logger.info(`Text extraction completed successfully`, {
        fileName: file.originalname,
        wordCount,
        contentLength: cleanedContent.length,
        extractionMethod
      });

      return {
        content: cleanedContent,
        metadata: {
          fileName: file.originalname,
          fileSize: file.size,
          fileType: file.mimetype,
          extractionMethod,
          pageCount,
          wordCount,
          extractedAt: new Date()
        }
      };

    } catch (error) {
      logger.error(`Text extraction failed for file: ${file.originalname}`, {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });
      throw new Error(`Failed to extract text from ${file.originalname}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Extract text from PDF using coordinate-based positioning
   */
  private async extractFromPDF(buffer: Buffer): Promise<{ content: string; pageCount: number }> {
    logger.debug('Starting PDF text extraction with coordinate positioning');

    const loadingTask = pdfjsLib.getDocument({ data: buffer });
    const pdf = await loadingTask.promise;
    const pageCount = pdf.numPages;

    let allText = '';

    for (let pageNum = 1; pageNum <= pageCount; pageNum++) {
      logger.debug(`Processing PDF page ${pageNum}/${pageCount}`);
      
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      
      // Process text items with coordinate information
      const processedItems = this.processTextItems(textContent.items as PDFTextItem[]);
      
      // Sort by Y coordinate (top to bottom), then X coordinate (left to right)
      processedItems.sort((a, b) => {
        const yDiff = b.y - a.y; // Reverse Y (PDF coordinates start from bottom)
        if (Math.abs(yDiff) > 5) { // Same line threshold
          return yDiff;
        }
        return a.x - b.x; // Left to right
      });

      // Group items by lines and construct text
      const pageText = this.constructTextFromItems(processedItems);
      
      if (pageNum > 1) {
        allText += '\n\n--- Page ' + pageNum + ' ---\n\n';
      }
      allText += pageText;
    }

    logger.debug(`PDF extraction completed. Pages: ${pageCount}, Content length: ${allText.length}`);
    return { content: allText, pageCount };
  }

  /**
   * Process PDF text items to extract coordinate information
   */
  private processTextItems(items: PDFTextItem[]): ProcessedTextItem[] {
    return items.map(item => {
      const transform = item.transform;
      const x = transform[4];
      const y = transform[5];
      const fontSize = Math.sqrt(transform[0] * transform[0] + transform[1] * transform[1]);

      return {
        text: item.str,
        x,
        y,
        width: item.width,
        height: item.height,
        fontSize,
        fontName: item.fontName
      };
    }).filter(item => item.text.trim().length > 0);
  }

  /**
   * Construct readable text from positioned text items
   */
  private constructTextFromItems(items: ProcessedTextItem[]): string {
    if (items.length === 0) return '';

    let result = '';
    let currentLine = '';
    let lastY = items[0].y;
    let lastX = items[0].x;

    for (const item of items) {
      const yDiff = Math.abs(item.y - lastY);
      const xDiff = item.x - lastX;

      // New line detection (significant Y difference)
      if (yDiff > 5) {
        if (currentLine.trim()) {
          result += currentLine.trim() + '\n';
        }
        currentLine = item.text;
      } else {
        // Same line - check for spacing
        if (xDiff > item.fontSize * 0.5) {
          currentLine += ' ';
        }
        currentLine += item.text;
      }

      lastY = item.y;
      lastX = item.x + item.width;
    }

    // Add the last line
    if (currentLine.trim()) {
      result += currentLine.trim();
    }

    return result;
  }

  /**
   * Extract text from DOCX files
   */
  private async extractFromDOCX(buffer: Buffer): Promise<string> {
    logger.debug('Starting DOCX text extraction');
    
    try {
      const result = await mammoth.extractRawText({ buffer });
      
      if (result.messages.length > 0) {
        logger.warn('DOCX extraction warnings:', { messages: result.messages });
      }

      return result.value;
    } catch (error) {
      logger.error('DOCX extraction failed', { error });
      throw new Error('Failed to extract text from DOCX file');
    }
  }

  /**
   * Extract text from DOC files (legacy Word format)
   */
  private async extractFromDOC(buffer: Buffer): Promise<string> {
    logger.warn('DOC file format detected - limited support available');
    
    // For now, return a placeholder message
    // In production, you might want to use a service like Apache Tika or convert to DOCX first
    return `[DOC FILE DETECTED]
This appears to be a legacy Microsoft Word document (.doc format).
For best results, please convert your resume to PDF or DOCX format and upload again.

File size: ${buffer.length} bytes
Extraction method: Placeholder (DOC format requires additional processing)

To convert your file:
1. Open in Microsoft Word
2. Save As > Choose PDF or Word Document (.docx)
3. Upload the converted file

We apologize for the inconvenience and are working to add full DOC support.`;
  }

  /**
   * Extract text from plain text files
   */
  private async extractFromTXT(buffer: Buffer): Promise<string> {
    logger.debug('Starting TXT text extraction');
    
    try {
      // Try UTF-8 first, fallback to latin1 if needed
      let content = buffer.toString('utf8');
      
      // Check for invalid UTF-8 characters and fallback
      if (content.includes('\uFFFD')) {
        logger.debug('UTF-8 decoding failed, trying latin1');
        content = buffer.toString('latin1');
      }

      return content;
    } catch (error) {
      logger.error('TXT extraction failed', { error });
      throw new Error('Failed to extract text from TXT file');
    }
  }

  /**
   * Clean and normalize extracted text
   */
  private cleanText(text: string): string {
    return text
      // Remove excessive line breaks (more than 2 consecutive)
      .replace(/\n{3,}/g, '\n\n')
      // Remove excessive spaces
      .replace(/[ \t]{2,}/g, ' ')
      // Remove carriage returns
      .replace(/\r/g, '')
      // Trim whitespace from each line
      .split('\n')
      .map(line => line.trim())
      .join('\n')
      // Remove leading/trailing whitespace
      .trim();
  }

  /**
   * Count words in text
   */
  private countWords(text: string): number {
    return text
      .split(/\s+/)
      .filter(word => word.length > 0)
      .length;
  }

  /**
   * Validate file for text extraction
   */
  static validateFile(file: Express.Multer.File): { isValid: boolean; error?: string } {
    const allowedMimeTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'text/plain'
    ];

    const allowedExtensions = ['.pdf', '.docx', '.doc', '.txt'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!allowedMimeTypes.includes(file.mimetype)) {
      const extension = file.originalname.toLowerCase().substring(file.originalname.lastIndexOf('.'));
      if (!allowedExtensions.includes(extension)) {
        return {
          isValid: false,
          error: `Unsupported file type. Allowed types: PDF, DOCX, DOC, TXT`
        };
      }
    }

    if (file.size > maxSize) {
      return {
        isValid: false,
        error: `File size too large. Maximum size: 10MB`
      };
    }

    if (file.size === 0) {
      return {
        isValid: false,
        error: `File is empty`
      };
    }

    return { isValid: true };
  }
}
