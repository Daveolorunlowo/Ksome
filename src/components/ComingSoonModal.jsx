import { motion, AnimatePresence } from 'framer-motion';
import { X, Rocket, Bell } from 'lucide-react';
import { useUI } from '../context/UIContext';
import './ComingSoonModal.css';

const ComingSoonModal = () => {
    const { isComingSoonOpen, closeComingSoon } = useUI();

    return (
        <AnimatePresence>
            {isComingSoonOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="modal-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeComingSoon}
                    />

                    {/* Modal Content */}
                    <div className="modal-container-wrapper">
                        <motion.div
                            className="coming-soon-modal"
                            initial={{ scale: 0.8, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 50 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        >
                            <button className="modal-close-btn" onClick={closeComingSoon}>
                                <X size={24} />
                            </button>

                            <div className="modal-icon-wrapper">
                                <motion.div
                                    animate={{
                                        y: [0, -10, 0],
                                        rotate: [0, 5, -5, 0]
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                >
                                    <Rocket size={48} className="modal-icon" />
                                </motion.div>
                            </div>

                            <h2 className="modal-title">Something Big is Coming!</h2>
                            <p className="modal-desc">
                                We are putting the final touches on our <span className="highlight">Investment Platform</span>.
                                Get ready to grow your portfolio with authentic African flavors.
                            </p>

                            <div className="modal-actions">
                                <button className="modal-notify-btn" onClick={closeComingSoon}>
                                    <Bell size={18} />
                                    Notify Me When Live
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ComingSoonModal;
