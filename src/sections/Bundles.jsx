import { ArrowRight } from 'lucide-react';
import './Bundles.css';

const Bundles = () => {
    return (
        <section className="bundles-section">
            <div className="container bundles-container">
                {/* Office Bundles Card */}
                <div className="bundle-card office-card">
                    <h3 className="bundle-title">Bundles for the Office?</h3>
                    <p className="bundle-desc">
                        Order our "Snack Box Grande" with 20 meat pies and 50 puff puffs at a special corporate rate.
                    </p>
                    <a href="#" className="bundle-link">
                        Inquire about Catering
                        <ArrowRight size={16} />
                    </a>
                </div>

                {/* Snack Club Card */}
                <div className="bundle-card club-card">
                    <div className="coming-soon-badge">Coming Soon</div>
                    <h3 className="bundle-title">Join the Snack Club</h3>
                    <p className="bundle-desc">
                        Get 10% off your first order and exclusive access to weekend-only specials.
                    </p>
                    <div className="coming-soon-message">
                        <span>🎉</span>
                        <p>We're launching soon! Stay tuned for exclusive member perks.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Bundles;
