import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Truck, CreditCard, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrdersContext';
import { useAuth } from '../context/AuthContext';
import './Checkout.css';

const Checkout = () => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const { addOrder } = useOrders();
    const { user, incrementOrderCount } = useAuth();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderComplete, setOrderComplete] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('cod'); // Default to COD
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        notes: ''
    });

    const nigerianStates = [
        "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River",
        "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT - Abuja", "Gombe", "Imo", "Jigawa", "Kaduna",
        "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo",
        "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
    ];

    // Delivery logic based on Company Location: Ororuwo, Osun State
    const getDeliveryFee = (state) => {
        if (!state) return 0;
        const normalizedState = state.toLowerCase();

        // Zone 1: Local (Osun)
        if (normalizedState === 'osun') return 1500;

        // Zone 2: South West / Nearby (Lagos, Oyo, Ogun, Ekiti, Ondo, Kwara)
        if (['lagos', 'oyo', 'ogun', 'ekiti', 'ondo', 'kwara'].includes(normalizedState)) return 3000;

        // Zone 3: Rest of Nigeria
        return 5500;
    };

    const deliveryFee = getDeliveryFee(formData.state);
    const subTotal = cartTotal + deliveryFee;

    // Calculate final total based on payment method
    const orderTotal = subTotal; // Only COD available now

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Pay on Delivery (COD)
        // Simulate processing delay
        setTimeout(() => {
            const newOrderId = addOrder({
                items: [...cartItems],
                subtotal: cartTotal,
                deliveryFee,
                total: orderTotal,
                customerName: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                city: formData.city,
                state: formData.state,
                notes: formData.notes,
                isPaid: false,
                paymentMethod: 'cod'
            });

            completeOrderProcess(newOrderId);
        }, 1500);
    };

    if (cartItems.length === 0 && !orderComplete) {
        return (
            <main className="checkout-page">
                <div className="container">
                    <div className="checkout-empty">
                        <h2>Your cart is empty</h2>
                        <p>Add some items to your cart before checking out.</p>
                        <Link to="/shop" className="btn-primary">Browse Products</Link>
                    </div>
                </div>
            </main>
        );
    }

    if (orderComplete) {
        return (
            <main className="checkout-page">
                <div className="container">
                    <div className="order-success">
                        <CheckCircle size={64} />
                        <h1>Order Placed Successfully!</h1>
                        <p>Thank you for your order. We'll send you a confirmation email shortly.</p>
                        <p className="order-number">Order #{orderId}</p>
                        <div className="success-actions">
                            <Link to="/orders" className="btn-primary">View My Orders</Link>
                            <Link to="/shop" className="btn-secondary">Continue Shopping</Link>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="checkout-page">
            <div className="container">
                <Link to="/shop" className="back-link">
                    <ArrowLeft size={18} />
                    Back to Shop
                </Link>

                <h1 className="checkout-title">Checkout</h1>

                <div className="checkout-layout">
                    {/* Form Section */}
                    <form className="checkout-form" onSubmit={handleSubmit}>
                        <section className="form-section">
                            <h2>
                                <Truck size={20} />
                                Delivery Information
                            </h2>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="firstName">First Name *</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastName">Last Name *</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="email">Email *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">Phone Number *</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="address">Delivery Address *</label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="Street address"
                                    required
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="city">City *</label>
                                    <input
                                        type="text"
                                        id="city"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="state">State *</label>
                                    <select
                                        id="state"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select State</option>
                                        {nigerianStates.map(state => (
                                            <option key={state} value={state.toLowerCase()}>{state}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="notes">Order Notes (Optional)</label>
                                <textarea
                                    id="notes"
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    placeholder="Any special requests or delivery instructions..."
                                    rows={3}
                                />
                            </div>
                        </section>

                        <section className="form-section">
                            <h2>
                                <CreditCard size={20} />
                                Payment Method
                            </h2>
                            <div className="payment-options">
                                <label className="payment-option selected">
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="cod"
                                        checked={true}
                                        readOnly
                                    />
                                    <span className="payment-label">
                                        <strong>Pay on Delivery</strong>
                                        <small>Pay with cash or transfer when your order arrives</small>
                                    </span>
                                </label>
                            </div>
                        </section>

                        <button
                            type="submit"
                            className="btn-primary place-order-btn"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Processing...' : `Place Order (₦${orderTotal.toLocaleString()})`}
                        </button>
                    </form>

                    {/* Order Summary */}
                    <aside className="order-summary">
                        <h2>Order Summary</h2>
                        <div className="summary-items">
                            {cartItems.map(item => (
                                <div key={item.id} className="summary-item">
                                    <img src={item.image} alt={item.title} />
                                    <div className="summary-item-details">
                                        <h4>{item.title}</h4>
                                        <p>Qty: {item.quantity}</p>
                                    </div>
                                    <span className="summary-item-price">
                                        ₦{(item.price * item.quantity).toLocaleString()}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="summary-totals">
                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>₦{cartTotal.toLocaleString()}</span>
                            </div>
                            <div className="summary-row">
                                <span>Delivery</span>
                                <span>₦{deliveryFee.toLocaleString()}</span>
                            </div>
                            <div className="summary-row total">
                                <span>Total</span>
                                <span>₦{orderTotal.toLocaleString()}</span>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
};

export default Checkout;
