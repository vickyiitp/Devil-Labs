const fs = require('fs');

const file = 'src/data/serviceDetails.ts';
let content = fs.readFileSync(file, 'utf8');

// I will append a plans array to each service object in the data.
// Since the file is huge, I will do a regex replace to insert plans just before `contactValue:`
const planStr = `
    plans: [
      {
        name: 'Starter Plan',
        price: '₹7,500',
        description: 'Ideal for small businesses in Tier 2/3 cities (Gaya, Patna) establishing their first digital footprint.',
        features: ['3-4 Web Pages', 'Mobile Responsive Design', 'Contact Form Integration', 'Basic SEO Setup', 'Social Media Links'],
        highlight: false
      },
      {
        name: 'Professional Plan',
        price: '₹15,000',
        description: 'Comprehensive solution for growing brands across New Delhi and metro cities.',
        features: ['Up to 10 Web Pages', 'Custom UI/UX Design', 'CMS Integration', 'Speed Optimization', 'Advanced Analytics'],
        highlight: true
      },
      {
        name: 'Enterprise Plan',
        price: '₹35,000+',
        description: 'Fully custom architecture with advanced automation for high-volume operations.',
        features: ['Unlimited / Dynamic Pages', 'Payment Gateway Setup', 'AI Agent Integration', 'Custom Backend', 'Priority Support'],
        highlight: false
      }
    ],
    contactValue:`;

content = content.replace(/contactValue:/g, planStr);

fs.writeFileSync(file, content);
console.log("Updated serviceDetails.ts");
