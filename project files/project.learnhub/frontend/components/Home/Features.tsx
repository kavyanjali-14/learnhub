import React from 'react';
import { Smartphone, Globe, Shield, Headphones } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: Smartphone,
      title: 'Mobile Learning',
      description: 'Learn on-the-go with our responsive platform optimized for all devices.'
    },
    {
      icon: Globe,
      title: 'Global Access',
      description: 'Access courses from anywhere in the world with our cloud-based platform.'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data and learning progress are protected with enterprise-grade security.'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Get help whenever you need it with our dedicated support team.'
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Platform Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience learning like never before with our advanced features and user-friendly interface.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg"
              alt="Learning platform interface"
              className="rounded-2xl shadow-xl w-full h-96 object-cover"
            />
          </div>
          <div className="space-y-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-lg">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;