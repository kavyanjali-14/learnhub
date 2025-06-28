import React from 'react';
import { Mail } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions about our courses or need help getting started? We're here to help you on your learning journey.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-6">
              <Mail className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h3>
            <p className="text-gray-600 mb-6">
              For any inquiries or support, please reach out to us:
            </p>
            <a 
              href="mailto:1524.skavyanjali@gmail.com"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
            >
              <Mail className="w-5 h-5 mr-2" />
              1524.skavyanjali@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;