import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';
import './CTA.css';

const CTA = () => {
    return (
        <section className="cta-section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="cta-card"
                >
                    <div className="cta-content">
                        <h2 className="cta-title">Craving Something Delicious?</h2>
                        <p className="cta-description">
                            Whether it's a party pack for your next event or a personal treat for the weekend,
                            KSOME has you covered. Order now and taste the difference.
                        </p>
                        <div className="cta-actions">
                            <Link to="/shop" className="btn-primary cta-btn">
                                Order Online
                                <ArrowRight size={18} />
                            </Link>
                            <Link to="/support" className="btn-secondary cta-btn-outline">
                                <Mail size={18} />
                                Get in Touch
                            </Link>
                        </div>
                    </div>
                    <div className="cta-visual">
                        <div className="circle-graphic graphic-1"></div>
                        <div className="circle-graphic graphic-2"></div>
                        <div className="circle-graphic graphic-3"></div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default CTA;
