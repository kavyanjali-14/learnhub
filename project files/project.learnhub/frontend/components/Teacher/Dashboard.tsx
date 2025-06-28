import React from 'react';
import { BookOpen, Users, MessageSquare, TrendingUp, Calendar, Award } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const TeacherDashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'Active Courses', value: '8', icon: BookOpen, color: 'blue' },
    { label: 'Total Students', value: '342', icon: Users, color: 'green' },
    { label: 'Pending Messages', value: '12', icon: MessageSquare, color: 'orange' },
    { label: 'Course Rating', value: '4.8', icon: Award, color: 'purple' }
  ];

  const recentMessages = [
    {
      id: '1',
      student: 'John Doe',
      course: 'JavaScript Programming',
      message: 'I need help with async/await concepts...',
      time: '2 hours ago'
    },
    {
      id: '2',
      student: 'Sarah Wilson',
      course: 'Python Programming',
      message: 'Can you explain list comprehensions?',
      time: '4 hours ago'
    },
    {
      id: '3',
      student: 'Mike Johnson',
      course: 'Data Science',
      message: 'Having trouble with pandas DataFrames...',
      time: '1 day ago'
    }
  ];

  const upcomingWorkshops = [
    {
      id: '1',
      title: 'Advanced JavaScript Patterns',
      date: '2024-02-15',
      time: '14:00',
      students: 45
    },
    {
      id: '2',
      title: 'Python for Data Analysis',
      date: '2024-02-18',
      time: '16:00',
      students: 32
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      orange: 'bg-orange-100 text-orange-600',
      purple: 'bg-purple-100 text-purple-600'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-700 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-teal-100 text-lg">
          Ready to inspire and educate your students today?
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className={`p-3 rounded-lg ${getColorClasses(stat.color)}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Messages */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Messages</h2>
            <button className="text-teal-600 hover:text-teal-700 font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentMessages.map((message) => (
              <div key={message.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{message.student}</h3>
                    <p className="text-sm text-gray-600">{message.course}</p>
                  </div>
                  <span className="text-xs text-gray-500">{message.time}</span>
                </div>
                <p className="text-gray-700 text-sm">{message.message}</p>
                <button className="mt-2 text-teal-600 hover:text-teal-700 text-sm font-medium">
                  Reply
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Workshops */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Upcoming Workshops</h2>
            <button className="text-teal-600 hover:text-teal-700 font-medium">
              Schedule New
            </button>
          </div>
          <div className="space-y-4">
            {upcomingWorkshops.map((workshop) => (
              <div key={workshop.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">{workshop.title}</h3>
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Users className="w-4 h-4" />
                    <span>{workshop.students}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(workshop.date).toLocaleDateString()}</span>
                  </div>
                  <span>{workshop.time}</span>
                </div>
                <button className="mt-3 w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors">
                  Manage Workshop
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Course Performance */}
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-blue-50 rounded-xl">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-2">94%</div>
            <div className="text-gray-600">Completion Rate</div>
          </div>

          <div className="text-center p-6 bg-green-50 rounded-xl">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-2">4.8</div>
            <div className="text-gray-600">Average Rating</div>
          </div>

          <div className="text-center p-6 bg-orange-50 rounded-xl">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-2">1,247</div>
            <div className="text-gray-600">Total Enrollments</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="p-4 border-2 border-teal-200 rounded-xl hover:border-teal-400 hover:bg-teal-50 transition-all text-center">
            <BookOpen className="w-8 h-8 text-teal-600 mx-auto mb-2" />
            <span className="text-gray-900 font-medium">Create Course</span>
          </button>
          
          <button className="p-4 border-2 border-blue-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all text-center">
            <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <span className="text-gray-900 font-medium">Schedule Workshop</span>
          </button>
          
          <button className="p-4 border-2 border-orange-200 rounded-xl hover:border-orange-400 hover:bg-orange-50 transition-all text-center">
            <MessageSquare className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <span className="text-gray-900 font-medium">View Messages</span>
          </button>
          
          <button className="p-4 border-2 border-purple-200 rounded-xl hover:border-purple-400 hover:bg-purple-50 transition-all text-center">
            <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <span className="text-gray-900 font-medium">View Analytics</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;