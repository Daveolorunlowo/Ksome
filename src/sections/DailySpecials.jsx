import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import './DailySpecials.css';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const DailySpecials = () => {
    const { addToCart } = useCart();

    // Select specific items to match the "Taste the Culture" design
    // IDs based on products.js: 2 (Chin Chin), 11 (Suya), 5 (Hot Puff Puff), 6 (Plantain Chips)
    const highlightIds = [2, 11, 5, 6];
    const specials = products.filter(p => highlightIds.includes(p.id));

    return (
        <section className="specials-section">
            <div className="container">
                <div className="specials-header">
                    <div>
                        <h2 className="section-title">Taste the Culture</h2>
                        <p className="section-subtitle">Our mom-loved authentic snacks, crafted with tradition.</p>
                    </div>
                    <Link to="/shop" className="view-menu-link">
                        View full menu <ArrowRight size={16} />
                    </Link>
                </div>

                <div className="specials-grid">
                    {specials.map((product, index) => (
                        <motion.div
                            key={product.id}
                            className="special-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="card-image-container">
                                {product.badge && <span className="card-badge">{product.badge}</span>}
                                <img src={product.image} alt={product.title} className="card-image" />
                            </div>

                            <div className="card-content">
                                <h3 className="card-title">{product.title}</h3>
                                <p className="card-desc">{product.description}</p>

                                <div className="card-footer">
                                    <span className="card-price">₦{product.price.toLocaleString()}</span>
                                    <button
                                        className="card-cart-btn"
                                        onClick={() => addToCart(product)}
                                        aria-label="Add to cart"
                                    >
                                        <ShoppingCart size={18} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DailySpecials;
