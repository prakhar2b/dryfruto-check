import React, { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Create context
const DataContext = createContext();

// Provider component
export const DataProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [heroSlides, setHeroSlides] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [giftBoxes, setGiftBoxes] = useState([]);
  const [siteSettings, setSiteSettings] = useState({
    businessName: 'DryFruto',
    slogan: 'Live With Health',
    logo: '',
    phone: '9870990795',
    email: 'info@dryfruto.com',
    careerEmail: 'careers@dryfruto.com',
    address: '123, Main Street, New Delhi, India',
    whatsappLink: 'https://wa.me/919870990795',
    facebookLink: '',
    instagramLink: '',
    twitterLink: '',
    youtubeLink: '',
    bulkOrderProductTypes: ['Dry Fruits', 'Nuts', 'Seeds', 'Berries', 'Gift Boxes', 'Mixed Products'],
    bulkOrderBenefits: [
      'Direct sourcing from farms ensures freshness',
      'Minimum order quantity: 10 kg',
      'Special rates for orders above 100 kg',
      'Custom packaging with your branding',
      'Regular supply contracts available',
      'Quality testing certificates provided'
    ],
    // About Us Page defaults
    aboutHeroSubtitle: 'Your trusted partner for premium quality dry fruits, nuts, and seeds since 2014.',
    aboutStoryParagraphs: [
      'DryFruto was born from a simple belief – everyone deserves access to pure, high-quality dry fruits at fair prices. What started as a small family business has grown into a trusted name in the dry fruits industry.',
      'We work directly with farmers and suppliers to bring you the freshest products without any middlemen. Our commitment to quality and customer satisfaction has helped us build lasting relationships with thousands of families across India.',
      'Today, we continue our journey with the same passion and dedication, bringing health and happiness to every household through our carefully curated selection of dry fruits, nuts, seeds, and berries.'
    ],
    aboutStoryImage: 'https://images.unsplash.com/photo-1596591868264-6d8f43c0e648?w=600',
    aboutStats: [
      { number: '10+', label: 'Years of Experience' },
      { number: '50K+', label: 'Happy Customers' },
      { number: '100+', label: 'Premium Products' },
      { number: '500+', label: 'Cities Served' }
    ],
    aboutVision: 'To be India\'s most trusted and preferred destination for premium dry fruits, making healthy eating accessible and affordable for every household. We envision a future where quality nutrition is not a luxury but a way of life for all.',
    aboutVisionPoints: [
      'Be the #1 dry fruits brand in India',
      'Reach every corner of the country',
      'Promote healthy living through quality products'
    ],
    aboutMission: 'To deliver the finest quality dry fruits sourced directly from farms, ensuring freshness, purity, and value for our customers. We are committed to ethical sourcing, sustainable practices, and exceptional customer service.',
    aboutMissionPoints: [
      'Source directly from trusted farmers',
      'Maintain highest quality standards',
      'Provide excellent customer experience'
    ],
    aboutValues: [
      { title: 'Quality First', desc: 'We source only the finest dry fruits from trusted farms across the globe.' },
      { title: 'Natural & Pure', desc: 'No artificial additives, preservatives, or chemicals in our products.' },
      { title: 'Trust & Transparency', desc: 'Honest pricing and complete transparency in our business practices.' },
      { title: 'Fresh Delivery', desc: 'Carefully packed and delivered fresh to your doorstep.' }
    ],
    aboutWhyChooseUs: [
      { name: 'Quality Assurance', desc: 'Every product goes through strict quality checks before reaching you.' },
      { name: 'Customer Support', desc: 'Dedicated team to assist you with any queries or concerns.' },
      { name: 'Logistics', desc: 'Efficient delivery network ensuring timely and safe delivery.' }
    ]
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [catRes, prodRes, heroRes, testRes, giftRes, settingsRes] = await Promise.all([
        axios.get(`${API}/categories`).catch(() => ({ data: [] })),
        axios.get(`${API}/products`).catch(() => ({ data: [] })),
        axios.get(`${API}/hero-slides`).catch(() => ({ data: [] })),
        axios.get(`${API}/testimonials`).catch(() => ({ data: [] })),
        axios.get(`${API}/gift-boxes`).catch(() => ({ data: [] })),
        axios.get(`${API}/site-settings`).catch(() => ({ data: {} }))
      ]);

      setCategories(catRes.data);
      setProducts(prodRes.data);
      setHeroSlides(heroRes.data);
      setTestimonials(testRes.data);
      setGiftBoxes(giftRes.data);
      if (settingsRes.data && Object.keys(settingsRes.data).length > 0) {
        setSiteSettings(settingsRes.data);
        // Apply theme CSS variables
        if (settingsRes.data.theme) {
          applyThemeCSS(settingsRes.data.theme);
        }
        // Apply page-specific CSS styles
        if (settingsRes.data.pageStyles) {
          applyPageStyles(settingsRes.data.pageStyles);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Apply page-specific CSS styles
  const applyPageStyles = (pageStyles) => {
    const root = document.documentElement;
    
    // Apply global styles
    if (pageStyles.global) {
      const global = pageStyles.global;
      root.style.setProperty('--header-bg', global.headerBg);
      root.style.setProperty('--header-text', global.headerText);
      root.style.setProperty('--header-nav-hover', global.headerNavHover);
      root.style.setProperty('--footer-bg', global.footerBg);
      root.style.setProperty('--footer-text', global.footerText);
      root.style.setProperty('--footer-link', global.footerLink);
      root.style.setProperty('--color-primary', global.primaryColor);
      root.style.setProperty('--color-accent', global.accentColor);
      root.style.setProperty('--color-accentHover', global.accentHover);
      root.style.setProperty('--color-text', global.textColor);
      root.style.setProperty('--color-textLight', global.textLight);
      root.style.setProperty('--color-background', global.backgroundColor);
      root.style.setProperty('--card-bg', global.cardBg);
      root.style.setProperty('--card-border', global.cardBorder);
      root.style.setProperty('--btn-radius', global.buttonRadius);
    }
    
    // Apply page-specific styles as CSS variables
    Object.entries(pageStyles).forEach(([page, styles]) => {
      if (page !== 'global' && styles) {
        Object.entries(styles).forEach(([key, value]) => {
          root.style.setProperty(`--${page}-${key}`, value);
        });
      }
    });
  };

  // Apply theme CSS variables to document
  const applyThemeCSS = (theme) => {
    const root = document.documentElement;
    
    if (theme.colors) {
      Object.entries(theme.colors).forEach(([key, value]) => {
        root.style.setProperty(`--color-${key}`, value);
      });
    }
    
    if (theme.typography) {
      root.style.setProperty('--font-family', theme.typography.fontFamily);
      root.style.setProperty('--heading-font', theme.typography.headingFont);
      root.style.setProperty('--base-font-size', theme.typography.baseFontSize);
      root.style.setProperty('--h1-size', theme.typography.h1Size);
      root.style.setProperty('--h2-size', theme.typography.h2Size);
      root.style.setProperty('--h3-size', theme.typography.h3Size);
    }
    
    if (theme.header) {
      root.style.setProperty('--header-bg', theme.header.background);
      root.style.setProperty('--header-text', theme.header.text);
      root.style.setProperty('--header-nav-text', theme.header.navText);
      root.style.setProperty('--header-nav-hover', theme.header.navHover);
    }
    
    if (theme.footer) {
      root.style.setProperty('--footer-bg', theme.footer.background);
      root.style.setProperty('--footer-text', theme.footer.text);
      root.style.setProperty('--footer-link', theme.footer.linkColor);
    }
    
    if (theme.buttons) {
      root.style.setProperty('--btn-primary-bg', theme.buttons.primaryBg);
      root.style.setProperty('--btn-primary-text', theme.buttons.primaryText);
      root.style.setProperty('--btn-primary-hover', theme.buttons.primaryHover);
      root.style.setProperty('--btn-secondary-bg', theme.buttons.secondaryBg);
      root.style.setProperty('--btn-secondary-text', theme.buttons.secondaryText);
      root.style.setProperty('--btn-secondary-hover', theme.buttons.secondaryHover);
      root.style.setProperty('--btn-radius', theme.buttons.borderRadius);
    }
    
    if (theme.cards) {
      root.style.setProperty('--card-bg', theme.cards.background);
      root.style.setProperty('--card-border', theme.cards.border);
      root.style.setProperty('--card-shadow', theme.cards.shadow);
      root.style.setProperty('--card-radius', theme.cards.borderRadius);
    }
  };

  const value = {
    categories,
    products,
    heroSlides,
    testimonials,
    giftBoxes,
    siteSettings,
    loading,
    refreshData: fetchAllData
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

// Hook to use the data context
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export default DataContext;
