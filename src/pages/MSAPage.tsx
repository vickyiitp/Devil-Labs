import { ArrowLeft } from 'lucide-react';

export default function MSAPage({ navigate }: { navigate: (path: string) => void }) {
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
        
        <h1 className="text-white text-2xl font-bold mb-6">[MASTER_SERVICES_AGREEMENT]</h1>
        <p className="text-xs mb-8">LAST UPDATED: 2026-07-05</p>
        
        <div className="space-y-6 text-sm leading-relaxed">
          <section>
            <h2 className="text-white font-bold mb-2">1. SCOPE OF ENGAGEMENT</h2>
            <p>This Master Services Agreement ("MSA") governs all Statements of Work ("SOW") executed between the Client and Devil Labs. It outlines the foundational legal framework for our engineering engagements.</p>
          </section>
          <section>
            <h2 className="text-white font-bold mb-2">2. PAYMENT ARCHITECTURE</h2>
            <p>Standard payment terms are Net 15 unless otherwise specified in the SOW. Work phases are gated by milestone payments. Late payments will incur a 1.5% monthly compounding interest penalty and may halt deployment pipelines.</p>
          </section>
          <section>
            <h2 className="text-white font-bold mb-2">3. CONFIDENTIALITY PROTOCOLS</h2>
            <p>Both parties agree to maintain strict confidentiality regarding proprietary architectures, trade secrets, and business logic. Non-Disclosure Agreements (NDAs) executed prior to this MSA remain in full effect.</p>
          </section>
          <section>
            <h2 className="text-white font-bold mb-2">4. WARRANTY AND SUPPORT</h2>
            <p>Devil Labs provides a 30-day post-deployment warranty to resolve critical bugs resulting from our code. Any modifications made by the Client or unauthorized third parties void this warranty immediately.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
