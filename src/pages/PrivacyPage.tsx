import { ArrowLeft, Shield } from 'lucide-react';

export default function PrivacyPage({ navigate }: { navigate: (path: string) => void }) {
  return (
    <div className="min-h-screen bg-[#050505] text-gray-400 font-mono p-6 sm:p-12 relative z-10 pt-32">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-xs hover:text-white transition-colors mb-12"
        >
          <ArrowLeft size={14} />
          <span>Return to Command Center</span>
        </button>
        
        <div className="flex items-center space-x-4 mb-6">
          <Shield className="text-violet-500" size={32} />
          <h1 className="text-white text-3xl font-display font-extrabold tracking-tight uppercase">Privacy Policy & Data Processing</h1>
        </div>
        <p className="text-xs mb-12 border-b border-white/10 pb-6 text-violet-400 font-bold tracking-widest">EFFECTIVE DATE: 2026-07-10 | COMPLIANT WITH GDPR, CCPA, & INDIAN IT ACT (2000)</p>
        
        <div className="space-y-12 text-sm leading-relaxed max-w-3xl">
          <section>
            <h2 className="text-white text-lg font-bold mb-4 uppercase tracking-wider">✦ 1. INTRODUCTION & SCOPE</h2>
            <p className="mb-4">
              At Devil Labs, we engineer secure, high-performance web applications and AI agents. In delivering these services globally and across India, we adhere to the highest international data privacy standards, including the EU General Data Protection Regulation (GDPR), the California Consumer Privacy Act (CCPA), and India's Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.
            </p>
            <p>
              This Privacy Policy explains how we collect, process, store, and protect your information when you engage our agency for digital architecture, AI integration, and automation services.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-bold mb-4 uppercase tracking-wider">✦ 2. INFORMATION WE COLLECT</h2>
            <p className="mb-3">We collect information strictly necessary for the execution of our services:</p>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
              <li><strong className="text-white">Client Identity & Billing:</strong> Names, corporate entities, GST/Tax IDs, billing addresses, and payment processing details.</li>
              <li><strong className="text-white">Technical Infrastructure Data:</strong> API keys, server credentials, database dumps, and source code required for project development and deployment.</li>
              <li><strong className="text-white">Telemetry & Usage Data:</strong> Anonymized interaction logs from our web properties to improve user experience.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white text-lg font-bold mb-4 uppercase tracking-wider">✦ 3. DATA PROCESSING & USAGE</h2>
            <p className="mb-3">Your data is utilized exclusively for:</p>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
              <li>Developing, testing, and deploying custom software and AI agents.</li>
              <li>Configuring third-party integrations (e.g., AWS, GCP, Vercel, OpenAI).</li>
              <li>Processing payments and adhering to international taxation and compliance laws.</li>
            </ul>
            <p className="mt-4 text-violet-400 font-semibold">
              Crucial Note on AI Models: We do not use your proprietary business data or source code to train public AI models. All AI agent integrations utilize Zero Data Retention (ZDR) endpoints where applicable.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-bold mb-4 uppercase tracking-wider">✦ 4. DATA SHARING & SUB-PROCESSORS</h2>
            <p className="mb-4">
              We never sell your data. We may share necessary technical data with vetted third-party sub-processors (e.g., cloud hosting providers, secure payment gateways) strictly under Non-Disclosure Agreements (NDAs) and Data Processing Agreements (DPAs) that match our stringent security standards.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-bold mb-4 uppercase tracking-wider">✦ 5. SECURITY PROTOCOLS</h2>
            <p className="mb-4">
              Our infrastructure employs AES-256 encryption at rest and TLS 1.3 in transit. Access to client repositories and credentials is restricted via Multi-Factor Authentication (MFA) and Principle of Least Privilege (PoLP) across our engineering teams.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-bold mb-4 uppercase tracking-wider">✦ 6. YOUR RIGHTS (GDPR & CCPA)</h2>
            <p className="mb-3">Depending on your jurisdiction, you have the right to:</p>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
              <li>Request a complete export of your personal data stored by us.</li>
              <li>Request the immediate deletion (Right to Erasure) of your data upon contract termination.</li>
              <li>Opt-out of any non-essential marketing communications.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white text-lg font-bold mb-4 uppercase tracking-wider">✦ 7. CONTACT THE DPO</h2>
            <p>
              For any privacy concerns, data deletion requests, or NDA inquiries, please contact our Data Protection Officer at: <br/>
              <strong className="text-white">legal@devillabs.co</strong> or <strong className="text-white">+91 81020 99678</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
