import React from 'react';
import { Target, Users, Lightbulb, TrendingUp } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            About Learn Hub
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're dedicated to empowering individuals with the skills they need to succeed in today's rapidly evolving world. 
            Our comprehensive platform offers expert-designed courses, interactive workshops, and personalized learning experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img
              src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg"
              alt="Team collaboration"
              className="rounded-2xl shadow-xl w-full h-96 object-cover"
            />
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900">
              Transforming Lives Through Education
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Since our founding, we've been committed to making high-quality education accessible to everyone. 
              Our platform brings together industry experts, innovative teaching methods, and cutting-edge technology 
              to create an unparalleled learning experience.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Whether you're looking to advance your career, switch industries, or simply learn something new, 
              our diverse course catalog and supportive community are here to guide you every step of the way.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center p-6 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full mb-4">
              <Target className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">Mission Driven</h4>
            <p className="text-gray-600">
              Empowering learners worldwide with practical skills for career growth and personal development.
            </p>
          </div>

          <div className="text-center p-6 bg-teal-50 rounded-xl hover:bg-teal-100 transition-colors">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-600 text-white rounded-full mb-4">
              <Users className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">Expert Instructors</h4>
            <p className="text-gray-600">
              Learn from industry professionals with years of real-world experience and proven track records.
            </p>
          </div>

          <div className="text-center p-6 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-600 text-white rounded-full mb-4">
              <Lightbulb className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">Innovation First</h4>
            <p className="text-gray-600">
              Cutting-edge learning technologies and methodologies to ensure effective skill development.
            </p>
          </div>

          <div className="text-center p-6 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 text-white rounded-full mb-4">
              <TrendingUp className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">Proven Results</h4>
            <p className="text-gray-600">
              Track record of success with over 95% of our graduates advancing in their careers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;