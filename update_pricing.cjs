const fs = require('fs');

const file = 'src/pages/PricingPage.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace the models array completely
const startModel = content.indexOf('const models = [');
const endModel = content.indexOf('const faqs = [');

let topImport = `import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Check, HelpCircle, ChevronDown, ChevronUp, Zap, Sparkles, Sliders, Clock, Users, DollarSign } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';`;

content = content.replace(/import { motion.*?\n.*?\n.*?;/, topImport);

const newModelsCode = `
  const [isIndia, setIsIndia] = useState(false);

  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz.toLowerCase().includes('kolkata') || tz.toLowerCase().includes('calcutta') || tz.toLowerCase().includes('asia')) {
        // Broadly Asia check, but let's just make it simple
        setIsIndia(true);
      }
    } catch (e) {
      // fallback
    }
  }, []);

  const models = [
    {
      title: "MVP Build (Starter)",
      tagline: "FAST PRODUCT SHIPMENT",
      price: isIndia ? "₹7,500" : "$199",
      priceBasis: "per deployment",
      description: "Ideal for small businesses establishing their first digital footprint.",
      features: [
        "3-4 Web Pages (Home, About, Services, Contact)",
        "Mobile Responsive Design",
        "Contact Form Integration",
        "Basic On-Page SEO Setup",
        "Social Media Links",
        "14-day production support period"
      ],
      cta: "INITIALIZE MVP UPLINK",
      popular: false,
      scope: "MVP Build (Starter)"
    },
    {
      title: "Full-Stack + AI (Professional)",
      tagline: "AUTONOMOUS & DATA ENGINES",
      price: isIndia ? "₹15,000" : "$499",
      priceBasis: "per architecture",
      description: "Comprehensive solution for growing brands requiring custom logic and design.",
      features: [
        "Up to 10 Web Pages (Dynamic Content)",
        "Custom UI/UX Design & User Authentication",
        "CMS Integration (Manage your own content)",
        "Speed & Performance Optimization",
        "Advanced Analytics & Tracking",
        "30-day dedicated engineering support"
      ],
      cta: "INITIALIZE SECURE SYSTEM",
      popular: true,
      scope: "Full-Stack + AI (Professional)"
    },
    {
      title: "Retainer / Enterprise",
      tagline: "CONTINUOUS AUTOMATION SCALE",
      price: isIndia ? "₹35,000+" : "$1,000+",
      priceBasis: "per sprint period",
      description: "Fully custom architecture with advanced AI automation for high-volume operations.",
      features: [
        "Unlimited / Dynamic Pages",
        "Payment Gateway Integration",
        "AI Agent Integration (Gemini/OpenAI)",
        "Custom Backend Systems & APIs",
        "Weekly database & security audits",
        "Priority Tech Support & Infinite SLA"
      ],
      cta: "INITIALIZE PARTNERSHIP",
      popular: false,
      scope: "Retainer / Enterprise"
    }
  ];

  `;

content = content.substring(0, startModel) + newModelsCode + content.substring(endModel);

// Replace onClick={() => navigate('/contact')} in the card CTA to include scope
content = content.replace(/onClick=\{\(\) => navigate\('\/contact'\)\}/g, "onClick={() => navigate(`/contact?scope=${encodeURIComponent(model.scope)}`)}");

// Also update the estimator price to use INR or USD
content = content.replace(/priceStr: \`\\\$\\\{\(finalPrice \/ 1000\)\.toFixed\(1\)\}k\`/, "priceStr: isIndia ? `₹${(finalPrice * 80).toLocaleString('en-IN')}` : `$${finalPrice.toLocaleString('en-US')}`");

fs.writeFileSync(file, content);
console.log("Updated PricingPage");
