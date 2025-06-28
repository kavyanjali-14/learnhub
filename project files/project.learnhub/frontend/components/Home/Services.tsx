import React from 'react';
import { BookOpen, Video, Users, BarChart3, MessageSquare, Award } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      icon: BookOpen,
      title: 'Expert-Led Courses',
      description: 'Comprehensive courses across technical, business, and personal development domains with industry-recognized certifications.',
      color: 'blue'
    },
    {
      icon: Video,
      title: 'Live Workshops',
      description: 'Interactive workshops with industry experts, featuring real-time Q&A and hands-on learning experiences.',
      color: 'teal'
    },
    {
      icon: Users,
      title: 'Community Learning',
      description: 'Connect with fellow learners, participate in study groups, and build your professional network.',
      color: 'orange'
    },
    {
      icon: BarChart3,
      title: 'Progress Tracking',
      description: 'Advanced analytics to monitor your learning journey, track achievements, and maintain consistency.',
      color: 'purple'
    },
    {
      icon: MessageSquare,
      title: 'Expert Mentorship',
      description: 'One-on-one guidance from industry professionals to accelerate your learning and career growth.',
      color: 'green'
    },
    {
      icon: Award,
      title: 'Skill Assessment',
      description: 'Comprehensive skill evaluations and personalized recommendations for continuous improvement.',
      color: 'red'
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-50 text-blue-600 hover:bg-blue-100',
      teal: 'bg-teal-50 text-teal-600 hover:bg-teal-100',
      orange: 'bg-orange-50 text-orange-600 hover:bg-orange-100',
      purple: 'bg-purple-50 text-purple-600 hover:bg-purple-100',
      green: 'bg-green-50 text-green-600 hover:bg-green-100',
      red: 'bg-red-50 text-red-600 hover:bg-red-100'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive learning solutions designed to meet your educational and professional development needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 transition-colors ${getColorClasses(service.color)}`}>
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white p-8 rounded-2xl shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Why Choose Learn Hub?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
                <div className="text-gray-600">Learning Access</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-600 mb-2">100+</div>
                <div className="text-gray-600">Industry Partners</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">4.8★</div>
                <div className="text-gray-600">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;