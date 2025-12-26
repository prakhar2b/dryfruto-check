import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Phone, MessageCircle, Check, Heart, Share2, Truck, Shield, RefreshCcw } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { products, CONTACT_INFO, sizeVariants } from '../data/mock';

const ProductPage = () => {
  const { slug } = useParams();
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

  const handleWhatsApp = () => {
    const message = `Hi, I'm interested in ${product.name} (${sizeVariants[selectedSize].label}) - ₹${currentPrice}`;
    window.open(`${CONTACT_INFO.whatsappLink}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleCall = () => {
    window.open(CONTACT_INFO.callLink, '_self');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main>
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center gap-2 text-sm">
              <Link to="/" className="text-gray-500 hover:text-amber-600 transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link to="/products" className="text-gray-500 hover:text-amber-600 transition-colors">Products</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-amber-700 font-medium">{product.name}</span>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 p-6 md:p-10">
              {/* Left - Images */}
              <div>
                <div className="aspect-square rounded-2xl overflow-hidden bg-gray-50 mb-4">
                  <img
                    src={product.images[selectedImage] || product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {product.images.length > 1 && (
                  <div className="flex gap-3">
                    {product.images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
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
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">SKU: {product.sku}</p>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                      {product.name}
                    </h1>
                  </div>
                  <div className="flex gap-2">
                    <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-red-50 hover:border-red-200 transition-colors">
                      <Heart className="w-5 h-5 text-gray-400 hover:text-red-500" />
                    </button>
                    <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                      <Share2 className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                </div>

                <p className="text-gray-600 mb-6">{product.shortDescription}</p>

                {/* Size Variants */}
                <div className="mb-6">
                  <p className="font-medium text-gray-700 mb-3">Select Size:</p>
                  <div className="flex flex-wrap gap-2">
                    {sizeVariants.map((size, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedSize(index)}
                        className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                          selectedSize === index
                            ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {size.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <p className="text-4xl font-bold text-amber-700">
                    ₹{currentPrice}.00
                  </p>
                </div>

                {/* Delivery Info */}
                <div className="bg-gradient-to-r from-amber-50 to-amber-100/50 rounded-xl p-4 mb-6 border border-amber-200">
                  <p className="text-sm text-gray-700">
                    <strong className="text-amber-700">Swift Delivery -</strong> Shipping Across India. 
                    Bringing the goodness of dry fruits to your doorstep, no matter where you are! 
                    <a href={CONTACT_INFO.whatsappLink} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 ml-1">
                      (Chat with us)
                    </a>
                  </p>
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-5 h-5 text-green-600" />
                      </div>
                      <span className="text-sm text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={handleWhatsApp}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02] shadow-lg shadow-green-500/30"
                  >
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp Us
                  </button>
                  <button
                    onClick={handleCall}
                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02] shadow-lg shadow-amber-500/30"
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
                  className={`flex-1 py-4 text-center font-medium transition-colors ${
                    activeTab === 'description'
                      ? 'text-amber-700 border-b-2 border-amber-500 bg-amber-50/50'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('benefits')}
                  className={`flex-1 py-4 text-center font-medium transition-colors ${
                    activeTab === 'benefits'
                      ? 'text-amber-700 border-b-2 border-amber-500 bg-amber-50/50'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Benefits
                </button>
              </div>

              <div className="p-6 md:p-10">
                {activeTab === 'description' ? (
                  <div className="max-w-3xl">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">{product.name}</h3>
                    <p className="text-gray-600 leading-relaxed text-lg">{product.description}</p>
                  </div>
                ) : (
                  <div className="max-w-3xl">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Health Benefits</h3>
                    <ul className="space-y-4">
                      {product.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-4">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-5 h-5 text-green-600" />
                          </div>
                          <span className="text-gray-700 text-lg">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Features */}
            <div className="bg-gray-50 px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-amber-700" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Premium Quality</p>
                  <p className="text-sm text-gray-500">100% Guaranteed</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <Truck className="w-6 h-6 text-amber-700" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Swift Shipping</p>
                  <p className="text-sm text-gray-500">Across India</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <RefreshCcw className="w-6 h-6 text-amber-700" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Easy Return</p>
                  <p className="text-sm text-gray-500">Hassle Free</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-amber-700" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">24/7 Support</p>
                  <p className="text-sm text-gray-500">Always Available</p>
                </div>
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
