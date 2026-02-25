// =============================
// MÓDULO INVENTARIO
// =============================

function procesarInventario(p) {

  const sheet = SpreadsheetApp.getActiveSpreadsheet()
                .getSheetByName("INVENTARIO");

  const data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === p.producto) {
      const stockActual = data[i][1];
      sheet.getRange(i + 1, 2).setValue(stockActual - p.cantidad);
      return "Stock actualizado";
    }
  }

  return "Producto no encontrado";
}
