import { ArrowLeft, Briefcase } from 'lucide-react';

export default function MSAPage({ navigate }: { navigate: (path: string) => void }) {
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
          <Briefcase className="text-violet-500" size={32} />
          <h1 className="text-white text-3xl font-display font-extrabold tracking-tight uppercase">Master Services Agreement (MSA) & NDA</h1>
        </div>
        <p className="text-xs mb-12 border-b border-white/10 pb-6 text-violet-400 font-bold tracking-widest">STANDARD ENTERPRISE TEMPLATE</p>
        
        <div className="space-y-12 text-sm leading-relaxed max-w-3xl">
          
          <div className="bg-white/5 border border-white/10 p-6 rounded-lg text-white font-sans text-base mb-8">
            <p><strong>Note:</strong> This is a generalized overview of our Master Services Agreement and Non-Disclosure parameters. A formalized, legally binding PDF document will be signed by both entities prior to the commencement of any Enterprise-tier engineering.</p>
          </div>

          <section>
            <h2 className="text-white text-lg font-bold mb-4 uppercase tracking-wider">✦ 1. NON-DISCLOSURE AGREEMENT (NDA) PROTOCOL</h2>
            <p className="mb-4">
              Devil Labs operates under a strict default-confidentiality framework. We agree not to disclose, reproduce, or distribute any proprietary business information, trade secrets, architectural plans, or client lists shared during the discovery or execution phases. This confidentiality obligation survives the termination of the project indefinitely.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-bold mb-4 uppercase tracking-wider">✦ 2. STATEMENTS OF WORK (SOW)</h2>
            <p className="mb-4">
              This MSA acts as the umbrella agreement. Each individual project, sprint, or feature set will be defined in a separate Statement of Work (SOW). The SOW will explicitly define the deliverables, timeline (e.g., agile milestones), pricing plans, and acceptance criteria. In case of conflict, the SOW supersedes the MSA for that specific project.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-bold mb-4 uppercase tracking-wider">✦ 3. ACCEPTANCE & TESTING</h2>
            <p className="mb-4">
              Upon delivery of milestones, the Client has five (5) business days to review the software against the Acceptance Criteria defined in the SOW. If no bugs or deviations from the SOW are reported within this window, the milestone is deemed accepted, and invoicing triggers automatically.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-bold mb-4 uppercase tracking-wider">✦ 4. MAINTENANCE & SERVICE LEVEL AGREEMENT (SLA)</h2>
            <p className="mb-4">
              Post-deployment, Devil Labs offers a standard 30-day warranty period for critical bug fixes related to the original scope at no extra cost. Ongoing maintenance, AI model updates, and active server monitoring require an active Retainer Plan, which guarantees a 24-hour response time for critical infrastructure failures.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-bold mb-4 uppercase tracking-wider">✦ 5. INDEPENDENT CONTRACTOR STATUS</h2>
            <p className="mb-4">
              Devil Labs is an independent contractor. Nothing in this MSA or any SOW creates a partnership, joint venture, agency, or employment relationship between the Client and Devil Labs.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
