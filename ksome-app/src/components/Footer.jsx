import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16 px-4">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <h2 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: 'Outfit' }}>KSOME</h2>
          <p className="text-sm leading-relaxed mb-6">
            Crafting premium snacks and delicacies since 2024. Quality you can taste, service you can trust.
          </p>
          <div className="flex gap-4">
            <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-emerald-800 transition-colors"><Facebook size={18} /></a>
            <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-emerald-800 transition-colors"><Instagram size={18} /></a>
            <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-emerald-800 transition-colors"><Twitter size={18} /></a>
          </div>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-6">Quick Links</h3>
          <ul className="space-y-4 text-sm">
            <li><a href="/" className="hover:text-emerald-400 transition-colors">Home</a></li>
            <li><a href="/shop" className="hover:text-emerald-400 transition-colors">Shop All</a></li>
            <li><a href="/specials" className="hover:text-emerald-400 transition-colors">Special Orders</a></li>
            <li><a href="/about" className="hover:text-emerald-400 transition-colors">Our Story</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-6">Support</h3>
          <ul className="space-y-4 text-sm">
            <li><a href="/support" className="hover:text-emerald-400 transition-colors">FAQ</a></li>
            <li><a href="/shipping" className="hover:text-emerald-400 transition-colors">Shipping Policy</a></li>
            <li><a href="/returns" className="hover:text-emerald-400 transition-colors">Returns & Refunds</a></li>
            <li><a href="/privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-6">Contact Us</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-3"><MapPin size={18} className="text-emerald-500" /> Lagos, Nigeria</li>
            <li className="flex items-center gap-3"><Phone size={18} className="text-emerald-500" /> +234 812 345 6789</li>
            <li className="flex items-center gap-3"><Mail size={18} className="text-emerald-500" /> hello@ksome.com</li>
          </ul>
        </div>
      </div>
      
      <div className="container mt-16 pt-8 border-t border-slate-800 text-center text-xs">
        <p>&copy; {new Date().getFullYear()} KSOME Productions. All rights reserved.</p>
      </div>
    </footer>
  );
}
