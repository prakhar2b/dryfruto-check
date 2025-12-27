import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ChevronRight, Filter, X, SlidersHorizontal } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ProductCard from '../components/product/ProductCard';
import ProductDetailModal from '../components/product/ProductDetailModal';
import { useData } from '../context/DataContext';

const productTypes = [
  "Almonds",
  "Cashews",
  "Roasted Cashews",
  "Walnuts",
  "Raisins",
  "Mix dry fruits",
  "Pistachios",
  "Makhana",
  "Dried Fig",
  "Pumpkin Seeds",
  "Sunflower Seeds"
];

const ProductList = () => {
  const { products, categories } = useData();
  const [searchParams] = useSearchParams();
  const categorySlug = searchParams.get('category');
  const searchQuery = searchParams.get('search');
  const [selectedType, setSelectedType] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('default');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (categorySlug) {
      result = result.filter(p => p.category === categorySlug);
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.type.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
    }

    // Filter by type
    if (selectedType) {
      result = result.filter(p => p.type === selectedType);
    }

    // Filter by price
    result = result.filter(p => p.basePrice >= priceRange[0] && p.basePrice <= priceRange[1]);

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.basePrice - b.basePrice);
        break;
      case 'price-high':
        result.sort((a, b) => b.basePrice - a.basePrice);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return result;
  }, [products, categorySlug, searchQuery, selectedType, priceRange, sortBy]);

  const currentCategory = categories.find(c => c.slug === categorySlug);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Breadcrumb */}
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-900 py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-2 text-emerald-200 text-sm mb-2">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">
                {currentCategory ? currentCategory.name : searchQuery ? `Search: ${searchQuery}` : 'All Products'}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              {currentCategory ? currentCategory.name : searchQuery ? `Results for "${searchQuery}"` : 'All Products'}
            </h1>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setIsFilterOpen(true)}
              className="lg:hidden flex items-center justify-center gap-2 bg-white py-3 px-4 rounded-lg shadow-sm border border-gray-200"
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filters & Sort
            </button>

            {/* Sidebar Filters */}
            <aside className={`
              fixed lg:relative inset-0 z-50 lg:z-0
              transform ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
              transition-transform duration-300
              lg:w-64 flex-shrink-0
            `}>
              {/* Mobile Overlay */}
              <div 
                className="absolute inset-0 bg-black/50 lg:hidden"
                onClick={() => setIsFilterOpen(false)}
              />
              
              <div className="relative h-full lg:h-auto w-80 lg:w-full max-w-[85vw] bg-white lg:bg-transparent p-6 lg:p-0 overflow-y-auto">
                <div className="flex items-center justify-between mb-6 lg:hidden">
                  <h2 className="text-xl font-bold">Filters</h2>
                  <button onClick={() => setIsFilterOpen(false)}>
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Categories */}
                <div className="bg-white rounded-xl p-5 shadow-sm mb-6">
                  <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Filter className="w-5 h-5 text-emerald-600" />
                    Categories
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        to="/products"
                        className={`block py-2 px-3 rounded-lg transition-colors ${
                          !categorySlug ? 'bg-emerald-100 text-emerald-800 font-medium' : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        All Products
                      </Link>
                    </li>
                    {categories.map((cat) => (
                      <li key={cat.id}>
                        <Link
                          to={`/products?category=${cat.slug}`}
                          className={`block py-2 px-3 rounded-lg transition-colors ${
                            categorySlug === cat.slug ? 'bg-emerald-100 text-emerald-800 font-medium' : 'text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          {cat.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Product Type */}
                <div className="bg-white rounded-xl p-5 shadow-sm mb-6">
                  <h3 className="font-semibold text-gray-800 mb-4">Product Type</h3>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none"
                  >
                    <option value="">All Types</option>
                    {productTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Sort */}
                <div className="bg-white rounded-xl p-5 shadow-sm">
                  <h3 className="font-semibold text-gray-800 mb-4">Sort By</h3>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none"
                  >
                    <option value="default">Default</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Name: A to Z</option>
                  </select>
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-600">
                  Showing <span className="font-semibold text-gray-800">{filteredProducts.length}</span> products
                </p>
              </div>

              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                  {filteredProducts.map((product) => (
                    <div key={product.id} onClick={() => setSelectedProduct(product)}>
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl p-12 text-center">
                  <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                  <Link to="/products" className="text-emerald-600 hover:text-emerald-700 font-medium mt-2 inline-block">
                    View all products
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};

export default ProductList;
