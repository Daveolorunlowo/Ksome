import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// Demo workers for the system
const DEMO_WORKERS = [
    { staffId: 'STAFF001', password: 'worker123', name: 'Adebayo Okonkwo', role: 'Kitchen Staff' },
    { staffId: 'STAFF002', password: 'worker123', name: 'Chioma Eze', role: 'Delivery Manager' },
    { staffId: 'ADMIN001', password: 'admin123', name: 'Kemi Adeyemi', role: 'Administrator' }
];

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('ksome-user');
        return saved ? JSON.parse(saved) : null;
    });

    const [worker, setWorker] = useState(() => {
        const saved = localStorage.getItem('ksome-worker');
        return saved ? JSON.parse(saved) : null;
    });

    const [users, setUsers] = useState(() => {
        const saved = localStorage.getItem('ksome-users');
        return saved ? JSON.parse(saved) : [];
    });

    const [registeredWorkers, setRegisteredWorkers] = useState(() => {
        const saved = localStorage.getItem('ksome-registered-workers');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem('ksome-user', JSON.stringify(user));
            // Update user in users array
            setUsers(prev => {
                const updated = prev.map(u => u.id === user.id ? user : u);
                localStorage.setItem('ksome-users', JSON.stringify(updated));
                return updated;
            });
        } else {
            localStorage.removeItem('ksome-user');
        }
    }, [user]);

    useEffect(() => {
        if (worker) {
            localStorage.setItem('ksome-worker', JSON.stringify(worker));
        } else {
            localStorage.removeItem('ksome-worker');
        }
    }, [worker]);

    useEffect(() => {
        localStorage.setItem('ksome-users', JSON.stringify(users));
    }, [users]);

    useEffect(() => {
        localStorage.setItem('ksome-registered-workers', JSON.stringify(registeredWorkers));
    }, [registeredWorkers]);

    // Generate unique referral code
    const generateReferralCode = (name) => {
        const prefix = name.substring(0, 3).toUpperCase();
        const random = Math.random().toString(36).substring(2, 6).toUpperCase();
        return `${prefix}${random}`;
    };

    const register = (userData) => {
        // Check if email already exists
        if (users.find(u => u.email === userData.email)) {
            return { success: false, error: 'Email already registered' };
        }

        const newUser = {
            id: `USR${Date.now()}`,
            ...userData,
            referralCode: generateReferralCode(userData.firstName),
            referralCount: 0,
            orderCount: 0,
            wallet: {
                balance: 0,
                credits: 0,
                transactions: []
            },
            createdAt: new Date().toISOString()
        };

        setUsers(prev => [...prev, newUser]);
        setUser(newUser);
        return { success: true, user: newUser };
    };

    const login = (email, password) => {
        const foundUser = users.find(u => u.email === email && u.password === password);
        if (foundUser) {
            setUser(foundUser);
            return { success: true, user: foundUser };
        }
        return { success: false, error: 'Invalid email or password' };
    };

    const logout = () => {
        setUser(null);
    };

    // Worker authentication
    const loginWorker = (staffId, password) => {
        // Check registered workers first
        const registeredWorker = registeredWorkers.find(
            w => (w.email === staffId || w.staffId === staffId) && w.password === password
        );
        if (registeredWorker) {
            setWorker(registeredWorker);
            return { success: true, worker: registeredWorker };
        }

        // Then check demo workers
        const foundWorker = DEMO_WORKERS.find(
            w => w.staffId === staffId && w.password === password
        );
        if (foundWorker) {
            setWorker(foundWorker);
            return { success: true, worker: foundWorker };
        }
        return { success: false, error: 'Invalid staff ID or password' };
    };

    const logoutWorker = () => {
        setWorker(null);
    };

    const registerWorker = (workerData) => {
        // Check if email already exists
        if (registeredWorkers.find(w => w.email === workerData.email)) {
            return { success: false, error: 'Email already registered' };
        }

        const newWorker = {
            staffId: `STF${Date.now().toString().slice(-6)}`,
            ...workerData,
            createdAt: new Date().toISOString()
        };

        setRegisteredWorkers(prev => [...prev, newWorker]);
        setWorker(newWorker);
        return { success: true, worker: newWorker };
    };

    const updateProfile = (updates) => {
        if (!user) return { success: false, error: 'Not logged in' };

        const updatedUser = { ...user, ...updates };
        setUser(updatedUser);
        return { success: true, user: updatedUser };
    };

    // Wallet functions
    const addFunds = (amount, type = 'deposit') => {
        if (!user) return { success: false, error: 'Not logged in' };
        if (amount <= 0) return { success: false, error: 'Invalid amount' };

        const transaction = {
            id: `TXN${Date.now()}`,
            type,
            amount,
            description: type === 'deposit' ? 'Wallet top-up' : 'Credits added',
            date: new Date().toISOString()
        };

        const updatedUser = {
            ...user,
            wallet: {
                ...user.wallet,
                balance: type === 'deposit'
                    ? user.wallet.balance + amount
                    : user.wallet.balance,
                credits: type === 'credit'
                    ? user.wallet.credits + amount
                    : user.wallet.credits,
                transactions: [transaction, ...user.wallet.transactions]
            }
        };

        setUser(updatedUser);
        return { success: true, transaction };
    };

    const deductFunds = (amount, description = 'Purchase') => {
        if (!user) return { success: false, error: 'Not logged in' };
        if (amount <= 0) return { success: false, error: 'Invalid amount' };

        const totalAvailable = user.wallet.balance + user.wallet.credits;
        if (amount > totalAvailable) {
            return { success: false, error: 'Insufficient funds' };
        }

        // Deduct from credits first, then balance
        let remainingAmount = amount;
        let newCredits = user.wallet.credits;
        let newBalance = user.wallet.balance;

        if (user.wallet.credits >= remainingAmount) {
            newCredits -= remainingAmount;
            remainingAmount = 0;
        } else {
            remainingAmount -= user.wallet.credits;
            newCredits = 0;
            newBalance -= remainingAmount;
        }

        const transaction = {
            id: `TXN${Date.now()}`,
            type: 'payment',
            amount: -amount,
            description,
            date: new Date().toISOString()
        };

        const updatedUser = {
            ...user,
            wallet: {
                balance: newBalance,
                credits: newCredits,
                transactions: [transaction, ...user.wallet.transactions]
            }
        };

        setUser(updatedUser);
        return { success: true, transaction };
    };

    const getWalletTotal = () => {
        if (!user) return 0;
        return user.wallet.balance + user.wallet.credits;
    };

    // Get or generate referral code for existing users
    const getReferralCode = () => {
        if (!user) return null;
        if (user.referralCode) return user.referralCode;

        // Generate for existing users without code
        const code = generateReferralCode(user.firstName);
        const updatedUser = { ...user, referralCode: code, referralCount: user.referralCount || 0 };
        setUser(updatedUser);
        return code;
    };

    // Increment order count (called when order is placed)
    const incrementOrderCount = () => {
        if (!user) return;
        const updatedUser = { ...user, orderCount: (user.orderCount || 0) + 1 };
        setUser(updatedUser);
        return updatedUser.orderCount;
    };

    // Get loyalty level based on order count
    const getLoyaltyLevel = () => {
        if (!user) return { level: 'Bronze', emoji: '🥉' };
        const orders = user.orderCount || 0;
        if (orders >= 101) return { level: 'Gold', emoji: '🥇' };
        if (orders >= 26) return { level: 'Silver', emoji: '🥈' };
        return { level: 'Bronze', emoji: '🥉' };
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                worker,
                isAuthenticated: !!user,
                isWorkerAuthenticated: !!worker,
                register,
                login,
                logout,
                loginWorker,
                logoutWorker,
                registerWorker,
                updateProfile,
                addFunds,
                deductFunds,
                getWalletTotal,
                getReferralCode,
                incrementOrderCount,
                getLoyaltyLevel
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

