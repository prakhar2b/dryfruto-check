import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Phone, MessageCircle, Heart, Truck, Shield, RefreshCcw } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useData } from '../context/DataContext';

const sizeVariants = [
  { key: '100g', label: "100 gram", multiplier: 1 },
  { key: '250g', label: "250 gram", multiplier: 2.4 },
  { key: '500g', label: "500 gram", multiplier: 4.5 },
  { key: '1kg', label: "1 kg", multiplier: 8.5 },
  { key: '2kg', label: "2 kg", multiplier: 16 },
  { key: '5kg', label: "5 kg", multiplier: 38 }
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
          <Link to="/products" className="text-[#8BC34A] hover:text-[#689F38]">Browse all products</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const currentVariant = sizeVariants[selectedSize];
  // Use custom price if available, otherwise calculate from base price
  const currentPrice = product.priceVariants?.[currentVariant.key] 
    ? product.priceVariants[currentVariant.key]
    : Math.round(product.basePrice * currentVariant.multiplier);
  const whatsappLink = siteSettings.whatsappLink || `https://wa.me/91${siteSettings.phone}`;
  const callLink = `tel:+91${siteSettings.phone}`;

  const handleWhatsApp = () => {
    const message = `Hi, I'm interested in ${product.name} (${currentVariant.label}) - ₹${currentPrice}`;
    window.open(`${whatsappLink}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleCall = () => {
    window.open(callLink, '_self');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main>
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200 py-3">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center gap-2 text-sm">
              <Link to="/" className="text-gray-500 hover:text-[#7CB342] transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link to="/products" className="text-gray-500 hover:text-[#7CB342] transition-colors">Products</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-[#7CB342] font-medium">{product.name}</span>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left - Images */}
              <div className="p-6 md:p-8">
                <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 mb-4">
                  <img
                    src={product.images?.[selectedImage] || product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {product.images && product.images.length > 1 && (
                  <div className="flex gap-3">
                    {product.images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImage === index ? 'border-[#8BC34A] shadow-md' : 'border-gray-200 hover:border-[#C1E899]'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right - Details */}
              <div className="p-6 md:p-8 border-l border-gray-100">
                <div className="mb-2">
                  <span className="inline-block px-3 py-1 bg-[#f5f9f0] text-[#7CB342] text-xs font-medium rounded-full">
                    {product.type || 'Premium Quality'}
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                  {product.name}
                </h1>
                <p className="text-gray-600 text-sm mb-3">{product.shortDescription}</p>
                
                {/* SKU */}
                {product.sku && (
                  <p className="text-gray-400 text-xs mb-6">
                    SKU: <span className="text-gray-600">{product.sku}</span>
                  </p>
                )}

                {/* Price */}
                <div className="mb-6">
                  <p className="text-4xl font-bold text-[#7CB342]">
                    ₹{currentPrice}.00
                  </p>
                  <p className="text-sm text-gray-500 mt-1">Price for {currentVariant.label}</p>
                </div>

                {/* Size Variants */}
                <div className="mb-6">
                  <p className="font-medium text-gray-700 mb-3 text-sm">Select Size:</p>
                  <div className="flex flex-wrap gap-2">
                    {sizeVariants.map((size, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedSize(index)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                          selectedSize === index
                            ? 'bg-[#7CB342] text-white border-[#7CB342]'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-[#8BC34A] hover:text-[#7CB342]'
                        }`}
                      >
                        {size.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Delivery Info */}
                <div className="bg-[#f5f9f0] rounded-xl p-4 mb-6 border border-[#C1E899]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#7CB342] rounded-full flex items-center justify-center flex-shrink-0">
                      <Truck className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-sm">Swift Delivery</p>
                      <p className="text-xs text-gray-600">Shipping across India. Fresh delivery guaranteed!</p>
                    </div>
                  </div>
                </div>

                {/* Health Features Box */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <Heart className="w-5 h-5 text-[#7CB342]" />
                    <span className="text-gray-700 text-sm">Healthy Heart</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <Shield className="w-5 h-5 text-[#7CB342]" />
                    <span className="text-gray-700 text-sm">High Nutrition</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <RefreshCcw className="w-5 h-5 text-[#7CB342]" />
                    <span className="text-gray-700 text-sm">Gluten Free</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <Shield className="w-5 h-5 text-[#7CB342]" />
                    <span className="text-gray-700 text-sm">Cholesterol Free</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={handleWhatsApp}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3.5 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp Us
                  </button>
                  <button
                    onClick={handleCall}
                    className="flex-1 bg-[#7CB342] hover:bg-[#689F38] text-white py-3.5 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Phone className="w-5 h-5" />
                    Call Us
                  </button>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-t border-gray-100">
              <div className="flex border-b border-gray-100">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`flex-1 py-4 text-center font-medium text-sm transition-colors ${
                    activeTab === 'description'
                      ? 'text-[#7CB342] border-b-2 border-[#7CB342] bg-white'
                      : 'text-gray-500 hover:text-gray-700 bg-gray-50'
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('benefits')}
                  className={`flex-1 py-4 text-center font-medium text-sm transition-colors ${
                    activeTab === 'benefits'
                      ? 'text-[#7CB342] border-b-2 border-[#7CB342] bg-white'
                      : 'text-gray-500 hover:text-gray-700 bg-gray-50'
                  }`}
                >
                  Benefits
                </button>
              </div>

              <div className="p-6 md:p-8">
                {activeTab === 'description' ? (
                  <div className="max-w-3xl">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">{product.name}</h3>
                    <p className="text-gray-600 leading-relaxed">{product.description}</p>
                  </div>
                ) : (
                  <div className="max-w-3xl">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Health Benefits</h3>
                    <ul className="space-y-3">
                      {product.benefits?.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="w-2 h-2 bg-[#7CB342] rounded-full mt-2 flex-shrink-0"></span>
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
