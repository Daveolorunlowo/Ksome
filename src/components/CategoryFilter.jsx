import { useState } from 'react';
import { UtensilsCrossed, Coffee, Cookie, Sparkles, LayoutGrid, Flame } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './CategoryFilter.css';

const CategoryFilter = () => {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState('All items');

    const categories = [
        { name: 'All items', icon: LayoutGrid, filter: '' },
        { name: 'Savory', icon: UtensilsCrossed, filter: 'pastries' },
        { name: 'Sweet', icon: Cookie, filter: 'pastries' },
        { name: 'Beverages', icon: Coffee, filter: 'drinks' },
        { name: 'Specials', icon: Flame, filter: 'grilled' },
    ];

    const handleCategoryClick = (category) => {
        setActiveCategory(category.name);

        if (category.name === 'Specials') {
            navigate('/specials');
            return;
        }

        // Navigate to shop with category filter
        if (category.filter) {
            navigate(`/shop?category=${category.filter}`);
        } else {
            navigate('/shop');
        }
    };

    return (
        <section className="category-section">
            <div className="container">
                <div className="category-list">
                    {categories.map((cat) => {
                        const Icon = cat.icon;
                        const isActive = activeCategory === cat.name;
                        return (
                            <button
                                key={cat.name}
                                className={`category-btn ${isActive ? 'active' : ''}`}
                                onClick={() => handleCategoryClick(cat)}
                            >
                                <div className="icon-wrapper">
                                    <Icon size={20} />
                                </div>
                                <span className="category-name">{cat.name}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default CategoryFilter;
