const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const {authenticate} = require('@google-cloud/local-auth');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), './credentials.json');




module.exports = function addGoogleSheetData(req, res){

  async function loadSavedCredentialsIfExist() {
    try {
      const content = await fs.readFile(TOKEN_PATH);
      const credentials = JSON.parse(content);
      return google.auth.fromJSON(credentials);
    } catch (err) {
      return null;
    }
  }

  async function saveCredentials(client) {
    const content = await fs.readFile(CREDENTIALS_PATH);
    const keys = JSON.parse(content);
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
      type: 'authorized_user',
      client_id: key.client_id,
      client_secret: key.client_secret,
      refresh_token: client.credentials.refresh_token,
    });
    await fs.writeFile(TOKEN_PATH, payload);
  }


  async function authorize() {
    let client = await loadSavedCredentialsIfExist();
    if (client) {
      return client;
    }
    client = await authenticate({
      scopes: SCOPES,
      keyfilePath: CREDENTIALS_PATH,
    });
    if (client.credentials) {
      await saveCredentials(client);
    }
    return client;
  }

async function addInfo(auth) {
    const sheets = google.sheets({version: 'v4', auth});
    sheets.spreadsheets.values.append(
      {
        spreadsheetId: '1zbrEETfYm3sj_AHf9BQjzT2lUOw6d-IPqJKv_sP0i70',
        range: 'sheet1',
        valueInputOption: 'RAW',
        resource: {
          values: [[req.body.email, req.body.name]]
        },
      },
      (err, result) => {
        if (err) {
          // Handle error
          console.log(err);
        } else {
          res.send("Updated google sheets!")
          // console.log(
          //   '%d cells updated on range: %s',
          //   result.data.updates.updatedCells,
          //   result.data.updates.updatedRange
          // );
        }
      }
    );


}

authorize().then(addInfo).catch((err)=>{
  res.send("Error: did not update google sheets.")
});
}
