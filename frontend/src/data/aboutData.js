const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'FAQ', path: '/faq' }
];

const features = [
  {
    icon: 'Lightbulb',
    title: 'Smart Question Generation',
    description: 'Our AI algorithms generate tailored technical interview questions based on your experience level and preferred technologies.'
  },
  {
    icon: 'Target',
    title: 'Focused Practice',
    description: 'Get questions specifically designed for your target role, from frontend development to system design.'
  },
  {
    icon: 'HeartHandshake',
    title: 'Personalized Feedback',
    description: 'Receive instant feedback on your answers and track your progress over time.'
  },
  {
    icon: 'Users',
    title: 'Community Driven',
    description: 'Join a community of developers sharing interview experiences and preparation strategies.'
  }
];

const stats = [
  { number: '10,000+', label: 'Questions Generated' },
  { number: '5,000+', label: 'Active Users' },
  { number: '95%', label: 'Success Rate' },
  { number: '24/7', label: 'Support Available' }
];

export const aboutData = {
  navItems,
  hero: {
    title: 'Revolutionizing Interview Preparation',
    subtitle: 'AI-Powered Question Generation for Technical Interviews'
  },
  features,
  stats,
  story: {
    title: 'Our Story',
    paragraphs: [
      'InterviewQuest was created to empower job seekers and recruiters. Our founders, a group of AI and HR experts, saw that candidates often struggled to prepare for interviews tailored to their unique skills.',
      'Since our launch in 2023, we\'ve built an AI-driven platform that analyzes resumes and generates personalized interview questions, streamlining preparation and hiring.',
      'Now, InterviewQuest supports thousands globally, making interviews fairer and more effective for everyone.'
    ],
    image: {
      src: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      alt: 'Team collaboration'
    }
  },
  missionValues: {
    title: 'Our Mission & Values',
    description: 'We\'re committed to transforming interviews with innovative, skill-focused technology.',
    values: [
      {
        icon: 'Lightbulb',
        title: 'Innovation',
        description: 'We use advanced AI to craft tailored interview questions.'
      },
      {
        icon: 'HeartHandshake',
        title: 'Fairness',
        description: 'Our tools promote unbiased, skill-based evaluations.'
      },
      {
        icon: 'Target',
        title: 'Efficiency',
        description: 'We streamline preparation for candidates and recruiters.'
      },
      {
        icon: 'Users',
        title: 'Empowerment',
        description: 'We boost confidence and help hire the right talent.'
      }
    ]
  },
  team: {
    title: 'Our Team',
    description: 'Meet the dedicated team driving InterviewQuest\'s mission.',
    members: [
      { name: 'Sarah Thompson', role: 'CEO & Co-Founder', bio: 'HR veteran with a passion for recruitment innovation.' },
      { name: 'Liam Patel', role: 'CTO & Co-Founder', bio: 'AI specialist focused on natural language processing.' },
      { name: 'Emily Carter', role: 'Head of AI', bio: 'Leads development of skill-extraction algorithms.' },
      { name: 'Noah Kim', role: 'Head of Product', bio: 'Designs intuitive platforms for seamless user experiences.' },
      { name: 'Ava Nguyen', role: 'Lead Data Scientist', bio: 'Optimizes AI for precise question generation.' },
      { name: 'Michael Brown', role: 'Hiring Strategy Lead', bio: 'Ensures fair and effective recruitment practices.' }
    ]
  },
  contact: {
    title: 'Contact Us',
    description: 'Got questions or feedback? Reach out to us.',
    info: {
      email: 'info@interviewquest.com',
      phone: '(123) 456-7890',
      address: '456 Career Avenue, San Francisco, CA 94103'
    },
    hours: [
      { day: 'Monday - Friday', time: '9:00 AM - 6:00 PM EST' },
      { day: 'Saturday', time: '10:00 AM - 4:00 PM EST' },
      { day: 'Sunday', time: 'Closed' }
    ],
    social: [
      { platform: 'Twitter', url: '#' },
      { platform: 'LinkedIn', url: '#' },
      { platform: 'Facebook', url: '#' }
    ]
  },
  footer: {
    title: 'InterviewQuest',
    description: 'Empowering interview preparation with AI-generated questions.',
    quickLinks: [
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
      { name: 'FAQ', path: '/faq' }
    ],
    contact: {
      email: 'info@interviewquest.com',
      phone: '(123) 456-7890'
    }
  }
};