import React from 'react';
import { Target, Eye, Heart, Award, Users, Leaf, Shield, Truck } from 'lucide-react';
import { useData } from '../context/DataContext';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const AboutUs = () => {
  const { siteSettings } = useData();

  // Icon mapping for values
  const iconMap = {
    'Quality First': Heart,
    'Natural & Pure': Leaf,
    'Trust & Transparency': Shield,
    'Fresh Delivery': Truck,
  };

  // Default values with fallbacks from settings
  const values = (siteSettings.aboutValues || [
    { title: 'Quality First', desc: 'We source only the finest dry fruits from trusted farms across the globe.' },
    { title: 'Natural & Pure', desc: 'No artificial additives, preservatives, or chemicals in our products.' },
    { title: 'Trust & Transparency', desc: 'Honest pricing and complete transparency in our business practices.' },
    { title: 'Fresh Delivery', desc: 'Carefully packed and delivered fresh to your doorstep.' }
  ]).map((value, index) => ({
    ...value,
    icon: iconMap[value.title] || [Heart, Leaf, Shield, Truck][index % 4]
  }));

  const stats = siteSettings.aboutStats || [
    { number: '10+', label: 'Years of Experience' },
    { number: '50K+', label: 'Happy Customers' },
    { number: '100+', label: 'Premium Products' },
    { number: '500+', label: 'Cities Served' }
  ];

  const team = siteSettings.aboutWhyChooseUs || [
    { name: 'Quality Assurance', desc: 'Every product goes through strict quality checks before reaching you.' },
    { name: 'Customer Support', desc: 'Dedicated team to assist you with any queries or concerns.' },
    { name: 'Logistics', desc: 'Efficient delivery network ensuring timely and safe delivery.' }
  ];

  const storyParagraphs = siteSettings.aboutStoryParagraphs || [
    `${siteSettings.businessName} was born from a simple belief – everyone deserves access to pure, high-quality dry fruits at fair prices. What started as a small family business has grown into a trusted name in the dry fruits industry.`,
    'We work directly with farmers and suppliers to bring you the freshest products without any middlemen. Our commitment to quality and customer satisfaction has helped us build lasting relationships with thousands of families across India.',
    'Today, we continue our journey with the same passion and dedication, bringing health and happiness to every household through our carefully curated selection of dry fruits, nuts, seeds, and berries.'
  ];

  const visionText = siteSettings.aboutVision || "To be India's most trusted and preferred destination for premium dry fruits, making healthy eating accessible and affordable for every household. We envision a future where quality nutrition is not a luxury but a way of life for all.";
  
  const visionPoints = siteSettings.aboutVisionPoints || [
    'Be the #1 dry fruits brand in India',
    'Reach every corner of the country',
    'Promote healthy living through quality products'
  ];

  const missionText = siteSettings.aboutMission || "To deliver the finest quality dry fruits sourced directly from farms, ensuring freshness, purity, and value for our customers. We are committed to ethical sourcing, sustainable practices, and exceptional customer service.";
  
  const missionPoints = siteSettings.aboutMissionPoints || [
    'Source directly from trusted farmers',
    'Maintain highest quality standards',
    'Provide excellent customer experience'
  ];

  const storyImage = siteSettings.aboutStoryImage || 'https://images.unsplash.com/photo-1596591868264-6d8f43c0e648?w=600';
  const heroSubtitle = siteSettings.aboutHeroSubtitle || 'Your trusted partner for premium quality dry fruits, nuts, and seeds since 2014.';

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <div className="bg-emerald-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About {siteSettings.businessName}</h1>
            <p className="text-lg text-emerald-200 max-w-2xl mx-auto">
              {heroSubtitle}
            </p>
          </div>
        </div>

        {/* Our Story */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
                <div className="space-y-4 text-gray-600">
                  {storyParagraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
              <div className="bg-emerald-50 rounded-2xl p-8">
                <img 
                  src={storyImage} 
                  alt="Premium Dry Fruits" 
                  className="w-full h-64 object-cover rounded-xl mb-6"
                />
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl font-bold text-emerald-600">{stat.number}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-16 bg-gradient-to-b from-emerald-50 to-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Vision */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                  <Eye className="w-8 h-8 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h2>
                <p className="text-gray-600 leading-relaxed">
                  {visionText}
                </p>
                <ul className="mt-4 space-y-2">
                  {visionPoints.map((point, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-600">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mission */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
                <p className="text-gray-600 leading-relaxed">
                  {missionText}
                </p>
                <ul className="mt-4 space-y-2">
                  {missionPoints.map((point, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-600">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Our Core Values</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-600">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-emerald-600 text-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose {siteSettings.businessName}?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((item, index) => (
                <div key={index} className="bg-[#4d2f20] rounded-xl p-6">
                  <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center mb-4">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                  <p className="text-emerald-200">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-emerald-50">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Get in Touch</h2>
            <p className="text-gray-600 mb-8">
              Have questions or want to know more about us? We'd love to hear from you!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href={`tel:+91${siteSettings.phone}`}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Call Us: {siteSettings.phone}
              </a>
              <a 
                href={`mailto:${siteSettings.email}`}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Email Us
              </a>
            </div>
            <div className="mt-8 text-gray-600">
              <p className="font-medium">{siteSettings.businessName}</p>
              <p>{siteSettings.address}</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
