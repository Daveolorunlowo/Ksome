import React from 'react';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { motion } from 'framer-motion';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group"
    >
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button 
            onClick={() => toggleFavorite(product)}
            className={`p-2 rounded-full shadow-lg transition-all ${isFavorite(product.id) ? 'bg-rose-500 text-white' : 'bg-white text-slate-400 hover:text-rose-500'}`}
          >
            <Heart size={18} fill={isFavorite(product.id) ? 'currentColor' : 'none'} />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500">
           <button 
            onClick={() => addToCart(product)}
            className="w-full py-2 bg-emerald-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-emerald-700 transform transition-active active:scale-95"
          >
            <ShoppingCart size={18} /> Add to Cart
          </button>
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">{product.category}</span>
          <div className="flex items-center gap-1 text-amber-500">
            <Star size={14} fill="currentColor" />
            <span className="text-xs font-bold text-slate-700">{product.rating}</span>
          </div>
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-emerald-800 transition-colors">{product.name}</h3>
        <p className="text-sm text-slate-500 mb-4 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-slate-900">${product.price.toFixed(2)}</span>
          <button 
            onClick={() => addToCart(product)}
            className="md:hidden p-2 text-emerald-800 hover:bg-emerald-50 rounded-full transition-colors"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
