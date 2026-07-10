const fs = require('fs');
const file = 'src/pages/ContactPage.tsx';
let content = fs.readFileSync(file, 'utf8');

// Add useCurrency import to ContactPage
content = content.replace("import { useState, useEffect } from 'react';", "import { useState, useEffect } from 'react';\nimport { useCurrency } from '../contexts/CurrencyContext';");
content = content.replace("export default function ContactPage() {", "export default function ContactPage() {\n  const { currency } = useCurrency();");

// Update budget tiers to be dynamic
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
console.log("Updated ContactPage for currency");
