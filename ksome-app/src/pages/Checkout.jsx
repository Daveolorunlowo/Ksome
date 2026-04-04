import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, ChevronRight, MapPin, Truck, CreditCard, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '', firstName: '', lastName: '', 
    address: '', city: '', zip: '',
    paymentMethod: 'card'
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step < 3) setStep(step + 1);
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setIsCompleted(true);
    clearCart();
  };

  if (isCompleted) {
    return (
      <div className="pt-48 pb-32 text-center">
        <div className="container">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-md mx-auto p-12 bg-white rounded-3xl shadow-xl border border-emerald-100"
          >
            <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 size={64} />
            </div>
            <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Outfit' }}>Order Placed!</h2>
            <p className="text-slate-500 mb-10 leading-relaxed">
              Thank you for your order. We've sent a confirmation email to <strong>{formData.email}</strong>.
              Your delicious snacks will be on their way soon!
            </p>
            <Link to="/shop" className="btn btn-primary w-full py-4 text-lg">
              Return to Shop
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-32 bg-slate-50 min-h-screen">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          {/* Progress Header */}
          <div className="flex items-center justify-between mb-12 px-4 md:px-0">
             <StepIndicator currentStep={step} stepNumber={1} label="Shipping" />
             <div className="flex-1 h-px bg-slate-200 mx-4 md:mx-6" />
             <StepIndicator currentStep={step} stepNumber={2} label="Payment" />
             <div className="flex-1 h-px bg-slate-200 mx-4 md:mx-6" />
             <StepIndicator currentStep={step} stepNumber={3} label="Review" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form Section */}
            <div className="lg:col-span-3">
              <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-100">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.form 
                      key="step1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      onSubmit={handleNextStep}
                      className="space-y-6"
                    >
                      <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                         <MapPin size={24} className="text-emerald-700" /> Shipping Information
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                           <label className="block text-sm font-semibold mb-2">Email Address</label>
                           <input required type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="hello@example.com" />
                        </div>
                        <div>
                           <label className="block text-sm font-semibold mb-2">First Name</label>
                           <input required name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="First Name" />
                        </div>
                        <div>
                           <label className="block text-sm font-semibold mb-2">Last Name</label>
                           <input required name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last Name" />
                        </div>
                        <div className="col-span-2">
                           <label className="block text-sm font-semibold mb-2">Street Address</label>
                           <input required name="address" value={formData.address} onChange={handleInputChange} placeholder="123 Snack Avenue" />
                        </div>
                        <div>
                           <label className="block text-sm font-semibold mb-2">City</label>
                           <input required name="city" value={formData.city} onChange={handleInputChange} placeholder="City" />
                        </div>
                        <div>
                           <label className="block text-sm font-semibold mb-2">ZIP / Postal Code</label>
                           <input required name="zip" value={formData.zip} onChange={handleInputChange} placeholder="Zip Code" />
                        </div>
                      </div>
                      <button type="submit" className="btn btn-primary w-full py-4 text-lg">
                         Continue to Payment <ChevronRight size={20} />
                      </button>
                    </motion.form>
                  )}

                  {step === 2 && (
                    <motion.div 
                      key="step2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-8"
                    >
                      <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                         <CreditCard size={24} className="text-emerald-700" /> Payment Method
                      </h3>
                      <div className="space-y-4">
                        <PaymentOption 
                          id="card" label="Credit / Debit Card" icon={<CreditCard size={20} />} 
                          active={formData.paymentMethod === 'card'} 
                          onClick={() => setFormData({...formData, paymentMethod: 'card'})} 
                        />
                        <PaymentOption 
                          id="transfer" label="Bank Transfer" icon={< Truck size={20} />} 
                          active={formData.paymentMethod === 'transfer'} 
                          onClick={() => setFormData({...formData, paymentMethod: 'transfer'})} 
                        />
                      </div>
                      <div className="pt-6 border-t border-slate-100 flex gap-4">
                         <button onClick={() => setStep(1)} className="btn btn-outline flex-1 py-4">Back</button>
                         <button onClick={() => setStep(3)} className="btn btn-primary flex-1 py-4">Review Order <ChevronRight size={20} /></button>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div 
                      key="step3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-8"
                    >
                      <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                         <ShieldCheck size={24} className="text-emerald-700" /> Review & Place Order
                      </h3>
                      <div className="space-y-6">
                         <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                            <h4 className="font-bold text-slate-800 mb-4">Shipping Details</h4>
                            <p className="text-sm text-slate-600 leading-relaxed">
                               {formData.firstName} {formData.lastName}<br />
                               {formData.address}<br />
                               {formData.city}, {formData.zip}
                            </p>
                         </div>
                         <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                            <h4 className="font-bold text-slate-800 mb-2">Payment Details</h4>
                            <p className="text-sm text-slate-600">
                               {formData.paymentMethod === 'card' ? 'Credit / Debit Card' : 'Bank Transfer'}
                            </p>
                         </div>
                      </div>
                      <div className="pt-6 border-t border-slate-100 flex gap-4">
                         <button onClick={() => setStep(2)} className="btn btn-outline flex-1 py-4">Back</button>
                         <button 
                           onClick={handlePlaceOrder} 
                           disabled={isProcessing}
                           className="btn btn-primary flex-1 py-4 text-xl shadow-lg shadow-emerald-200"
                         >
                            {isProcessing ? 'Processing...' : `Pay $${cartTotal.toFixed(2)}`}
                         </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Sidebar Summary */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                <h3 className="font-bold text-lg mb-6">In your Bag</h3>
                <div className="space-y-4 max-h-96 overflow-y-auto mb-8 pr-4 custom-scrollbar">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-4">
                       <div className="w-16 h-16 bg-slate-50 rounded-lg overflow-hidden flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                       </div>
                       <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-slate-800 truncate text-sm">{item.name}</h4>
                          <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                       </div>
                       <span className="font-bold text-slate-700 text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-3 pt-6 border-t border-slate-100">
                   <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Subtotal</span>
                      <span className="font-bold text-slate-800">${cartTotal.toFixed(2)}</span>
                   </div>
                   <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Shipping</span>
                      <span className="text-emerald-600 font-bold uppercase">Free</span>
                   </div>
                   <div className="flex justify-between pt-4 text-lg font-bold">
                      <span>Total</span>
                      <span className="text-2xl text-emerald-800">${cartTotal.toFixed(2)}</span>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepIndicator({ currentStep, stepNumber, label }) {
  const active = currentStep >= stepNumber;
  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${active ? 'bg-emerald-800 text-white shadow-lg shadow-emerald-200' : 'bg-slate-200 text-slate-500'}`}>
        {stepNumber}
      </div>
      <span className={`text-[10px] md:text-xs font-bold uppercase tracking-widest ${active ? 'text-emerald-800' : 'text-slate-400'}`}>
        {label}
      </span>
    </div>
  );
}

function PaymentOption({ id, label, icon, active, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center justify-between p-6 rounded-2xl border-2 transition-all ${active ? 'border-emerald-800 bg-emerald-50 shadow-sm' : 'border-slate-100 bg-slate-50 hover:border-slate-200'}`}
    >
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl ${active ? 'bg-emerald-800 text-white' : 'bg-slate-200 text-slate-500'}`}>
          {icon}
        </div>
        <span className="font-bold text-slate-700">{label}</span>
      </div>
      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${active ? 'border-emerald-800 bg-emerald-800' : 'border-slate-300'}`}>
        {active && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
      </div>
    </button>
  );
}
