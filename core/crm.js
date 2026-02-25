// =============================
// MÓDULO CRM
// =============================

function procesarCRM(p) {

  const sheet = SpreadsheetApp.getActiveSpreadsheet()
                .getSheetByName("CLIENTES");

  sheet.appendRow([
    new Date(),
    p.idCte,
    p.nombre,
    p.telefono,
    p.tipoCte
  ]);

  return "CRM actualizado";
}
