import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { useData } from '../../context/DataContext';

const Footer = () => {
  const { categories, siteSettings } = useData();

  const LOGO_URL = siteSettings.logo || "https://customer-assets.emergentagent.com/job_70b8c44d-b0eb-46ab-b798-c90870274405/artifacts/5olvlaa7_WhatsApp%20Image%202025-12-26%20at%2013.46.33.jpeg";
  const callLink = `tel:+91${siteSettings.phone}`;

  // Social media links from settings
  const socialLinks = [
    { icon: Facebook, link: siteSettings.facebookLink, label: 'Facebook' },
    { icon: Instagram, link: siteSettings.instagramLink, label: 'Instagram' },
    { icon: Twitter, link: siteSettings.twitterLink, label: 'Twitter' },
    { icon: Youtube, link: siteSettings.youtubeLink, label: 'YouTube' }
  ].filter(social => social.link); // Only show links that are configured

  return (
    <footer className="bg-[#689F38] text-white" id="contact">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img 
                src={LOGO_URL} 
                alt={siteSettings.businessName} 
                className="h-16 w-16 rounded-full object-cover border-2 border-white"
              />
              <div>
                <h2 className="text-xl font-bold">{siteSettings.businessName}</h2>
                <p className="text-[#C1E899] italic text-sm">{siteSettings.slogan}</p>
              </div>
            </Link>
            <p className="text-[#e8f5e0] text-sm leading-relaxed mb-4">
              Premium quality dry fruits, nuts, and seeds delivered to your doorstep. 
              We ensure freshness and quality in every pack.
            </p>
            {socialLinks.length > 0 && (
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a 
                    key={index}
                    href={social.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-[#7CB342] hover:bg-[#8BC34A] rounded-full flex items-center justify-center transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#C1E899]">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-[#e8f5e0] hover:text-white transition-colors text-sm">Home</Link>
              </li>
              <li>
                <Link to="/bulk-order" className="text-[#e8f5e0] hover:text-white transition-colors text-sm">Bulk Order</Link>
              </li>
              <li>
                <Link to="/career" className="text-[#e8f5e0] hover:text-white transition-colors text-sm">Career</Link>
              </li>
              <li>
                <Link to="/about" className="text-[#e8f5e0] hover:text-white transition-colors text-sm">About Us</Link>
              </li>
              <li>
                <a href="#contact" className="text-[#e8f5e0] hover:text-white transition-colors text-sm">Contact Us</a>
              </li>
            </ul>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#C1E899]">Shop</h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link 
                    to={`/products?category=${cat.slug}`} 
                    className="text-[#e8f5e0] hover:text-white transition-colors text-sm"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#C1E899]">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#C1E899] mt-0.5" />
                <div>
                  <p className="text-sm text-[#C1E899]">Call us</p>
                  <a href={callLink} className="text-white hover:text-[#C1E899] transition-colors">
                    +91 {siteSettings.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#C1E899] mt-0.5" />
                <div>
                  <p className="text-sm text-[#C1E899]">Email us</p>
                  <a href={`mailto:${siteSettings.email}`} className="text-white hover:text-[#C1E899] transition-colors">
                    {siteSettings.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#C1E899] mt-0.5" />
                <div>
                  <p className="text-sm text-[#C1E899]">Visit us</p>
                  <p className="text-white text-sm">{siteSettings.address}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#7CB342]">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#C1E899] text-sm">
              © 2025 {siteSettings.businessName}. All rights reserved.
            </p>
            <p className="text-[#C1E899] text-sm">
              Designed and hosted by{' '}
              <a 
                href="https://statell.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-[#C1E899] transition-colors"
              >
                Statell Marketing
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
