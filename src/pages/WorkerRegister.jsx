import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, Briefcase, Eye, EyeOff, Shield, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './WorkerAuth.css';

const WorkerRegister = () => {
    const navigate = useNavigate();
    const { registerWorker } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        role: 'Kitchen Staff',
        password: '',
        confirmPassword: '',
        accessCode: ''
    });

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Validation
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            setLoading(false);
            return;
        }

        // Access code validation (simple demo code)
        if (formData.accessCode !== 'KSOME2024') {
            setError('Invalid staff access code');
            setLoading(false);
            return;
        }

        setTimeout(() => {
            const result = registerWorker({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                role: formData.role,
                password: formData.password
            });

            if (result.success) {
                navigate('/worker/dashboard');
            } else {
                setError(result.error);
            }
            setLoading(false);
        }, 1000);
    };

    return (
        <main className="worker-auth-page">
            <div className="worker-auth-container register">

                <div className="worker-branding">
                    <Shield size={48} />
                    <h2>KSOME Staff Portal</h2>
                    <p>Staff Registration</p>
                </div>

                <div className="worker-auth-card">
                    <div className="worker-auth-header">
                        <UserPlus size={32} />
                        <h1>Staff Registration</h1>
                    </div>

                    {error && <div className="worker-auth-error">{error}</div>}

                    <form onSubmit={handleSubmit} className="worker-auth-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label>Full Name</label>
                                <div className="input-with-icon">
                                    <User size={18} />
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your full name"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Phone Number</label>
                                <div className="input-with-icon">
                                    <Phone size={18} />
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="08012345678"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Email Address</label>
                            <div className="input-with-icon">
                                <Mail size={18} />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="staff@ksome.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Role / Position</label>
                            <div className="input-with-icon">
                                <Briefcase size={18} />
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="Kitchen Staff">Kitchen Staff</option>
                                    <option value="Delivery Personnel">Delivery Personnel</option>
                                    <option value="Cashier">Cashier</option>
                                    <option value="Store Manager">Store Manager</option>
                                    <option value="Supervisor">Supervisor</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Password</label>
                                <div className="input-with-icon">
                                    <Lock size={18} />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Confirm Password</label>
                                <div className="input-with-icon">
                                    <Lock size={18} />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="toggle-password"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="form-group access-code-group">
                            <label>
                                <Shield size={14} />
                                Staff Access Code
                            </label>
                            <div className="input-with-icon">
                                <Lock size={18} />
                                <input
                                    type="text"
                                    name="accessCode"
                                    value={formData.accessCode}
                                    onChange={handleChange}
                                    placeholder="Enter access code from manager"
                                    required
                                />
                            </div>
                            <small className="access-hint">Contact your manager for the staff access code</small>
                        </div>

                        <button type="submit" className="worker-login-btn" disabled={loading}>
                            {loading ? 'Creating Account...' : 'Register as Staff'}
                        </button>
                    </form>

                    <p className="worker-auth-link">
                        Already have a staff account?{' '}
                        <Link to="/worker/login">Sign In</Link>
                    </p>

                    <p className="worker-auth-footer">
                        <Shield size={14} />
                        Authorized personnel only
                    </p>
                </div>
            </div>
        </main>
    );
};

export default WorkerRegister;
