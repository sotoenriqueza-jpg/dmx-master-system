// ==========================================
// DMX MASTER - MATRIZ CENTRAL
// Punto de entrada del sistema
// ==========================================


// 1️⃣ CARGA LA INTERFAZ WEB
function doGet() {
  return HtmlService
    .createHtmlOutputFromFile('centro/ui')
    .setTitle('DMX MASTER');
}


// 2️⃣ RECIBE DATOS VÍA POST (API externa o vendedores distribuidos)
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    return procesarOperacionCentral(data);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        status: "error",
        message: "Error en la matriz",
        detail: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}


// 3️⃣ MÉTODO INTERNO PARA LA UI (evita usar doPost desde el frontend)
function procesarDesdeUI(payload) {
  return procesarOperacionCentral(payload);
}
