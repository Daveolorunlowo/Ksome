import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="pt-48 pb-32 text-center">
        <div className="container">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-8 text-slate-300">
              <ShoppingBag size={48} />
            </div>
            <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Outfit' }}>Your cart is empty</h2>
            <p className="text-slate-500 mb-10">Looks like you haven't added any snacks yet. Let's find something delicious!</p>
            <Link to="/shop" className="btn btn-primary px-10 py-4 text-lg w-full">
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-32">
      <div className="container">
        <h1 className="text-4xl font-bold mb-12" style={{ fontFamily: 'Outfit' }}>My Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <motion.div 
                layout
                key={item.id} 
                className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-white rounded-2xl shadow-sm border border-slate-100"
              >
                <div className="w-32 h-32 flex-shrink-0 bg-slate-50 rounded-xl overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-xl font-bold text-slate-800 mb-1">{item.name}</h3>
                  <p className="text-sm text-slate-500 mb-4">{item.category}</p>
                  <span className="text-lg font-bold text-emerald-800">${item.price.toFixed(2)}</span>
                </div>

                <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
                  <button 
                    onClick={() => updateQuantity(item.id, -1)}
                    className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all"
                  >
                    <Minus size={18} className="text-slate-600" />
                  </button>
                  <span className="w-8 text-center font-bold text-lg">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, 1)}
                    className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all"
                  >
                    <Plus size={18} className="text-slate-600" />
                  </button>
                </div>

                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="p-3 text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                >
                  <Trash2 size={20} />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 sticky top-[120px]">
              <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: 'Outfit' }}>Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-800">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span className="text-emerald-600 font-semibold uppercase text-sm">Free</span>
                </div>
                <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                  <span className="text-xl font-bold text-slate-900">Total</span>
                  <span className="text-3xl font-extrabold text-emerald-800">${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-4">
                <Link to="/checkout" className="btn btn-primary w-full py-5 text-xl">
                  Checkout Now <ArrowRight size={20} />
                </Link>
                <Link to="/shop" className="btn btn-outline w-full py-4">
                  Continue Shopping
                </Link>
              </div>

              <div className="mt-8 flex items-center gap-3 text-slate-400 text-xs justify-center">
                <ShoppingBag size={14} />
                <span>Secure Checkout with KSOME Pay</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
