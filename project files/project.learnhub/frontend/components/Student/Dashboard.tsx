import React from 'react';
import { BookOpen, TrendingUp, Calendar, Award, Target, Flame } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { courses } from '../../data/mockData';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  
  const enrolledCourses = courses.filter(course => 
    user?.enrolledCourses?.includes(course.id)
  ).slice(0, 3);

  const recommendations = courses.filter(course => 
    !user?.enrolledCourses?.includes(course.id)
  ).slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user?.name}! 🎉
            </h1>
            <p className="text-blue-100 text-lg">
              Ready to continue your learning journey today?
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-center space-x-2 mb-2">
              <Flame className="w-6 h-6 text-orange-400" />
              <span className="text-2xl font-bold">{user?.loginStreak || 0}</span>
            </div>
            <p className="text-blue-200 text-sm">Day Streak</p>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Enrolled Courses</p>
              <p className="text-2xl font-bold text-gray-900">{user?.enrolledCourses?.length || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <Award className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">{user?.completedCourses?.length || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-orange-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Progress</p>
              <p className="text-2xl font-bold text-gray-900">75%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Goals</p>
              <p className="text-2xl font-bold text-gray-900">3/5</p>
            </div>
          </div>
        </div>
      </div>

      {/* Course Selection */}
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Learning Path</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button className="p-6 border-2 border-blue-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all group">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Technical Courses</h3>
              <p className="text-sm text-gray-600">Programming, Data Science, Cloud Computing</p>
            </div>
          </button>

          <button className="p-6 border-2 border-teal-200 rounded-xl hover:border-teal-400 hover:bg-teal-50 transition-all group">
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-teal-200 transition-colors">
                <TrendingUp className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Business Courses</h3>
              <p className="text-sm text-gray-600">Marketing, Management, Finance</p>
            </div>
          </button>

          <button className="p-6 border-2 border-orange-200 rounded-xl hover:border-orange-400 hover:bg-orange-50 transition-all group">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                <Target className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Personal Development</h3>
              <p className="text-sm text-gray-600">Communication, Time Management, Wellness</p>
            </div>
          </button>
        </div>
      </div>

      {/* Current Courses */}
      {enrolledCourses.length > 0 && (
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Continue Learning</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => (
              <div key={course.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
                <h3 className="font-semibold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{course.instructor}</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${user?.progress?.[course.id] || 0}%` }}
                  ></div>
                </div>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Continue Course
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommended Courses */}
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended for You</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendations.map((course) => (
            <div key={course.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-32 object-cover rounded-lg mb-4"
              />
              <h3 className="font-semibold text-gray-900 mb-2">{course.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{course.instructor}</p>
              <p className="text-sm text-gray-500 mb-4">{course.duration}</p>
              <div className="flex items-center justify-between">
                <span className="text-yellow-500 text-sm">★ {course.rating}</span>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Events</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">AI in Modern Development Workshop</h3>
              <p className="text-sm text-gray-600">Feb 15, 2024 at 2:00 PM</p>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Join
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;