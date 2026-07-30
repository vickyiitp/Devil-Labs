export default async function handler(req: any, res: any) {
  // CORS setup
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { name, email, phone, company, companySize, scope, budget, specs } = body || {};

    if (!name || !email || !specs) {
      return res.status(400).json({ error: 'Missing required lead parameters (name, email, specs).' });
    }

    const dispatchResults = await dispatchNotifications({
      name: name || 'Anonymous Client',
      email: email || 'unknown@domain.com',
      phone: phone || 'no-phone',
      company: company || 'Self',
      companySize: companySize || '1-10',
      scope: scope || 'General Inquiry',
      budget: budget || 'Custom',
      specs: specs || 'No specifications provided.'
    });

    return res.status(200).json({
      success: true,
      message: 'Contact information received and dispatched successfully across active communication & Google Workspace pipelines.',
      results: dispatchResults
    });
  } catch (error: any) {
    console.error('Error in /api/contact serverless handler:', error);
    return res.status(500).json({
      error: 'Failed to process contact form',
      details: error.message || error
    });
  }
}

import { dispatchNotifications } from '../src/utils/notificationService';
