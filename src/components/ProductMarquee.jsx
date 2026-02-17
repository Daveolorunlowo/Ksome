import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { products } from '../data/products';
import './ProductMarquee.css';

// Curated slides configuration to serve company purpose
const slideConfig = [
    {
        productId: 5, // Hot Puff Puff
        customTitle: "Golden & Fluffy",
        customDesc: "The ultimate comfort snack, fried to perfection.",
        badge: "Crowd Favorite"
    },
    {
        productId: 4, // Meat Pie
        customTitle: "Rich & Savory",
        customDesc: "Authentic Nigerian meat pie with a buttery, flaky crust.",
        badge: "Signature Recipe"
    },
    {
        productId: 11, // Suya
        customTitle: "Straight from the Grill",
        customDesc: "Spicy, smoky, and irresistibly tender beef suya.",
        badge: "Hot & Spicy"
    },
    {
        productId: 2, // Chin Chin
        customTitle: "Crunchy & Milky",
        customDesc: "The perfect snack for sharing (or keeping all to yourself).",
        badge: "Best Seller"
    },
    {
        productId: 1, // Cake
        customTitle: "Sweet Indulgence",
        customDesc: "Treat yourself to a slice of pure happiness.",
        badge: "Fresh Baked"
    }
];

const ProductMarquee = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Merge product data with custom slide config
    const carouselSlides = slideConfig.map(config => {
        const product = products.find(p => p.id === config.productId);
        return {
            ...product,
            ...config
        };
    }).filter(Boolean); // Remove any undefined if product not found

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % carouselSlides.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [carouselSlides.length]);

    const handleThumbnailClick = (index) => {
        setCurrentIndex(index);
    };

    if (carouselSlides.length === 0) return null;

    const currentSlide = carouselSlides[currentIndex];

    return (
        <div className="carousel-container">
            <div className="carousel-stage">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide.id}
                        className="carousel-slide"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <img
                            src={currentSlide.image}
                            alt={currentSlide.title}
                            className="carousel-image"
                        />
                        <div className="carousel-overlay">
                            <div className="carousel-content">
                                <motion.span
                                    className="carousel-tag"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    {currentSlide.badge}
                                </motion.span>
                                <motion.h2
                                    className="carousel-title"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    {currentSlide.customTitle}
                                </motion.h2>
                                <motion.p
                                    className="carousel-desc"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    {currentSlide.customDesc}
                                </motion.p>
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <Link to={`/shop`} className="carousel-btn">
                                        <ShoppingBag size={18} />
                                        Order for ₦{currentSlide.price.toLocaleString()}
                                    </Link>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Thumbnail Navigation */}
            <div className="carousel-thumbnails">
                {carouselSlides.map((slide, index) => (
                    <button
                        key={slide.id}
                        className={`thumbnail-btn ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => handleThumbnailClick(index)}
                    >
                        <div className="thumbnail-progress">
                            {index === currentIndex && (
                                <motion.div
                                    className="progress-bar"
                                    layoutId="progress"
                                    initial={{ width: '0%' }}
                                    animate={{ width: '100%' }}
                                    transition={{ duration: 5, ease: "linear" }}
                                />
                            )}
                        </div>
                        <span className="thumbnail-label">{slide.title}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ProductMarquee;
