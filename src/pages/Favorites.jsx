import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, ArrowLeft } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';
import './Favorites.css';

const Favorites = () => {
    const { favorites, removeFromFavorites } = useFavorites();
    const { addToCart } = useCart();

    const handleAddToCart = (product) => {
        addToCart(product);
    };

    return (
        <main className="favorites-page">
            <div className="container">
                <div className="favorites-header">
                    <Link to="/shop" className="back-link">
                        <ArrowLeft size={18} />
                        Back to Shop
                    </Link>
                    <h1>
                        <Heart size={28} />
                        My Favorites
                    </h1>
                    <p>{favorites.length} {favorites.length === 1 ? 'item' : 'items'} saved</p>
                </div>

                {favorites.length === 0 ? (
                    <div className="favorites-empty">
                        <Heart size={64} strokeWidth={1} />
                        <h2>No favorites yet</h2>
                        <p>Start adding items you love by clicking the heart icon on any product.</p>
                        <Link to="/shop" className="btn-primary">Browse Products</Link>
                    </div>
                ) : (
                    <div className="favorites-grid">
                        {favorites.map((product) => (
                            <div key={product.id} className="favorites-card">
                                <div className="favorites-card-image">
                                    <img src={product.image} alt={product.title} />
                                    <button
                                        className="remove-favorite-btn"
                                        onClick={() => removeFromFavorites(product.id)}
                                        title="Remove from favorites"
                                    >
                                        <Heart size={18} fill="currentColor" />
                                    </button>
                                </div>
                                <div className="favorites-card-content">
                                    <div className="favorites-rating">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={12}
                                                fill={i < Math.floor(product.rating) ? "#FFC107" : "none"}
                                                color={i < Math.floor(product.rating) ? "#FFC107" : "#e4e5e9"}
                                            />
                                        ))}
                                        <span>({product.reviews})</span>
                                    </div>
                                    <h3>{product.title}</h3>
                                    <p className="favorites-price">₦{product.price.toLocaleString()}</p>
                                    <button
                                        className="add-to-cart-btn"
                                        onClick={() => handleAddToCart(product)}
                                    >
                                        <ShoppingCart size={16} />
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
};

export default Favorites;
