import { createContext, useContext, useState, useEffect } from 'react';

const OrdersContext = createContext();

export const useOrders = () => {
    const context = useContext(OrdersContext);
    if (!context) {
        throw new Error('useOrders must be used within an OrdersProvider');
    }
    return context;
};

export const OrdersProvider = ({ children }) => {
    const [orders, setOrders] = useState(() => {
        const saved = localStorage.getItem('ksome-orders');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('ksome-orders', JSON.stringify(orders));
    }, [orders]);

    const addOrder = (orderData) => {
        const newOrder = {
            id: `KS${Date.now().toString().slice(-6)}`,
            ...orderData,
            status: 'pending', // pending, processing, delivered
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        setOrders(prev => [newOrder, ...prev]);
        return newOrder.id;
    };

    const updateOrderStatus = (orderId, status) => {
        setOrders(prev =>
            prev.map(order =>
                order.id === orderId
                    ? { ...order, status, updatedAt: new Date().toISOString() }
                    : order
            )
        );
    };

    const getOrderById = (orderId) => {
        return orders.find(order => order.id === orderId);
    };

    const pendingOrders = orders.filter(order =>
        order.status === 'pending' || order.status === 'processing'
    );

    const completedOrders = orders.filter(order =>
        order.status === 'delivered'
    );

    return (
        <OrdersContext.Provider
            value={{
                orders,
                addOrder,
                updateOrderStatus,
                getOrderById,
                pendingOrders,
                completedOrders
            }}
        >
            {children}
        </OrdersContext.Provider>
    );
};
