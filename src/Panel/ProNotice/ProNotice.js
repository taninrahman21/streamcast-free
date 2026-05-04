import React from 'react';
import { __ } from '@wordpress/i18n';
import './ProNotice.scss';

const ProNotice = ({ title, features = [], compact = true }) => {
    return (
        <div className={`stp-pro-notice-box ${compact ? 'compact' : ''}`}>
            <h4 className="stp-pro-notice-title">🚀 {title}</h4>
            <p className="stp-pro-notice-desc">
                {__("The following features are available in the Premium Version:", "streamcast")}
            </p>
            <ul className="stp-pro-notice-list">
                {features.map((feature, index) => (
                    <li key={index}>
                        <strong>{feature.name}:</strong> {feature.desc}
                    </li>
                ))}
            </ul>
            <a 
                href="https://bplugins.com/products/streamcast-radio-player/pricing/" 
                target="_blank" 
                className="stp-pro-notice-button"
            >
                {__("Get Premium Version", "streamcast")}
            </a>
        </div>
    );
};

export default ProNotice;
