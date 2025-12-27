import React from 'react';
import { Mail, Heart, TrendingUp, Users, Award, Briefcase, Send } from 'lucide-react';
import { useData } from '../context/DataContext';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const Career = () => {
  const { siteSettings } = useData();
  const careerEmail = siteSettings.careerEmail || siteSettings.email || 'careers@dryfruto.com';

  const benefits = [
    { icon: Heart, title: 'Health Benefits', desc: 'Comprehensive health insurance for you and family' },
    { icon: TrendingUp, title: 'Growth Opportunities', desc: 'Clear career progression paths' },
    { icon: Users, title: 'Great Team', desc: 'Work with passionate professionals' },
    { icon: Award, title: 'Recognition', desc: 'Performance bonuses and rewards' }
  ];

  const departments = [
    'Sales & Marketing',
    'Operations & Logistics',
    'Store Management',
    'Digital Marketing',
    'Customer Support',
    'Administration'
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <div className="bg-emerald-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Our Team</h1>
            <p className="text-lg text-emerald-200 max-w-2xl mx-auto">
              Be a part of our growing family. We're looking for passionate individuals who share our love for quality and customer satisfaction.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-b from-emerald-50 to-white">
          <div className="max-w-7xl mx-auto px-4 py-12">
            {/* Why Join Us */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Why Work With Us?</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-sm text-center">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <benefit.icon className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-1">{benefit.title}</h3>
                    <p className="text-sm text-gray-600">{benefit.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Career Opportunities */}
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Briefcase className="w-8 h-8 text-emerald-600" />
                </div>
                
                <h2 className="text-2xl font-bold text-gray-800 mb-4">We're Always Looking for Talent!</h2>
                <p className="text-gray-600 mb-6">
                  We have opportunities across various departments. If you're passionate about quality products and excellent customer service, we'd love to hear from you.
                </p>

                {/* Departments */}
                <div className="mb-8">
                  <h3 className="font-semibold text-gray-700 mb-3">Departments we hire for:</h3>
                  <div className="flex flex-wrap justify-center gap-2">
                    {departments.map((dept, index) => (
                      <span key={index} className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm">
                        {dept}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Call to Action */}
                <div className="bg-emerald-50 rounded-xl p-6">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <Mail className="w-5 h-5 text-emerald-600" />
                    <span className="font-semibold text-gray-800">Send Your Resume</span>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Email your resume with a brief introduction about yourself and the role you're interested in.
                  </p>
                  <a
                    href={`mailto:${careerEmail}?subject=Job Application`}
                    className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                  >
                    <Send className="w-5 h-5" />
                    {careerEmail}
                  </a>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-8 text-center text-gray-600">
                <p className="text-sm">
                  We review all applications and will get back to you within 5-7 business days if your profile matches our requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Career;
