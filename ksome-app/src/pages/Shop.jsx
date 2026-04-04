import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';
import { motion, AnimatePresence } from 'framer-motion';

export default function Shop() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Featured');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => activeCategory === 'All' || p.category === activeCategory)
      .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => {
        if (sortBy === 'Price Low') return a.price - b.price;
        if (sortBy === 'Price High') return b.price - a.price;
        if (sortBy === 'Rating') return b.rating - a.rating;
        return 0; // Featured
      });
  }, [searchTerm, activeCategory, sortBy]);

  return (
    <div className="pt-32 pb-20">
      <div className="container">
        {/* Header Area */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Outfit' }}>Our Menu</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Discover our hand-picked selection of gourmet snacks and drinks.
            Crafted for enthusiasts of authentic flavor.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between sticky top-[80px] z-30 py-4 glass rounded-2xl px-6 shadow-sm">
          <div className="relative w-full md:w-96 group">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-emerald-800 transition-colors" />
            <input 
              type="text" 
              placeholder="Search for snacks..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 h-12 bg-white border-slate-200"
            />
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            <div className="flex-1 md:flex-none">
              <select 
                value={activeCategory} 
                onChange={(e) => setActiveCategory(e.target.value)}
                className="h-12 bg-white border-slate-200 px-4 font-semibold text-slate-700"
              >
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div className="flex-1 md:flex-none">
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="h-12 bg-white border-slate-200 px-4 font-semibold text-slate-700"
              >
                <option>Featured</option>
                <option>Price Low</option>
                <option>Price High</option>
                <option>Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={`${activeCategory}-${searchTerm}-${sortBy}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid-products"
          >
            {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))
            ) : (
                <div className="col-span-full py-32 text-center">
                    <div className="inline-flex items-center justify-center p-6 bg-slate-100 rounded-full mb-6">
                        <Search size={48} className="text-slate-300" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">No items found</h3>
                    <p className="text-slate-500">Try adjusting your filters or search term.</p>
                </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
