import React from 'react';
import { motion } from 'framer-motion';
import puffPuffImg from '../assets/hot_puff_puff_new.jpg';
import moiMoiImg from '../assets/steaming_moi_moi.jpg';
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

            {/* Redesigned Story Section */}
            <section className="story-section-modern">
                <div className="container">

                    {/* Story Part 1: Kitchen/Craving */}
                    <div className="story-layout-overlap">
                        <div className="story-visual-bg">
                            <img
                                src={puffPuffImg}
                                alt="Fresh hot puff puff being made"
                                className="story-bg-img"
                            />
                        </div>
                        <motion.div
                            className="story-card-floating"
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <h2>It Started with a Craving</h2>
                            <p>
                                KSOME Productions wasn't born in a boardroom; it was born in a bustling kitchen filled with the aroma of frying puff puff and the savory scent of meat pies baking in the oven. We missed the authentic tastes of Nigeria—the flaky crusts, the spicy fillings, the comfort of a warm snack on a rainy day.
                            </p>
                            <p>
                                We realized that "good enough" authentic snacks were hard to find. So, we decided to make them ourselves, refusing to cut corners. No preservatives, no "mystery ingredients"—just flour, butter, meat, spices, and a whole lot of patience.
                            </p>
                        </motion.div>
                    </div>

                    {/* Story Part 2: Tradition/Ingredients */}
                    <div className="story-layout-overlap reverse">
                        <div className="story-visual-bg">
                            <img
                                src={moiMoiImg}
                                alt="Traditional Nigerian comfort food"
                                className="story-bg-img"
                            />
                        </div>
                        <motion.div
                            className="story-card-floating"
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <h2>Tradition Meets Today</h2>
                            <p>
                                While our recipes are rooted in tradition—passed down from grandmothers who knew exactly how to fold a samosa for the perfect crunch—our methods are modern. We use premium ingredients and rigorous hygiene standards to ensure every bite is safe, fresh, and delicious.
                            </p>
                            <p>
                                Whether you're grabbing a quick lunch, catering a wedding, or just treating yourself, we want KSOME to be your go-to for comfort food that feeds the soul.
                            </p>
                        </motion.div>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default About;
