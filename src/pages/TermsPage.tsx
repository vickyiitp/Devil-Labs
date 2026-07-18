import { ArrowLeft, FileText } from 'lucide-react';

export default function TermsPage({ navigate }: { navigate: (path: string) => void }) {
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
          <FileText className="text-violet-500" size={32} />
          <h1 className="text-white text-3xl font-display font-extrabold tracking-tight uppercase">Terms of Service</h1>
        </div>
        <p className="text-xs mb-12 border-b border-white/10 pb-6 text-violet-400 font-bold tracking-widest">EFFECTIVE DATE: 2026-07-10</p>
        
        <div className="space-y-12 text-sm leading-relaxed max-w-3xl">
          <section>
            <h2 className="text-white text-lg font-bold mb-4 uppercase tracking-wider">✦ 1. ACCEPTANCE OF TERMS</h2>
            <p className="mb-4">
              By engaging Devil Labs for software development, AI automation, or digital architecture services, you agree to be bound by these Terms of Service. These terms constitute a legally binding agreement between you (the "Client") and Devil Labs (the "Agency").
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-bold mb-4 uppercase tracking-wider">✦ 2. SCOPE OF SERVICES & PLANS</h2>
            <p className="mb-3">
              We provide tailored digital solutions based on agreed-upon service plans (e.g., Starter, Professional, Enterprise). 
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
              <li><strong>Deliverables:</strong> The exact number of web pages, features, and integrations are outlined strictly in the selected pricing tier or custom proposal.</li>
              <li><strong>Revisions:</strong> Unless otherwise specified in the Master Services Agreement (MSA), our plans include up to two (2) rounds of minor revisions during the UI/UX phase. Major architectural changes post-approval will incur additional hourly billing.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white text-lg font-bold mb-4 uppercase tracking-wider">✦ 3. PRICING & PAYMENT TERMS</h2>
            <p className="mb-4">
              Payments are required as per the schedule defined in the service proposal. Standard payment structure is 50% upfront to initiate the project, and 50% upon successful deployment to production. We reserve the right to suspend services or withhold source code handovers if invoices are severely past due.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-bold mb-4 uppercase tracking-wider">✦ 5. INTELLECTUAL PROPERTY RIGHTS</h2>
            <p className="mb-4">
              Upon final payment clearing, all custom source code, assets, and intellectual property developed specifically for your project are transferred entirely to you. Devil Labs retains the right to use open-source modules, pre-existing proprietary frameworks, and general algorithms utilized across multiple projects. We also reserve the right to showcase the completed project in our portfolio, unless restricted by a specific Non-Disclosure Agreement (NDA).
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-bold mb-4 uppercase tracking-wider">✦ 6. WARRANTIES & LIABILITIES</h2>
            <p className="mb-4">
              We engineer robust systems utilizing the latest industry standards. However, software relies on third-party APIs (e.g., LLMs, cloud hosts) which may change. Devil Labs is not liable for service interruptions caused by upstream provider failures, deprecations, or malicious external cyber attacks post-handover. Our liability is strictly limited to the total amount paid by the client for the specific project.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-bold mb-4 uppercase tracking-wider">✦ 6. TERMINATION</h2>
            <p>
              Either party may terminate the agreement with written notice if the other party breaches material terms. In the event of early termination by the client, Devil Labs shall be compensated for all hours worked and resources allocated up to the termination date.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
