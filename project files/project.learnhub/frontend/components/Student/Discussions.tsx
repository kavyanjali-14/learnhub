import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, User, Search, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Message } from '../../types';

const StudentDiscussions: React.FC = () => {
  const { user } = useAuth();
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);

  const courses = [
    'Python Programming',
    'Java Programming',
    'JavaScript Programming',
    'Data Science',
    'Machine Learning',
    'AWS Cloud Computing',
    'Digital Marketing',
    'Project Management',
    'Time Management',
    'Effective Communication'
  ];

  useEffect(() => {
    // Load teachers from users
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const teacherUsers = users.filter((u: any) => u.role === 'teacher');
    setTeachers(teacherUsers);

    // Load existing messages
    const existingMessages = JSON.parse(localStorage.getItem('discussions') || '[]');
    const userMessages = existingMessages.filter((msg: Message) => 
      msg.studentId === user?.id
    );
    setMessages(userMessages);
  }, [user?.id]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !selectedTeacher || !selectedCourse) return;

    const teacher = teachers.find(t => t.id === selectedTeacher);
    
    const newMessage: Message = {
      id: Date.now().toString(),
      studentId: user?.id || '',
      teacherId: selectedTeacher,
      content: messageText,
      timestamp: new Date().toISOString(),
      course: selectedCourse,
      studentName: user?.name || '',
      teacherName: teacher?.name || '',
      isSolved: false
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setMessageText('');
    
    // Store in localStorage
    const existingMessages = JSON.parse(localStorage.getItem('discussions') || '[]');
    localStorage.setItem('discussions', JSON.stringify([...existingMessages, newMessage]));
  };

  const handleMarkSolved = (messageId: string) => {
    const updatedMessages = messages.map(msg => 
      msg.id === messageId ? { ...msg, isSolved: true } : msg
    );
    setMessages(updatedMessages);

    // Update in localStorage
    const allMessages = JSON.parse(localStorage.getItem('discussions') || '[]');
    const updatedAllMessages = allMessages.map((msg: Message) => 
      msg.id === messageId ? { ...msg, isSolved: true } : msg
    );
    localStorage.setItem('discussions', JSON.stringify(updatedAllMessages));
  };

  // Refresh messages to get teacher responses
  const refreshMessages = () => {
    const existingMessages = JSON.parse(localStorage.getItem('discussions') || '[]');
    const userMessages = existingMessages.filter((msg: Message) => 
      msg.studentId === user?.id
    );
    setMessages(userMessages);
  };

  useEffect(() => {
    const interval = setInterval(refreshMessages, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, [user?.id]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Discussion Board</h1>
        <p className="text-gray-600">Ask questions and get help from expert instructors</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* New Message Form */}
        <div className="lg:col-span-2">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Ask a Question</h2>
            
            <form onSubmit={handleSendMessage} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Course
                </label>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Choose a course...</option>
                  {courses.map((course) => (
                    <option key={course} value={course}>{course}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Instructor
                </label>
                <select
                  value={selectedTeacher}
                  onChange={(e) => setSelectedTeacher(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Choose an instructor...</option>
                  {teachers.map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Question
                </label>
                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Describe your question or problem in detail..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>Send Question</span>
              </button>
            </form>
          </div>
        </div>

        {/* Available Teachers */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Instructors</h3>
            <div className="space-y-4">
              {teachers.map((teacher) => (
                <div key={teacher.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{teacher.name}</div>
                    <div className="text-sm text-gray-600">{teacher.email}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Discussion Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Your Questions:</span>
                <span className="font-semibold text-gray-900">{messages.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Solved:</span>
                <span className="font-semibold text-green-600">{messages.filter(m => m.isSolved).length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pending:</span>
                <span className="font-semibold text-orange-600">{messages.filter(m => !m.isSolved && !m.response).length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Message History */}
      {messages.length > 0 && (
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Questions</h2>
          <div className="space-y-6">
            {messages.map((message) => (
              <div key={message.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">To: {message.teacherName}</div>
                      <div className="text-sm text-gray-600">Course: {message.course}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{new Date(message.timestamp).toLocaleDateString()}</span>
                    </div>
                    {message.isSolved ? (
                      <div className="flex items-center space-x-1 text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">Solved</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-1 text-orange-600">
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          {message.response ? 'Answered' : 'Pending'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Your Question:</h4>
                  <p className="text-gray-700">{message.content}</p>
                </div>

                {message.response && (
                  <div className="bg-blue-50 p-4 rounded-lg mb-4">
                    <h4 className="font-medium text-blue-900 mb-2">Teacher's Response:</h4>
                    <p className="text-blue-800">{message.response}</p>
                    {message.responseTimestamp && (
                      <p className="text-xs text-blue-600 mt-2">
                        Responded on {new Date(message.responseTimestamp).toLocaleString()}
                      </p>
                    )}
                  </div>
                )}

                {message.response && !message.isSolved && (
                  <button
                    onClick={() => handleMarkSolved(message.id)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center space-x-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Mark as Solved</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDiscussions;