import { motion } from 'framer-motion';
import { useUI } from '../context/UIContext';
import './Stats.css';

const Stats = () => {
    const { openComingSoon } = useUI();

    const statsData = {
        customers: "0",
        investment: "₦0",
        centers: "1"
    };

    return (
        <section className="stats-section">
            <div className="container stats-container">
                <div className="stat-item">
                    <span className="stat-value">{statsData.customers}</span>
                    <span className="stat-label">Satisfied Customers</span>
                </div>

                <div className="stat-divider"></div>

                <div className="stat-item">
                    <span className="stat-value">{statsData.investment}</span>
                    <span className="stat-label">Invested Capital</span>
                </div>

                <div className="stat-divider"></div>

                <div className="stat-item">
                    <span className="stat-value">{statsData.centers}</span>
                    <span className="stat-label">Global Distribution Centers</span>
                </div>
            </div>

            <div className="container stats-cta">
                <h3>Ready to grow with the taste of home?</h3>
                <button className="btn-deck" onClick={() => openComingSoon()}>
                    Download Investor Deck
                </button>
            </div>
        </section>
    );
};

export default Stats;
