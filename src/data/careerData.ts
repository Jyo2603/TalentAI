import type { JobPosting, CompanyInfo, TeamMember, CompanyBenefit, OfficeLocation, JobApplication } from '../types/career';

export const companyInfo: CompanyInfo = {
  name: 'QuantumCore Technologies',
  tagline: 'Pioneering the Future of Cloud Infrastructure',
  description: 'We\'re building the next generation of cloud computing platforms that power the world\'s most innovative companies. Join us in creating scalable, secure, and intelligent infrastructure solutions.',
  mission: 'To empower businesses worldwide with cutting-edge cloud infrastructure that scales seamlessly and drives innovation.',
  values: [
    'Innovation First - We pioneer breakthrough technologies that shape the future',
    'Diversity & Inclusion - We believe diverse teams build better products',
    'Transparency - We operate with honesty and openness',
    'Growth Mindset - We learn, adapt, and improve continuously',
    'Excellence - We deliver world-class solutions that exceed expectations',
    'Customer Success - We obsess over our customers\' success and satisfaction'
  ],
  founded: 2020,
  size: '500-1000 employees',
  industry: 'Cloud Infrastructure',
  headquarters: 'San Francisco, CA',
  website: 'https://nexustech.com',
  socialLinks: {
    linkedin: 'https://linkedin.com/company/nexustech',
    twitter: 'https://twitter.com/nexustech',
    github: 'https://github.com/nexustech',
    instagram: 'https://instagram.com/nexustech'
  }
};

export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'CEO & Co-Founder',
    department: 'Leadership',
    bio: 'Former VP of Engineering at Google. Passionate about building scalable cloud infrastructure.',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    linkedIn: 'https://linkedin.com/in/sarahchen',
    twitter: 'https://twitter.com/sarahchen'
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    role: 'CTO & Co-Founder',
    department: 'Engineering',
    bio: 'Cloud architect with 10+ years building distributed systems. PhD from Stanford.',
    avatar: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg',
    linkedIn: 'https://linkedin.com/in/michaelrodriguez'
  },
  {
    id: '3',
    name: 'Emily Johnson',
    role: 'Head of Product',
    department: 'Product',
    bio: 'Product leader who shipped cloud platforms used by 10M+ developers worldwide.',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    linkedIn: 'https://linkedin.com/in/emilyjohnson'
  },
  {
    id: '4',
    name: 'David Kim',
    role: 'Head of Design',
    department: 'Design',
    bio: 'Design systems expert focused on creating intuitive, accessible user experiences.',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    linkedIn: 'https://linkedin.com/in/davidkim'
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    role: 'VP of Sales',
    department: 'Sales',
    bio: 'Sales leader who scaled revenue from $1M to $200M at previous cloud startup.',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    linkedIn: 'https://linkedin.com/in/lisathompson'
  },
  {
    id: '6',
    name: 'James Wilson',
    role: 'Senior ML Engineer',
    department: 'Engineering',
    bio: 'ML engineer specializing in intelligent auto-scaling and resource optimization.',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg',
    linkedIn: 'https://linkedin.com/in/jameswilson'
  },
  {
    id: '7',
    name: 'Rachel Martinez',
    role: 'VP of Engineering',
    department: 'Engineering',
    bio: 'Infrastructure expert who built systems handling 100B+ requests daily at Amazon.',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
    linkedIn: 'https://linkedin.com/in/rachelmartinez'
  },
  {
    id: '8',
    name: 'Alex Thompson',
    role: 'Head of Security',
    department: 'Security',
    bio: 'Cybersecurity leader with expertise in cloud security and compliance frameworks.',
    avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg',
    linkedIn: 'https://linkedin.com/in/alexthompson'
  },
  {
    id: '9',
    name: 'Maria Garcia',
    role: 'Director of Data Science',
    department: 'Data Science',
    bio: 'Data science leader building ML models for intelligent infrastructure management.',
    avatar: 'https://images.pexels.com/photos/1484794/pexels-photo-1484794.jpeg',
    linkedIn: 'https://linkedin.com/in/mariagarcia'
  },
  {
    id: '10',
    name: 'Robert Kim',
    role: 'VP of Customer Success',
    department: 'Customer Success',
    bio: 'Customer success expert helping enterprise clients maximize their cloud ROI.',
    avatar: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg',
    linkedIn: 'https://linkedin.com/in/robertkim'
  },
  {
    id: '11',
    name: 'Jennifer Lee',
    role: 'Head of Marketing',
    department: 'Marketing',
    bio: 'Growth marketing leader who scaled B2B SaaS companies from startup to IPO.',
    avatar: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg',
    linkedIn: 'https://linkedin.com/in/jenniferlee'
  },
  {
    id: '12',
    name: 'Kevin Park',
    role: 'Principal Architect',
    department: 'Engineering',
    bio: 'Cloud architect designing next-gen distributed systems and microservices.',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
    linkedIn: 'https://linkedin.com/in/kevinpark'
  }
];

export const companyBenefits: CompanyBenefit[] = [
  {
    id: '1',
    title: 'Health & Wellness',
    description: 'Comprehensive medical, dental, and vision insurance plus wellness stipend',
    icon: '🏥',
    category: 'health'
  },
  {
    id: '2',
    title: 'Equity Package',
    description: 'Meaningful equity stake in a fast-growing company',
    icon: '📈',
    category: 'financial'
  },
  {
    id: '3',
    title: 'Unlimited PTO',
    description: 'Take time off when you need it, with a minimum 3-week recommendation',
    icon: '🏖️',
    category: 'time-off'
  },
  {
    id: '4',
    title: 'Learning Budget',
    description: '$2,000 annual budget for courses, conferences, and professional development',
    icon: '📚',
    category: 'growth'
  },
  {
    id: '5',
    title: 'Remote-First',
    description: 'Work from anywhere with quarterly team gatherings',
    icon: '🌍',
    category: 'perks'
  },
  {
    id: '6',
    title: '401(k) Matching',
    description: '6% company match on retirement contributions',
    icon: '💰',
    category: 'financial'
  },
  {
    id: '7',
    title: 'Parental Leave',
    description: '16 weeks paid parental leave for all new parents',
    icon: '👶',
    category: 'time-off'
  },
  {
    id: '8',
    title: 'Top-Tier Equipment',
    description: 'Latest MacBook Pro, monitor, and any tools you need to do your best work',
    icon: '💻',
    category: 'perks'
  }
];

export const officeLocations: OfficeLocation[] = [
  {
    id: '1',
    name: 'San Francisco HQ',
    address: '123 Market Street, Suite 500',
    city: 'San Francisco',
    country: 'United States',
    isPrimary: true,
    description: 'Our headquarters in the heart of SOMA, walking distance from Caltrain and BART.',
    image: 'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg',
    amenities: ['Rooftop terrace', 'Fully stocked kitchen', 'Game room', 'Bike storage', 'Gym access']
  },
  {
    id: '2',
    name: 'New York Office',
    address: '456 Broadway, Floor 12',
    city: 'New York',
    country: 'United States',
    isPrimary: false,
    description: 'Modern workspace in Manhattan with stunning city views.',
    image: 'https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg',
    amenities: ['City views', 'Coffee bar', 'Collaboration spaces', 'Subway access']
  },
  {
    id: '3',
    name: 'London Office',
    address: '789 Shoreditch High Street',
    city: 'London',
    country: 'United Kingdom',
    isPrimary: false,
    description: 'Creative space in the heart of London\'s tech district.',
    image: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg',
    amenities: ['Flexible workspaces', 'Tea station', 'Tube access', 'Local pub nearby']
  }
];

export const careerJobPostings: JobPosting[] = [
  {
    id: '1',
    title: 'Senior Cloud Platform Engineer',
    department: 'Engineering',
    location: 'San Francisco, CA',
    type: 'full-time',
    description: 'Join our platform team to build the next generation of cloud infrastructure. You\'ll work on distributed systems that power thousands of applications worldwide.',
    requirements: [
      '5+ years of cloud platform development experience',
      'Expert knowledge of Go, Python, or Rust',
      'Experience with Kubernetes, Docker, and microservices',
      'Strong understanding of distributed systems',
      'Experience with AWS, GCP, or Azure',
      'Bachelor\'s degree in Computer Science or equivalent experience'
    ],
    responsibilities: [
      'Build and maintain our core cloud platform',
      'Design scalable microservices and APIs',
      'Optimize system performance and reliability',
      'Mentor junior engineers and contribute to code reviews',
      'Work closely with product team to define platform requirements',
      'Participate in architecture decisions and technical planning'
    ],
    benefits: [
      'Competitive salary: $160,000 - $220,000',
      'Equity package',
      'Comprehensive health insurance',
      'Unlimited PTO',
      '$3,000 learning budget',
      'Top-tier equipment'
    ],
    salary: {
      min: 160000,
      max: 220000,
      currency: 'USD'
    },
    postedDate: new Date('2025-01-10'),
    isRemote: true,
    experienceLevel: 'senior',
    skills: ['Go', 'Kubernetes', 'AWS', 'Microservices', 'Docker'],
    applicationCount: 45,
    isActive: true,
    seoSlug: 'senior-cloud-platform-engineer'
  },
  {
    id: '2',
    title: 'Staff Software Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'full-time',
    description: 'Lead the development of our core infrastructure services. Work with cutting-edge distributed systems and help shape our technical architecture.',
    requirements: [
      '8+ years of software engineering experience',
      'Expert in systems programming (Go, Rust, C++)',
      'Deep understanding of distributed systems and databases',
      'Experience with high-scale system design',
      'Leadership experience mentoring senior engineers',
      'Experience with cloud platforms (AWS, GCP)'
    ],
    responsibilities: [
      'Lead architecture decisions for core platform services',
      'Design and implement high-performance distributed systems',
      'Mentor senior engineers and drive technical excellence',
      'Optimize system performance and reliability at scale',
      'Collaborate with product and infrastructure teams',
      'Drive adoption of best practices and new technologies'
    ],
    benefits: [
      'Competitive salary: $220,000 - $280,000',
      'Significant equity package',
      'Comprehensive health insurance',
      'Unlimited PTO',
      '$5,000 learning budget',
      'Conference attendance budget'
    ],
    salary: {
      min: 220000,
      max: 280000,
      currency: 'USD'
    },
    postedDate: new Date('2025-01-08'),
    isRemote: true,
    experienceLevel: 'senior',
    skills: ['Go', 'Distributed Systems', 'Kubernetes', 'PostgreSQL', 'AWS'],
    applicationCount: 67,
    isActive: true,
    seoSlug: 'staff-software-engineer'
  },
  {
    id: '3',
    title: 'Product Manager',
    department: 'Product',
    location: 'San Francisco, CA',
    type: 'full-time',
    description: 'Lead product strategy for our cloud platform. Work with engineering and design to ship features that delight our enterprise customers.',
    requirements: [
      '4+ years of product management experience',
      'Experience with B2B enterprise SaaS products',
      'Strong analytical skills and data-driven mindset',
      'Excellent communication and leadership skills',
      'Experience with agile development processes',
      'Background in cloud infrastructure or developer tools preferred'
    ],
    responsibilities: [
      'Define product roadmap and strategy',
      'Work with engineering and design on feature development',
      'Analyze user data and feedback to drive decisions',
      'Manage product launches and go-to-market strategy',
      'Collaborate with sales and marketing teams',
      'Conduct user research and competitive analysis'
    ],
    benefits: [
      'Competitive salary: $150,000 - $200,000',
      'Equity package',
      'Comprehensive health insurance',
      'Unlimited PTO',
      '$3,000 learning budget',
      'Product conference budget'
    ],
    salary: {
      min: 150000,
      max: 200000,
      currency: 'USD'
    },
    postedDate: new Date('2025-01-05'),
    isRemote: false,
    experienceLevel: 'mid',
    skills: ['Product Strategy', 'Analytics', 'Agile', 'Enterprise Sales'],
    applicationCount: 34,
    isActive: true,
    seoSlug: 'product-manager'
  },
  {
    id: '4',
    title: 'Senior UX Designer',
    department: 'Design',
    location: 'New York, NY',
    type: 'full-time',
    description: 'Design beautiful, intuitive experiences for enterprise developers and platform users. Help shape the future of cloud infrastructure UX.',
    requirements: [
      '5+ years of UX/UI design experience',
      'Strong portfolio showcasing enterprise B2B product design',
      'Proficiency in Figma, Sketch, or similar tools',
      'Experience with design systems and component libraries',
      'Understanding of user research methodologies',
      'Knowledge of developer tools and technical products'
    ],
    responsibilities: [
      'Design user flows and wireframes for new features',
      'Create high-fidelity mockups and prototypes',
      'Conduct user research and usability testing',
      'Maintain and evolve our design system',
      'Collaborate closely with engineering and product',
      'Present design concepts to stakeholders'
    ],
    benefits: [
      'Competitive salary: $110,000 - $140,000',
      'Equity package',
      'Comprehensive health insurance',
      'Unlimited PTO',
      '$2,000 learning budget',
      'Design tool subscriptions'
    ],
    salary: {
      min: 130000,
      max: 170000,
      currency: 'USD'
    },
    postedDate: new Date('2025-01-12'),
    isRemote: true,
    experienceLevel: 'senior',
    skills: ['UX Design', 'UI Design', 'Figma', 'User Research', 'Prototyping'],
    applicationCount: 89,
    isActive: true,
    seoSlug: 'senior-ux-designer'
  },
  {
    id: '5',
    title: 'Enterprise Account Executive',
    department: 'Sales',
    location: 'Remote',
    type: 'full-time',
    description: 'Join our enterprise sales team to help Fortune 500 companies adopt our cloud infrastructure. Perfect for ambitious sales professionals.',
    requirements: [
      '5+ years of enterprise B2B sales experience',
      'Excellent communication and interpersonal skills',
      'Experience with CRM systems (Salesforce, HubSpot)',
      'Track record of closing $1M+ deals',
      'Bachelor\'s degree preferred',
      'Experience selling to technical buyers (CTOs, VPs of Engineering)'
    ],
    responsibilities: [
      'Manage enterprise accounts ($500K+ ARR)',
      'Conduct executive-level sales presentations',
      'Negotiate complex enterprise contracts',
      'Collaborate with solution engineers on technical demos',
      'Maintain accurate records in CRM system',
      'Exceed quarterly and annual sales targets'
    ],
    benefits: [
      'Base salary: $120,000 - $150,000 + commission',
      'Uncapped commission potential',
      'Comprehensive health insurance',
      'Unlimited PTO',
      '$2,000 learning budget',
      'Sales training and mentorship'
    ],
    salary: {
      min: 120000,
      max: 150000,
      currency: 'USD'
    },
    postedDate: new Date('2025-01-14'),
    isRemote: true,
    experienceLevel: 'senior',
    skills: ['Enterprise Sales', 'CRM', 'Negotiation', 'Technical Sales'],
    applicationCount: 23,
    isActive: true,
    seoSlug: 'enterprise-account-executive'
  },
  {
    id: '6',
    title: 'Senior DevOps Engineer',
    department: 'Engineering',
    location: 'San Francisco, CA',
    type: 'full-time',
    description: 'Build and maintain the infrastructure that powers our cloud platform. Work with cutting-edge technologies and help scale our global infrastructure.',
    requirements: [
      '6+ years of DevOps or infrastructure experience',
      'Strong knowledge of AWS, Docker, and Kubernetes',
      'Experience with CI/CD pipelines and automation',
      'Proficiency in Python, Bash, or Go',
      'Experience with monitoring tools (Prometheus, Grafana)',
      'Experience with infrastructure as code (Terraform)'
    ],
    responsibilities: [
      'Manage and optimize cloud infrastructure on AWS',
      'Build and maintain CI/CD pipelines',
      'Implement monitoring and alerting systems',
      'Ensure security and compliance standards',
      'Automate deployment and scaling processes',
      'Collaborate with engineering team on architecture'
    ],
    benefits: [
      'Competitive salary: $130,000 - $160,000',
      'Equity package',
      'Comprehensive health insurance',
      'Unlimited PTO',
      '$2,000 learning budget',
      'Cloud certification support'
    ],
    salary: {
      min: 150000,
      max: 190000,
      currency: 'USD'
    },
    postedDate: new Date('2025-01-11'),
    isRemote: true,
    experienceLevel: 'senior',
    skills: ['AWS', 'Docker', 'Kubernetes', 'Python', 'Terraform'],
    applicationCount: 56,
    isActive: true,
    seoSlug: 'senior-devops-engineer'
  },
  {
    id: '7',
    title: 'Data Scientist',
    department: 'Data Science',
    location: 'Remote',
    type: 'full-time',
    description: 'Build ML models that power intelligent infrastructure decisions. Work with petabytes of data to optimize cloud resource allocation and predict system behavior.',
    requirements: [
      '4+ years of data science experience',
      'PhD or Master\'s in Statistics, Computer Science, or related field',
      'Expert knowledge of Python, R, and SQL',
      'Experience with ML frameworks (TensorFlow, PyTorch, Scikit-learn)',
      'Strong statistical analysis and modeling skills',
      'Experience with big data tools (Spark, Hadoop)'
    ],
    responsibilities: [
      'Develop ML models for resource optimization',
      'Analyze system performance and usage patterns',
      'Build predictive models for capacity planning',
      'Collaborate with engineering on model deployment',
      'Create data pipelines and ETL processes',
      'Present insights to executive leadership'
    ],
    benefits: [
      'Competitive salary: $140,000 - $180,000',
      'Equity package',
      'Comprehensive health insurance',
      'Unlimited PTO',
      '$3,000 learning budget',
      'Research publication support'
    ],
    salary: {
      min: 140000,
      max: 180000,
      currency: 'USD'
    },
    postedDate: new Date('2025-01-13'),
    isRemote: true,
    experienceLevel: 'mid',
    skills: ['Python', 'Machine Learning', 'SQL', 'Statistics', 'TensorFlow'],
    applicationCount: 78,
    isActive: true,
    seoSlug: 'data-scientist'
  },
  {
    id: '8',
    title: 'Security Engineer',
    department: 'Security',
    location: 'San Francisco, CA',
    type: 'full-time',
    description: 'Protect our cloud infrastructure and customer data. Build security tools and implement best practices across our global platform.',
    requirements: [
      '5+ years of cybersecurity experience',
      'Strong knowledge of cloud security (AWS, GCP, Azure)',
      'Experience with security tools and frameworks',
      'Knowledge of compliance standards (SOC2, ISO 27001)',
      'Programming skills in Python, Go, or Java',
      'Security certifications (CISSP, CISM) preferred'
    ],
    responsibilities: [
      'Design and implement security controls',
      'Conduct security assessments and penetration testing',
      'Monitor and respond to security incidents',
      'Develop security automation tools',
      'Ensure compliance with industry standards',
      'Train teams on security best practices'
    ],
    benefits: [
      'Competitive salary: $150,000 - $200,000',
      'Equity package',
      'Comprehensive health insurance',
      'Unlimited PTO',
      '$3,000 learning budget',
      'Security certification support'
    ],
    salary: {
      min: 150000,
      max: 200000,
      currency: 'USD'
    },
    postedDate: new Date('2025-01-09'),
    isRemote: true,
    experienceLevel: 'senior',
    skills: ['Cybersecurity', 'AWS Security', 'Python', 'Compliance', 'Penetration Testing'],
    applicationCount: 29,
    isActive: true,
    seoSlug: 'security-engineer'
  },
  {
    id: '9',
    title: 'Frontend Engineer',
    department: 'Engineering',
    location: 'New York, NY',
    type: 'full-time',
    description: 'Build beautiful, responsive web applications for our cloud platform dashboard. Work with React and modern frontend technologies.',
    requirements: [
      '3+ years of frontend development experience',
      'Strong knowledge of React, TypeScript, and JavaScript',
      'Experience with state management and modern CSS',
      'Understanding of web performance optimization',
      'Experience with testing frameworks',
      'Bachelor\'s degree or equivalent experience'
    ],
    responsibilities: [
      'Build responsive web applications',
      'Implement design system components',
      'Optimize frontend performance',
      'Collaborate with designers and backend engineers',
      'Write comprehensive tests',
      'Participate in code reviews'
    ],
    benefits: [
      'Competitive salary: $120,000 - $160,000',
      'Equity package',
      'Comprehensive health insurance',
      'Unlimited PTO',
      '$2,000 learning budget',
      'Top-tier equipment'
    ],
    salary: {
      min: 120000,
      max: 160000,
      currency: 'USD'
    },
    postedDate: new Date('2025-01-15'),
    isRemote: true,
    experienceLevel: 'mid',
    skills: ['React', 'TypeScript', 'JavaScript', 'CSS', 'Testing'],
    applicationCount: 156,
    isActive: true,
    seoSlug: 'frontend-engineer'
  },
  {
    id: '10',
    title: 'Customer Success Manager',
    department: 'Customer Success',
    location: 'Remote',
    type: 'full-time',
    description: 'Help our enterprise customers maximize value from our cloud platform. Build relationships and drive adoption across Fortune 500 companies.',
    requirements: [
      '4+ years of customer success experience',
      'Experience with enterprise B2B customers',
      'Strong technical aptitude and communication skills',
      'Experience with cloud platforms or developer tools',
      'Bachelor\'s degree preferred',
      'Ability to travel 25% for customer meetings'
    ],
    responsibilities: [
      'Manage portfolio of enterprise accounts',
      'Drive product adoption and expansion',
      'Conduct quarterly business reviews',
      'Collaborate with sales and product teams',
      'Provide customer feedback to product team',
      'Ensure high customer satisfaction and retention'
    ],
    benefits: [
      'Competitive salary: $100,000 - $130,000',
      'Equity package',
      'Comprehensive health insurance',
      'Unlimited PTO',
      '$2,000 learning budget',
      'Travel and conference budget'
    ],
    salary: {
      min: 100000,
      max: 130000,
      currency: 'USD'
    },
    postedDate: new Date('2025-01-16'),
    isRemote: true,
    experienceLevel: 'mid',
    skills: ['Customer Success', 'Account Management', 'SaaS', 'Communication'],
    applicationCount: 91,
    isActive: true,
    seoSlug: 'customer-success-manager'
  },
  {
    id: '11',
    title: 'Site Reliability Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'full-time',
    description: 'Ensure our cloud platform runs reliably at global scale. Build monitoring, alerting, and automation systems that keep our services running 24/7.',
    requirements: [
      '4+ years of SRE or operations experience',
      'Strong programming skills in Python, Go, or similar',
      'Experience with monitoring tools (Prometheus, Grafana, DataDog)',
      'Knowledge of incident response and on-call procedures',
      'Experience with cloud platforms and containerization',
      'Understanding of distributed systems reliability'
    ],
    responsibilities: [
      'Monitor system health and performance',
      'Respond to and resolve production incidents',
      'Build automation tools and runbooks',
      'Implement SLI/SLO monitoring',
      'Conduct post-incident reviews',
      'Improve system reliability and observability'
    ],
    benefits: [
      'Competitive salary: $140,000 - $180,000',
      'Equity package',
      'Comprehensive health insurance',
      'Unlimited PTO',
      '$2,500 learning budget',
      'On-call compensation'
    ],
    salary: {
      min: 140000,
      max: 180000,
      currency: 'USD'
    },
    postedDate: new Date('2025-01-07'),
    isRemote: true,
    experienceLevel: 'mid',
    skills: ['SRE', 'Python', 'Monitoring', 'Kubernetes', 'Incident Response'],
    applicationCount: 43,
    isActive: true,
    seoSlug: 'site-reliability-engineer'
  },
  {
    id: '12',
    title: 'Technical Writer',
    department: 'Product',
    location: 'Remote',
    type: 'full-time',
    description: 'Create world-class documentation for our cloud platform APIs and developer tools. Help developers around the world understand and adopt our technology.',
    requirements: [
      '3+ years of technical writing experience',
      'Experience documenting APIs and developer tools',
      'Strong writing and communication skills',
      'Basic programming knowledge (any language)',
      'Experience with documentation tools (GitBook, Notion)',
      'Bachelor\'s degree in English, Communications, or technical field'
    ],
    responsibilities: [
      'Write and maintain API documentation',
      'Create developer guides and tutorials',
      'Collaborate with engineering on technical accuracy',
      'Improve documentation based on user feedback',
      'Maintain style guides and writing standards',
      'Create video tutorials and demos'
    ],
    benefits: [
      'Competitive salary: $90,000 - $120,000',
      'Equity package',
      'Comprehensive health insurance',
      'Unlimited PTO',
      '$1,500 learning budget',
      'Writing conference budget'
    ],
    salary: {
      min: 90000,
      max: 120000,
      currency: 'USD'
    },
    postedDate: new Date('2025-01-06'),
    isRemote: true,
    experienceLevel: 'mid',
    skills: ['Technical Writing', 'API Documentation', 'Developer Tools', 'Communication'],
    applicationCount: 112,
    isActive: true,
    seoSlug: 'technical-writer'
  }
];

export const mockApplications: JobApplication[] = [
  {
    id: '1',
    jobId: '1',
    candidateName: 'Alex Johnson',
    candidateEmail: 'alex.johnson@email.com',
    candidatePhone: '+1-555-0123',
    resumeUrl: 'https://example.com/resume-alex.pdf',
    coverLetter: 'I am excited to apply for the Senior Frontend Engineer position...',
    linkedInProfile: 'https://linkedin.com/in/alexjohnson',
    portfolioUrl: 'https://alexjohnson.dev',
    expectedSalary: 155000,
    availableStartDate: new Date('2025-02-15'),
    howDidYouHear: 'Company website',
    submittedAt: new Date('2025-01-12T14:30:00'),
    status: 'reviewing',
    source: 'career-site'
  },
  {
    id: '2',
    jobId: '2',
    candidateName: 'Maria Rodriguez',
    candidateEmail: 'maria.rodriguez@email.com',
    candidatePhone: '+1-555-0124',
    resumeUrl: 'https://example.com/resume-maria.pdf',
    coverLetter: 'As an AI researcher with 6 years of experience...',
    expectedSalary: 190000,
    availableStartDate: new Date('2025-03-01'),
    howDidYouHear: 'LinkedIn',
    submittedAt: new Date('2025-01-11T09:15:00'),
    status: 'shortlisted',
    source: 'career-site'
  }
];