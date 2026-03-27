import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Package, Clock, CheckCircle, Users, TrendingUp, LogOut, Shield, Truck, BarChart3, ListOrdered } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrdersContext';
import './WorkerDashboard.css';

const WorkerDashboard = () => {
    const navigate = useNavigate();
    const { worker, logoutWorker, users = [] } = useAuth();
    const { orders, pendingOrders, updateOrderStatus } = useOrders();

    if (!worker) {
        return (
            <main className="admin-login-prompt">
                <div className="prompt-card">
                    <Shield size={48} />
                    <h2>Staff Access Required</h2>
                    <Link to="/worker/login" className="worker-btn">Go to Secure Login</Link>
                </div>
            </main>
        );
    }

    const handleLogout = () => {
        logoutWorker();
        navigate('/worker/login');
    };

    const isSupervisor = worker && ['Administrator', 'Supervisor', 'Delivery Manager'].some(role => worker.role.includes(role));
    const [activeTab, setActiveTab] = useState('active');

    // Filter orders
    const todayOrders = orders.filter(order => {
        const orderDate = new Date(order.createdAt).toDateString();
        return orderDate === new Date().toDateString();
    });

    const completedToday = todayOrders.filter(o => o.status === 'delivered').length;
    const historyOrders = orders.filter(o => o.status === 'delivered').sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return (
        <div className="admin-layout">
            {/* Professional Sidebar */}
            <aside className="admin-sidebar">
                <div className="sidebar-brand">
                    <Shield size={24} color="#e94560" />
                    <h2>KSOME Admin</h2>
                </div>

                <div className="sidebar-avatar-container">
                    <div className="admin-avatar">
                        {worker.name.charAt(0)}
                    </div>
                    <div className="admin-info">
                        <h3>{worker.name}</h3>
                        <p className="admin-role">{worker.role}</p>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    <button
                        className={`nav-item ${activeTab === 'active' ? 'active' : ''}`}
                        onClick={() => setActiveTab('active')}
                    >
                        <ListOrdered size={18} />
                        <span>Active Tasks</span>
                    </button>
                    <button
                        className={`nav-item ${activeTab === 'history' ? 'active' : ''}`}
                        onClick={() => setActiveTab('history')}
                    >
                        <Clock size={18} />
                        <span>Delivery History</span>
                    </button>
                    {isSupervisor && (
                        <button
                            className={`nav-item ${activeTab === 'customers' ? 'active' : ''}`}
                            onClick={() => setActiveTab('customers')}
                        >
                            <Users size={18} />
                            <span>Customers</span>
                        </button>
                    )}
                </nav>

                <button className="admin-logout-btn" onClick={handleLogout}>
                    <LogOut size={18} />
                    <span>Sign Out</span>
                </button>
            </aside>

            {/* Main Content Dashboard */}
            <main className="admin-content">
                <header className="admin-header">
                    <h1>Dashboard Overview</h1>
                    <p>Manage orders, deliveries, and customer relationships.</p>
                </header>

                <div className="admin-stats-grid">
                    <div className="admin-stat-card">
                        <div className="stat-icon-wrapper primary">
                            <Package size={24} />
                        </div>
                        <div className="admin-stat-info">
                            <span className="admin-stat-value">{pendingOrders.length}</span>
                            <span className="admin-stat-label">Pending Orders</span>
                        </div>
                    </div>
                    <div className="admin-stat-card">
                        <div className="stat-icon-wrapper">
                            <BarChart3 size={24} />
                        </div>
                        <div className="admin-stat-info">
                            <span className="admin-stat-value">{todayOrders.length}</span>
                            <span className="admin-stat-label">Today's Volume</span>
                        </div>
                    </div>
                    <div className="admin-stat-card">
                        <div className="stat-icon-wrapper success">
                            <CheckCircle size={24} />
                        </div>
                        <div className="admin-stat-info">
                            <span className="admin-stat-value">{completedToday}</span>
                            <span className="admin-stat-label">Delivered Today</span>
                        </div>
                    </div>
                    <div className="admin-stat-card">
                        <div className="stat-icon-wrapper">
                            <TrendingUp size={24} />
                        </div>
                        <div className="admin-stat-info">
                            <span className="admin-stat-value">{orders.length}</span>
                            <span className="admin-stat-label">Total Fulfillment</span>
                        </div>
                    </div>
                </div>

                <section className="admin-main-section">
                    <h2 className="admin-section-title">
                        {activeTab === 'active' && <><ListOrdered size={24} /> Active Order Queue</>}
                        {activeTab === 'history' && <><CheckCircle size={24} /> Historical Fulfillment</>}
                        {activeTab === 'customers' && <><Users size={24} /> Client Directory</>}
                    </h2>

                    {activeTab === 'active' && (
                        <>
                            {pendingOrders.length === 0 ? (
                                <div className="admin-empty-state">
                                    <CheckCircle size={48} />
                                    <h3>Queue is empty</h3>
                                    <p>All active orders have been processed and dispatched.</p>
                                </div>
                            ) : (
                                <div className="orders-grid">
                                    {pendingOrders.map(order => (
                                        <div key={order.id} className="admin-order-card">
                                            <div className="card-header">
                                                <div className="order-id-block">
                                                    <h4>Order #{order.id}</h4>
                                                    <div className="order-meta-info">
                                                        {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} •
                                                        {order.isPaid ? <span style={{ color: '#10b981' }}>PAID</span> : 'UNPAID'}
                                                    </div>
                                                </div>
                                                <span className={`admin-badge ${order.status}`}>
                                                    {order.status === 'pending' ? 'Ready' : 'In Transit'}
                                                </span>
                                            </div>

                                            <div className="customer-detail">
                                                <div className="customer-info-left">
                                                    <div className="customer-avatar-sm">
                                                        {order.customerName.charAt(0)}
                                                    </div>
                                                    <div className="customer-text">
                                                        <h5>{order.customerName}</h5>
                                                    </div>
                                                </div>
                                                <div className="order-amount">
                                                    ₦{order.total.toLocaleString()}
                                                </div>
                                            </div>

                                            <div className="item-list-compact">
                                                {order.items.slice(0, 3).map((item, i) => (
                                                    <span key={i}>{item.quantity}x {item.title}</span>
                                                ))}
                                                {order.items.length > 3 && <span>+{order.items.length - 3} additional items</span>}
                                            </div>

                                            <div className="card-actions">
                                                {order.status === 'pending' && (
                                                    <button
                                                        className="admin-btn primary"
                                                        onClick={() => updateOrderStatus(order.id, 'processing')}
                                                    >
                                                        <Truck size={16} />
                                                        Dispatch Run
                                                    </button>
                                                )}
                                                {order.status === 'processing' && (
                                                    <button
                                                        className="admin-btn success"
                                                        onClick={() => updateOrderStatus(order.id, 'delivered')}
                                                    >
                                                        <CheckCircle size={16} />
                                                        Mark Complete
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}

                    {activeTab === 'history' && (
                        <>
                            {historyOrders.length === 0 ? (
                                <div className="admin-empty-state">
                                    <Clock size={48} />
                                    <h3>No historical data</h3>
                                    <p>Completed orders will populate here.</p>
                                </div>
                            ) : (
                                <div className="orders-grid">
                                    {historyOrders.map(order => (
                                        <div key={order.id} className="admin-order-card">
                                            <div className="card-header">
                                                <div className="order-id-block">
                                                    <h4>Order #{order.id}</h4>
                                                    <div className="order-meta-info">
                                                        {new Date(order.createdAt).toLocaleDateString()}
                                                    </div>
                                                </div>
                                                <span className="admin-badge delivered">Fulfilled</span>
                                            </div>

                                            <div className="customer-detail">
                                                <div className="customer-info-left">
                                                    <div className="customer-avatar-sm">
                                                        {order.customerName.charAt(0)}
                                                    </div>
                                                    <div className="customer-text">
                                                        <h5>{order.customerName}</h5>
                                                    </div>
                                                </div>
                                                <div className="order-amount">
                                                    ₦{order.total.toLocaleString()}
                                                </div>
                                            </div>

                                            <div className="item-list-compact">
                                                {order.items.slice(0, 3).map((item, i) => (
                                                    <span key={i}>{item.quantity}x {item.title}</span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}

                    {activeTab === 'customers' && (
                        <>
                            {(!users || users.length === 0) ? (
                                <div className="admin-empty-state">
                                    <Users size={48} />
                                    <h3>Directory Empty</h3>
                                    <p>No customer profiles generated.</p>
                                </div>
                            ) : (
                                <div className="orders-grid">
                                    {users.map(customer => (
                                        <div key={customer.id} className="admin-order-card">
                                            <div className="customer-detail" style={{ padding: '0 0 16px', borderBottom: '1px solid #27272a' }}>
                                                <div className="customer-info-left">
                                                    <div className="customer-avatar-sm" style={{ width: 48, height: 48, fontSize: '1.2rem' }}>
                                                        {customer.firstName.charAt(0)}{customer.lastName.charAt(0)}
                                                    </div>
                                                    <div className="customer-text">
                                                        <h5>{customer.firstName} {customer.lastName}</h5>
                                                        <p>UID: {customer.id.substring(0, 8)}...</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="item-list-compact" style={{ background: 'transparent', padding: '16px 0', border: 'none', gap: '12px' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <span>Email Address:</span>
                                                    <span style={{ color: '#e4e4e7' }}>{customer.email}</span>
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <span>Contact Number:</span>
                                                    <span style={{ color: '#e4e4e7' }}>{customer.phone}</span>
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <span>Lifetime Orders:</span>
                                                    <span className="admin-badge delivered">{customer.orderCount || 0}</span>
                                                </div>
                                            </div>

                                            <div className="card-actions" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                                                <span style={{ fontSize: '0.85rem', color: '#a1a1aa' }}>Available Wallet Credit</span>
                                                <div className="order-amount">
                                                    ₦{(customer.wallet?.balance || 0).toLocaleString()}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </section>
            </main>
        </div>
    );
};

export default WorkerDashboard;
