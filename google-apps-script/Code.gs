/**
 * RSVP form → Google Sheet
 *
 * 1. Open the sheet → Extensions → Apps Script. Delete the sample code, paste this file, Save.
 * 2. Deploy → New deployment → ⚙ "Web app"
 *      Execute as: Me   ·   Who has access: Anyone
 *    Authorise when Google asks (Advanced → Go to project → Allow).
 * 3. Copy the Web App URL (ends in /exec) into GOOGLE_SHEET_WEBAPP_URL in src/config/inviteConfig.js
 *
 * After editing this script later, use Deploy → Manage deployments → ✏ → Version: New version
 * so the same /exec URL keeps working.
 */
const SHEET_ID = '1if0Oc2VKkf7HVnHgiEE9we9IWuHDR044SebjbNdtflo'
const FIELDS = ['submittedAt', 'name', 'phone', 'attending', 'guests', 'events', 'message']
const HEADINGS = ['Submitted at (IST)', 'Name', 'Phone', 'Attending', 'Guests', 'Events', 'Message']

function getSheet_() {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0]
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADINGS)
    sheet.getRange(1, 1, 1, HEADINGS.length).setFontWeight('bold')
    sheet.setFrozenRows(1)
  }
  return sheet
}

function doPost(e) {
  const lock = LockService.getScriptLock()
  lock.waitLock(10000) // two guests submitting at once won't overwrite each other
  try {
    const p = (e && e.parameter) || {}
    const row = FIELDS.map((f) => (f === 'submittedAt' ? Utilities.formatDate(new Date(), 'Asia/Kolkata', 'dd MMM yyyy, hh:mm a') : String(p[f] || '').slice(0, 1000)))
    row[2] = row[2] ? "'" + row[2] : '' // keep phone as text (+91…, leading zeros)
    getSheet_().appendRow(row)
    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON)
  } finally {
    lock.releaseLock()
  }
}

/** Visit the /exec URL in a browser to check it's live. */
function doGet() {
  return ContentService.createTextOutput('RSVP endpoint is live 🪔')
}

/** Optional: run this once from the editor (▶ Run) to add a test row and trigger the permission prompt. */
function testRow() {
  doPost({ parameter: { name: 'Test Guest', phone: '0000000000', attending: 'yes', guests: '2', events: 'Wedding', message: 'Test — delete me' } })
}
