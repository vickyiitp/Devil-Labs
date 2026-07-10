const fs = require('fs');
const file = 'src/pages/ContactPage.tsx';
let content = fs.readFileSync(file, 'utf8');

// Add useCurrency if not already there
if (!content.includes("useCurrency")) {
    content = content.replace("import React, { useState, useEffect } from 'react';", "import React, { useState, useEffect } from 'react';\nimport { useCurrency } from '../contexts/CurrencyContext';");
}

content = content.replace("export default function ContactPage({ navigate }: ContactPageProps) {\n  const [formData", "export default function ContactPage({ navigate }: ContactPageProps) {\n  const { currency } = useCurrency();\n  const [formData");

const oldBudgets = `  const budgets = [
    { value: 'Tier 1', label: '$10k - $25k (MVP / Conceptual Build)' },
    { value: 'Tier 2', label: '$25k - $75k (Full Production Deployment)' },
    { value: 'Tier 3', label: '$75k+ (Enterprise Scale / Retainer)' }
  ];`;

const newBudgets = `  const budgets = [
    { value: 'Tier 1', label: currency === 'INR' ? '₹7,500 - ₹15,000 (MVP / Starter)' : '$199 - $499 (MVP / Starter)' },
    { value: 'Tier 2', label: currency === 'INR' ? '₹15,000 - ₹35,000 (Full Production)' : '$499 - $1,000 (Full Production)' },
    { value: 'Tier 3', label: currency === 'INR' ? '₹35,000+ (Enterprise Scale / Retainer)' : '$1,000+ (Enterprise Scale / Retainer)' }
  ];`;

content = content.replace(oldBudgets, newBudgets);

fs.writeFileSync(file, content);
console.log("Updated ContactPage for currency correctly");
