import { ArrowLeft } from 'lucide-react';

export default function TermsPage({ navigate }: { navigate: (path: string) => void }) {
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
        
        <h1 className="text-white text-2xl font-bold mb-6">[TERMS_OF_SERVICE]</h1>
        <p className="text-xs mb-8">LAST UPDATED: 2026-07-05</p>
        
        <div className="space-y-6 text-sm leading-relaxed">
          <section>
            <h2 className="text-white font-bold mb-2">1. ACCEPTANCE OF PARAMETERS</h2>
            <p>By accessing the Devil Labs infrastructure or engaging our services, you agree to be bound by these Terms of Service. Failure to comply will result in immediate termination of access.</p>
          </section>
          <section>
            <h2 className="text-white font-bold mb-2">2. SERVICE EXECUTION</h2>
            <p>We provide high-velocity AI engineering and full-stack development. Deliverables are subject to the specifications outlined in the Master Services Agreement. Unforeseen technical limitations will be communicated through official channels.</p>
          </section>
          <section>
            <h2 className="text-white font-bold mb-2">3. INTELLECTUAL PROPERTY</h2>
            <p>Upon full payment of all invoices, all custom code, architectures, and intellectual property developed specifically for the client are transferred to the client. Devil Labs retains rights to underlying, pre-existing frameworks and proprietary AI agents.</p>
          </section>
          <section>
            <h2 className="text-white font-bold mb-2">4. LIABILITY LIMITATIONS</h2>
            <p>Devil Labs shall not be liable for indirect, incidental, or consequential damages arising from the deployment or failure of experimental AI systems or third-party infrastructure outages.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
