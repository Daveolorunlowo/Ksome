import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Favorites() {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="pt-48 pb-32 text-center">
        <div className="container">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 bg-rose-50 text-rose-300 rounded-full flex items-center justify-center mx-auto mb-8">
              <Heart size={48} />
            </div>
            <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Outfit' }}>No favorites yet</h2>
            <p className="text-slate-500 mb-10">Start exploring our menu and save the items you love for later!</p>
            <div className="flex flex-col gap-4">
                <Link to="/shop" className="btn btn-primary w-full py-4 text-lg">
                    Discover Snacks
                </Link>
                <Link to="/" className="text-slate-600 font-semibold hover:text-emerald-800 flex items-center justify-center gap-2">
                    Back to Home <ArrowRight size={18} />
                </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-32">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
                <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: 'Outfit' }}>My Favorites</h1>
                <p className="text-slate-600">Saved items that you're craving for.</p>
            </div>
            <div className="flex gap-4">
                <Link to="/shop" className="btn btn-outline py-3 px-6">
                    Continue Shopping
                </Link>
            </div>
        </div>

        <div className="grid-products">
          {favorites.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
