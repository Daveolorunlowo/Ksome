import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import './CustomerFavorites.css';

const CustomerFavorites = () => {
    const { addToCart } = useCart();

    // Get products 4-8 for favorites (different from specials)
    const favoriteProducts = products.slice(4, 8);

    const handleAddToCart = (product) => {
        addToCart({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image
        });
    };

    return (
        <section className="favorites-section">
            <div className="container">
                <div className="section-header-center">
                    <h2 className="section-title">Fan Favorites</h2>
                    <p className="section-subtitle">Top rated picks from our community</p>
                </div>

                <div className="favorites-grid">
                    {favoriteProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            className="fav-card"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            <div className="fav-image-wrapper">
                                <img src={product.image} alt={product.title} className="fav-img" />
                            </div>
                            <h3 className="fav-name">{product.title}</h3>
                            <p className="fav-price">₦{product.price.toLocaleString()}</p>
                            <button
                                className="fav-add-btn"
                                onClick={() => handleAddToCart(product)}
                            >
                                <ShoppingCart size={16} />
                                Add to Cart
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CustomerFavorites;
