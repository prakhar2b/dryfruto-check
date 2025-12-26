import React, { useState } from 'react';
import { X, Phone, MessageCircle, Heart, HeartHandshake, Truck, Shield, Check } from 'lucide-react';
import { CONTACT_INFO, sizeVariants } from '../../data/mock';

const ProductDetailModal = ({ product, isOpen, onClose }) => {
  const [selectedSize, setSelectedSize] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [selectedImage, setSelectedImage] = useState(0);

  if (!isOpen || !product) return null;

  const currentPrice = Math.round(product.basePrice * sizeVariants[selectedSize].multiplier);

  const handleWhatsApp = () => {
    const message = `Hi, I'm interested in ${product.name} (${sizeVariants[selectedSize].label}) - ₹${currentPrice}`;
    window.open(`${CONTACT_INFO.whatsappLink}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleCall = () => {
    window.open(CONTACT_INFO.callLink, '_self');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
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
                        selectedImage === index ? 'border-amber-500' : 'border-gray-200'
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
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-1">SKU: {product.sku}</p>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                  {product.name}
                </h2>
              </div>

              {/* Size Variants */}
              <div className="mb-6">
                <p className="font-medium text-gray-700 mb-3">Select Size:</p>
                <div className="flex flex-wrap gap-2">
                  {sizeVariants.map((size, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedSize(index)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedSize === index
                          ? 'bg-amber-500 text-white'
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
                <p className="text-3xl font-bold text-amber-700">
                  ₹{currentPrice}.00
                </p>
              </div>

              {/* Delivery Info */}
              <div className="bg-amber-50 rounded-xl p-4 mb-6">
                <p className="text-sm text-gray-700">
                  <strong className="text-amber-700">Swift Delivery -</strong> Shipping Across India. 
                  Bringing the goodness of dry fruits to your doorstep!
                </p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    {feature}
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleWhatsApp}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Us
                </button>
                <button
                  onClick={handleCall}
                  className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
                >
                  <Phone className="w-5 h-5" />
                  Call Us
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-t border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('description')}
                className={`flex-1 py-4 text-center font-medium transition-colors ${
                  activeTab === 'description'
                    ? 'text-amber-700 border-b-2 border-amber-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('benefits')}
                className={`flex-1 py-4 text-center font-medium transition-colors ${
                  activeTab === 'benefits'
                    ? 'text-amber-700 border-b-2 border-amber-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Benefits
              </button>
            </div>

            <div className="p-6 md:p-8">
              {activeTab === 'description' ? (
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{product.name}</h3>
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                </div>
              ) : (
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Health Benefits</h3>
                  <ul className="space-y-3">
                    {product.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="text-gray-600">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Features */}
          <div className="bg-gray-50 px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Shield className="w-5 h-5 text-amber-600" />
              <span className="text-gray-600">Premium Quality</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Truck className="w-5 h-5 text-amber-600" />
              <span className="text-gray-600">Swift Shipping</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <HeartHandshake className="w-5 h-5 text-amber-600" />
              <span className="text-gray-600">Easy Return</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Heart className="w-5 h-5 text-amber-600" />
              <span className="text-gray-600">24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
