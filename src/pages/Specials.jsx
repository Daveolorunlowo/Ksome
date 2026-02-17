import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, Flame, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Specials.css';

import hotPuffPuffImg from '../assets/hot_puff_puff_new.jpg';
import suyaSkewersImg from '../assets/fresh_suya_skewers_new.jpg';
import hotAkaraImg from '../assets/hot_akara_balls.jpg';
import moiMoiImg from '../assets/steaming_moi_moi.jpg';
import pepperSoupImg from '../assets/pepper_soup.jpg';

// Fresh items that cannot be preserved - must be made to order
const freshSpecials = [
    {
        id: 1,
        title: 'Fresh Suya Skewers', // Renamed to title to match cart item structure
        description: 'Spicy grilled beef skewers with traditional suya spice. Made to order, best eaten hot.',
        price: 2500,
        prepTime: '20 min',
        image: suyaSkewersImg,
        tag: 'Made Fresh'
    },
    {
        id: 2,
        title: 'Hot Akara Balls',
        description: 'Crispy bean cakes fried to golden perfection. Must be eaten within 30 minutes for best taste.',
        price: 800,
        prepTime: '15 min',
        image: hotAkaraImg,
        tag: 'Fresh Only'
    },
    {
        id: 3,
        title: 'Steaming Moi Moi',
        description: 'Traditional steamed bean pudding with fish and egg. Prepared fresh each morning.',
        price: 1200,
        prepTime: '45 min',
        image: moiMoiImg,
        tag: 'Morning Special'
    },
    {
        id: 4,
        title: 'Hot Puff Puff (Fresh Batch)',
        description: 'Golden, fluffy puff puff straight from the fryer. Best within 1 hour of preparation.',
        price: 500,
        prepTime: '10 min',
        image: hotPuffPuffImg,
        tag: 'Just Fried'
    },
    {
        id: 5,
        title: 'Pepper Soup (Today Only)',
        description: 'Spicy, aromatic goat meat pepper soup. Made fresh daily, limited quantity.',
        price: 3500,
        prepTime: '30 min',
        image: pepperSoupImg,
        tag: 'Limited'
    }
];

const Specials = () => {
    const { addToCart } = useCart();

    const handleAddToCart = (item) => {
        addToCart(item);
        // Optional: Add toast or notification here
    };

    return (
        <main className="specials-page">
            <div className="container">
                {/* Hero Section */}
                <section className="specials-hero">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="specials-hero-content"
                    >
                        <span className="specials-badge">
                            <Flame size={16} /> Fresh & Hot
                        </span>
                        <h1>Today's Specials</h1>
                        <p>
                            These items are made fresh to order and <strong>cannot be preserved</strong>.
                            Experience authentic Nigerian flavors at their peak!
                        </p>
                    </motion.div>
                </section>

                {/* Notice Banner */}
                <div className="freshness-notice">
                    <AlertCircle size={20} />
                    <p>
                        <strong>Freshness Guarantee:</strong> All specials are prepared when you order.
                        Please allow extra time for preparation. These items are best enjoyed immediately.
                    </p>
                </div>

                {/* Specials Grid */}
                <section className="specials-grid">
                    {freshSpecials.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="special-card"
                        >
                            <div className="special-image">
                                <img src={item.image} alt={item.title} />
                                <span className="special-tag">{item.tag}</span>
                            </div>
                            <div className="special-content">
                                <h3>{item.title}</h3>
                                <p className="special-description">{item.description}</p>
                                <div className="special-meta">
                                    <span className="prep-time">
                                        <Clock size={14} /> {item.prepTime}
                                    </span>
                                    <span className="special-price">₦{item.price.toLocaleString()}</span>
                                </div>
                                <button
                                    className="order-btn"
                                    onClick={() => handleAddToCart(item)}
                                >
                                    Order Now
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </section>

                {/* CTA */}
                <section className="specials-cta">
                    <h2>Want Something That Keeps?</h2>
                    <p>Check out our regular menu for snacks you can store and enjoy anytime.</p>
                    <Link to="/shop" className="btn-primary">Browse All Products</Link>
                </section>
            </div>
        </main>
    );
};

export default Specials;
