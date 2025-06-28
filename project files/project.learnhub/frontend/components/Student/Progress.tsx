import React from 'react';
import { TrendingUp, Target, Award, Calendar, BookOpen, Clock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const ProgressTracking: React.FC = () => {
  const { user } = useAuth();

  const progressData = [
    { month: 'Jan', completed: 2, enrolled: 3 },
    { month: 'Feb', completed: 4, enrolled: 5 },
    { month: 'Mar', completed: 6, enrolled: 7 },
    { month: 'Apr', completed: 8, enrolled: 9 },
    { month: 'May', completed: 10, enrolled: 12 },
    { month: 'Jun', completed: 12, enrolled: 15 }
  ];

  const skillProgress = [
    { skill: 'JavaScript', level: 85, category: 'Programming' },
    { skill: 'Python', level: 78, category: 'Programming' },
    { skill: 'Data Analysis', level: 65, category: 'Data Science' },
    { skill: 'Cloud Computing', level: 72, category: 'Infrastructure' },
    { skill: 'Project Management', level: 90, category: 'Business' }
  ];

  const learningGoals = [
    { goal: 'Complete 5 courses this month', progress: 80, deadline: '2024-02-28' },
    { goal: 'Master JavaScript fundamentals', progress: 95, deadline: '2024-02-15' },
    { goal: 'Build a portfolio project', progress: 45, deadline: '2024-03-15' },
    { goal: 'Get AWS certification', progress: 30, deadline: '2024-04-30' }
  ];

  const getSkillColor = (level: number) => {
    if (level >= 80) return 'bg-green-500';
    if (level >= 60) return 'bg-blue-500';
    if (level >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-blue-500';
    if (progress >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Progress Tracking</h1>
        <p className="text-gray-600">Monitor your learning journey and achievements</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Courses Enrolled</p>
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
              <p className="text-sm text-gray-600">Avg Progress</p>
              <p className="text-2xl font-bold text-gray-900">75%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Study Hours</p>
              <p className="text-2xl font-bold text-gray-900">124</p>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Progress Chart */}
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Learning Progress Over Time</h2>
        <div className="space-y-4">
          {progressData.map((data, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-12 text-sm text-gray-600 font-medium">{data.month}</div>
              <div className="flex-1 flex items-center space-x-2">
                <div className="flex-1 bg-gray-200 rounded-full h-4 relative">
                  <div
                    className="bg-blue-500 h-4 rounded-full"
                    style={{ width: `${(data.enrolled / 15) * 100}%` }}
                  ></div>
                  <div
                    className="bg-green-500 h-4 rounded-full absolute top-0 left-0"
                    style={{ width: `${(data.completed / 15) * 100}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-600 w-20">
                  {data.completed}/{data.enrolled}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center space-x-6 mt-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-gray-600">Enrolled</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-gray-600">Completed</span>
          </div>
        </div>
      </div>

      {/* Skill Development */}
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Skill Development</h2>
        <div className="space-y-6">
          {skillProgress.map((skill, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{skill.skill}</h3>
                  <p className="text-sm text-gray-600">{skill.category}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">{skill.level}%</div>
                  <div className={`text-xs px-2 py-1 rounded-full text-white ${getSkillColor(skill.level)}`}>
                    {skill.level >= 80 ? 'Expert' : skill.level >= 60 ? 'Intermediate' : 'Beginner'}
                  </div>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${getSkillColor(skill.level)}`}
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Goals */}
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Learning Goals</h2>
        <div className="space-y-6">
          {learningGoals.map((goal, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">{goal.goal}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Due: {new Date(goal.deadline).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">{goal.progress}%</div>
                  <div className={`text-xs px-2 py-1 rounded-full text-white ${getProgressColor(goal.progress)}`}>
                    {goal.progress >= 80 ? 'Almost Done' : goal.progress >= 60 ? 'On Track' : 'Behind'}
                  </div>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(goal.progress)}`}
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-yellow-50 rounded-xl">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">First Course Completed</h3>
            <p className="text-sm text-gray-600">Completed your first course on JavaScript fundamentals</p>
          </div>

          <div className="text-center p-6 bg-blue-50 rounded-xl">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Goal Achiever</h3>
            <p className="text-sm text-gray-600">Reached your monthly learning goal</p>
          </div>

          <div className="text-center p-6 bg-green-50 rounded-xl">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Consistent Learner</h3>
            <p className="text-sm text-gray-600">Maintained a 7-day learning streak</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracking;