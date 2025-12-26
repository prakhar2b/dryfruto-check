import React from 'react';
import { Briefcase, MapPin, Clock, ArrowRight, Users, Heart, TrendingUp, Award } from 'lucide-react';
import { useData } from '../context/DataContext';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const Career = () => {
  const { siteSettings } = useData();
  const whatsappLink = siteSettings.whatsappLink || `https://wa.me/91${siteSettings.phone}`;

  const benefits = [
    { icon: Heart, title: 'Health Benefits', desc: 'Comprehensive health insurance for you and family' },
    { icon: TrendingUp, title: 'Growth Opportunities', desc: 'Clear career progression paths' },
    { icon: Users, title: 'Great Team', desc: 'Work with passionate professionals' },
    { icon: Award, title: 'Recognition', desc: 'Performance bonuses and rewards' }
  ];

  const openPositions = [
    {
      title: 'Sales Executive',
      location: 'Delhi NCR',
      type: 'Full-time',
      experience: '1-3 years',
      description: 'Looking for enthusiastic sales professionals to expand our retail network.'
    },
    {
      title: 'Delivery Partner',
      location: 'Multiple Cities',
      type: 'Full-time',
      experience: 'Freshers welcome',
      description: 'Join our delivery team and ensure timely delivery of premium products.'
    },
    {
      title: 'Store Manager',
      location: 'Delhi',
      type: 'Full-time',
      experience: '3-5 years',
      description: 'Manage store operations, inventory, and lead a team of associates.'
    },
    {
      title: 'Digital Marketing Executive',
      location: 'Remote',
      type: 'Full-time',
      experience: '2-4 years',
      description: 'Drive our online presence through social media and digital campaigns.'
    }
  ];

  const handleApply = (position) => {
    const message = `Hi, I would like to apply for the position of ${position.title}.\n\nLocation: ${position.location}\nType: ${position.type}\n\nPlease let me know the next steps.`;
    window.open(`${whatsappLink}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <div className="bg-[#3d2518] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Our Team</h1>
            <p className="text-lg text-amber-200 max-w-2xl mx-auto">
              Be a part of our growing family. We're looking for passionate individuals who share our love for quality and customer satisfaction.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-b from-amber-50 to-white">
          <div className="max-w-7xl mx-auto px-4 py-12">
            {/* Why Join Us */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Why Work With Us?</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-sm text-center">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <benefit.icon className="w-6 h-6 text-amber-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-1">{benefit.title}</h3>
                    <p className="text-sm text-gray-600">{benefit.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Open Positions */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Open Positions</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {openPositions.map((position, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">{position.title}</h3>
                          <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" /> {position.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" /> {position.type}
                            </span>
                            <span className="flex items-center gap-1">
                              <Briefcase className="w-4 h-4" /> {position.experience}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4">{position.description}</p>
                      <button
                        onClick={() => handleApply(position)}
                        className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                      >
                        Apply Now <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* No Position Found */}
            <div className="mt-12 bg-amber-50 rounded-2xl p-8 text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Don't see a suitable position?</h3>
              <p className="text-gray-600 mb-4">Send us your resume and we'll keep you in mind for future opportunities.</p>
              <a
                href={`mailto:${siteSettings.email}?subject=Job Application - General`}
                className="inline-flex items-center gap-2 bg-[#3d2518] hover:bg-[#2d1810] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Send Your Resume
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Career;
