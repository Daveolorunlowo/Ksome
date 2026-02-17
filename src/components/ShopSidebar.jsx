import { CakeSlice, Coffee, ShoppingBasket, Cookie, RotateCcw } from 'lucide-react';
import './ShopSidebar.css';

const categories = [
    { id: 'pastries', name: 'Pastries & Snacks', icon: CakeSlice },
    { id: 'chips', name: 'Crunchy Chips', icon: Cookie },
    { id: 'drinks', name: 'Drinks & Wine', icon: Coffee },
    { id: 'provisions', name: 'Provisions', icon: ShoppingBasket }
];

const ShopSidebar = ({ selectedCategory, onCategoryChange }) => {
    return (
        <aside className="shop-sidebar">
            <div className="filter-section">
                <h3 className="filter-title">Categories</h3>
                <div className="sidebar-category-list">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            className={`sidebar-category-item ${selectedCategory === cat.id ? 'active' : ''}`}
                            onClick={() => onCategoryChange(cat.id === selectedCategory ? null : cat.id)}
                        >
                            <span className="category-icon-wrapper">
                                <cat.icon size={18} />
                            </span>
                            <span className="category-name">{cat.name}</span>
                            {selectedCategory === cat.id && <div className="active-dot" />}
                        </button>
                    ))}
                </div>
            </div>

            <button className="clear-filters-btn" onClick={() => onCategoryChange(null)}>
                <RotateCcw size={16} />
                Clear Filters
            </button>
        </aside>
    );
};

export default ShopSidebar;

