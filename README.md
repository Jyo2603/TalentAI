# TalentAI - Smart Recruitment Platform

A modern AI-powered talent management system for recruiters and job seekers.

## 🚀 Live Demo

**[View Application](https://talentai-smart-recru-xq3x.bolt.host)**

### Demo Credentials
- **Recruiter**: `sarah.chen@company.com` / `demo123456`
- **Candidate**: `demo.candidate@email.com` / `demo123456`

## Features

### For Recruiters
- Smart dashboard with hiring metrics
- AI-powered resume analysis (ATS scoring)
- Assessment generation from job descriptions
- Candidate pipeline management
- Employee referral system
- Project staffing recommendations
- Calendar and task management
- Job offer management

### For Candidates
- Job browser with filtering
- Application tracking
- Skills assessments
- Profile management

### AI Capabilities
- Resume ATS analysis with detailed scoring
- Automatic assessment generation
- Skill gap analysis
- Project hire vs assign recommendations

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL)
- **AI**: OpenAI GPT-4
- **Build**: Vite

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Setup (Optional)
```bash
cp .env.example .env
```

Add your API keys for full functionality:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
VITE_OPENAI_API_KEY=your_openai_key
```

## Project Structure

```
src/
├── components/     # React components by feature
├── contexts/       # Global state management
├── data/          # Mock data and utilities
├── lib/           # External service integrations
├── services/      # API services (OpenAI)
├── types/         # TypeScript definitions
└── utils/         # Helper functions
```

## Key Components

- **Dual Interface**: Separate portals for recruiters and candidates
- **AI Integration**: OpenAI-powered analysis and generation
- **Real-time Updates**: Live data synchronization
- **File Processing**: PDF/DOC resume parsing
- **Assessment System**: Custom test creation and management

## Build & Deploy

```bash
npm run build      # Production build
npm run preview    # Preview build locally
npm run lint       # Code quality check
```
