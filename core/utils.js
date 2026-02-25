// =============================
// UTILIDADES
// =============================

function validarDatos(p) {
  return p && p.producto && p.cantidad > 0 && p.precio > 0;
}

function respuestaOK(msg, extra = {}) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: "success",
      message: msg,
      data: extra
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
