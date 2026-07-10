const fs = require('fs');
const file = 'src/pages/PricingPage.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace base prices
content = content.replace(/basePrice = 5000;/g, 'basePrice = 199;');
content = content.replace(/basePrice = 12000;/g, 'basePrice = 399;');
content = content.replace(/basePrice = 25000;/g, 'basePrice = 799;');
content = content.replace(/basePrice = 40000;/g, 'basePrice = 1299;');
content = content.replace(/basePrice = 20000;/g, 'basePrice = 999;');

// Replace add-ons
content = content.replace(/finalPrice \+\= 8000;/g, 'finalPrice += 399;');
content = content.replace(/finalPrice \+\= 4000;/g, 'finalPrice += 199;');
content = content.replace(/finalPrice \+\= 5000;/g, 'finalPrice += 149;');

// Change Indian multiplier from 80 to 40 for Purchasing Power Parity pricing
content = content.replace(/finalPrice \* 80/g, 'finalPrice * 40');

fs.writeFileSync(file, content);
