import React, { useState, useEffect } from 'react';
  import { Link, useLocation } from 'react-router-dom';
  import { ShoppingCart, Heart, User, Menu, X, Search } from 'lucide-react';
  import { useCart } from '../context/CartContext';
  import { motion, AnimatePresence } from 'framer-motion';

  export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { cartCount } = useCart();
    const location = useLocation();

    useEffect(() => {
      const handleScroll = () => setIsScrolled(window.scrollY > 20);
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
      { name: 'Home', path: '/' },
      { name: 'Shop', path: '/shop' },
      { name: 'Special Orders', path: '/special-orders' },
      { name: 'About', path: '/about' },
    ];

    return (
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-3 shadow-md' : 'bg-transparent py-5'}`}>
        <div className="container flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-800 to-amber-600 bg-clip-text text-transparent" style={{ fontFamily: 'Outfit' }}>
              KSOME
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                className={`text-sm font-semibold hover:text-emerald-800 transition-colors ${location.pathname === link.path ? 'text-emerald-800' : 'text-slate-600'}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-emerald-50 rounded-full transition-colors hidden md:block">
              <Search size={20} className="text-slate-600" />
            </button>
            <Link to="/favorites" className="p-2 hover:bg-emerald-50 rounded-full transition-colors relative">
              <Heart size={20} className="text-slate-600" />
            </Link>
            <Link to="/account" className="p-2 hover:bg-emerald-50 rounded-full transition-colors">
              <User size={20} className="text-slate-600" />
            </Link>
            <Link to="/cart" className="p-2 bg-emerald-800 text-white rounded-full transition-all hover:bg-emerald-900 relative">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                  {cartCount}
                </span>
              )}
            </Link>
            <button 
              className="md:hidden p-2 hover:bg-emerald-50 rounded-full transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 bg-white shadow-xl md:hidden border-t"
            >
              <div className="flex flex-col p-4 gap-4">
                {navLinks.map((link) => (
                  <Link 
                    key={link.path} 
                    to={link.path} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg font-semibold text-slate-800 p-2 hover:bg-emerald-50 rounded-lg"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    );
  }
  
