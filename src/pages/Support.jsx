import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Truck, RefreshCcw, HelpCircle } from 'lucide-react';
import './Support.css';

const Support = () => {
    const [activeTab, setActiveTab] = useState('faq');

    const faqData = [
        {
            question: "How long does shipping take?",
            answer: "We ship all orders within 24 hours. Delivery typically takes 2-4 business days within Lagos and 3-7 days for other states."
        },
        {
            question: "Do you offer bulk discounts?",
            answer: "Yes! For parties, weddings, or corporate events, please contact us for our bulk pricing sheet."
        },
        {
            question: "Are your snacks kosher/halal?",
            answer: "All our meat pies and chicken products are Halal certified. We do not use pork products in our kitchen."
        },
        {
            question: "How should I reheat my pies?",
            answer: "For best results, reheat in an oven or air fryer at 180°C for 5-8 minutes. Microwaving may make the crust soft."
        }
    ];

    return (
        <div className="support-page container">
            <div className="support-header">
                <h1>How can we help?</h1>
                <p>Find answers to common questions or learn about our policies.</p>
            </div>

            <div className="support-layout">
                <div className="support-tabs">
                    <button
                        className={`tab-btn ${activeTab === 'faq' ? 'active' : ''}`}
                        onClick={() => setActiveTab('faq')}
                    >
                        <HelpCircle size={20} /> FAQ
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'shipping' ? 'active' : ''}`}
                        onClick={() => setActiveTab('shipping')}
                    >
                        <Truck size={20} /> Shipping
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'returns' ? 'active' : ''}`}
                        onClick={() => setActiveTab('returns')}
                    >
                        <RefreshCcw size={20} /> Returns
                    </button>
                </div>

                <div className="support-content">
                    <AnimatePresence mode="wait">
                        {activeTab === 'faq' && (
                            <motion.div
                                key="faq"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="faq-section"
                            >
                                <h2>Frequently Asked Questions</h2>
                                <div className="faq-list">
                                    {faqData.map((item, index) => (
                                        <div key={index} className="faq-item">
                                            <h3>{item.question}</h3>
                                            <p>{item.answer}</p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'shipping' && (
                            <motion.div
                                key="shipping"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="policy-section"
                            >
                                <h2>Shipping Policy</h2>
                                <div className="policy-content">
                                    <p><strong>Processing Time:</strong> All orders are processed within 1 business day.</p>
                                    <p><strong>Delivery Areas:</strong> We currently ship to all states in Nigeria. International shipping is coming soon!</p>
                                    <p><strong>Shipping Rates:</strong> Flat rate of ₦1,500 for Lagos orders. Calculated rates for other states.</p>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'returns' && (
                            <motion.div
                                key="returns"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="policy-section"
                            >
                                <h2>Refund Policy</h2>
                                <div className="policy-content">
                                    <p>Since our products are perishable food items, we cannot accept returns.</p>
                                    <p>However, if your order arrives damaged or incorrect, please reach out to us within 24 hours with photos, and we will happily issue a refund or send a replacement.</p>
                                    <p>Your satisfaction is our priority!</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Support;
