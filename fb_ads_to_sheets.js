// Configurar la API de Facebook Ads
const FacebookAdsApi = require('facebook-ads-sdk').FacebookAdsApi;
const AdAccount = require('facebook-ads-sdk').AdAccount;

FacebookAdsApi.init('FACEBOOK_ACCESS_TOKEN');

const adAccountId = 'tu_id_de_cuenta_de_anuncios_de_facebook';
const adAccount = new AdAccount(adAccountId);

// Definir las métricas que quieres obtener
const metrics = [
  'impressions',
  'clicks',
  'spend',
];

// Obtener los datos de las métricas
adAccount.getInsights(metrics, {
  time_range: {'since':'2022-01-01','until':'2022-01-31'},
}).then((result) => {

  // Configurar la API de Google Sheets
  const { GoogleSpreadsheet } = require('google-spreadsheet');
  const creds = require('./google-creds.json'); // Tu archivo de credenciales de Google Sheets

  const doc = new GoogleSpreadsheet('tu_id_de_documento_de_google_sheets');
  doc.useServiceAccountAuth(creds);

  doc.loadInfo().then(() => {
    const sheet = doc.sheetsByIndex[0];

    // Insertar los datos en la hoja de cálculo de Google Sheets
    result.forEach((row) => {
      sheet.addRow({
        Fecha: row.date_start,
        Impresiones: row.impressions,
        Clicks: row.clicks,
        Gasto: row.spend,
      });
    });

    console.log('Datos insertados correctamente en la hoja de cálculo de Google Sheets');
  });

}).catch((error) => {
  console.error(error);
});
