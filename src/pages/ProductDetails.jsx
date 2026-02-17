import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductsContext';
import { useCart } from '../context/CartContext';
import { Star, ShoppingCart, ArrowLeft, User, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import './ProductDetails.css';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { products, addReview } = useProducts();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [activeTab, setActiveTab] = useState('description');

    // Review Form State
    const [reviewForm, setReviewForm] = useState({
        user: '',
        rating: 5,
        comment: ''
    });

    useEffect(() => {
        const found = products.find(p => p.id === parseInt(id));
        if (found) {
            setProduct(found);
        } else {
            // Handle not found
            navigate('/shop');
        }
    }, [id, products, navigate]);

    if (!product) return <div className="loading">Loading...</div>;

    const handleAddToCart = () => {
        addToCart(product);
        // Optional: Show toast
    };

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        addReview(product.id, {
            user: reviewForm.user || "Anonymous",
            rating: reviewForm.rating,
            comment: reviewForm.comment
        });
        setReviewForm({ user: '', rating: 5, comment: '' }); // Reset
    };

    return (
        <div className="product-details-page">
            <div className="container">
                <button onClick={() => navigate(-1)} className="back-btn">
                    <ArrowLeft size={20} /> Back
                </button>

                <div className="product-main-grid">
                    {/* Product Image */}
                    <motion.div
                        className="product-image-section"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <img src={product.image} alt={product.title} className="detail-image" />
                        {product.badge && <span className="detail-badge">{product.badge}</span>}
                    </motion.div>

                    {/* Product Info */}
                    <motion.div
                        className="product-info-section"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <h1 className="detail-title">{product.title}</h1>

                        <div className="detail-meta">
                            <span className="detail-price">₦{product.price.toLocaleString()}</span>
                            <div className="detail-rating">
                                <Star fill="#FFC107" color="#FFC107" size={20} />
                                <span>{product.rating} ({product.reviews} reviews)</span>
                            </div>
                        </div>

                        <p className="detail-description">{product.description}</p>

                        <button onClick={handleAddToCart} className="add-cart-btn-large">
                            <ShoppingCart size={20} />
                            Add to Cart
                        </button>

                        <div className="product-tabs">
                            <button
                                className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
                                onClick={() => setActiveTab('description')}
                            >
                                Description
                            </button>
                            <button
                                className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
                                onClick={() => setActiveTab('reviews')}
                            >
                                Reviews ({product.reviews})
                            </button>
                        </div>

                        <div className="tab-content">
                            {activeTab === 'description' && (
                                <div className="description-content">
                                    <p>Experience the authentic taste of {product.title}. Prepared fresh daily with premium ingredients.</p>
                                    <ul>
                                        <li>Freshly made</li>
                                        <li>Premium ingredients</li>
                                        <li>Authentic recipe</li>
                                    </ul>
                                </div>
                            )}

                            {activeTab === 'reviews' && (
                                <div className="reviews-content">
                                    {/* Review List */}
                                    <div className="review-list">
                                        {product.reviewList && product.reviewList.length > 0 ? (
                                            product.reviewList.map(review => (
                                                <div key={review.id} className="review-item">
                                                    <div className="review-header">
                                                        <span className="review-user"><User size={14} /> {review.user}</span>
                                                        <span className="review-date"><Clock size={14} /> {new Date(review.date).toLocaleDateString()}</span>
                                                    </div>
                                                    <div className="review-stars">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                size={12}
                                                                fill={i < review.rating ? "#FFC107" : "none"}
                                                                color={i < review.rating ? "#FFC107" : "#e4e5e9"}
                                                            />
                                                        ))}
                                                    </div>
                                                    <p className="review-comment">{review.comment}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="no-reviews">No written reviews yet. Be the first!</p>
                                        )}
                                    </div>

                                    {/* Add Review Form */}
                                    <form onSubmit={handleReviewSubmit} className="add-review-form">
                                        <h3>Write a Review</h3>
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input
                                                type="text"
                                                value={reviewForm.user}
                                                onChange={e => setReviewForm({ ...reviewForm, user: e.target.value })}
                                                placeholder="Your Name"
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Rating</label>
                                            <div className="star-input">
                                                {[1, 2, 3, 4, 5].map(star => (
                                                    <Star
                                                        key={star}
                                                        size={24}
                                                        fill={star <= reviewForm.rating ? "#FFC107" : "none"}
                                                        color={star <= reviewForm.rating ? "#FFC107" : "#e4e5e9"}
                                                        onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                                                        style={{ cursor: 'pointer' }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Review</label>
                                            <textarea
                                                value={reviewForm.comment}
                                                onChange={e => setReviewForm({ ...reviewForm, comment: e.target.value })}
                                                placeholder="Sharing your experience..."
                                                required
                                            ></textarea>
                                        </div>
                                        <button type="submit" className="submit-review-btn">Submit Review</button>
                                    </form>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
