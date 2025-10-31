
import React from 'react';

export const PrivacyView: React.FC = () => (
    <div className="max-w-4xl mx-auto animate-fade-in">
        <div className="bg-white rounded-lg shadow-lg border-t-4 border-teal-400 p-8 prose prose-teal max-w-none">
            <h1 className="font-poppins">Privacy Policy</h1>
            <p>Last updated: October 26, 2023</p>

            <h2>Information We Collect</h2>
            <p>We collect information to provide and improve our services. This includes:</p>
            <ul>
                <li><strong>Account Information:</strong> When you register, we collect your name, email address, and password.</li>
                <li><strong>Usage Data:</strong> We collect data on your interactions with the Service, such as lessons completed, features used, and progress.</li>
                <li><strong>Voice Data:</strong> For features like Accent Training, we process your voice recordings to provide transcriptions and feedback. These recordings are processed in real-time and are not stored long-term without your explicit consent.</li>
                <li><strong>Payment Information:</strong> For Pro subscriptions, we use a third-party payment processor. We do not store your credit card details.</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We use your information to operate, maintain, and enhance our Service. This includes personalizing your learning path, providing customer support, and processing transactions. We may also use anonymized, aggregated data for research and development to improve our AI models.</p>

            <h2>Data Protection and GDPR Compliance</h2>
            <p>We are committed to protecting your data and complying with data protection regulations, including the General Data Protection Regulation (GDPR). As a user, you have the right to access, correct, or delete your personal data. If you are in the European Union, you have additional rights under the GDPR, which we are committed to upholding. All data is processed securely, and we implement technical and organizational measures to prevent unauthorized access.</p>
            
            <h2>Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at privacy@babblevibe.com.</p>
        </div>
    </div>
);
