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
        try {
            const savedRatings = localStorage.getItem('ksome-ratings');
            if (savedRatings) {
                const parsedRatings = JSON.parse(savedRatings);
                return initialProducts.map(product => {
                    const saved = parsedRatings[product.id];
                    if (saved) {
                        return {
                            ...product,
                            rating: saved.rating ?? product.rating,
                            reviews: saved.reviewCount ?? saved.reviews ?? product.reviews,
                            reviewList: Array.isArray(saved.reviewList) ? saved.reviewList : []
                        };
                    }
                    return { ...product, reviewList: [] };
                });
            }
        } catch (e) {
            console.warn('Failed to load saved ratings, resetting:', e);
            localStorage.removeItem('ksome-ratings');
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

                    const safeReviewList = Array.isArray(product.reviewList) ? product.reviewList : [];
                    const updatedList = [newReview, ...safeReviewList];

                    // Weighted average: treat existing rating*reviews as the base score
                    const currentTotalScore = (product.rating ?? 0) * (product.reviews ?? 0);
                    const newTotalScore = currentTotalScore + (reviewData.rating ?? 5);
                    const newCount = (product.reviews ?? 0) + 1;
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
