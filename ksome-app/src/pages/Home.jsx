import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Shield, Truck, Zap } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

export default function Home() {
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-slate-50">
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight" style={{ fontFamily: 'Outfit' }}>
                Taste the Tradition, <br />
                <span className="text-emerald-800">Savor the Quality.</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl">
                Experience the finest African snacks and delicacies, handcrafted with love and delivered fresh to your doorstep. From our signature Egg Rolls to gourmet Meat Pies.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/shop" className="btn btn-primary px-8 py-4 text-lg">
                  Shop Now <ArrowRight size={20} />
                </Link>
                <Link to="/about" className="btn btn-outline px-8 py-4 text-lg">
                  Our Story
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block">
          <div className="relative h-full">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-100 rounded-full blur-3xl opacity-50"
            />
            <motion.img 
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              src="/egg-roll.jpg" 
              alt="Hero image"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] rounded-3xl shadow-2xl rotate-3"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<Truck className="text-emerald-700" />} 
              title="Fast Delivery" 
              desc="Freshness guaranteed at your door."
            />
            <FeatureCard 
              icon={<Shield className="text-emerald-700" />} 
              title="Quality First" 
              desc="Only the finest ingredients used."
            />
            <FeatureCard 
              icon={<Zap className="text-emerald-700" />} 
              title="Easy Ordering" 
              desc="Seamless checkout experience."
            />
            <FeatureCard 
              icon={<Star className="text-emerald-700" />} 
              title="Top Rated" 
              desc="Loved by thousands of snackers."
            />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-slate-50">
        <div className="container">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Outfit' }}>Featured Delicacies</h2>
              <p className="text-slate-600">Our customer favorites, fresh from the kitchen.</p>
            </div>
            <Link to="/shop" className="text-emerald-800 font-bold flex items-center gap-2 hover:underline">
              View All <ArrowRight size={18} />
            </Link>
          </div>
          <div className="grid-products">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-900 text-white relative overflow-hidden">
        <div className="container relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8" style={{ fontFamily: 'Outfit' }}>
            Hosting an Event?
          </h2>
          <p className="text-xl text-emerald-200 mb-10 max-w-2xl mx-auto">
            We offer bulk orders and custom catering menus for your special occasions. 
            Get in touch for a curated experience.
          </p>
          <Link to="/special-orders" className="btn btn-secondary px-10 py-4 text-xl">
            Request Special Order
          </Link>
        </div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://images.unsplash.com/photo-1555126634-323283e090fa?q=80&w=2000')] bg-cover" />
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="p-8 bg-slate-50 rounded-2xl hover:shadow-lg transition-all border border-slate-100 group">
      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
