import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, User, Star, Heart, Crown, Sparkles, Leaf, Diamond, Zap, Sun, Moon, Palette, Save, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import './Settings.css';

const Settings = () => {
    const navigate = useNavigate();
    const { user, updateProfile, getLoyaltyLevel } = useAuth();
    const [saveMessage, setSaveMessage] = useState('');
    const [activeSection, setActiveSection] = useState('profile');

    // Form state
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: ''
    });

    // Colorful avatar options - vibrant gradients with initials
    const avatarOptions = [
        { id: 'sunset', gradient: 'linear-gradient(135deg, #ff6b6b, #feca57)', name: 'Sunset' },
        { id: 'ocean', gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)', name: 'Ocean' },
        { id: 'berry', gradient: 'linear-gradient(135deg, #a855f7, #ec4899)', name: 'Berry' },
        { id: 'forest', gradient: 'linear-gradient(135deg, #22c55e, #16a34a)', name: 'Forest' },
        { id: 'candy', gradient: 'linear-gradient(135deg, #f472b6, #fb7185)', name: 'Candy' },
        { id: 'sky', gradient: 'linear-gradient(135deg, #38bdf8, #818cf8)', name: 'Sky' },
        { id: 'fire', gradient: 'linear-gradient(135deg, #f97316, #ef4444)', name: 'Fire' },
        { id: 'mint', gradient: 'linear-gradient(135deg, #2dd4bf, #22d3ee)', name: 'Mint' },
        { id: 'grape', gradient: 'linear-gradient(135deg, #8b5cf6, #6366f1)', name: 'Grape' },
        { id: 'gold', gradient: 'linear-gradient(135deg, #fbbf24, #f59e0b)', name: 'Gold' },
        { id: 'rose', gradient: 'linear-gradient(135deg, #fb7185, #f43f5e)', name: 'Rose' },
        { id: 'emerald', gradient: 'linear-gradient(135deg, #34d399, #10b981)', name: 'Emerald' },
        { id: 'coral', gradient: 'linear-gradient(135deg, #fb923c, #f472b6)', name: 'Coral' },
        { id: 'arctic', gradient: 'linear-gradient(135deg, #67e8f9, #a5b4fc)', name: 'Arctic' },
        { id: 'volcano', gradient: 'linear-gradient(135deg, #dc2626, #ea580c)', name: 'Volcano' },
        { id: 'aurora', gradient: 'linear-gradient(135deg, #4ade80, #22d3ee)', name: 'Aurora' },
        { id: 'twilight', gradient: 'linear-gradient(135deg, #c084fc, #f472b6)', name: 'Twilight' },
        { id: 'honey', gradient: 'linear-gradient(135deg, #fcd34d, #fbbf24)', name: 'Honey' }
    ];

    // Theme options
    const themeOptions = [
        { id: 'teal', name: 'Ocean Teal', primary: '#0d9488', secondary: '#06b6d4', gradient: 'linear-gradient(135deg, #0d9488, #06b6d4)' },
        { id: 'purple', name: 'Royal Purple', primary: '#7c3aed', secondary: '#a855f7', gradient: 'linear-gradient(135deg, #7c3aed, #a855f7)' },
        { id: 'rose', name: 'Rose Pink', primary: '#e11d48', secondary: '#f43f5e', gradient: 'linear-gradient(135deg, #e11d48, #f43f5e)' },
        { id: 'amber', name: 'Warm Amber', primary: '#d97706', secondary: '#f59e0b', gradient: 'linear-gradient(135deg, #d97706, #f59e0b)' },
        { id: 'emerald', name: 'Fresh Emerald', primary: '#059669', secondary: '#10b981', gradient: 'linear-gradient(135deg, #059669, #10b981)' },
        { id: 'blue', name: 'Classic Blue', primary: '#2563eb', secondary: '#3b82f6', gradient: 'linear-gradient(135deg, #2563eb, #3b82f6)' }
    ];

    // Get current selections
    const currentAvatar = avatarOptions.find(a => a.id === user?.avatar) || avatarOptions[0];
    const currentTheme = themeOptions.find(t => t.id === user?.theme) || themeOptions[0];
    const { level: loyaltyLevel, emoji: loyaltyEmoji } = getLoyaltyLevel ? getLoyaltyLevel() : { level: 'Bronze', emoji: '🥉' };

    // Initialize form with user data
    useEffect(() => {
        if (user) {
            setFormData({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                phone: user.phone || ''
            });
        }
    }, [user]);

    // Apply theme on selection
    const selectTheme = (theme) => {
        updateProfile({ theme: theme.id });
        document.documentElement.style.setProperty('--color-primary', theme.primary);
        document.documentElement.style.setProperty('--color-secondary', theme.secondary);
        showSaveMessage('Theme updated!');
    };

    // Select avatar
    const selectAvatar = (avatarId) => {
        updateProfile({ avatar: avatarId });
        showSaveMessage('Avatar updated!');
    };

    // Save profile
    const saveProfile = () => {
        updateProfile(formData);
        showSaveMessage('Profile saved!');
    };

    const showSaveMessage = (message) => {
        setSaveMessage(message);
        setTimeout(() => setSaveMessage(''), 2000);
    };

    const handleInputChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    // Get user initials
    const getInitials = () => {
        if (!user) return 'U';
        return `${user.firstName?.charAt(0) || ''}${user.lastName?.charAt(0) || ''}`.toUpperCase();
    };

    if (!user) {
        return (
            <main className="settings-page">
                <div className="container">
                    <div className="settings-not-logged">
                        <h2>Please log in to access settings</h2>
                        <Link to="/login" className="btn-primary">Login</Link>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="settings-page">
            {/* Header */}
            <div className="settings-header">
                <div className="container">
                    <Link to="/account" className="back-link">
                        <ArrowLeft size={20} />
                        Back to Account
                    </Link>
                    <h1>Settings</h1>
                    <p>Customize your profile and preferences</p>
                </div>
            </div>

            {/* Success Message */}
            {saveMessage && (
                <motion.div
                    className="save-toast"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                >
                    <Check size={18} />
                    {saveMessage}
                </motion.div>
            )}

            <div className="container">
                <div className="settings-layout">
                    {/* Sidebar Navigation */}
                    <nav className="settings-nav">
                        <button
                            className={`nav-item ${activeSection === 'profile' ? 'active' : ''}`}
                            onClick={() => setActiveSection('profile')}
                        >
                            <User size={18} />
                            Profile
                        </button>
                        <button
                            className={`nav-item ${activeSection === 'avatar' ? 'active' : ''}`}
                            onClick={() => setActiveSection('avatar')}
                        >
                            <Palette size={18} />
                            Avatar
                        </button>
                        <button
                            className={`nav-item ${activeSection === 'theme' ? 'active' : ''}`}
                            onClick={() => setActiveSection('theme')}
                        >
                            <Sun size={18} />
                            Theme
                        </button>
                    </nav>

                    {/* Content Area */}
                    <div className="settings-content">
                        {/* Profile Section */}
                        {activeSection === 'profile' && (
                            <motion.section
                                className="settings-section"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                            >
                                <div className="section-header">
                                    <h2>Profile Information</h2>
                                    <p>Update your personal details</p>
                                </div>

                                <div className="profile-preview">
                                    <div
                                        className="preview-avatar"
                                        style={{ background: currentAvatar.gradient }}
                                    >
                                        {getInitials()}
                                    </div>
                                    <div className="preview-info">
                                        <h3>{user.firstName} {user.lastName}</h3>
                                        <span className="preview-email">{user.email}</span>
                                        <span className="preview-badge">
                                            {loyaltyEmoji} {loyaltyLevel} Member
                                        </span>
                                    </div>
                                </div>

                                <form className="profile-form" onSubmit={(e) => { e.preventDefault(); saveProfile(); }}>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>First Name</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                placeholder="Enter first name"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Last Name</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                placeholder="Enter last name"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Phone Number</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            placeholder="Enter phone number"
                                        />
                                    </div>
                                    <div className="form-group disabled">
                                        <label>Email Address</label>
                                        <input
                                            type="email"
                                            value={user.email}
                                            disabled
                                        />
                                        <span className="form-hint">Email cannot be changed</span>
                                    </div>
                                    <button type="submit" className="btn-save">
                                        <Save size={18} />
                                        Save Changes
                                    </button>
                                </form>
                            </motion.section>
                        )}

                        {/* Avatar Section */}
                        {activeSection === 'avatar' && (
                            <motion.section
                                className="settings-section"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                            >
                                <div className="section-header">
                                    <h2>Choose Your Avatar</h2>
                                    <p>Select a colorful avatar that represents you</p>
                                </div>

                                <div className="current-avatar-display">
                                    <div
                                        className="large-avatar"
                                        style={{ background: currentAvatar.gradient }}
                                    >
                                        {getInitials()}
                                    </div>
                                    <div className="avatar-name">{currentAvatar.name}</div>
                                </div>

                                <div className="avatar-grid">
                                    {avatarOptions.map((avatar) => (
                                        <button
                                            key={avatar.id}
                                            className={`avatar-card ${currentAvatar.id === avatar.id ? 'selected' : ''}`}
                                            onClick={() => selectAvatar(avatar.id)}
                                        >
                                            <div
                                                className="avatar-preview"
                                                style={{ background: avatar.gradient }}
                                            >
                                                {getInitials()}
                                            </div>
                                            <span className="avatar-label">{avatar.name}</span>
                                            {currentAvatar.id === avatar.id && (
                                                <div className="selected-check">
                                                    <Check size={14} />
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </motion.section>
                        )}

                        {/* Theme Section */}
                        {activeSection === 'theme' && (
                            <motion.section
                                className="settings-section"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                            >
                                <div className="section-header">
                                    <h2>Color Theme</h2>
                                    <p>Choose a color theme for the entire app</p>
                                </div>

                                <div className="theme-grid">
                                    {themeOptions.map((theme) => (
                                        <button
                                            key={theme.id}
                                            className={`theme-card ${currentTheme.id === theme.id ? 'selected' : ''}`}
                                            onClick={() => selectTheme(theme)}
                                        >
                                            <div
                                                className="theme-preview-large"
                                                style={{ background: theme.gradient }}
                                            />
                                            <div className="theme-info">
                                                <span className="theme-label">{theme.name}</span>
                                                <div className="theme-colors">
                                                    <span style={{ background: theme.primary }} />
                                                    <span style={{ background: theme.secondary }} />
                                                </div>
                                            </div>
                                            {currentTheme.id === theme.id && (
                                                <div className="selected-badge">
                                                    <Check size={14} />
                                                    Active
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>

                                <div className="theme-preview-section">
                                    <h3>Preview</h3>
                                    <div className="preview-elements">
                                        <button className="preview-btn-primary">Primary Button</button>
                                        <button className="preview-btn-secondary">Secondary</button>
                                        <span className="preview-link">Sample Link</span>
                                    </div>
                                </div>
                            </motion.section>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Settings;
