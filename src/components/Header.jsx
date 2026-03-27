import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ksomeLogo from '../assets/ksome_logo.png';
import { Menu, X, Search, Heart, ShoppingBag, User, Wallet, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useAuth } from '../context/AuthContext';
import { useUI } from '../context/UIContext';
import { products } from '../data/products';
import CartSidebar from './CartSidebar';
import './Header.css';

const Header = () => {
    const navigate = useNavigate();
    const { openComingSoon } = useUI();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef(null);
    const { cartCount, addToCart } = useCart();
    const { favoritesCount } = useFavorites();
    const { user, isAuthenticated, getWalletTotal } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close search when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowResults(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Search products
    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query.trim().length > 0) {
            const filtered = products.filter(product =>
                product.title.toLowerCase().includes(query.toLowerCase()) ||
                product.description.toLowerCase().includes(query.toLowerCase()) ||
                product.category.toLowerCase().includes(query.toLowerCase())
            );
            setSearchResults(filtered.slice(0, 5)); // Limit to 5 results
            setShowResults(true);
        } else {
            setSearchResults([]);
            setShowResults(false);
        }
    };

    const handleResultClick = (product) => {
        setSearchQuery('');
        setShowResults(false);
        navigate('/shop');
    };

    const handleAddToCart = (e, product) => {
        e.stopPropagation();
        addToCart(product);
    };

    const handleInvestmentClick = (e) => {
        e.preventDefault();
        openComingSoon();
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
                <div className="container header-inner">

                    {/* Logo - Left */}
                    <Link to="/" className="logo">
                        <img src={ksomeLogo} alt="KSOME Logo" className="logo-image" />
                    </Link>

                    {/* Desktop Nav - Center */}
                    <nav className="desktop-nav">
                        <Link to="/" className="nav-link">Home</Link>
                        <Link to="/shop" className="nav-link">Menu</Link>
                        <Link to="/special-orders" className="nav-link">Special Orders</Link>
                        <a href="#" onClick={handleInvestmentClick} className="nav-link">Investment</a>
                        <Link to="/about" className="nav-link">Our Story</Link>
                        <Link to="/support" className="nav-link">Contact</Link>
                    </nav>

                    {/* Actions - Right */}
                    <div className="header-actions">
                        {/* Search Input (Compact) */}
                        <div className="search-bar-compact" ref={searchRef}>
                            <Search size={18} className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search snacks..."
                                className="search-input"
                                value={searchQuery}
                                onChange={(e) => handleSearch(e.target.value)}
                                onFocus={() => searchQuery && setShowResults(true)}
                            />
                            {/* Search Results Dropdown Logic Here (Preserved) */}
                            <AnimatePresence>
                                {showResults && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="search-results"
                                    >
                                        {searchResults.length > 0 ? (
                                            <>
                                                <div className="search-results-header">
                                                    Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
                                                </div>
                                                {searchResults.map(product => (
                                                    <div
                                                        key={product.id}
                                                        className="search-result-item"
                                                        onClick={() => handleResultClick(product)}
                                                    >
                                                        <img src={product.image} alt={product.title} />
                                                        <div className="search-result-info">
                                                            <span className="search-result-title">{product.title}</span>
                                                            <span className="search-result-price">₦{product.price.toLocaleString()}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                                <Link
                                                    to="/shop"
                                                    className="search-view-all"
                                                    onClick={() => setShowResults(false)}
                                                >
                                                    View all products →
                                                </Link>
                                            </>
                                        ) : (
                                            <div className="search-no-results">
                                                <p>No results found.</p>
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Cart Icon Button */}
                        <button
                            className="cart-icon-btn"
                            onClick={() => setIsCartOpen(true)}
                            aria-label="Open cart"
                        >
                            <ShoppingCart size={22} />
                            {cartCount > 0 && (
                                <span className="cart-badge">{cartCount}</span>
                            )}
                        </button>

                        {isAuthenticated ? (
                            <Link to="/account" className="user-account-btn">
                                <div className="user-avatar-sm">
                                    {user.firstName.charAt(0)}
                                </div>
                            </Link>
                        ) : (
                            <Link to="/login" className="nav-link login-link">
                                Login
                            </Link>
                        )}

                        <Link to="/register" className="btn-primary-sm">
                            Join KSOME
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="mobile-menu-btn"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>

                    {/* Mobile Nav Overlay */}
                    <AnimatePresence>
                        {isMobileMenuOpen && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: '100vh' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mobile-nav"
                            >
                                <div className="mobile-nav-content">
                                    <Link to="/" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                                    <Link to="/shop" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Menu</Link>
                                    <Link to="/special-orders" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Special Orders</Link>
                                    <a href="#" className="mobile-nav-link" onClick={handleInvestmentClick}>Investment</a>
                                    <Link to="/about" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Our Story</Link>
                                    <Link to="/support" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
                                    <div className="mobile-auth-actions">
                                        <Link to="/login" className="btn-secondary" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
                                        <Link to="/register" className="btn-primary" onClick={() => setIsMobileMenuOpen(false)}>Join KSOME</Link>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </header>
            <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
};

export default Header;


