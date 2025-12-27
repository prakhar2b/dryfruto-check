import React from 'react';
import { Truck, Shield, RefreshCcw, Headphones } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Premium Quality',
    description: '100% Quality Guarantee'
  },
  {
    icon: Truck,
    title: 'Swift Shipping',
    description: 'Delivering across India'
  },
  {
    icon: RefreshCcw,
    title: 'Easy Return',
    description: 'Refer return policy'
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Support every time'
  }
];

const Features = () => {
  return (
    <section className="py-12 bg-emerald-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <feature.icon className="w-8 h-8 text-emerald-700" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">{feature.title}</h3>
              <p className="text-sm text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
