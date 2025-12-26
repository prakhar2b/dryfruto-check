import React from 'react';
import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';

const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/product/${product.slug}`}
      className="group"
    >
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-amber-200 shadow-sm hover:shadow-lg transition-all duration-300">
        <div className="relative overflow-hidden aspect-square bg-gray-50">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="bg-white text-amber-700 px-4 py-2 rounded-full font-medium flex items-center gap-2">
              <Eye className="w-4 h-4" />
              View Details
            </span>
          </div>
        </div>
        <div className="p-4">
          <p className="text-sm text-amber-600 mb-1">DryFruto</p>
          <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-amber-700 transition-colors">
            {product.name}
          </h3>
          <p className="text-lg font-bold text-amber-700">
            ₹{product.basePrice}.00
            <span className="text-sm text-gray-500 font-normal"> /100g</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
