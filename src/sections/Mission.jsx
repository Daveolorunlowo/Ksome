import { motion } from 'framer-motion';
import { Heart, Clock, Leaf } from 'lucide-react';
import './Mission.css';

const Mission = () => {
    return (
        <section id="mission" className="mission-section">
            <div className="container">
                <div className="mission-content">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mission-text"
                    >
                        <h2 className="section-title">Our Promise</h2>
                        <p className="section-subtitle">Authentic Flavors, Zero Shortcuts</p>

                        <p className="mission-description">
                            At KSOME, we believe that food is a love language. Our mission is to preserve
                            the authentic tastes of our childhood while delivering the convenience you need today.
                            Every pie folded and every puff puff fried is done with care and precision.
                        </p>

                        <div className="mission-points">
                            <div className="point">
                                <div className="point-icon"><Heart size={20} /></div>
                                <div>
                                    <h4>Made with Love</h4>
                                    <p>Generations of family recipes, cooked from the heart.</p>
                                </div>
                            </div>
                            <div className="point">
                                <div className="point-icon"><Clock size={20} /></div>
                                <div>
                                    <h4>Baked Fresh Daily</h4>
                                    <p>We bake in small batches to ensure premium freshness.</p>
                                </div>
                            </div>
                            <div className="point">
                                <div className="point-icon"><Leaf size={20} /></div>
                                <div>
                                    <h4>100% Natural</h4>
                                    <p>Real butter, fresh meat, and no artificial preservatives.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mission-image"
                    >
                        <div className="image-wrapper">
                            <img
                                src="https://images.unsplash.com/photo-1606312619070-d48b706521bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="Authentic Nigerian Snacks"
                                className="main-img"
                            />
                            <div className="accent-box"></div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Mission;
