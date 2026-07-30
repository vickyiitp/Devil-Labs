import { google } from 'googleapis';

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

/**
 * Creates an authorized JWT Auth client using Google Service Account credentials.
 */
function getGoogleAuthClient() {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  let privateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!clientEmail || !privateKey) {
    return null;
  }

  // Sanitize private key (replace escaped newlines if coming from environment variables)
  privateKey = privateKey.replace(/\\n/g, '\n');

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: [
      'https://www.googleapis.com/auth/spreadsheets',
      'https://www.googleapis.com/auth/drive.file',
      'https://www.googleapis.com/auth/gmail.send'
    ]
  });

  return auth;
}

/**
 * 1. GOOGLE SHEETS API: Appends a lead row to the target Google Sheet CRM.
 */
export async function appendLeadToGoogleSheets(lead: LeadData): Promise<{ success: boolean; info: string }> {
  try {
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    if (!spreadsheetId) {
      return { 
        success: false, 
        info: 'GOOGLE_SHEETS_SPREADSHEET_ID missing in environment config.' 
      };
    }

    const auth = getGoogleAuthClient();
    if (!auth) {
      return { 
        success: false, 
        info: 'Google Service Account credentials (GOOGLE_SERVICE_ACCOUNT_EMAIL / GOOGLE_PRIVATE_KEY) missing.' 
      };
    }

    const sheets = google.sheets({ version: 'v4', auth });

    const timestamp = new Date().toISOString();
    const values = [
      [
        timestamp,
        lead.name,
        lead.email,
        lead.phone,
        lead.company,
        lead.companySize,
        lead.scope,
        lead.budget,
        lead.specs
      ]
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:I',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values
      }
    });

    return { 
      success: true, 
      info: 'Lead recorded to Google Sheets CRM successfully.' 
    };
  } catch (error: any) {
    console.error('Google Sheets API error:', error);
    return { 
      success: false, 
      info: `Google Sheets API error: ${error.message || error}` 
    };
  }
}

/**
 * 2. GOOGLE DRIVE API: Saves project specifications brief document into Google Drive.
 */
export async function saveBriefToGoogleDrive(lead: LeadData): Promise<{ success: boolean; info: string; fileId?: string }> {
  try {
    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
    const auth = getGoogleAuthClient();

    if (!auth) {
      return { 
        success: false, 
        info: 'Google Service Account credentials missing.' 
      };
    }

    const drive = google.drive({ version: 'v3', auth });

    const fileMetadata: any = {
      name: `Project_Brief_${lead.company.replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now()}.txt`,
      mimeType: 'text/plain'
    };

    if (folderId) {
      fileMetadata.parents = [folderId];
    }

    const content = `
===================================================================
DEVIL LABS // PROJECT TRANSMISSION BRIEF
===================================================================
Timestamp:       ${new Date().toISOString()}
Client Name:     ${lead.name}
Email:           ${lead.email}
Phone:           ${lead.phone}
Organization:    ${lead.company}
Company Size:    ${lead.companySize}
Project Scope:   ${lead.scope}
Budget:          ${lead.budget}
===================================================================
PROJECT SPECIFICATIONS & ARCHITECTURE REQUIREMENTS:
-------------------------------------------------------------------
${lead.specs}
===================================================================
`;

    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: {
        mimeType: 'text/plain',
        body: content
      },
      fields: 'id, webViewLink'
    });

    return { 
      success: true, 
      info: 'Project brief saved to Google Drive.',
      fileId: response.data.id || undefined
    };
  } catch (error: any) {
    console.error('Google Drive API error:', error);
    return { 
      success: false, 
      info: `Google Drive API error: ${error.message || error}` 
    };
  }
}
