import nodemailer from 'nodemailer';
import { appendLeadToGoogleSheets, saveBriefToGoogleDrive } from '../lib/googleServices';

export interface LeadData {
  name: string;
  email: string;
  phone: string;
  company: string;
  companySize: string;
  scope: string;
  budget: string;
  specs: string;
}

export interface DispatchResults {
  email: { success: boolean; info: string };
  googleSheets: { success: boolean; info: string };
  googleDrive: { success: boolean; info: string };
  telegram: { success: boolean; info: string };
  whatsapp: { success: boolean; info: string };
  sms: { success: boolean; info: string };
}

export async function dispatchNotifications(lead: LeadData): Promise<DispatchResults> {
  const results: DispatchResults = {
    email: { success: false, info: '' },
    googleSheets: { success: false, info: '' },
    googleDrive: { success: false, info: '' },
    telegram: { success: false, info: '' },
    whatsapp: { success: false, info: '' },
    sms: { success: false, info: '' }
  };

  const messageText = `
=== DEVIL LABS NEW TRANSMISSION ===
Client Name: ${lead.name}
Email: ${lead.email}
Phone: ${lead.phone}
Organization: ${lead.company}
Company Size: ${lead.companySize}
Project Scope: ${lead.scope}
Budget Expectation: ${lead.budget}

Project Specifications:
${lead.specs}
==================================
`;

  // 1. GOOGLE SHEETS DISPATCH (Log lead to Google Sheets CRM)
  try {
    results.googleSheets = await appendLeadToGoogleSheets(lead);
  } catch (error: any) {
    console.error('Google Sheets dispatch error:', error);
    results.googleSheets = { success: false, info: error.message || 'Google Sheets logging failed.' };
  }

  // 2. GOOGLE DRIVE DISPATCH (Save spec document brief in Google Drive)
  try {
    results.googleDrive = await saveBriefToGoogleDrive(lead);
  } catch (error: any) {
    console.error('Google Drive dispatch error:', error);
    results.googleDrive = { success: false, info: error.message || 'Google Drive brief upload failed.' };
  }

  // 3. EMAIL DISPATCH via Nodemailer / Gmail SMTP
  try {
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const adminEmail = process.env.ADMIN_EMAIL || 'devil.labs.contact@gmail.com';

    if (smtpHost && smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const mailOptions = {
        from: `"Devil Labs System" <${smtpUser}>`,
        to: adminEmail,
        replyTo: lead.email,
        subject: `🚨 [NEW LEAD] ${lead.company} - ${lead.scope}`,
        text: messageText,
        html: `
          <div style="font-family: sans-serif; background-color: #050505; color: #ffffff; padding: 30px; border-radius: 12px; border: 1px solid #333;">
            <h2 style="color: #a78bfa; margin-top: 0; text-transform: uppercase; font-size: 20px; border-bottom: 1px solid #222; padding-bottom: 10px;">// DEVIL LABS NEW LEAD DETECTED</h2>
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
              <tr><td style="padding: 8px 0; color: #888; width: 150px;">Client Name:</td><td style="font-weight: bold; color: #fff;">${lead.name}</td></tr>
              <tr><td style="padding: 8px 0; color: #888;">Email Address:</td><td><a href="mailto:${lead.email}" style="color: #a78bfa; text-decoration: none;">${lead.email}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #888;">Phone Number:</td><td><a href="tel:${lead.phone}" style="color: #a78bfa; text-decoration: none;">${lead.phone}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #888;">Organization:</td><td style="color: #fff;">${lead.company}</td></tr>
              <tr><td style="padding: 8px 0; color: #888;">Company Size:</td><td style="color: #fff;">${lead.companySize}</td></tr>
              <tr><td style="padding: 8px 0; color: #888;">Project Scope:</td><td style="color: #34d399; font-weight: bold;">${lead.scope}</td></tr>
              <tr><td style="padding: 8px 0; color: #888;">Budget Expectation:</td><td style="color: #a78bfa; font-weight: bold;">${lead.budget}</td></tr>
            </table>
            <div style="margin-top: 25px; padding: 15px; background-color: #0a0a0a; border-radius: 8px; border: 1px solid #1a1a1a;">
              <span style="font-family: monospace; font-size: 11px; color: #666; display: block; margin-bottom: 5px;">// PROJECT SPECIFICATIONS</span>
              <p style="margin: 0; color: #ddd; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${lead.specs}</p>
            </div>
            <p style="font-size: 11px; color: #555; margin-top: 30px; text-align: center; font-family: monospace;">SECURED BY DEVIL LABS TRANSMISSION UPLINK</p>
          </div>
        `
      };

      await transporter.sendMail(mailOptions);
      
      try {
        const clientMailOptions = {
          from: `"Devil Labs System" <${smtpUser}>`,
          to: lead.email,
          subject: `⚡ [TRANSMISSION RECEIVED] Devil Labs Architecture Pipeline`,
          text: `Hello ${lead.name},\n\nWe have received your project transmission for "${lead.company}". Our autonomous dispatch system has logged your requirements, and an integration specialist will establish contact shortly.\n\nSummary of Submitted Specifications:\n- Scope: ${lead.scope}\n- Budget Bracket: ${lead.budget}\n\nThank you for choosing Devil Labs.\n\n---\nDevil Labs System`,
          html: `
            <div style="font-family: sans-serif; background-color: #050505; color: #ffffff; padding: 40px; border-radius: 16px; border: 1px solid #1f1938; max-width: 600px; margin: 0 auto; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #ffffff; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; margin: 0; text-transform: uppercase;">DEVIL LABS</h1>
                <p style="color: #8b5cf6; font-family: monospace; font-size: 11px; margin: 5px 0 0 0; letter-spacing: 2px;">// SYSTEM TRANSMISSION CONFIRMED</p>
              </div>
              
              <p style="font-size: 15px; line-height: 1.6; color: #d1d5db; margin-bottom: 25px;">
                Hello <strong>${lead.name}</strong>,
              </p>
              
              <p style="font-size: 15px; line-height: 1.6; color: #d1d5db; margin-bottom: 25px;">
                Your project brief has bypassed filters and has been successfully dispatched across our live service pipeline. We have securely logged your technical requirements, and our engineers are conducting a preliminary architectural review.
              </p>

              <div style="background-color: #090909; border: 1px solid #2e264f; border-radius: 12px; padding: 20px; margin-bottom: 30px;">
                <span style="font-family: monospace; font-size: 11px; color: #8b5cf6; display: block; margin-bottom: 12px; text-transform: uppercase; font-weight: bold;">// TRANSMISSION LOG SUMMARY</span>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 6px 0; color: #9ca3af; font-size: 13px; width: 140px; border-bottom: 1px solid #1c1917;">Organization:</td>
                    <td style="padding: 6px 0; color: #ffffff; font-size: 13px; font-weight: 600; border-bottom: 1px solid #1c1917;">${lead.company}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #9ca3af; font-size: 13px; width: 140px; border-bottom: 1px solid #1c1917;">Project Scope:</td>
                    <td style="padding: 6px 0; color: #10b981; font-size: 13px; font-weight: bold; border-bottom: 1px solid #1c1917;">${lead.scope}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #9ca3af; font-size: 13px; width: 140px; border-bottom: 1px solid #1c1917;">Budget Expectation:</td>
                    <td style="padding: 6px 0; color: #8b5cf6; font-size: 13px; font-weight: bold; border-bottom: 1px solid #1c1917;">${lead.budget}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #9ca3af; font-size: 13px; width: 140px; vertical-align: top; padding-top: 8px;">Specifications:</td>
                    <td style="padding: 6px 0; color: #d1d5db; font-size: 13px; font-style: italic; padding-top: 8px; line-height: 1.5;">"${lead.specs.length > 150 ? lead.specs.substring(0, 150) + '...' : lead.specs}"</td>
                  </tr>
                </table>
              </div>

              <p style="font-size: 14px; line-height: 1.6; color: #9ca3af; margin-bottom: 30px;">
                An integration specialist will establish a secure channel to discuss details, timeline estimation, and custom deployment stages within 12-24 business hours.
              </p>

              <div style="border-top: 1px solid #222; padding-top: 25px; text-align: center;">
                <p style="font-size: 11px; color: #6b7280; font-family: monospace; margin: 0;">
                  SECURED SYSTEM LINK // DEVIL LABS AUTONOMOUS INTEL
                </p>
                <p style="font-size: 10px; color: #4b5563; font-family: monospace; margin-top: 5px;">
                  This is an automated system confirmation. Replies to this address are monitored by active logs.
                </p>
              </div>
            </div>
          `
        };
        await transporter.sendMail(clientMailOptions);
        results.email = { success: true, info: 'Dispatched successfully via Gmail/SMTP (admin and client notified).' };
      } catch (clientMailError: any) {
        console.error("Admin notification succeeded but Client confirmation failed:", clientMailError);
        results.email = { success: true, info: `Admin notified via SMTP, client confirmation error: ${clientMailError.message}` };
      }
    } else {
      // FormSubmit Dispatch (Free & keyless direct email delivery to devil.labs.contact@gmail.com)
      console.log('SMTP credentials not set. Initiating FormSubmit direct delivery uplink...');
      const fsResponse = await fetch(`https://formsubmit.co/ajax/${adminEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `🚨 [NEW LEAD] ${lead.company} - ${lead.scope}`,
          _captcha: 'false',
          _replyto: lead.email,
          _template: 'table',
          "Client Name": lead.name,
          "Email Address": lead.email,
          "Phone Number": lead.phone,
          "Organization": lead.company,
          "Company Size": lead.companySize,
          "Project Scope": lead.scope,
          "Budget Expectation": lead.budget,
          "Project Specifications": lead.specs
        })
      });

      if (fsResponse.ok) {
        results.email = { success: true, info: `Dispatched successfully to ${adminEmail} via FormSubmit API.` };
      } else {
        const fsErrText = await fsResponse.text();
        results.email = { success: false, info: `FormSubmit API returned: ${fsErrText}` };
      }
    }
  } catch (error: any) {
    console.error("Email notification failed:", error);
    // Fallback attempt to FormSubmit if Nodemailer threw an exception
    try {
      const adminEmail = process.env.ADMIN_EMAIL || 'devil.labs.contact@gmail.com';
      const fsResponse = await fetch(`https://formsubmit.co/ajax/${adminEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `🚨 [NEW LEAD] ${lead.company} - ${lead.scope}`,
          _captcha: 'false',
          _replyto: lead.email,
          "Client Name": lead.name,
          "Email Address": lead.email,
          "Phone Number": lead.phone,
          "Organization": lead.company,
          "Company Size": lead.companySize,
          "Project Scope": lead.scope,
          "Budget Expectation": lead.budget,
          "Project Specifications": lead.specs
        })
      });

      if (fsResponse.ok) {
        results.email = { success: true, info: `Dispatched successfully to ${adminEmail} via FormSubmit API.` };
      } else {
        results.email = { success: false, info: error.message || 'Email transmission failed.' };
      }
    } catch (fsErr: any) {
      results.email = { success: false, info: error.message || 'SMTP & FormSubmit failed.' };
    }
  }

  // 4. TELEGRAM DISPATCH (Free & Open Source Bot API)
  try {
    const tgToken = process.env.TELEGRAM_BOT_TOKEN;
    const tgChatId = process.env.TELEGRAM_CHAT_ID;

    if (tgToken && tgChatId) {
      const escapeMarkdown = (text: string) => {
        return text.replace(/[_*\[\]()~`>#+\-=|{}.!]/g, '\\$&');
      };

      const tgText = `🚨 *Devil Labs: New Lead Detected* 🚨\n\n` +
        `👤 *Name:* ${escapeMarkdown(lead.name)}\n` +
        `✉️ *Email:* ${escapeMarkdown(lead.email)}\n` +
        `📞 *Phone:* ${escapeMarkdown(lead.phone)}\n` +
        `🏢 *Company:* ${escapeMarkdown(lead.company)} (Size: ${escapeMarkdown(lead.companySize)})\n` +
        `🎯 *Scope:* ${escapeMarkdown(lead.scope)}\n` +
        `💰 *Budget:* ${escapeMarkdown(lead.budget)}\n\n` +
        `📝 *Specs:* \n_${escapeMarkdown(lead.specs)}_`;

      const url = `https://api.telegram.org/bot${tgToken}/sendMessage`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: tgChatId,
          text: tgText,
          parse_mode: 'MarkdownV2'
        })
      });

      if (response.ok) {
        results.telegram = { success: true, info: 'Dispatched successfully via Telegram Bot API.' };
      } else {
        const errorText = await response.text();
        results.telegram = { success: false, info: `Telegram API error: ${errorText}` };
      }
    } else {
      results.telegram = { success: false, info: 'TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID missing in environment.' };
    }
  } catch (error: any) {
    console.error("Telegram notification failed:", error);
    results.telegram = { success: false, info: error.message || 'Telegram connection failed.' };
  }

  // 5. WHATSAPP DISPATCH
  try {
    const waApiUrl = process.env.WHATSAPP_API_URL;
    const waToken = process.env.WHATSAPP_API_TOKEN;
    const waPhone = process.env.WHATSAPP_RECIPIENT_PHONE;

    if (waApiUrl && waPhone) {
      const payload = {
        to: waPhone,
        message: `🚨 *Devil Labs: New Lead* 🚨\n\n*Name:* ${lead.name}\n*Email:* ${lead.email}\n*Phone:* ${lead.phone}\n*Company:* ${lead.company}\n*Scope:* ${lead.scope}\n*Budget:* ${lead.budget}\n\n*Specs:* ${lead.specs}`
      };

      const response = await fetch(waApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(waToken ? { 'Authorization': `Bearer ${waToken}` } : {})
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        results.whatsapp = { success: true, info: 'Dispatched successfully to self-hosted WhatsApp API.' };
      } else {
        const errText = await response.text();
        results.whatsapp = { success: false, info: `WhatsApp API error: ${errText}` };
      }
    } else {
      const twilioSid = process.env.TWILIO_ACCOUNT_SID;
      const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
      const twilioFrom = process.env.TWILIO_WHATSAPP_FROM;
      const twilioTo = process.env.TWILIO_WHATSAPP_TO;

      if (twilioSid && twilioAuthToken && twilioFrom && twilioTo) {
        const auth = Buffer.from(`${twilioSid}:${twilioAuthToken}`).toString('base64');
        const waMsg = `🚨 Devil Labs: New Lead 🚨\n\nName: ${lead.name}\nEmail: ${lead.email}\nPhone: ${lead.phone}\nCompany: ${lead.company}\nScope: ${lead.scope}\nBudget: ${lead.budget}\n\nSpecs: ${lead.specs}`;

        const params = new URLSearchParams();
        params.append('To', twilioTo);
        params.append('From', twilioFrom);
        params.append('Body', waMsg);

        const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`, {
          method: 'POST',
          headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: params
        });

        if (response.ok) {
          results.whatsapp = { success: true, info: 'Dispatched successfully via Twilio WhatsApp Gateway.' };
        } else {
          const errText = await response.text();
          results.whatsapp = { success: false, info: `Twilio WhatsApp error: ${errText}` };
        }
      } else {
        results.whatsapp = { success: false, info: 'WhatsApp API credentials or Twilio parameters missing.' };
      }
    }
  } catch (error: any) {
    console.error("WhatsApp notification failed:", error);
    results.whatsapp = { success: false, info: error.message || 'WhatsApp pipeline failed.' };
  }

  // 6. SMS DISPATCH
  try {
    const smsGatewayUrl = process.env.SMS_GATEWAY_URL;
    const smsGatewayToken = process.env.SMS_GATEWAY_TOKEN;
    const smsRecipient = process.env.SMS_RECIPIENT_PHONE;

    if (smsGatewayUrl && smsRecipient) {
      const formattedUrl = smsGatewayUrl
        .replace('{to}', encodeURIComponent(smsRecipient))
        .replace('{message}', encodeURIComponent(`Devil Labs Lead: ${lead.name} from ${lead.company} needs ${lead.scope}`));

      const response = await fetch(formattedUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(smsGatewayToken ? { 'Authorization': `Bearer ${smsGatewayToken}` } : {})
        },
        body: JSON.stringify({
          to: smsRecipient,
          message: `Devil Labs Lead: ${lead.name} (${lead.company}) - ${lead.scope}. Details in email.`
        })
      });

      if (response.ok) {
        results.sms = { success: true, info: 'Dispatched successfully to custom SMS Gateway.' };
      } else {
        results.sms = { success: false, info: `Custom SMS Gateway returned HTTP status ${response.status}.` };
      }
    } else {
      const twilioSid = process.env.TWILIO_ACCOUNT_SID;
      const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
      const twilioFrom = process.env.TWILIO_FROM_SMS;
      const twilioTo = process.env.TWILIO_TO_SMS;

      if (twilioSid && twilioAuthToken && twilioFrom && twilioTo) {
        const auth = Buffer.from(`${twilioSid}:${twilioAuthToken}`).toString('base64');
        const smsMsg = `Devil Labs Lead: ${lead.name} (${lead.company}) wants ${lead.scope}. Phone: ${lead.phone}.`;

        const params = new URLSearchParams();
        params.append('To', twilioTo);
        params.append('From', twilioFrom);
        params.append('Body', smsMsg);

        const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`, {
          method: 'POST',
          headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: params
        });

        if (response.ok) {
          results.sms = { success: true, info: 'Dispatched successfully via Twilio SMS.' };
        } else {
          const errText = await response.text();
          results.sms = { success: false, info: `Twilio SMS error: ${errText}` };
        }
      } else {
        results.sms = { success: false, info: 'SMS custom gateway or Twilio credentials missing.' };
      }
    }
  } catch (error: any) {
    console.error("SMS notification failed:", error);
    results.sms = { success: false, info: error.message || 'SMS pipeline connection failed.' };
  }

  console.log('=== DISPATCH RESULTS ===', results);
  return results;
}
