/**
 * RSVP → Google Sheet
 * 1. Create a Google Sheet. Extensions → Apps Script. Paste this file. Save.
 * 2. Deploy → New deployment → type "Web app"
 *      Execute as: Me   ·   Who has access: Anyone
 * 3. Copy the Web App URL into GOOGLE_SHEET_WEBAPP_URL in src/config/inviteConfig.js
 */
const HEADERS = ['submittedAt', 'name', 'phone', 'attending', 'guests', 'events', 'message']

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0]
  if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS)
  const p = (e && e.parameter) || {}
  sheet.appendRow(HEADERS.map((h) => p[h] || ''))
  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON)
}

function doGet() {
  return ContentService.createTextOutput('RSVP endpoint is live 🪔')
}
