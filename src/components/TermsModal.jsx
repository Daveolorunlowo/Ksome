import React from 'react';
import { X, FileText, CheckCircle } from 'lucide-react';
import './TermsModal.css';
import { HANDBOOK_CONTENT } from '../data/handbook';

const TermsModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="terms-modal-overlay">
            <div className="terms-modal-container">
                <div className="terms-modal-header">
                    <div className="header-title">
                        <FileText size={20} />
                        <h3>Staff Handbook</h3>
                    </div>
                    <button className="close-btn" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <div className="terms-modal-content">
                    <div className="handbook-intro">
                        <h1>{HANDBOOK_CONTENT.title}</h1>
                        <p className="version-info">Effective Date: April 2026</p>
                    </div>

                    {HANDBOOK_CONTENT.sections.map((section, index) => (
                        <section key={index} className="handbook-section">
                            <h2>{section.title}</h2>
                            {section.content && <p>{section.content}</p>}
                            {section.list && (
                                <ul className="handbook-list">
                                    {section.list.map((item, i) => (
                                        <li key={i}>
                                            <span className="list-dot"></span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {section.footer && <p className="section-footer">{section.footer}</p>}
                        </section>
                    ))}

                    <div className="handbook-footer">
                        <div className="signatories">
                            {HANDBOOK_CONTENT.signatories.map((sig, index) => (
                                <div key={index} className="signatory">
                                    <p className="sig-role">{sig.role}</p>
                                    <p className="sig-name">{sig.name}</p>
                                    <div className="sig-line"></div>
                                </div>
                            ))}
                        </div>
                        <p className="conclusion">
                            Thank you for being part of KSOME COMPANIES LIMITED.
                        </p>
                    </div>
                </div>

                <div className="terms-modal-footer">
                    <button className="confirm-read-btn" onClick={onClose}>
                        <CheckCircle size={18} />
                        I HAVE READ AND UNDERSTOOD THE HANDBOOK
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TermsModal;
