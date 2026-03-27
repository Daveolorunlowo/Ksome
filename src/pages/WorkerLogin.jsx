import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Briefcase, Eye, EyeOff, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './WorkerAuth.css';

const WorkerLogin = () => {
    const navigate = useNavigate();
    const { loginWorker } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        staffId: '',
        password: ''
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

        setTimeout(() => {
            const result = loginWorker(formData.staffId, formData.password);
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


            <div className="worker-auth-container">
                <div className="worker-branding">
                    <Shield size={48} />
                    <h2>KSOME Staff Portal</h2>
                    <p>Access your worker dashboard</p>
                </div>

                <div className="worker-auth-card">
                    <div className="worker-auth-header">
                        <Briefcase size={32} />
                        <h1>Staff Login</h1>
                    </div>

                    {error && <div className="worker-auth-error">{error}</div>}

                    <form onSubmit={handleSubmit} className="worker-auth-form">
                        <div className="form-group">
                            <label>Staff ID or Email</label>
                            <div className="input-with-icon">
                                <Mail size={18} />
                                <input
                                    type="text"
                                    name="staffId"
                                    value={formData.staffId}
                                    onChange={handleChange}
                                    placeholder="Enter your staff ID or email"
                                    required
                                />
                            </div>
                        </div>

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
                                <button
                                    type="button"
                                    className="toggle-password"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="worker-login-btn" disabled={loading}>
                            {loading ? 'Signing in...' : 'Access Portal'}
                        </button>
                    </form>

                    <p className="worker-auth-link">
                        New staff member?{' '}
                        <Link to="/worker/register">Register here</Link>
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

export default WorkerLogin;

