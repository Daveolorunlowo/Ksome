import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart, ArrowRight, Star } from 'lucide-react';
// import { products } from '../data/products'; // OLD: Static import
import { useProducts } from '../context/ProductsContext'; // NEW: Context import
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
    const { products, rateProduct } = useProducts(); // Get dynamic products
    const { addToCart } = useCart();

    const handleRating = (e, productId, rating) => {
        e.preventDefault();
        e.stopPropagation();
        rateProduct(productId, rating);
    };

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
                                <div className="card-rating" style={{ display: 'flex', gap: '2px', marginBottom: '8px' }}>
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={14}
                                            fill={i < Math.floor(product.rating) ? "#FFC107" : "none"}
                                            color={i < Math.floor(product.rating) ? "#FFC107" : "#e4e5e9"}
                                            onClick={(e) => handleRating(e, product.id, i + 1)}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    ))}
                                    <span style={{ fontSize: '0.8rem', color: '#888', marginLeft: '4px' }}>({product.reviews})</span>
                                </div>
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
