import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Phone, MessageCircle, Heart, Truck, Shield, RefreshCcw } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useData } from '../context/DataContext';

const sizeVariants = [
  { label: "100 gram", multiplier: 1 },
  { label: "250 gram", multiplier: 2.4 },
  { label: "500 gram", multiplier: 4.5 },
  { label: "1 kg", multiplier: 8.5 },
  { label: "2 kg", multiplier: 16 },
  { label: "5 kg", multiplier: 38 }
];

const ProductPage = () => {
  const { slug } = useParams();
  const { products, siteSettings } = useData();
  const [selectedSize, setSelectedSize] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [selectedImage, setSelectedImage] = useState(0);

  const product = products.find(p => p.slug === slug);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Product not found</h1>
          <Link to="/products" className="text-amber-600 hover:text-amber-700">Browse all products</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const currentPrice = Math.round(product.basePrice * sizeVariants[selectedSize].multiplier);
  const whatsappLink = siteSettings.whatsappLink || `https://wa.me/91${siteSettings.phone}`;
  const callLink = `tel:+91${siteSettings.phone}`;

  const handleWhatsApp = () => {
    const message = `Hi, I'm interested in ${product.name} (${sizeVariants[selectedSize].label}) - ₹${currentPrice}`;
    window.open(`${whatsappLink}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleCall = () => {
    window.open(callLink, '_self');
  };

  return (
    <div className="min-h-screen bg-[#f5f0eb]">
      <Header />

      <main>
        {/* Breadcrumb */}
        <div className="bg-[#3d2518] py-3">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center gap-2 text-sm">
              <Link to="/" className="text-amber-200 hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4 text-amber-400" />
              <Link to="/products" className="text-amber-200 hover:text-white transition-colors">Products</Link>
              <ChevronRight className="w-4 h-4 text-amber-400" />
              <span className="text-white">{product.name}</span>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left - Images */}
              <div className="p-4 md:p-6 bg-gray-50">
                <div className="aspect-square rounded-xl overflow-hidden bg-white mb-3">
                  <img
                    src={product.images?.[selectedImage] || product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {product.images && product.images.length > 1 && (
                  <div className="flex gap-2">
                    {product.images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                          selectedImage === index ? 'border-amber-500' : 'border-gray-200 hover:border-amber-300'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right - Details */}
              <div className="p-4 md:p-6 bg-[#3d2518] text-white">
                <h1 className="text-xl md:text-2xl font-bold mb-2">
                  {product.name}
                </h1>
                <p className="text-amber-200 text-sm mb-4">{product.shortDescription}</p>

                {/* Size Variants */}
                <div className="mb-4">
                  <p className="font-medium text-amber-300 mb-2 text-sm">Select Size:</p>
                  <div className="flex flex-wrap gap-2">
                    {sizeVariants.map((size, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedSize(index)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                          selectedSize === index
                            ? 'bg-amber-500 text-white'
                            : 'bg-[#2d1810] text-amber-200 hover:bg-[#4d3528]'
                        }`}
                      >
                        {size.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <p className="text-3xl font-bold text-amber-400">
                    ₹{currentPrice}.00
                  </p>
                </div>

                {/* Delivery Info */}
                <div className="bg-[#2d1810] rounded-lg p-3 mb-4 border border-amber-900">
                  <p className="text-sm text-amber-100">
                    <strong className="text-amber-400">Swift Delivery -</strong> Shipping Across India. 
                    Bringing the goodness of dry fruits to your doorstep!
                  </p>
                </div>

                {/* Health Features Box */}
                <div className="bg-[#2d1810] rounded-lg p-4 mb-4 border border-amber-900">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center">
                        <Heart className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-amber-100 text-xs">Healthy Heart</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center">
                        <Shield className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-amber-100 text-xs">High Nutrition</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center">
                        <RefreshCcw className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-amber-100 text-xs">Gluten Free</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center">
                        <Truck className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-amber-100 text-xs">Cholesterol Free</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={handleWhatsApp}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                  >
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp Us
                  </button>
                  <button
                    onClick={handleCall}
                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                  >
                    <Phone className="w-5 h-5" />
                    Call Us
                  </button>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-t border-gray-200">
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`flex-1 py-3 text-center font-medium text-sm transition-colors ${
                    activeTab === 'description'
                      ? 'text-amber-700 border-b-2 border-amber-500 bg-amber-50'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('benefits')}
                  className={`flex-1 py-3 text-center font-medium text-sm transition-colors ${
                    activeTab === 'benefits'
                      ? 'text-amber-700 border-b-2 border-amber-500 bg-amber-50'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Benefits
                </button>
              </div>

              <div className="p-5">
                {activeTab === 'description' ? (
                  <div className="max-w-3xl">
                    <h3 className="text-lg font-bold text-gray-800 mb-3">{product.name}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">{product.description}</p>
                  </div>
                ) : (
                  <div className="max-w-3xl">
                    <h3 className="text-lg font-bold text-gray-800 mb-3">Health Benefits</h3>
                    <ul className="space-y-2">
                      {product.benefits?.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                          <span className="text-gray-600">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductPage;
