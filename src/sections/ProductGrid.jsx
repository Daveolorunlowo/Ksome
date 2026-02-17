import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import './ProductGrid.css';

const products = [
    {
        id: 1,
        title: 'Cloud Architecture',
        category: 'Infrastructure',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Scalable cloud solutions designed for enterprise growth and reliability.'
    },
    {
        id: 2,
        title: 'Digital Security',
        category: 'Cybersecurity',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Advanced threat protection and security protocols for your digital assets.'
    },
    {
        id: 3,
        title: 'AI Integration',
        category: 'Innovation',
        image: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Seamless integration of artificial intelligence into your business workflows.'
    },
    {
        id: 4,
        title: 'Mobile Development',
        category: 'Application',
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Native and cross-platform mobile experiences that delight users.'
    },
    {
        id: 5,
        title: 'Data Analytics',
        category: 'Intelligence',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Turn your data into actionable insights with our powerful analytics tools.'
    },
    {
        id: 6,
        title: 'UX/UI Design',
        category: 'Creative',
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'User-centric design that creates intuitive and beautiful digital products.'
    }
];

const ProductGrid = () => {
    return (
        <section id="products" className="product-section">
            <div className="container">
                <div className="section-header">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="section-title text-center"
                    >
                        Our Solutions
                    </motion.h2>
                    <p className="section-subtitle text-center">Tailored for Excellence</p>
                </div>

                <div className="product-grid">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="product-card"
                        >
                            <div className="product-image-wrapper">
                                <img src={product.image} alt={product.title} className="product-image" />
                                <div className="card-overlay">
                                    <button className="view-btn">
                                        View Details
                                        <ArrowUpRight size={18} />
                                    </button>
                                </div>
                            </div>
                            <div className="product-content">
                                <span className="product-category">{product.category}</span>
                                <h3 className="product-title">{product.title}</h3>
                                <p className="product-description">{product.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductGrid;
