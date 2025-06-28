import { Course, Workshop } from '../types';

export const courses: Course[] = [
  // Technical Courses
  {
    id: '1',
    title: 'Python Programming',
    description: 'Learn Python from basics to advanced concepts including web development, data analysis, and automation.',
    category: 'technical',
    subcategory: 'Programming',
    duration: '12 weeks',
    instructor: 'Dr. Sarah Johnson',
    objectives: ['Master Python syntax and fundamentals', 'Build web applications with Flask/Django', 'Data analysis with pandas and numpy', 'Automation scripting'],
    enrolled: 1245,
    rating: 4.8,
    image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg'
  },
  {
    id: '2',
    title: 'Java Programming',
    description: 'Comprehensive Java programming course covering OOP, data structures, and enterprise development.',
    category: 'technical',
    subcategory: 'Programming',
    duration: '16 weeks',
    instructor: 'Prof. Michael Chen',
    objectives: ['Object-oriented programming mastery', 'Spring framework development', 'Database integration with JDBC', 'Testing with JUnit'],
    enrolled: 987,
    rating: 4.7,
    image: 'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg'
  },
  {
    id: '3',
    title: 'JavaScript Programming',
    description: 'Modern JavaScript development including ES6+, React, Node.js, and full-stack development.',
    category: 'technical',
    subcategory: 'Programming',
    duration: '14 weeks',
    instructor: 'Alex Rodriguez',
    objectives: ['Modern JavaScript ES6+ features', 'React component development', 'Node.js backend development', 'API development and consumption'],
    enrolled: 1567,
    rating: 4.9,
    image: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg'
  },
  {
    id: '4',
    title: 'Full Stack Java Developer',
    description: 'Complete full-stack development with Java backend and modern frontend technologies.',
    category: 'technical',
    subcategory: 'Programming',
    duration: '20 weeks',
    instructor: 'Emily Davis',
    objectives: ['Spring Boot backend development', 'React frontend development', 'Database design and optimization', 'DevOps and deployment'],
    enrolled: 756,
    rating: 4.8,
    image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg'
  },
  {
    id: '5',
    title: 'Web Development',
    description: 'Complete web development course covering HTML, CSS, JavaScript, and modern frameworks.',
    category: 'technical',
    subcategory: 'Programming',
    duration: '18 weeks',
    instructor: 'David Kim',
    objectives: ['Responsive web design', 'Modern CSS frameworks', 'JavaScript frameworks', 'Web performance optimization'],
    enrolled: 2134,
    rating: 4.6,
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg'
  },
  {
    id: '6',
    title: 'Data Science',
    description: 'Comprehensive data science course with Python, machine learning, and statistical analysis.',
    category: 'technical',
    subcategory: 'Data Science',
    duration: '22 weeks',
    instructor: 'Dr. Lisa Wang',
    objectives: ['Statistical analysis and modeling', 'Machine learning algorithms', 'Data visualization with matplotlib/seaborn', 'Big data processing with pandas'],
    enrolled: 1023,
    rating: 4.9,
    image: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg'
  },
  {
    id: '7',
    title: 'Machine Learning',
    description: 'Advanced machine learning concepts, algorithms, and practical implementation.',
    category: 'technical',
    subcategory: 'AI/ML',
    duration: '16 weeks',
    instructor: 'Prof. Robert Lee',
    objectives: ['Supervised and unsupervised learning', 'Neural networks and deep learning', 'Model evaluation and optimization', 'Real-world ML project implementation'],
    enrolled: 834,
    rating: 4.8,
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg'
  },
  {
    id: '8',
    title: 'AWS Cloud Computing',
    description: 'Master Amazon Web Services with hands-on labs and real-world projects.',
    category: 'technical',
    subcategory: 'Cloud Computing',
    duration: '12 weeks',
    instructor: 'Jennifer Martinez',
    objectives: ['AWS core services mastery', 'Cloud architecture design', 'Security best practices', 'Cost optimization strategies'],
    enrolled: 1456,
    rating: 4.7,
    image: 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg'
  },
  
  // Business Courses
  {
    id: '9',
    title: 'Digital Marketing',
    description: 'Complete digital marketing strategy including SEO, social media, and analytics.',
    category: 'business',
    subcategory: 'Marketing',
    duration: '10 weeks',
    instructor: 'Mark Thompson',
    objectives: ['SEO and content marketing', 'Social media strategy', 'Google Ads and PPC', 'Analytics and ROI measurement'],
    enrolled: 1789,
    rating: 4.6,
    image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg'
  },
  {
    id: '10',
    title: 'Project Management',
    description: 'Professional project management methodologies including Agile, Scrum, and traditional approaches.',
    category: 'business',
    subcategory: 'Management',
    duration: '8 weeks',
    instructor: 'Carol Anderson',
    objectives: ['Project planning and execution', 'Risk management', 'Team leadership', 'Agile and Scrum methodologies'],
    enrolled: 1234,
    rating: 4.8,
    image: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg'
  },
  {
    id: '11',
    title: 'Financial Management',
    description: 'Corporate finance, investment analysis, and financial planning for businesses.',
    category: 'business',
    subcategory: 'Finance',
    duration: '12 weeks',
    instructor: 'Dr. James Wilson',
    objectives: ['Financial statement analysis', 'Investment evaluation', 'Risk assessment', 'Budget planning and control'],
    enrolled: 876,
    rating: 4.7,
    image: 'https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg'
  },
  
  // Personal Development Courses
  {
    id: '12',
    title: 'Time Management',
    description: 'Master productivity techniques and time management strategies for personal and professional success.',
    category: 'personal',
    subcategory: 'Productivity',
    duration: '6 weeks',
    instructor: 'Rachel Green',
    objectives: ['Priority setting techniques', 'Productivity systems', 'Work-life balance', 'Stress management'],
    enrolled: 2456,
    rating: 4.5,
    image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg'
  },
  {
    id: '13',
    title: 'Effective Communication',
    description: 'Develop powerful communication skills for leadership and professional success.',
    category: 'personal',
    subcategory: 'Communication',
    duration: '8 weeks',
    instructor: 'Dr. Amanda Foster',
    objectives: ['Public speaking confidence', 'Active listening skills', 'Conflict resolution', 'Persuasion techniques'],
    enrolled: 1923,
    rating: 4.8,
    image: 'https://images.pexels.com/photos/3182781/pexels-photo-3182781.jpeg'
  },
  {
    id: '14',
    title: 'Mindfulness Meditation',
    description: 'Learn meditation techniques for stress reduction and mental clarity.',
    category: 'personal',
    subcategory: 'Wellness',
    duration: '4 weeks',
    instructor: 'Maya Patel',
    objectives: ['Basic meditation techniques', 'Stress reduction methods', 'Mindfulness in daily life', 'Emotional regulation'],
    enrolled: 1567,
    rating: 4.9,
    image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg'
  }
];

export const workshops: Workshop[] = [
  {
    id: '1',
    title: 'AI in Modern Development',
    description: 'Explore how artificial intelligence is revolutionizing software development and learn practical applications.',
    date: '2024-02-15',
    time: '14:00',
    instructor: 'Dr. Sarah Johnson',
    isRecorded: false
  },
  {
    id: '2',
    title: 'Cloud Architecture Best Practices',
    description: 'Learn industry best practices for designing scalable and secure cloud architectures.',
    date: '2024-02-20',
    time: '16:00',
    instructor: 'Jennifer Martinez',
    isRecorded: false
  },
  {
    id: '3',
    title: 'Data Science Career Path',
    description: 'Complete guide to starting and advancing your career in data science.',
    date: '2024-01-10',
    time: '15:00',
    instructor: 'Dr. Lisa Wang',
    isRecorded: true,
    videoUrl: 'https://example.com/video1',
    slides: 'https://example.com/slides1',
    resources: ['Career roadmap PDF', 'Interview preparation guide', 'Portfolio examples']
  },
  {
    id: '4',
    title: 'Agile Project Management',
    description: 'Hands-on workshop on implementing Agile methodologies in your projects.',
    date: '2024-01-25',
    time: '13:00',
    instructor: 'Carol Anderson',
    isRecorded: true,
    videoUrl: 'https://example.com/video2',
    slides: 'https://example.com/slides2',
    resources: ['Agile toolkit', 'Sprint planning templates', 'Retrospective guides']
  }
];