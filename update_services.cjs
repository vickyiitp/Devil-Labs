const fs = require('fs');

const file = 'src/data/serviceDetails.ts';
let content = fs.readFileSync(file, 'utf8');

const planStr = `
    plans: [
      {
        name: 'Starter Plan',
        price: '₹7,500',
        description: 'Ideal for small businesses in emerging markets (Gaya, Patna) establishing their digital footprint.',
        features: ['3-4 Web Pages', 'Mobile Responsive UI', 'Contact Form Integration', 'Basic On-Page SEO', 'Social Media Links'],
        highlight: false
      },
      {
        name: 'Professional Plan',
        price: '₹15,000',
        description: 'Comprehensive solution for growing brands across New Delhi and metro cities.',
        features: ['Up to 10 Web Pages', 'Custom UI/UX Design', 'CMS Integration', 'Speed & Performance Optimization', 'Advanced Analytics'],
        highlight: true
      },
      {
        name: 'Enterprise Plan',
        price: '₹35,000+',
        description: 'Fully custom architecture with advanced automation and integrations.',
        features: ['Unlimited / Dynamic Pages', 'Payment Gateway Integration', 'AI Automation & Agents', 'Custom Backend Systems', 'Priority Tech Support'],
        highlight: false
      }
    ],
    contactValue:`;

content = content.replace(/contactValue:/g, planStr);

fs.writeFileSync(file, content);
console.log("Updated serviceDetails.ts");
