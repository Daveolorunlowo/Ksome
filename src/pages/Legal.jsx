import React from 'react';
import './Legal.css';

const Legal = () => {
    return (
        <div className="legal-page container">
            <div className="legal-header">
                <h1>Legal & Privacy</h1>
                <p>Transparency is our policy.</p>
            </div>

            <section className="legal-section">
                <h2>Privacy Policy</h2>
                <p>At KSOME Productions, we respect your privacy. We only collect information necessary to process your orders and improve your experience. We do not sell your data to third parties.</p>
                <p>We use cookies to remember your cart items and preferences. You can disable cookies in your browser settings, but some features of our site may not work correctly.</p>
            </section>

            <section className="legal-section">
                <h2>Terms of Service</h2>
                <p><strong>1. Acceptance of Terms:</strong> By accessing and using this website, you accept and agree to these Terms.</p>
                <p><strong>2. Use of Content:</strong> All content, images, and recipes on this site are the property of KSOME Productions. You may not use them for commercial purposes without our written consent.</p>
                <p><strong>3. Order Acceptance:</strong> We reserve the right to refuse or cancel any order for any reason, including errors in pricing or availability.</p>
                <p><strong>4. Allergens:</strong> Our products are made in a kitchen that handles nuts, dairy, eggs, and wheat. While we take precautions, we cannot guarantee zero cross-contamination.</p>
            </section>
        </div>
    );
};

export default Legal;
