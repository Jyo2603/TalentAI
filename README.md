# TalentAI - Smart Recruitment & Talent Management Platform

A comprehensive AI-powered talent management system that streamlines recruitment, employee management, and organizational workflows.

## 🚀 Features

### For Recruiters & HR Teams
- **Smart Dashboard** - Real-time metrics and insights
- **AI-Powered Assessments** - Generate custom tests from job descriptions
- **ATS Resume Checker** - Automated resume scoring and analysis
- **Candidate Pipeline** - Track applications from submission to hire
- **Employee Referral System** - Manage and reward employee referrals
- **Project Management** - Smart hire vs assign recommendations
- **Calendar & Task Management** - Schedule interviews and track deadlines
- **Offer Management** - Create, send, and track job offers
- **Employee Onboarding** - Streamlined new hire workflows
- **Performance Reviews** - Goal tracking and performance evaluation

### For Candidates
- **Job Browser** - Discover and apply for positions
- **Application Tracker** - Monitor application status in real-time
- **Assessment Center** - Complete skills assessments
- **Profile Management** - Maintain professional profile
- **Status Updates** - Real-time application progress

### AI-Powered Features
- **Resume Analysis** - Intelligent ATS scoring with detailed feedback
- **Assessment Generation** - Create role-specific tests automatically
- **Candidate Matching** - Smart skill and culture fit analysis
- **Project Staffing** - AI recommendations for hire vs internal assignment
- **Predictive Analytics** - Success probability and risk assessment

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **AI Integration**: OpenAI GPT-4 for intelligent features
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Styling**: Tailwind CSS with custom design system

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Jyo2603/TalentAI.git
   cd TalentAI
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Add your environment variables:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_OPENAI_API_KEY=your_openai_api_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## 🔧 Configuration

### Supabase Setup
1. Create a new Supabase project
2. Run the database migrations in `/supabase/migrations`
3. Update your `.env` file with Supabase credentials

### OpenAI Setup
1. Get an API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Add the key to your `.env` file
3. AI features will automatically work with resume analysis and assessment generation

## 🎯 Quick Start

### Demo Access
The platform includes demo data and can be used immediately:

**Recruiter Demo:**
- Email: `sarah.chen@company.com`
- Password: `demo123456`

**Candidate Demo:**
- Email: `demo.candidate@email.com`
- Password: `demo123456`

### Key Workflows

**1. Recruiter Workflow:**
```
Dashboard → Create Job → Review Candidates → Schedule Interviews → Send Offers
```

**2. Candidate Workflow:**
```
Browse Jobs → Apply → Complete Assessment → Track Progress → Interview
```

**3. AI Assessment Generation:**
```
Assessments → AI Generator → Paste Job Description → Generate Questions → Assign to Candidates
```

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── Auth/            # Authentication components
│   ├── Candidate/       # Candidate portal components
│   ├── Dashboard/       # Dashboard widgets
│   ├── Assessments/     # Assessment management
│   ├── Calendar/        # Calendar and scheduling
│   ├── Candidates/      # Candidate management
│   ├── CareerSite/      # Public career site
│   ├── Inbox/           # Message center
│   ├── Layout/          # Layout components
│   ├── OfferManagement/ # Job offer management
│   ├── OpenHiring/      # Job posting management
│   ├── Projects/        # Project management
│   ├── Referrals/       # Employee referrals
│   ├── Settings/        # Application settings
│   └── TalentPool/      # Employee management
├── contexts/            # React contexts
├── data/               # Mock data and utilities
├── lib/                # External service integrations
├── services/           # API services (OpenAI)
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## 🔑 Key Features Explained

### AI Resume Analysis
- Upload resumes in PDF, DOC, or DOCX format
- Get detailed ATS compatibility scores
- Receive improvement suggestions and skill recommendations
- View recruiter insights including salary estimates and interview readiness

### Smart Assessment Generation
- Paste any job description
- AI automatically extracts required skills
- Generates role-specific questions (multiple choice, coding, short answer)
- Calibrates difficulty based on experience level

### Intelligent Project Staffing
- AI analyzes project requirements vs available talent
- Provides hire vs assign recommendations with cost analysis
- Matches internal employees based on skills and availability
- Calculates confidence scores and success probability

### Employee Referral System
- Easy referral submission with reward tracking
- Automated progress updates and notifications
- Analytics dashboard with ROI metrics
- Top referrer leaderboards and recognition

## 🎨 Design System

The platform uses a comprehensive design system with:
- **Color Palette**: 6 color ramps (primary, secondary, accent, success, warning, error)
- **Typography**: 3 font weights maximum with proper line spacing
- **Spacing**: Consistent 8px spacing system
- **Components**: Reusable UI components with hover states and micro-interactions

## 📊 Analytics & Reporting

- Real-time hiring metrics and KPIs
- Candidate pipeline conversion rates
- Time-to-hire and cost-per-hire tracking
- Employee utilization and capacity planning
- Assessment performance analytics
- Referral program ROI analysis

## 🔒 Security & Compliance

- Row Level Security (RLS) enabled on all database tables
- User authentication with Supabase Auth
- Data encryption and secure API endpoints
- GDPR compliance features
- Audit trails for all actions

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

### Deploy to Vercel/Netlify
The project is configured for easy deployment to modern hosting platforms.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- 📧 Email: pjyotsna2603@gmail.com
- 💬 GitHub Issues: [Create an issue](https://github.com/Jyo2603/TalentAI/issues)
- 📖 Documentation: [View docs](https://github.com/Jyo2603/TalentAI/wiki)

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/) and [TypeScript](https://www.typescriptlang.org/)
- Powered by [Supabase](https://supabase.com/) for backend services
- AI features powered by [OpenAI](https://openai.com/)
- UI components styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons by [Lucide React](https://lucide.dev/)

---

**TalentAI** - Revolutionizing talent management with AI-powered insights and automation.
