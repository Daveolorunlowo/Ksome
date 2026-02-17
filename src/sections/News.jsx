import { motion } from 'framer-motion';
import { Calendar, ChevronRight } from 'lucide-react';
import './News.css';

const newsItems = [
    {
        id: 1,
        date: 'Oct 24, 2024',
        title: 'The Future of WebAssembly in Enterprise',
        excerpt: 'Exploring how WASM is changing the landscape of high-performance web applications.',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 2,
        date: 'Oct 18, 2024',
        title: 'Designing for Accessibility First',
        excerpt: 'Why inclusive design is not just a requirement, but a business advantage.',
        image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 3,
        date: 'Sep 30, 2024',
        title: 'GABINET Recognized as Top Agency',
        excerpt: 'We are humbled to receive the 2024 Digital Excellence Award for our recent work.',
        image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    }
];

const News = () => {
    return (
        <section id="news" className="news-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title text-center">Latest Insights</h2>
                    <p className="section-subtitle text-center">News & Articles</p>
                </div>

                <div className="news-grid">
                    {newsItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="news-card"
                        >
                            <div className="news-image-wrapper">
                                <img src={item.image} alt={item.title} className="news-image" />
                            </div>
                            <div className="news-content">
                                <div className="news-date">
                                    <Calendar size={14} />
                                    <span>{item.date}</span>
                                </div>
                                <h3 className="news-title">{item.title}</h3>
                                <p className="news-excerpt">{item.excerpt}</p>
                                <a href="#" className="read-more">
                                    Read Article <ChevronRight size={16} />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default News;
