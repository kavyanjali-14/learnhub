import React, { useState, useEffect } from 'react';
import { MessageSquare, Reply, Clock, User, Search, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Message } from '../../types';

const TeacherCommunications: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadMessages();
  }, [user?.id]);

  const loadMessages = () => {
    const allMessages = JSON.parse(localStorage.getItem('discussions') || '[]');
    // Filter messages for this teacher
    const teacherMessages = allMessages.filter((msg: Message) => 
      msg.teacherId === user?.id
    );
    setMessages(teacherMessages);
  };

  const handleReply = (messageId: string, reply: string) => {
    if (!reply.trim()) return;

    const updatedMessages = messages.map(msg => 
      msg.id === messageId 
        ? { 
            ...msg, 
            response: reply, 
            responseTimestamp: new Date().toISOString() 
          } 
        : msg
    );
    setMessages(updatedMessages);

    // Update in localStorage
    const allMessages = JSON.parse(localStorage.getItem('discussions') || '[]');
    const updatedAllMessages = allMessages.map((msg: Message) => 
      msg.id === messageId 
        ? { 
            ...msg, 
            response: reply, 
            responseTimestamp: new Date().toISOString() 
          } 
        : msg
    );
    localStorage.setItem('discussions', JSON.stringify(updatedAllMessages));

    setSelectedMessage(null);
    alert('Reply sent successfully!');
  };

  const filteredMessages = messages.filter(message =>
    message.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const MessageDetail = ({ message }: { message: Message }) => {
    const [replyText, setReplyText] = useState('');
    
    const handleSendReply = () => {
      if (!replyText.trim()) return;
      handleReply(message.id, replyText);
      setReplyText('');
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Student Message</h2>
              <button
                onClick={() => setSelectedMessage(null)}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{message.studentName}</h3>
                  <p className="text-sm text-gray-600">{message.course}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
                <Clock className="w-4 h-4" />
                <span>{new Date(message.timestamp).toLocaleString()}</span>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">{message.content}</p>
              </div>
            </div>

            {message.response ? (
              <div className="bg-green-50 p-4 rounded-lg mb-4">
                <h4 className="font-semibold text-green-900 mb-2">Your Response:</h4>
                <p className="text-green-800">{message.response}</p>
                <p className="text-xs text-green-600 mt-2">
                  Sent on {new Date(message.responseTimestamp!).toLocaleString()}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Reply to Student</h4>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none text-base leading-relaxed"
                  placeholder="Type your detailed reply here..."
                  style={{ minHeight: '150px' }}
                />
                <div className="flex space-x-3">
                  <button
                    onClick={handleSendReply}
                    disabled={!replyText.trim()}
                    className="flex-1 bg-teal-600 text-white py-3 px-4 rounded-lg hover:bg-teal-700 transition-colors font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Reply className="w-5 h-5" />
                    <span>Send Reply</span>
                  </button>
                  <button
                    onClick={() => setSelectedMessage(null)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Communications</h1>
        <p className="text-gray-600">Manage student messages and provide support</p>
      </div>

      {/* Search and Stats */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{messages.length}</div>
              <div className="text-gray-600">Total Messages</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {messages.filter(m => !m.response).length}
              </div>
              <div className="text-gray-600">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {messages.filter(m => m.isSolved).length}
              </div>
              <div className="text-gray-600">Solved</div>
            </div>
          </div>
        </div>
      </div>

      {/* Messages List */}
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Student Messages</h2>
        
        {filteredMessages.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Messages Found</h3>
            <p className="text-gray-600">
              {searchTerm ? 'No messages match your search criteria.' : 'You have no student messages at the moment.'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedMessage(message)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{message.studentName}</h3>
                      <p className="text-sm text-gray-600">{message.course}</p>
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
                    ) : message.response ? (
                      <div className="flex items-center space-x-1 text-blue-600">
                        <Reply className="w-4 h-4" />
                        <span className="text-sm font-medium">Answered</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-1 text-orange-600">
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">Pending</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <p className="text-gray-700 line-clamp-3">{message.content}</p>
                </div>
                
                {!message.response && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedMessage(message);
                    }}
                    className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium flex items-center space-x-2"
                  >
                    <Reply className="w-4 h-4" />
                    <span>Reply</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedMessage && <MessageDetail message={selectedMessage} />}
    </div>
  );
};

export default TeacherCommunications;