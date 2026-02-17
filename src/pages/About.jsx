import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const About = () => {
    return (
        <div className="about-page">
            <section className="about-hero">
                <div className="container">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="about-title"
                    >
                        Our Story: A Taste of Home
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="about-subtitle"
                    >
                        From our kitchen to yours, with love and a dash of spice.
                    </motion.p>
                </div>
            </section>

            <section className="about-content container">
                <div className="story-block">
                    <div className="story-text">
                        <h2>It Started with a Craving</h2>
                        <p>
                            KSOME Productions wasn't born in a boardroom; it was born in a bustling kitchen filled with the aroma of frying puff puff and the savory scent of meat pies baking in the oven. We missed the authentic tastes of Nigeria—the flaky crusts, the spicy fillings, the comfort of a warm snack on a rainy day.
                        </p>
                        <p>
                            We realized that "good enough" authentic snacks were hard to find. So, we decided to make them ourselves, refusing to cut corners. No preservatives, no "mystery ingredients"—just flour, butter, meat, spices, and a whole lot of patience.
                        </p>
                    </div>
                    <div className="story-image placeholder-image">
                        {/* Placeholder for Kitchen Image */}
                        <span>Our Kitchen</span>
                    </div>
                </div>

                <div className="story-block reverse">
                    <div className="story-text">
                        <h2>Tradition Meets Today</h2>
                        <p>
                            While our recipes are rooted in tradition—passed down from grandmothers who knew exactly how to fold a samosa for the perfect crunch—our methods are modern. We use premium ingredients and rigorous hygiene standards to ensure every bite is safe, fresh, and delicious.
                        </p>
                        <p>
                            Whether you're grabbing a quick lunch, catering a wedding, or just treating yourself, we want KSOME to be your go-to for comfort food that feeds the soul.
                        </p>
                    </div>
                    <div className="story-image placeholder-image">
                        {/* Placeholder for Ingredients Image */}
                        <span>Fresh Ingredients</span>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
