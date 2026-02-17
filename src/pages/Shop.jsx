import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronDown, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import ShopSidebar from '../components/ShopSidebar';
import ShopGrid from '../components/ShopGrid';
// import { products } from '../data/products'; // OLD: Static import
import { useProducts } from '../context/ProductsContext'; // NEW: Context import
import './Shop.css';

const Shop = () => {
    const { products } = useProducts(); // Get dynamic products
    const [searchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const itemsPerPage = 6;

    // Read category from URL params on mount
    useEffect(() => {
        const categoryParam = searchParams.get('category');
        if (categoryParam) {
            setSelectedCategory(categoryParam);
        }
    }, [searchParams]);

    // Filter products by category and search
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesCategory = !selectedCategory || product.category === selectedCategory;
            const matchesSearch = !searchQuery ||
                product.title.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [selectedCategory, searchQuery]);

    // Reset page when filter changes
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1);
    };

    // Logic for displaying current items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
    const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

    return (
        <main className="shop-page">
            <div className="container shop-layout">
                {/* Sidebar */}
                <aside className="shop-sidebar-wrapper">
                    <ShopSidebar
                        selectedCategory={selectedCategory}
                        onCategoryChange={handleCategoryChange}
                    />
                </aside>

                {/* Main Content */}
                <section className="shop-content">
                    {/* Shop Header */}
                    <div className="shop-header">
                        <div className="shop-header-left">
                            <h1 className="shop-title">
                                {selectedCategory ?
                                    selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1) :
                                    'All Products'}
                            </h1>
                            <p className="shop-result-count">
                                Showing {filteredProducts.length > 0 ? indexOfFirstItem + 1 : 0}–{Math.min(indexOfLastItem, filteredProducts.length)} of {filteredProducts.length} results
                            </p>
                        </div>

                        <div className="shop-controls">
                            <div className="shop-search-bar">
                                {!searchQuery && <Search size={20} className="search-icon" />}
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <ShopGrid products={currentItems} />

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="pagination">
                            <button
                                className="page-btn prev"
                                onClick={prevPage}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft size={20} />
                            </button>

                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i + 1}
                                    className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
                                    onClick={() => paginate(i + 1)}
                                >
                                    {i + 1}
                                </button>
                            ))}

                            <button
                                className="page-btn next"
                                onClick={nextPage}
                                disabled={currentPage === totalPages}
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
};

export default Shop;

