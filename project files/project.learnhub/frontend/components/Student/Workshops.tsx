import React from 'react';
import { Calendar, Clock, User, Video, FileText, Download } from 'lucide-react';
import { workshops } from '../../data/mockData';

const StudentWorkshops: React.FC = () => {
  const upcomingWorkshops = workshops.filter(w => !w.isRecorded);
  const recordedWorkshops = workshops.filter(w => w.isRecorded);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Workshops</h1>
        <p className="text-gray-600">Join live workshops and access recorded sessions</p>
      </div>

      {/* Upcoming Workshops */}
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Workshops</h2>
        <div className="space-y-6">
          {upcomingWorkshops.map((workshop) => (
            <div key={workshop.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{workshop.title}</h3>
                  <p className="text-gray-600 mb-4">{workshop.description}</p>
                  <div className="flex flex-wrap items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(workshop.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{workshop.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>{workshop.instructor}</span>
                    </div>
                  </div>
                </div>
                <div className="lg:ml-6">
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                    Register Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Workshop Recordings */}
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Workshop Recordings</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {recordedWorkshops.map((workshop) => (
            <div key={workshop.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Video className="w-8 h-8 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">{workshop.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{workshop.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500 mb-4">
                    <span>{new Date(workshop.date).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{workshop.instructor}</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Video className="w-4 h-4 text-blue-600" />
                      <a href={workshop.videoUrl} className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        Watch Recording
                      </a>
                    </div>
                    
                    {workshop.slides && (
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-green-600" />
                        <a href={workshop.slides} className="text-green-600 hover:text-green-700 text-sm font-medium">
                          Download Slides
                        </a>
                      </div>
                    )}
                    
                    {workshop.resources && workshop.resources.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Additional Resources:</h4>
                        <ul className="space-y-1">
                          {workshop.resources.map((resource, index) => (
                            <li key={index} className="flex items-center space-x-2">
                              <Download className="w-3 h-3 text-orange-600" />
                              <span className="text-xs text-orange-600 hover:text-orange-700 cursor-pointer">
                                {resource}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Workshop Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-2">{upcomingWorkshops.length}</div>
          <div className="text-gray-600">Upcoming Workshops</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Video className="w-8 h-8 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-2">{recordedWorkshops.length}</div>
          <div className="text-gray-600">Recorded Sessions</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-center">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-orange-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-2">5</div>
          <div className="text-gray-600">Expert Instructors</div>
        </div>
      </div>
    </div>
  );
};

export default StudentWorkshops;