import { ArrowLeft } from 'lucide-react';

export default function PrivacyPage({ navigate }: { navigate: (path: string) => void }) {
  return (
    <div className="min-h-screen bg-[#050505] text-gray-400 font-mono p-6 sm:p-12 relative z-10">
      <div className="max-w-2xl mx-auto">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-xs hover:text-white transition-colors mb-12"
        >
          <ArrowLeft size={14} />
          <span>Return to Command Center</span>
        </button>
        
        <h1 className="text-white text-2xl font-bold mb-6">[PRIVACY_POLICY]</h1>
        <p className="text-xs mb-8">LAST UPDATED: 2026-07-05</p>
        
        <div className="space-y-6 text-sm leading-relaxed">
          <section>
            <h2 className="text-white font-bold mb-2">1. DATA COLLECTION PROTOCOLS</h2>
            <p>Devil Labs strictly processes data necessary for the execution of autonomous AI systems and web architectures. We collect technical specifications, contact information, and infrastructure access credentials solely for project execution.</p>
          </section>
          <section>
            <h2 className="text-white font-bold mb-2">2. ENCRYPTION AND STORAGE</h2>
            <p>All client data is encrypted at rest and in transit. We utilize industry-standard cryptographic protocols to ensure the integrity and confidentiality of your intellectual property and user data.</p>
          </section>
          <section>
            <h2 className="text-white font-bold mb-2">3. THIRD-PARTY TELEMETRY</h2>
            <p>We do not sell, rent, or distribute your data to unauthorized third parties. External APIs (e.g., OpenAI, AWS, Vercel) are utilized only with explicit consent and under strict data processing agreements.</p>
          </section>
          <section>
            <h2 className="text-white font-bold mb-2">4. RIGHT TO ERASURE</h2>
            <p>Upon contract termination, clients may request the complete purging of their project data from our secure servers, subject to our data retention policies for legal compliance.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
