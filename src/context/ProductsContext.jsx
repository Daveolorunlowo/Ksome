import { createContext, useContext, useState, useEffect } from 'react';
import { products as initialProducts } from '../data/products';

const ProductsContext = createContext();

export const useProducts = () => {
    const context = useContext(ProductsContext);
    if (!context) {
        throw new Error('useProducts must be used within a ProductsProvider');
    }
    return context;
};

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState(() => {
        const savedRatings = localStorage.getItem('ksome-ratings');
        if (savedRatings) {
            const parsedRatings = JSON.parse(savedRatings);
            return initialProducts.map(product => {
                const saved = parsedRatings[product.id];
                if (saved) {
                    return {
                        ...product,
                        rating: saved.rating,
                        reviews: saved.reviewCount || saved.reviews, // Handle legacy number or new count
                        reviewList: saved.reviewList || [] // New array for review objects
                    };
                }
                return { ...product, reviewList: [] };
            });
        }
        return initialProducts.map(p => ({ ...p, reviewList: [] }));
    });

    useEffect(() => {
        // Persist ratings and reviews to local storage
        const ratingsMap = {};
        products.forEach(p => {
            if (p.reviewList.length > 0 || p.userRating) {
                ratingsMap[p.id] = {
                    rating: p.rating,
                    reviewCount: p.reviews,
                    reviewList: p.reviewList,
                    userRating: p.userRating // Legacy single user rating tracking
                };
            }
        });
        localStorage.setItem('ksome-ratings', JSON.stringify(ratingsMap));
    }, [products]);

    // Legacy function support (clicks on stars) - repurposed to add a "quick rating"
    const rateProduct = (productId, newRating) => {
        addReview(productId, { rating: newRating, comment: "Quick Rating", user: "Anonymous" });
    };

    const addReview = (productId, reviewData) => {
        setProducts(prevProducts =>
            prevProducts.map(product => {
                if (product.id === productId) {
                    const newReview = {
                        id: Date.now(),
                        date: new Date().toISOString(),
                        ...reviewData
                    };

                    const updatedList = [newReview, ...product.reviewList];

                    // Calculate new average
                    // We need to account for the initial "base" rating from products.js if we want it to persist?
                    // OR we transition to fully dynamic. 
                    // Let's go fully dynamic based on the list + initial weight?
                    // Simple approach: New Average = Sum of all ratings / Count

                    // IF there are no previous reviews, we start fresh? 
                    // Problem: products.js has "starting" ratings (4.8, 45 reviews).
                    // We should treat those 45 as "ghost" reviews with the initial average.

                    const initialWeight = product.reviews - product.reviewList.length; // "Ghost" reviews count
                    const initialScore = initialWeight * (initialProducts.find(p => p.id === productId).rating);

                    const currentSum = product.reviewList.reduce((acc, r) => acc + r.rating, 0);
                    const newSum = currentSum + reviewData.rating;

                    // Total Score = (Ghost Reviews * Base Rating) + (Real Reviews Sum)
                    // We can simplify and just do weighted average of current state + new rating

                    // Current Total Score = Current Rating * Current Count
                    const currentTotalScore = product.rating * product.reviews;
                    const newTotalScore = currentTotalScore + reviewData.rating;
                    const newCount = product.reviews + 1;
                    const newAverage = newTotalScore / newCount;

                    return {
                        ...product,
                        rating: parseFloat(newAverage.toFixed(1)),
                        reviews: newCount,
                        reviewList: updatedList
                    };
                }
                return product;
            })
        );
    };

    return (
        <ProductsContext.Provider value={{ products, rateProduct, addReview }}>
            {children}
        </ProductsContext.Provider>
    );
};
