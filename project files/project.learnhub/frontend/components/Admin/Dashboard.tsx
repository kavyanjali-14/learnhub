import React from 'react';
import { Users, BookOpen, MessageSquare, TrendingUp, UserPlus, Award, Calendar, Activity } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();

  // Get user statistics from localStorage
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const totalUsers = users.length;
  const studentCount = users.filter((u: any) => u.role === 'student').length;
  const teacherCount = users.filter((u: any) => u.role === 'teacher').length;
  const adminCount = users.filter((u: any) => u.role === 'admin').length;

  const stats = [
    { label: 'Total Users', value: totalUsers.toString(), icon: Users, color: 'blue', change: '+12%' },
    { label: 'Students', value: studentCount.toString(), icon: UserPlus, color: 'green', change: '+8%' },
    { label: 'Teachers', value: teacherCount.toString(), icon: Award, color: 'orange', change: '+5%' },
    { label: 'Active Courses', value: '24', icon: BookOpen, color: 'purple', change: '+15%' }
  ];

  const recentActivity = [
    { type: 'user_signup', user: 'John Doe', action: 'signed up as Student', time: '2 hours ago' },
    { type: 'course_enrollment', user: 'Sarah Wilson', action: 'enrolled in Python Programming', time: '4 hours ago' },
    { type: 'teacher_signup', user: 'Dr. Michael Chen', action: 'signed up as Teacher', time: '6 hours ago' },
    { type: 'course_completion', user: 'Mike Johnson', action: 'completed JavaScript Fundamentals', time: '1 day ago' },
    { type: 'workshop_scheduled', user: 'System', action: 'scheduled AI Workshop for Feb 15', time: '2 days ago' }
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

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user_signup': return <UserPlus className="w-4 h-4 text-green-600" />;
      case 'course_enrollment': return <BookOpen className="w-4 h-4 text-blue-600" />;
      case 'teacher_signup': return <Award className="w-4 h-4 text-orange-600" />;
      case 'course_completion': return <TrendingUp className="w-4 h-4 text-purple-600" />;
      case 'workshop_scheduled': return <Calendar className="w-4 h-4 text-teal-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-purple-100 text-lg">
          Here's what's happening with your platform today.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${getColorClasses(stat.color)}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-green-600 text-sm font-medium">{stat.change}</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Distribution */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">User Distribution</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700">Students</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-900 font-semibold">{studentCount}</span>
                <span className="text-gray-500">({totalUsers > 0 ? Math.round((studentCount / totalUsers) * 100) : 0}%)</span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${totalUsers > 0 ? (studentCount / totalUsers) * 100 : 0}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                <span className="text-gray-700">Teachers</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-900 font-semibold">{teacherCount}</span>
                <span className="text-gray-500">({totalUsers > 0 ? Math.round((teacherCount / totalUsers) * 100) : 0}%)</span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-orange-500 h-2 rounded-full"
                style={{ width: `${totalUsers > 0 ? (teacherCount / totalUsers) * 100 : 0}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                <span className="text-gray-700">Admins</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-900 font-semibold">{adminCount}</span>
                <span className="text-gray-500">({totalUsers > 0 ? Math.round((adminCount / totalUsers) * 100) : 0}%)</span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-500 h-2 rounded-full"
                style={{ width: `${totalUsers > 0 ? (adminCount / totalUsers) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0 mt-1">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 text-sm">
                    <span className="font-medium">{activity.user}</span> {activity.action}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Platform Metrics */}
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Platform Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-blue-50 rounded-xl">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-2">24</div>
            <div className="text-gray-600">Active Courses</div>
          </div>

          <div className="text-center p-6 bg-green-50 rounded-xl">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-2">1,247</div>
            <div className="text-gray-600">Total Enrollments</div>
          </div>

          <div className="text-center p-6 bg-orange-50 rounded-xl">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-8 h-8 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-2">89</div>
            <div className="text-gray-600">Active Discussions</div>
          </div>

          <div className="text-center p-6 bg-purple-50 rounded-xl">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-2">456</div>
            <div className="text-gray-600">Certificates Issued</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="p-4 border-2 border-purple-200 rounded-xl hover:border-purple-400 hover:bg-purple-50 transition-all text-center">
            <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <span className="text-gray-900 font-medium">Manage Users</span>
          </button>
          
          <button className="p-4 border-2 border-blue-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all text-center">
            <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <span className="text-gray-900 font-medium">Course Analytics</span>
          </button>
          
          <button className="p-4 border-2 border-green-200 rounded-xl hover:border-green-400 hover:bg-green-50 transition-all text-center">
            <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <span className="text-gray-900 font-medium">View Reports</span>
          </button>
          
          <button className="p-4 border-2 border-orange-200 rounded-xl hover:border-orange-400 hover:bg-orange-50 transition-all text-center">
            <MessageSquare className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <span className="text-gray-900 font-medium">System Messages</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;