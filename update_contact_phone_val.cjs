const fs = require('fs');

let content = fs.readFileSync('src/pages/ContactPage.tsx', 'utf8');

const oldPhoneVal = `if (!formData.phone) newErrors.push("Please provide your phone number.");`;
const newPhoneVal = `if (!formData.phone) newErrors.push("Please provide your phone number.");
    else if (!/^\\+?[1-9]\\d{1,14}$/.test(formData.phone.replace(/[\\s\\-()]/g, ''))) newErrors.push("Please provide a valid phone number.");`;

content = content.replace(oldPhoneVal, newPhoneVal);
fs.writeFileSync('src/pages/ContactPage.tsx', content);
console.log('Fixed Phone Validation');
