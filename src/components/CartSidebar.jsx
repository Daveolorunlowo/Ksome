import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './CartSidebar.css';

const CartSidebar = ({ isOpen, onClose }) => {
    const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="cart-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Sidebar */}
                    <motion.aside
                        className="cart-sidebar"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    >
                        <div className="cart-header">
                            <h2>
                                <ShoppingBag size={22} />
                                Your Cart
                            </h2>
                            <button className="cart-close-btn" onClick={onClose}>
                                <X size={24} />
                            </button>
                        </div>

                        {cartItems.length === 0 ? (
                            <div className="cart-empty">
                                <ShoppingBag size={48} strokeWidth={1} />
                                <p>Your cart is empty</p>
                                <button className="btn-primary" onClick={onClose}>
                                    Continue Shopping
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="cart-items">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="cart-item">
                                            <img src={item.image} alt={item.title} className="cart-item-image" />
                                            <div className="cart-item-details">
                                                <h4>{item.title}</h4>
                                                <p className="cart-item-price">₦{item.price.toLocaleString()}</p>
                                                <div className="cart-item-quantity">
                                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                                        <Minus size={14} />
                                                    </button>
                                                    <span>{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                                        <Plus size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                            <button
                                                className="cart-item-remove"
                                                onClick={() => removeFromCart(item.id)}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <div className="cart-footer">
                                    <div className="cart-total">
                                        <span>Total:</span>
                                        <span className="total-amount">₦{cartTotal.toLocaleString()}</span>
                                    </div>
                                    <Link to="/checkout" className="btn-primary checkout-btn" onClick={onClose}>
                                        Checkout
                                    </Link>
                                    <button className="clear-cart-btn" onClick={clearCart}>
                                        Clear Cart
                                    </button>
                                </div>
                            </>
                        )}
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartSidebar;

