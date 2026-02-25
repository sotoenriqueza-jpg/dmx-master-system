
// =============================
// MÓDULO REPORTES
// =============================

function registrarReporte(p) {

  const sheet = SpreadsheetApp.getActiveSpreadsheet()
                .getSheetByName("CONSOLIDADO");

  sheet.appendRow([
    new Date(),
    p.vendedor,
    p.producto,
    p.cantidad,
    p.precio,
    p.envio
  ]);

  return "Reporte registrado";
}
