import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useProducts } from '../context/ProductsContext';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, Check, ShoppingCart } from 'lucide-react';
import './ShopGrid.css';

const ShopGrid = ({ products }) => {
    const { addToCart, cartItems } = useCart();
    const { toggleFavorite, isFavorite } = useFavorites();
    const { rateProduct } = useProducts();
    const [addedItems, setAddedItems] = useState({});

    const handleRating = (e, productId, rating) => {
        e.preventDefault();
        e.stopPropagation();
        rateProduct(productId, rating);
    };

    const handleAddToCart = (product) => {
        addToCart(product);
        setAddedItems(prev => ({ ...prev, [product.id]: true }));
        setTimeout(() => {
            setAddedItems(prev => ({ ...prev, [product.id]: false }));
        }, 1500);
    };

    const isInCart = (productId) => {
        return cartItems.some(item => item.id === productId);
    };

    return (
        <div className="shop-grid">
            {products.map((product) => (
                <div key={product.id} className="shop-card">
                    <div className="shop-card-image-wrapper">
                        <Link to={`/product/${product.id}`}>
                            <img src={product.image} alt={product.title} className="shop-card-image" />
                        </Link>
                        {product.badge && <span className="shop-badge">{product.badge}</span>}
                        <button
                            className={`favorite-btn ${isFavorite(product.id) ? 'active' : ''}`}
                            onClick={() => toggleFavorite(product)}
                            title={isFavorite(product.id) ? 'Remove from favorites' : 'Add to favorites'}
                        >
                            <Heart size={18} fill={isFavorite(product.id) ? 'currentColor' : 'none'} />
                        </button>
                    </div>

                    <div className="shop-card-content">
                        <div className="shop-rating">
                            <div className="stars interactive">
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
                            </div>
                            <span className="review-count">({product.reviews})</span>
                        </div>

                        <Link to={`/product/${product.id}`} className="shop-card-title-link">
                            <h3 className="shop-card-title">{product.title}</h3>
                        </Link>
                        <p className="shop-card-desc">{product.description}</p>

                        <div className="shop-card-footer">
                            <span className="shop-price">₦{product.price.toLocaleString()}</span>
                            <button
                                className={`shop-add-btn ${addedItems[product.id] ? 'added' : ''}`}
                                onClick={() => handleAddToCart(product)}
                            >
                                {addedItems[product.id] ? (
                                    <>
                                        <Check size={16} />
                                        Added!
                                    </>
                                ) : (
                                    <>
                                        <ShoppingCart size={16} />
                                        Add
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ShopGrid;

