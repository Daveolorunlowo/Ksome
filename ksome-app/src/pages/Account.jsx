import React from 'react';
import { User, Package, Heart, Settings, LogOut, ChevronRight, Star, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Account() {
  const user = {
    name: 'Dave Olorunlowo',
    email: 'dave@example.com',
    joinDate: 'Jan 2024',
    loyaltyLevel: 'Gold Member',
    stats: {
      orders: 12,
      favorites: 5,
      points: 450
    }
  };

  return (
    <div className="pt-32 pb-32 bg-slate-50 min-h-screen">
      <div className="container overflow-hidden">
        <div className="max-w-6xl mx-auto">
          {/* Dashboard Header */}
          <div className="bg-white rounded-3xl p-8 md:p-12 mb-12 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-800 text-4xl font-bold border-4 border-emerald-50">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center gap-4 mb-2">
                <h1 className="text-3xl font-extrabold" style={{ fontFamily: 'Outfit' }}>{user.name}</h1>
                <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full border border-amber-200">
                  {user.loyaltyLevel}
                </span>
              </div>
              <p className="text-slate-500 mb-6">{user.email} • Joined {user.joinDate}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-8">
                <StatItem icon={<Package size={18} />} value={user.stats.orders} label="Orders" />
                <StatItem icon={<Heart size={18} />} value={user.stats.favorites} label="Favorites" />
                <StatItem icon={<Star size={18} />} value={user.stats.points} label="Points" />
              </div>
            </div>
            <div className="flex flex-col gap-4 w-full md:w-auto">
              <button className="btn btn-primary px-8">Edit Profile</button>
              <button className="btn btn-outline border-slate-200 text-slate-600 hover:border-rose-500 hover:bg-rose-50 hover:text-rose-600">
                <LogOut size={18} /> Logout
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Action Cards */}
            <div className="md:col-span-1 space-y-4">
              <AccountAction color="bg-emerald-600" icon={<Package size={20} />} title="My Orders" desc="Track and manage deliveries" />
              <Link to="/favorites" className="block">
                <AccountAction color="bg-rose-500" icon={<Heart size={20} />} title="Wishlist" desc="View your saved snacks" />
              </Link>
              <AccountAction color="bg-amber-500" icon={<Settings size={20} />} title="Settings" desc="Security and preferences" />
            </div>

            {/* Recent Orders List */}
            <div className="md:col-span-2">
               <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 h-full">
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold" style={{ fontFamily: 'Outfit' }}>Recent Orders</h2>
                    <Link to="/orders" className="text-sm font-bold text-emerald-800 hover:underline">View All</Link>
                  </div>
                  
                  <div className="space-y-6">
                    <OrderItem id="#KS-9482" date="Oct 12, 2024" Total="$42.50" status="Delivered" />
                    <OrderItem id="#KS-9480" date="Oct 08, 2024" Total="$15.99" status="Processing" />
                    <OrderItem id="#KS-9475" date="Sep 28, 2024" Total="$28.10" status="Cancelled" />
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatItem({ icon, value, label }) {
  return (
    <div className="flex flex-col items-center md:items-start">
      <div className="flex items-center gap-2 text-emerald-700 mb-1">
        {icon}
        <span className="text-xl font-bold text-slate-800">{value}</span>
      </div>
      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</span>
    </div>
  );
}

function AccountAction({ color, icon, title, desc }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group flex items-center gap-4">
      <div className={`p-3 ${color} text-white rounded-xl group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-slate-800">{title}</h3>
        <p className="text-sm text-slate-500">{desc}</p>
      </div>
      <ChevronRight size={20} className="text-slate-300 group-hover:text-emerald-800 transition-colors" />
    </div>
  );
}

function OrderItem({ id, date, Total, status }) {
  const statusStyles = {
    'Delivered': 'bg-emerald-100 text-emerald-700',
    'Processing': 'bg-amber-100 text-amber-700',
    'Cancelled': 'bg-rose-100 text-rose-700'
  };

  return (
    <div className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-emerald-200 transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-slate-400">
           <Clock size={20} />
        </div>
        <div>
          <h4 className="font-bold text-slate-800">{id}</h4>
          <p className="text-xs text-slate-500">{date} • {Total}</p>
        </div>
      </div>
      <span className={`px-4 py-1 rounded-full text-xs font-bold ${statusStyles[status]}`}>
        {status}
      </span>
    </div>
  );
}
