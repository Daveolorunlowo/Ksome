import { motion } from 'framer-motion';
import { ShoppingBag, TrendingUp } from 'lucide-react';
import './HowItWorks.css';

const HowItWorks = () => {
    return (
        <section className="how-it-works-section">
            <div className="container">
                <div className="section-header text-center mb-5">
                    <h2 className="section-title">How it Works</h2>
                    <p className="section-subtitle">
                        Whether you're here to satisfy your cravings or grow your wealth, <br />
                        we've made the journey seamless.
                    </p>
                </div>

                <div className="hiw-grid">

                    {/* Column 1: Order Snacks (Orange) */}
                    <div className="hiw-column">
                        <div className="hiw-col-header">
                            <div className="icon-circle orange">
                                <ShoppingBag size={24} />
                            </div>
                            <h3>Order Snacks</h3>
                        </div>

                        <div className="steps-list">
                            <div className="step-card white">
                                <span className="step-number orange">01</span>
                                <div className="step-content">
                                    <h4>Browse our Menu</h4>
                                    <p>Select from our range of authentic snacks.</p>
                                </div>
                            </div>
                            <div className="step-card white">
                                <span className="step-number orange">02</span>
                                <div className="step-content">
                                    <h4>Secure Checkout</h4>
                                    <p>Pay easily with cards, transfers, or crypto.</p>
                                </div>
                            </div>
                            <div className="step-card white">
                                <span className="step-number orange">03</span>
                                <div className="step-content">
                                    <h4>Fast Delivery</h4>
                                    <p>Freshly prepared and delivered to your door.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Invest & Grow (Green) */}
                    <div className="hiw-column">
                        <div className="hiw-col-header">
                            <div className="icon-circle green">
                                <TrendingUp size={24} />
                            </div>
                            <h3>Invest & Grow</h3>
                        </div>

                        <div className="steps-list">
                            <div className="step-card dark-green">
                                <span className="step-number white-text">01</span>
                                <div className="step-content">
                                    <h4 className="text-white">Become a Shareholder</h4>
                                    <p className="text-white-dim">Join our equity crowdfund from as little as $500.</p>
                                </div>
                            </div>
                            <div className="step-card white">
                                <span className="step-number green">02</span>
                                <div className="step-content">
                                    <h4>Scale Locally</h4>
                                    <p>Your capital funds factory expansion and farmers.</p>
                                </div>
                            </div>
                            <div className="step-card white">
                                <span className="step-number green">03</span>
                                <div className="step-content">
                                    <h4>Global Dividends</h4>
                                    <p>Earn from global exports of Nigerian flavors.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
