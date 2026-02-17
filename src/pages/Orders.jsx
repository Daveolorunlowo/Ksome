import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Clock, CheckCircle, Truck, ArrowLeft } from 'lucide-react';
import { useOrders } from '../context/OrdersContext';
import './Orders.css';

const Orders = () => {
    const { pendingOrders, completedOrders, updateOrderStatus } = useOrders();
    const [activeTab, setActiveTab] = useState('pending');

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-NG', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending': return <Clock size={16} />;
            case 'processing': return <Truck size={16} />;
            case 'delivered': return <CheckCircle size={16} />;
            default: return <Package size={16} />;
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case 'pending': return 'Pending';
            case 'processing': return 'On the way';
            case 'delivered': return 'Delivered';
            default: return status;
        }
    };

    const currentOrders = activeTab === 'pending' ? pendingOrders : completedOrders;

    return (
        <main className="orders-page">
            <div className="container">
                <Link to="/shop" className="back-link">
                    <ArrowLeft size={18} />
                    Back to Shop
                </Link>

                <h1 className="orders-title">
                    <Package size={28} />
                    My Orders
                </h1>

                {/* Tabs */}
                <div className="orders-tabs">
                    <button
                        className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
                        onClick={() => setActiveTab('pending')}
                    >
                        <Clock size={18} />
                        Pending
                        {pendingOrders.length > 0 && (
                            <span className="tab-badge">{pendingOrders.length}</span>
                        )}
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'completed' ? 'active' : ''}`}
                        onClick={() => setActiveTab('completed')}
                    >
                        <CheckCircle size={18} />
                        Received
                        {completedOrders.length > 0 && (
                            <span className="tab-badge">{completedOrders.length}</span>
                        )}
                    </button>
                </div>

                {/* Orders List */}
                {currentOrders.length === 0 ? (
                    <div className="orders-empty">
                        {activeTab === 'pending' ? (
                            <>
                                <Clock size={48} strokeWidth={1} />
                                <h2>No pending orders</h2>
                                <p>All your orders have been delivered!</p>
                            </>
                        ) : (
                            <>
                                <Package size={48} strokeWidth={1} />
                                <h2>No completed orders yet</h2>
                                <p>Your delivered orders will appear here.</p>
                            </>
                        )}
                        <Link to="/shop" className="btn-primary">Start Shopping</Link>
                    </div>
                ) : (
                    <div className="orders-list">
                        {currentOrders.map(order => (
                            <div key={order.id} className="order-card">
                                <div className="order-header">
                                    <div className="order-info">
                                        <h3>Order #{order.id}</h3>
                                        <p className="order-date">{formatDate(order.createdAt)}</p>
                                    </div>
                                    <div className={`order-status ${order.status}`}>
                                        {getStatusIcon(order.status)}
                                        {getStatusLabel(order.status)}
                                    </div>
                                </div>

                                <div className="order-items">
                                    {order.items.map((item, index) => (
                                        <div key={index} className="order-item">
                                            <img src={item.image} alt={item.title} />
                                            <div className="order-item-details">
                                                <h4>{item.title}</h4>
                                                <p>Qty: {item.quantity}</p>
                                            </div>
                                            <span className="order-item-price">
                                                ₦{(item.price * item.quantity).toLocaleString()}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="order-footer">
                                    <div className="order-delivery">
                                        <strong>Delivery to:</strong> {order.address}, {order.city}
                                    </div>
                                    <div className="order-total">
                                        <span>Total:</span>
                                        <strong>₦{order.total.toLocaleString()}</strong>
                                    </div>
                                </div>

                                {/* Demo: Allow marking as received */}
                                {order.status === 'pending' && (
                                    <div className="order-actions">
                                        <button
                                            className="btn-secondary"
                                            onClick={() => updateOrderStatus(order.id, 'processing')}
                                        >
                                            Mark as Processing
                                        </button>
                                    </div>
                                )}
                                {order.status === 'processing' && (
                                    <div className="order-actions">
                                        <button
                                            className="btn-primary"
                                            onClick={() => updateOrderStatus(order.id, 'delivered')}
                                        >
                                            Mark as Received
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
};

export default Orders;
