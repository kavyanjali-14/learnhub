import React, { useState } from 'react';
import { Search, Filter, Star, Users, Clock, ChevronRight } from 'lucide-react';
import { courses } from '../../data/mockData';
import { Course } from '../../types';
import { useAuth } from '../../context/AuthContext';

const StudentCourses: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'technical' | 'business' | 'personal'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleEnroll = (courseId: string) => {
    if (user) {
      const updatedUser = {
        ...user,
        enrolledCourses: [...(user.enrolledCourses || []), courseId],
        progress: { ...user.progress, [courseId]: 0 }
      };
      updateUser(updatedUser);
      setSelectedCourse(null);
      alert('Successfully enrolled in the course!');
    }
  };

  const CourseDetail = ({ course }: { course: Course }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-64 object-cover rounded-t-2xl"
          />
          <button
            onClick={() => setSelectedCourse(null)}
            className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
          >
            ✕
          </button>
        </div>
        
        <div className="p-8">
          <div className="mb-6">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium capitalize">
              {course.category}
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-2">{course.title}</h1>
            <div className="flex items-center space-x-4 text-gray-600">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>{course.rating}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{course.enrolled} students</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{course.duration}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Course Description</h2>
                <p className="text-gray-600 leading-relaxed">{course.description}</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Learning Objectives</h2>
                <ul className="space-y-2">
                  {course.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <ChevronRight className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Instructor</h2>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-xl font-semibold text-gray-600">
                      {course.instructor.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{course.instructor}</h3>
                    <p className="text-gray-600">Expert Instructor</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-gray-50 p-6 rounded-xl sticky top-4">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-gray-900 mb-2">Free</div>
                  <p className="text-gray-600">Full access to course content</p>
                </div>
                
                {user?.enrolledCourses?.includes(course.id) ? (
                  <button
                    disabled
                    className="w-full bg-gray-400 text-white py-3 rounded-lg font-semibold cursor-not-allowed"
                  >
                    Already Enrolled
                  </button>
                ) : (
                  <button
                    onClick={() => handleEnroll(course.id)}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                  >
                    Enroll Now
                  </button>
                )}

                <div className="mt-6 space-y-3 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span className="font-medium">{course.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Level:</span>
                    <span className="font-medium">All Levels</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Certificate:</span>
                    <span className="font-medium">Included</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Access:</span>
                    <span className="font-medium">Lifetime</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Course Catalog</h1>
        <p className="text-gray-600">Discover and enroll in courses to advance your skills</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as any)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="technical">Technical</option>
              <option value="business">Business</option>
              <option value="personal">Personal Development</option>
            </select>
          </div>
        </div>
      </div>

      {/* Course Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl text-white cursor-pointer hover:shadow-lg transition-shadow"
             onClick={() => setSelectedCategory('technical')}>
          <h3 className="text-xl font-bold mb-2">Technical Courses</h3>
          <p className="text-blue-100 mb-4">Programming, Data Science, Cloud Computing</p>
          <div className="text-2xl font-bold">{courses.filter(c => c.category === 'technical').length} Courses</div>
        </div>

        <div className="bg-gradient-to-br from-teal-500 to-teal-600 p-6 rounded-2xl text-white cursor-pointer hover:shadow-lg transition-shadow"
             onClick={() => setSelectedCategory('business')}>
          <h3 className="text-xl font-bold mb-2">Business Courses</h3>
          <p className="text-teal-100 mb-4">Marketing, Management, Finance</p>
          <div className="text-2xl font-bold">{courses.filter(c => c.category === 'business').length} Courses</div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-2xl text-white cursor-pointer hover:shadow-lg transition-shadow"
             onClick={() => setSelectedCategory('personal')}>
          <h3 className="text-xl font-bold mb-2">Personal Development</h3>
          <p className="text-orange-100 mb-4">Communication, Wellness, Productivity</p>
          <div className="text-2xl font-bold">{courses.filter(c => c.category === 'personal').length} Courses</div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => setSelectedCourse(course)}
          >
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium capitalize">
                  {course.category}
                </span>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-gray-600">{course.rating}</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{course.instructor}</span>
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <Users className="w-4 h-4" />
                  <span>{course.enrolled}</span>
                </div>
                {user?.enrolledCourses?.includes(course.id) ? (
                  <button
                    disabled
                    className="bg-gray-400 text-white px-4 py-2 rounded-lg text-sm cursor-not-allowed"
                  >
                    Enrolled
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEnroll(course.id);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    Enroll
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedCourse && <CourseDetail course={selectedCourse} />}
    </div>
  );
};

export default StudentCourses;