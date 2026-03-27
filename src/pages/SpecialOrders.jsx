import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ChefHat, Users, Calendar, Phone, Mail, User, FileText, Utensils } from 'lucide-react';
import './SpecialOrders.css';

const freshDelicacies = [
    { id: 'pepper_soup', name: 'Pepper Soup', note: 'Served hot, cannot be preserved' },
    { id: 'moi_moi', name: 'Moi Moi', note: 'Freshly steamed bean pudding' },
    { id: 'akara', name: 'Akara (Bean Cakes)', note: 'Fried fresh to order' },
    { id: 'ogi', name: 'Ogi (Pap)', note: 'Freshly prepared, served warm' },
    { id: 'jollof_rice', name: 'Jollof Rice', note: 'Freshly cooked party jollof' },
    { id: 'fried_rice', name: 'Fried Rice', note: 'Freshly cooked with vegetables' },
    { id: 'puff_puff_fresh', name: 'Hot Puff Puff', note: 'Fried fresh in batches' },
    { id: 'suya', name: 'Suya Skewers', note: 'Grilled fresh to order' },
    { id: 'other', name: 'Other (describe below)', note: '' },
];

const eventTypes = [
    'Wedding', 'Birthday Party', 'Corporate Event', 'Funeral/Wake',
    'Naming Ceremony', 'Graduation', 'Religious Event', 'Other'
];

const SpecialOrders = () => {
    const [activeTab, setActiveTab] = useState('fresh');
    const [submitted, setSubmitted] = useState(false);
    const [referenceNumber, setReferenceNumber] = useState('');

    // Fresh Delicacy Form State
    const [freshForm, setFreshForm] = useState({
        selectedItems: [],
        quantity: '',
        deliveryDate: '',
        deliveryTime: '',
        description: '',
        name: '',
        phone: '',
        email: '',
    });

    // Bulk/Event Form State
    const [bulkForm, setBulkForm] = useState({
        eventType: '',
        numberOfGuests: '',
        menuDescription: '',
        deliveryDate: '',
        deliveryTime: '',
        venue: '',
        description: '',
        name: '',
        phone: '',
        email: '',
    });

    const toggleFreshItem = (id) => {
        setFreshForm(prev => ({
            ...prev,
            selectedItems: prev.selectedItems.includes(id)
                ? prev.selectedItems.filter(i => i !== id)
                : [...prev.selectedItems, id]
        }));
    };

    const generateRef = () => `KSO-${Date.now().toString().slice(-6)}`;

    const handleFreshSubmit = (e) => {
        e.preventDefault();
        const ref = generateRef();
        const order = {
            type: 'fresh',
            ref,
            ...freshForm,
            createdAt: new Date().toISOString()
        };
        const existing = JSON.parse(localStorage.getItem('ksome-special-orders') || '[]');
        localStorage.setItem('ksome-special-orders', JSON.stringify([order, ...existing]));
        setReferenceNumber(ref);
        setSubmitted(true);
    };

    const handleBulkSubmit = (e) => {
        e.preventDefault();
        const ref = generateRef();
        const order = {
            type: 'bulk',
            ref,
            ...bulkForm,
            createdAt: new Date().toISOString()
        };
        const existing = JSON.parse(localStorage.getItem('ksome-special-orders') || '[]');
        localStorage.setItem('ksome-special-orders', JSON.stringify([order, ...existing]));
        setReferenceNumber(ref);
        setSubmitted(true);
    };

    const handleNewOrder = () => {
        setSubmitted(false);
        setReferenceNumber('');
        setFreshForm({ selectedItems: [], quantity: '', deliveryDate: '', deliveryTime: '', description: '', name: '', phone: '', email: '' });
        setBulkForm({ eventType: '', numberOfGuests: '', menuDescription: '', deliveryDate: '', deliveryTime: '', venue: '', description: '', name: '', phone: '', email: '' });
    };

    if (submitted) {
        return (
            <div className="special-orders-page">
                <motion.div
                    className="confirmation-container"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="confirmation-icon">
                        <CheckCircle size={64} strokeWidth={1.5} />
                    </div>
                    <h1>Order Request Received!</h1>
                    <p>Thank you for your special order request. Our team will review your order and contact you within <strong>24 hours</strong> to confirm details and pricing.</p>
                    <div className="reference-box">
                        <span className="ref-label">Your Reference Number</span>
                        <span className="ref-number">{referenceNumber}</span>
                        <span className="ref-note">Please save this for follow-up inquiries</span>
                    </div>
                    <div className="confirmation-actions">
                        <button className="btn-primary" onClick={handleNewOrder}>
                            Place Another Order
                        </button>
                        <a href="tel:+2348000000000" className="btn-secondary">
                            Call Us Now
                        </a>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="special-orders-page">
            {/* Hero */}
            <section className="special-orders-hero">
                <div className="container">
                    <motion.div
                        className="hero-content"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="hero-badge">
                            <ChefHat size={18} />
                            Made to Order
                        </div>
                        <h1>Special Orders</h1>
                        <p>
                            Want something fresh from our kitchen, or planning a big event?
                            Tell us exactly what you need and we'll make it happen.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Tabs */}
            <section className="special-orders-body">
                <div className="container">
                    <div className="order-tabs">
                        <button
                            className={`order-tab ${activeTab === 'fresh' ? 'active' : ''}`}
                            onClick={() => setActiveTab('fresh')}
                        >
                            <Utensils size={20} />
                            Fresh Delicacies
                        </button>
                        <button
                            className={`order-tab ${activeTab === 'bulk' ? 'active' : ''}`}
                            onClick={() => setActiveTab('bulk')}
                        >
                            <Users size={20} />
                            Bulk / Event Order
                        </button>
                    </div>

                    <AnimatePresence mode="wait">
                        {activeTab === 'fresh' ? (
                            <motion.div
                                key="fresh"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="tab-description">
                                    <p>Order fresh-made delicacies that are prepared <strong>on the day of delivery</strong>. These items cannot be pre-packaged or preserved — they're made fresh just for you.</p>
                                </div>
                                <form onSubmit={handleFreshSubmit} className="special-order-form">
                                    {/* Item Selection */}
                                    <div className="form-section">
                                        <h3><Utensils size={18} /> Select Your Items</h3>
                                        <div className="item-grid">
                                            {freshDelicacies.map(item => (
                                                <label
                                                    key={item.id}
                                                    className={`item-card ${freshForm.selectedItems.includes(item.id) ? 'selected' : ''}`}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={freshForm.selectedItems.includes(item.id)}
                                                        onChange={() => toggleFreshItem(item.id)}
                                                    />
                                                    <div className="item-card-content">
                                                        <span className="item-name">{item.name}</span>
                                                        {item.note && <span className="item-note">{item.note}</span>}
                                                    </div>
                                                    <div className="item-check">✓</div>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Quantity & Date */}
                                    <div className="form-section">
                                        <h3><Calendar size={18} /> Quantity & Delivery</h3>
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>Quantity / Portions</label>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    placeholder="e.g. 10 portions"
                                                    value={freshForm.quantity}
                                                    onChange={e => setFreshForm({ ...freshForm, quantity: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Preferred Delivery Date</label>
                                                <input
                                                    type="date"
                                                    min={new Date().toISOString().split('T')[0]}
                                                    value={freshForm.deliveryDate}
                                                    onChange={e => setFreshForm({ ...freshForm, deliveryDate: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Preferred Time</label>
                                                <input
                                                    type="time"
                                                    value={freshForm.deliveryTime}
                                                    onChange={e => setFreshForm({ ...freshForm, deliveryTime: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Custom Description */}
                                    <div className="form-section">
                                        <h3><FileText size={18} /> Describe Your Order</h3>
                                        <div className="form-group">
                                            <label>Special Instructions & Details</label>
                                            <textarea
                                                rows={5}
                                                placeholder="Tell us exactly how you want it — spice level, serving style, packaging, allergies, or anything else we should know..."
                                                value={freshForm.description}
                                                onChange={e => setFreshForm({ ...freshForm, description: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Contact Info */}
                                    <div className="form-section">
                                        <h3><User size={18} /> Your Contact Details</h3>
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>Full Name</label>
                                                <input
                                                    type="text"
                                                    placeholder="Your name"
                                                    value={freshForm.name}
                                                    onChange={e => setFreshForm({ ...freshForm, name: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Phone Number</label>
                                                <input
                                                    type="tel"
                                                    placeholder="e.g. 08012345678"
                                                    value={freshForm.phone}
                                                    onChange={e => setFreshForm({ ...freshForm, phone: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Email Address</label>
                                                <input
                                                    type="email"
                                                    placeholder="your@email.com"
                                                    value={freshForm.email}
                                                    onChange={e => setFreshForm({ ...freshForm, email: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <button type="submit" className="submit-order-btn">
                                        <ChefHat size={20} />
                                        Submit Fresh Order Request
                                    </button>
                                </form>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="bulk"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="tab-description">
                                    <p>Catering for a big event? We handle everything from weddings to corporate lunches. Tell us about your event and we'll put together a custom menu and quote for you.</p>
                                </div>
                                <form onSubmit={handleBulkSubmit} className="special-order-form">
                                    {/* Event Details */}
                                    <div className="form-section">
                                        <h3><Users size={18} /> Event Details</h3>
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>Type of Event</label>
                                                <select
                                                    value={bulkForm.eventType}
                                                    onChange={e => setBulkForm({ ...bulkForm, eventType: e.target.value })}
                                                    required
                                                >
                                                    <option value="">Select event type...</option>
                                                    {eventTypes.map(et => (
                                                        <option key={et} value={et}>{et}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>Number of Guests</label>
                                                <input
                                                    type="number"
                                                    min="10"
                                                    placeholder="e.g. 150"
                                                    value={bulkForm.numberOfGuests}
                                                    onChange={e => setBulkForm({ ...bulkForm, numberOfGuests: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>Event Date</label>
                                                <input
                                                    type="date"
                                                    min={new Date().toISOString().split('T')[0]}
                                                    value={bulkForm.deliveryDate}
                                                    onChange={e => setBulkForm({ ...bulkForm, deliveryDate: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Serving Time</label>
                                                <input
                                                    type="time"
                                                    value={bulkForm.deliveryTime}
                                                    onChange={e => setBulkForm({ ...bulkForm, deliveryTime: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Event Venue / Location</label>
                                                <input
                                                    type="text"
                                                    placeholder="Address or area"
                                                    value={bulkForm.venue}
                                                    onChange={e => setBulkForm({ ...bulkForm, venue: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Menu Description */}
                                    <div className="form-section">
                                        <h3><Utensils size={18} /> Menu Preferences</h3>
                                        <div className="form-group">
                                            <label>What would you like on the menu?</label>
                                            <textarea
                                                rows={4}
                                                placeholder="e.g. Jollof rice, fried chicken, puff puff, chin chin, moi moi... or tell us your budget and we'll suggest a menu"
                                                value={bulkForm.menuDescription}
                                                onChange={e => setBulkForm({ ...bulkForm, menuDescription: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Additional Details */}
                                    <div className="form-section">
                                        <h3><FileText size={18} /> Additional Details</h3>
                                        <div className="form-group">
                                            <label>Any other instructions or requests?</label>
                                            <textarea
                                                rows={4}
                                                placeholder="Dietary restrictions, serving style (buffet/plated), packaging preferences, special requirements..."
                                                value={bulkForm.description}
                                                onChange={e => setBulkForm({ ...bulkForm, description: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    {/* Contact Info */}
                                    <div className="form-section">
                                        <h3><User size={18} /> Your Contact Details</h3>
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>Full Name</label>
                                                <input
                                                    type="text"
                                                    placeholder="Your name"
                                                    value={bulkForm.name}
                                                    onChange={e => setBulkForm({ ...bulkForm, name: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Phone Number</label>
                                                <input
                                                    type="tel"
                                                    placeholder="e.g. 08012345678"
                                                    value={bulkForm.phone}
                                                    onChange={e => setBulkForm({ ...bulkForm, phone: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Email Address</label>
                                                <input
                                                    type="email"
                                                    placeholder="your@email.com"
                                                    value={bulkForm.email}
                                                    onChange={e => setBulkForm({ ...bulkForm, email: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <button type="submit" className="submit-order-btn">
                                        <Users size={20} />
                                        Submit Event Order Request
                                    </button>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>
        </div>
    );
};

export default SpecialOrders;
