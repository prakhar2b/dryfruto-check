import React, { useState } from 'react';
import { Mail, Send } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <section className="py-16 relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=1920&h=600&fit=crop)` 
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/95 to-emerald-800/90" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <p className="text-emerald-300 font-medium mb-2">Want to offer regularly?</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Subscribe Our Newsletter for Daily Updates
          </h2>
          <p className="text-emerald-100 mb-8">
            Get the latest updates on new products, special offers, and health tips delivered straight to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <div className="relative flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 backdrop-blur-sm"
                required
              />
            </div>
            <button
              type="submit"
              className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-full transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
            >
              {subscribed ? 'Subscribed!' : 'Subscribe'}
              <Send className="w-5 h-5" />
            </button>
          </form>

          {subscribed && (
            <p className="mt-4 text-green-400 font-medium animate-pulse">
              Thank you for subscribing! 
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
