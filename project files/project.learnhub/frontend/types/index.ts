export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  phone: string;
  loginStreak: number;
  lastLoginDate: string;
  enrolledCourses: string[];
  completedCourses: string[];
  progress: Record<string, number>;
  profileImage: string | null;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: 'technical' | 'business' | 'personal';
  subcategory: string;
  duration: string;
  instructor: string;
  objectives: string[];
  enrolled: number;
  rating: number;
  image: string;
}

export interface Workshop {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  instructor: string;
  isRecorded: boolean;
  videoUrl?: string;
  slides?: string;
  resources?: string[];
}

export interface Message {
  id: string;
  studentId: string;
  teacherId: string;
  content: string;
  timestamp: string;
  course: string;
  studentName: string;
  teacherName: string;
  response?: string;
  responseTimestamp?: string;
  isSolved: boolean;
}