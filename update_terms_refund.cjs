const fs = require('fs');
const file = 'src/pages/TermsPage.tsx';
let content = fs.readFileSync(file, 'utf8');

const refundSection = `          <section>
            <h2 className="text-white text-lg font-bold mb-4 uppercase tracking-wider">// 3. REFUND & CANCELLATION POLICY</h2>
            <p className="mb-3">
              Given the custom nature of our digital engineering and software development services, our refund policy is structured as follows:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
              <li><strong>Initial Deposit:</strong> The initial project kick-off deposit is non-refundable once the discovery and architectural planning phases have commenced.</li>
              <li><strong>Cancellation During Development:</strong> If you choose to terminate the project before completion, you will be billed pro-rata for the hours logged and work delivered up to the date of cancellation. No refunds will be issued for completed milestones.</li>
              <li><strong>Post-Deployment:</strong> Due to the irreversible nature of digital product delivery and deployment, no refunds are available once the final code has been handed over or deployed to production servers.</li>
              <li><strong>Service Subscriptions:</strong> Monthly retainer and maintenance plans can be cancelled with a 30-day written notice. No partial-month refunds are provided.</li>
            </ul>
          </section>`;

if (!content.includes('REFUND & CANCELLATION POLICY')) {
  content = content.replace(/<section>\s*<h2 className="text-white text-lg font-bold mb-4 uppercase tracking-wider">\/\/ 3\. PAYMENT & BILLING<\/h2>/g, refundSection + '\n\n          <section>\n            <h2 className="text-white text-lg font-bold mb-4 uppercase tracking-wider">// 4. PAYMENT & BILLING</h2>');
  
  // Also bump up the other numbers
  content = content.replace(/\/\/ 4\. INTELLECTUAL PROPERTY/g, '// 5. INTELLECTUAL PROPERTY');
  content = content.replace(/\/\/ 5\. WARRANTIES/g, '// 6. WARRANTIES');
  content = content.replace(/\/\/ 6\. LIMITATION/g, '// 7. LIMITATION');
}

fs.writeFileSync(file, content);
console.log('Updated TermsPage to include Refund Policy');
