import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Package, Clock, CheckCircle, Users, TrendingUp, LogOut, Settings, Truck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrdersContext';
import './WorkerDashboard.css';

const WorkerDashboard = () => {
    const navigate = useNavigate();
    const { worker, logoutWorker } = useAuth();
    const { orders, pendingOrders, updateOrderStatus } = useOrders();

    if (!worker) {
        return (
            <main className="worker-dashboard">
                <div className="container">
                    <div className="worker-not-logged">
                        <Package size={48} strokeWidth={1} />
                        <h2>Staff access required</h2>
                        <Link to="/worker/login" className="worker-btn">Go to Staff Login</Link>
                    </div>
                </div>
            </main>
        );
    }

    const handleLogout = () => {
        logoutWorker();
        navigate('/worker/login');
    };

    const [activeTab, setActiveTab] = useState('active');

    // Filter orders
    const todayOrders = orders.filter(order => {
        const orderDate = new Date(order.createdAt).toDateString();
        return orderDate === new Date().toDateString();
    });

    const completedToday = todayOrders.filter(o => o.status === 'delivered').length;

    // History (delivered orders)
    const historyOrders = orders.filter(o => o.status === 'delivered').sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return (
        <main className="worker-dashboard">
            <div className="container">
                {/* Header */}
                <div className="worker-header">
                    <div className="worker-info">
                        <div className="worker-avatar">
                            {worker.name.charAt(0)}
                        </div>
                        <div>
                            <h1>Welcome, {worker.name}</h1>
                            <p className="worker-role">{worker.role} • Staff ID: {worker.staffId}</p>
                        </div>
                    </div>
                    <button className="logout-btn" onClick={handleLogout}>
                        <LogOut size={18} />
                        Sign Out
                    </button>
                </div>

                {/* Stats */}
                <div className="worker-stats">
                    <div className="stat-card">
                        <Clock size={24} />
                        <div className="stat-content">
                            <span className="stat-value">{pendingOrders.length}</span>
                            <span className="stat-label">Pending Orders</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <Package size={24} />
                        <div className="stat-content">
                            <span className="stat-value">{todayOrders.length}</span>
                            <span className="stat-label">Today's Orders</span>
                        </div>
                    </div>
                    <div className="stat-card completed">
                        <CheckCircle size={24} />
                        <div className="stat-content">
                            <span className="stat-value">{completedToday}</span>
                            <span className="stat-label">Delivered Today</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <TrendingUp size={24} />
                        <div className="stat-content">
                            <span className="stat-value">{orders.length}</span>
                            <span className="stat-label">Total Orders</span>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="dashboard-tabs">
                    <button
                        className={`tab-btn ${activeTab === 'active' ? 'active' : ''}`}
                        onClick={() => setActiveTab('active')}
                    >
                        Active Tasks
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
                        onClick={() => setActiveTab('history')}
                    >
                        Delivery History
                    </button>
                </div>

                {/* Content */}
                <section className="worker-section">
                    <h2 className="section-title">
                        {activeTab === 'active' ? (
                            <><Clock size={22} /> Orders to Process</>
                        ) : (
                            <><CheckCircle size={22} /> Delivery History</>
                        )}
                    </h2>

                    {activeTab === 'active' ? (
                        /* Active Tab Content */
                        <>
                            {pendingOrders.length === 0 ? (
                                <div className="no-orders">
                                    <CheckCircle size={40} />
                                    <p>All caught up! No pending orders.</p>
                                </div>
                            ) : (
                                <div className="orders-grid">
                                    {pendingOrders.map(order => (
                                        <div key={order.id} className="order-card-worker">
                                            <div className="order-card-header">
                                                <span className="order-id">#{order.id}</span>
                                                <div className="status-group">
                                                    <span className={`status-badge ${order.status}`}>
                                                        {order.status === 'pending' ? 'New' : 'Processing'}
                                                    </span>
                                                    {order.isPaid && <span className="status-badge paid">PAID</span>}
                                                </div>
                                            </div>

                                            <div className="order-customer">
                                                <Users size={16} />
                                                <span>{order.customerName}</span>
                                            </div>

                                            <div className="order-items-preview">
                                                {order.items.slice(0, 3).map((item, i) => (
                                                    <span key={i}>{item.quantity}x {item.title}</span>
                                                ))}
                                                {order.items.length > 3 && <span>+{order.items.length - 3} more</span>}
                                            </div>

                                            <div className="order-total-worker">
                                                Total: ₦{order.total.toLocaleString()}
                                            </div>

                                            <div className="order-actions-worker">
                                                {order.status === 'pending' && (
                                                    <button
                                                        className="action-btn processing"
                                                        onClick={() => updateOrderStatus(order.id, 'processing')}
                                                    >
                                                        <Truck size={16} />
                                                        Start Processing
                                                    </button>
                                                )}
                                                {order.status === 'processing' && (
                                                    <button
                                                        className="action-btn complete"
                                                        onClick={() => updateOrderStatus(order.id, 'delivered')}
                                                    >
                                                        <CheckCircle size={16} />
                                                        Mark Delivered
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        /* History Tab Content */
                        <>
                            {historyOrders.length === 0 ? (
                                <div className="no-orders">
                                    <Clock size={40} />
                                    <p>No delivered orders yet.</p>
                                </div>
                            ) : (
                                <div className="orders-grid">
                                    {historyOrders.map(order => (
                                        <div key={order.id} className="order-card-worker history">
                                            <div className="order-card-header">
                                                <span className="order-id">#{order.id}</span>
                                                <div className="status-group">
                                                    <span className="status-badge delivered">Delivered</span>
                                                    {order.isPaid && <span className="status-badge paid">PAID</span>}
                                                </div>
                                            </div>

                                            <div className="order-meta">
                                                <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                                                <span>{new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                            </div>

                                            <div className="order-customer">
                                                <Users size={16} />
                                                <span>{order.customerName}</span>
                                            </div>

                                            <div className="order-items-preview">
                                                {order.items.slice(0, 3).map((item, i) => (
                                                    <span key={i}>{item.quantity}x {item.title}</span>
                                                ))}
                                            </div>

                                            <div className="order-total-worker">
                                                ₦{order.total.toLocaleString()}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </section>
            </div>
        </main>
    );
};

export default WorkerDashboard;
