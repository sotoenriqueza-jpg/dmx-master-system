// =====================================================
// DMX MASTER - MATRIZ CENTRAL
// Web App receptora de nodos vendedores
// =====================================================


// ================= ENTRY POINT =================
function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  return procesarOperacion(data);
}


// ================= MOTOR CENTRAL =================
function procesarOperacion(payload) {

  if (!validarPayload(payload)) {
    return respuestaError("Datos incompletos");
  }

  registrarOperacion(payload);

  return respuestaOK("Operación registrada");
}


// ================= VALIDACIÓN =================
function validarPayload(p) {
  return p.vendedor && p.producto && p.cantidad > 0 && p.precio > 0;
}


// ================= CONSOLIDACIÓN =================
function registrarOperacion(p) {

  const sheet = SpreadsheetApp.getActiveSpreadsheet()
                .getSheetByName("CONSOLIDADO");

  sheet.appendRow([
    new Date(),
    p.vendedor,
    p.idCte,
    p.nombre,
    p.producto,
    p.cantidad,
    p.precio,
    p.envio
  ]);
}


// ================= RESPUESTAS =================
function respuestaOK(msg) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: "success",
      message: msg
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

function respuestaError(msg) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: "error",
      message: msg
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
