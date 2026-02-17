import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, TrendingUp } from 'lucide-react';
import { products } from '../data/products';
import { useUI } from '../context/UIContext';
import './Hero.css';

const Hero = () => {
    const { openComingSoon } = useUI();
    // Get specific product images for the composition
    const puffPuff = products.find(p => p.title.includes("Puff"))?.image || "https://images.unsplash.com/photo-1630405433290-78a70c946288?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
    const suya = products.find(p => p.title.includes("Suya"))?.image || "https://images.unsplash.com/photo-1570145820404-ab66b3a970e5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";

    const handleInvestClick = (e) => {
        e.preventDefault();
        openComingSoon();
    };

    return (
        <section className="hero-section">
            <div className="container hero-container">

                {/* Left Content */}
                <div className="hero-content">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >


                        <h1 className="hero-title">
                            Nigerian Flavors, <br />
                            <span className="text-highlight">Delivered</span> to Your <br />
                            Door.
                        </h1>

                        <p className="hero-description">
                            Taste the vibrant heart of Africa with our premium snacks.
                            Join our community of investors and help us scale the
                            global African food ecosystem.
                        </p>

                        <div className="hero-actions">
                            <Link to="/shop" className="btn-primary">
                                Order Now
                                <ShoppingBag size={18} />
                            </Link>
                            <a href="#" onClick={handleInvestClick} className="btn-invest">
                                Invest in KSOME
                                <TrendingUp size={18} />
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* Right Image Composition */}
                <motion.div
                    className="hero-visual"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="visual-circle-bg"></div>

                    {/* Main Organic Image (Puff Puff) */}
                    <div className="image-main-mask">
                        <img src={puffPuff} alt="Puff Puff" className="hero-img-main" />
                    </div>

                    {/* Overlapping Pill Image (Suya) */}
                    <motion.div
                        className="image-pill-mask"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        <img src={suya} alt="Suya" className="hero-img-pill" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
