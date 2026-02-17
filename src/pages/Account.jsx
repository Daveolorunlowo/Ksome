import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Wallet, Plus, LogOut, Package, Heart, Settings, Gift, ChevronRight, Award, Copy, Share2, Check, ShoppingBag, MapPin, CreditCard, Bell, HelpCircle, Shield, X, Star, Sparkles, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import './Account.css';

const Account = () => {
    const navigate = useNavigate();
    const { user, logout, addFunds, getWalletTotal, getReferralCode, getLoyaltyLevel } = useAuth();
    const { cartCount } = useCart();
    const { favoritesCount } = useFavorites();
    const [showAddFunds, setShowAddFunds] = useState(false);
    const [fundAmount, setFundAmount] = useState('');
    const [copied, setCopied] = useState(false);
    const [showReferralModal, setShowReferralModal] = useState(false);

    // Avatar colors for displaying initials
    const avatarColors = {
        sunset: 'linear-gradient(135deg, #ff6b6b, #feca57)',
        ocean: 'linear-gradient(135deg, #4facfe, #00f2fe)',
        berry: 'linear-gradient(135deg, #a855f7, #ec4899)',
        forest: 'linear-gradient(135deg, #22c55e, #16a34a)',
        candy: 'linear-gradient(135deg, #f472b6, #fb7185)',
        sky: 'linear-gradient(135deg, #38bdf8, #818cf8)',
        fire: 'linear-gradient(135deg, #f97316, #ef4444)',
        mint: 'linear-gradient(135deg, #2dd4bf, #22d3ee)',
        grape: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
        gold: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
    };

    if (!user) {
        return (
            <main className="account-page-v2">
                <div className="container">
                    <div className="not-logged-card">
                        <div className="not-logged-icon">👋</div>
                        <h2>Welcome to KSOME!</h2>
                        <p>Sign in to access your account, track orders, and enjoy exclusive perks.</p>
                        <div className="auth-btns">
                            <Link to="/login" className="btn-signin">Sign In</Link>
                            <Link to="/register" className="btn-create">Create Account</Link>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleAddFunds = () => {
        const amount = parseFloat(fundAmount);
        if (amount > 0) {
            addFunds(amount);
            setFundAmount('');
            setShowAddFunds(false);
        }
    };

    const { level: loyaltyLevel, emoji: loyaltyEmoji } = getLoyaltyLevel();
    const memberDays = Math.floor((new Date() - new Date(user.createdAt)) / (1000 * 60 * 60 * 24));
    const referralCode = getReferralCode();
    const walletBalance = getWalletTotal();
    const currentAvatar = avatarColors[user.avatar] || avatarColors.ocean;

    const getInitials = () => {
        return `${user.firstName?.charAt(0) || ''}${user.lastName?.charAt(0) || ''}`.toUpperCase();
    };

    const handleCopyCode = () => {
        navigator.clipboard.writeText(referralCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const referralLink = `${window.location.origin}/register?ref=${referralCode}`;

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Join KSOME!',
                    text: `Use my referral code ${referralCode} to get ₦500 off your first order at KSOME!`,
                    url: referralLink
                });
            } catch (err) {
                console.log('Share cancelled');
            }
        } else {
            navigator.clipboard.writeText(referralLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const ordersNeeded = loyaltyLevel === 'Bronze' ? (26 - (user.orderCount || 0)) : loyaltyLevel === 'Silver' ? (101 - (user.orderCount || 0)) : 0;

    return (
        <main className="account-page-v2">
            {/* Profile Header */}
            <section className="profile-header-section">
                <div className="container">
                    <motion.div
                        className="profile-header-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="profile-main">
                            <div
                                className="profile-avatar"
                                style={{ background: currentAvatar }}
                            >
                                {getInitials()}
                            </div>
                            <div className="profile-details">
                                <h1>{user.firstName} {user.lastName}</h1>
                                <p className="profile-email">{user.email}</p>
                                <div className="profile-badges">
                                    <span className="badge loyalty">{loyaltyEmoji} {loyaltyLevel}</span>
                                    <span className="badge member">{memberDays} days</span>
                                </div>
                            </div>
                        </div>
                        <Link to="/settings" className="settings-btn">
                            <Settings size={20} />
                        </Link>
                    </motion.div>
                </div>
            </section>

            <div className="container">
                <div className="dashboard-grid">
                    {/* Wallet Card */}
                    <motion.div
                        className="dashboard-card wallet-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className="card-header">
                            <div className="card-icon wallet-icon">
                                <Wallet size={24} />
                            </div>
                            <h3>Wallet</h3>
                        </div>
                        <div className="wallet-balance">
                            <span className="currency">₦</span>
                            <span className="amount">{walletBalance.toLocaleString()}</span>
                        </div>
                        {!showAddFunds ? (
                            <button
                                className="add-funds-btn"
                                onClick={() => {
                                    setShowAddFunds(true);
                                    setTimeout(() => setShowAddFunds(false), 3000);
                                }}
                            >
                                <Plus size={18} />
                                Add Funds
                            </button>
                        ) : (
                            <motion.div
                                className="coming-soon-animation"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <span className="cs-emoji">👷‍♂️</span>
                                <span className="cs-text">Coming Soon!</span>
                                <span className="cs-emoji">🚧</span>
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Loyalty Card */}
                    <motion.div
                        className="dashboard-card loyalty-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                    >
                        <div className="card-header">
                            <div className="card-icon loyalty-icon">
                                <Award size={24} />
                            </div>
                            <h3>Loyalty</h3>
                        </div>
                        <div className="loyalty-level">
                            <span className="level-emoji">{loyaltyEmoji}</span>
                            <span className="level-name">{loyaltyLevel}</span>
                        </div>
                        <div className="loyalty-stats">
                            <span>{user.orderCount || 0} orders</span>
                            {loyaltyLevel !== 'Gold' && (
                                <span className="next-level">{ordersNeeded} more to next level</span>
                            )}
                        </div>
                        {loyaltyLevel !== 'Gold' && (
                            <div className="loyalty-progress">
                                <div
                                    className="progress-fill"
                                    style={{
                                        width: `${loyaltyLevel === 'Bronze'
                                            ? Math.min(((user.orderCount || 0) / 26) * 100, 100)
                                            : Math.min(((user.orderCount || 0) / 101) * 100, 100)}%`
                                    }}
                                />
                            </div>
                        )}
                    </motion.div>

                    {/* Referral Card */}
                    <motion.div
                        className="dashboard-card referral-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="card-header">
                            <div className="card-icon referral-icon">
                                <Gift size={24} />
                            </div>
                            <h3>Refer Friends</h3>
                        </div>
                        {loyaltyLevel === 'Bronze' ? (
                            <div className="referral-locked">
                                <p>🔒 Unlock at Silver level</p>
                                <span>{ordersNeeded} more orders to unlock</span>
                            </div>
                        ) : (
                            <>
                                <p className="referral-text">Share your code & earn ₦500</p>
                                <div className="referral-code-box">
                                    <span className="code">{referralCode}</span>
                                    <button className="copy-btn" onClick={handleCopyCode}>
                                        {copied ? <Check size={16} /> : <Copy size={16} />}
                                    </button>
                                </div>
                                <div className="referral-actions">
                                    <button className="share-btn" onClick={handleShare}>
                                        <Share2 size={16} />
                                        Share
                                    </button>
                                    <button className="details-btn" onClick={() => setShowReferralModal(true)}>
                                        View Details
                                    </button>
                                </div>
                                <div className="referral-stats-mini">
                                    <span>{user.referralCount || 0} referrals</span>
                                    <span>₦{((user.referralCount || 0) * 500).toLocaleString()} earned</span>
                                </div>
                            </>
                        )}
                    </motion.div>
                </div>

                {/* Quick Actions */}
                <motion.section
                    className="quick-actions"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                >
                    <h2>Quick Actions</h2>
                    <div className="actions-grid">
                        <Link to="/orders" className="action-card">
                            <div className="action-icon orders">
                                <Package size={22} />
                            </div>
                            <span>My Orders</span>
                            <ChevronRight size={18} />
                        </Link>
                        <Link to="/favorites" className="action-card">
                            <div className="action-icon favorites">
                                <Heart size={22} />
                            </div>
                            <span>Favorites</span>
                            {favoritesCount > 0 && <span className="count-badge">{favoritesCount}</span>}
                            <ChevronRight size={18} />
                        </Link>
                        <Link to="/checkout" className="action-card">
                            <div className="action-icon cart">
                                <ShoppingBag size={22} />
                            </div>
                            <span>Cart</span>
                            {cartCount > 0 && <span className="count-badge">{cartCount}</span>}
                            <ChevronRight size={18} />
                        </Link>
                        <Link to="/settings" className="action-card">
                            <div className="action-icon settings">
                                <Settings size={22} />
                            </div>
                            <span>Settings</span>
                            <ChevronRight size={18} />
                        </Link>
                    </div>
                </motion.section>

                {/* Menu Section */}
                <motion.section
                    className="menu-section"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="menu-group">
                        <h3>Account</h3>
                        <Link to="/settings" className="menu-item">
                            <User size={20} />
                            <span>Profile Settings</span>
                            <ChevronRight size={18} />
                        </Link>
                        <Link to="/settings" className="menu-item">
                            <CreditCard size={20} />
                            <span>Payment Methods</span>
                            <ChevronRight size={18} />
                        </Link>
                        <Link to="/settings" className="menu-item">
                            <MapPin size={20} />
                            <span>Saved Addresses</span>
                            <ChevronRight size={18} />
                        </Link>
                    </div>

                    <div className="menu-group">
                        <h3>Support</h3>
                        <Link to="/support" className="menu-item">
                            <HelpCircle size={20} />
                            <span>Help Center</span>
                            <ChevronRight size={18} />
                        </Link>
                        <Link to="/legal" className="menu-item">
                            <Shield size={20} />
                            <span>Privacy & Terms</span>
                            <ChevronRight size={18} />
                        </Link>
                    </div>

                    <button className="logout-btn" onClick={handleLogout}>
                        <LogOut size={20} />
                        <span>Log Out</span>
                    </button>
                </motion.section>

                {/* Loyalty Perks Section */}
                <motion.section
                    className="perks-section"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                >
                    <h2>Loyalty Perks</h2>
                    <div className="perks-grid">
                        <div className={`perk-card ${loyaltyLevel !== 'Bronze' ? 'unlocked' : 'locked'}`}>
                            <Gift size={20} />
                            <span>Referral Bonus</span>
                            <small>{loyaltyLevel !== 'Bronze' ? '₦500 per referral' : 'Silver+'}</small>
                        </div>
                        <div className={`perk-card ${loyaltyLevel === 'Gold' ? 'unlocked' : 'locked'}`}>
                            <Sparkles size={20} />
                            <span>Priority Delivery</span>
                            <small>{loyaltyLevel === 'Gold' ? 'Active' : 'Gold only'}</small>
                        </div>
                        <div className={`perk-card ${loyaltyLevel !== 'Bronze' ? 'unlocked' : 'locked'}`}>
                            <Star size={20} />
                            <span>Exclusive Deals</span>
                            <small>{loyaltyLevel !== 'Bronze' ? 'Active' : 'Silver+'}</small>
                        </div>
                        <div className={`perk-card ${loyaltyLevel === 'Gold' ? 'unlocked' : 'locked'}`}>
                            <TrendingUp size={20} />
                            <span>Double Points</span>
                            <small>{loyaltyLevel === 'Gold' ? 'Active' : 'Gold only'}</small>
                        </div>
                    </div>
                </motion.section>
            </div>

            {/* Referral Modal */}
            <AnimatePresence>
                {showReferralModal && (
                    <motion.div
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowReferralModal(false)}
                    >
                        <motion.div
                            className="referral-modal"
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="modal-close" onClick={() => setShowReferralModal(false)}>
                                <X size={20} />
                            </button>
                            <div className="modal-header">
                                <div className="modal-icon">
                                    <Gift size={32} />
                                </div>
                                <h2>Refer & Earn</h2>
                                <p>Share KSOME with friends and earn rewards!</p>
                            </div>
                            <div className="modal-body">
                                <div className="referral-code-large">
                                    <label>Your Referral Code</label>
                                    <div className="code-display">
                                        <span>{referralCode}</span>
                                        <button onClick={handleCopyCode}>
                                            {copied ? <Check size={18} /> : <Copy size={18} />}
                                            {copied ? 'Copied!' : 'Copy'}
                                        </button>
                                    </div>
                                </div>
                                <div className="referral-link-box">
                                    <label>Share Link</label>
                                    <input type="text" value={referralLink} readOnly />
                                </div>
                                <div className="referral-stats-grid">
                                    <div className="stat-box">
                                        <span className="stat-value">{user.referralCount || 0}</span>
                                        <span className="stat-label">Referrals</span>
                                    </div>
                                    <div className="stat-box">
                                        <span className="stat-value">₦{((user.referralCount || 0) * 500).toLocaleString()}</span>
                                        <span className="stat-label">Earned</span>
                                    </div>
                                </div>
                                <button className="modal-share-btn" onClick={handleShare}>
                                    <Share2 size={18} />
                                    Share with Friends
                                </button>
                            </div>
                            <div className="modal-footer">
                                <p>You earn ₦500 for each friend who signs up and places an order!</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
};

export default Account;
