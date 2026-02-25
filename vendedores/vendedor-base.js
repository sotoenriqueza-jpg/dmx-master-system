// =====================================================
// DMX MASTER - NODO VENDEDOR
// Plantilla base para nodos conectados a matriz central
// =====================================================


// ================= CONFIGURACIÓN =================
const URL_WEB_APP = "https://script.google.com/macros/s/TU_URL_AQUI/exec";
const VENDEDOR = "NOMBRE_VENDEDOR";


// ================= LÓGICA LOCAL =================
function onEdit(e) {
  const sheet = e.source.getActiveSheet();
  const range = e.range;
  const row = range.getRow();
  const col = range.getColumn();

  if (sheet.getName() !== "REGISTRO" || row < 3) return;

  const celdaEstado = sheet.getRange(row, 13);
  const estadoActual = celdaEstado.getValue();

  if (estadoActual === "✅ ENVIADO" && col >= 2 && col <= 14) {
    celdaEstado.setValue("⚠️ MODIFICADO").setBackground("#ffe599");
    return;
  }

  calcularTotal(sheet, row, col);
  generarIdYTipo(sheet, row, col);
}


// ================= CÁLCULO TOTAL =================
function calcularTotal(sheet, row, col) {
  if (col !== 7 && col !== 8 && col !== 14) return;

  const cant = Number(sheet.getRange(row, 7).getValue()) || 0;
  const prec = Number(sheet.getRange(row, 8).getValue()) || 0;
  const envio = Number(sheet.getRange(row, 14).getValue()) || 0;

  if (cant > 0 && prec > 0) {
    const total = (cant * prec) + envio;
    sheet.getRange(row, 9).setValue(total);
  }
}


// ================= GENERACIÓN ID =================
function generarIdYTipo(sheet, row, col) {
  if (![2,4,5].includes(col)) return;

  const nota = sheet.getRange(row, 2).getValue().toString().trim();
  const nombre = sheet.getRange(row, 4).getValue().toString().trim().toLowerCase();
  const tel = sheet.getRange(row, 5).getValue().toString().trim();

  if (!nombre || !tel) return;

  const f = new Date();
  const id = "DMX-" + f.getFullYear() +
             ("0" + (f.getMonth() + 1)).slice(-2) +
             ("0" + f.getDate()).slice(-2) +
             "-" + row;

  sheet.getRange(row, 3).setValue(id);
  sheet.getRange(row, 12).setValue("Nuevo").setBackground("#d9ead3");
}


// ================= MOTOR DE ENVÍO =================
function procesarEnvioPro(e) {
  const sheet = e.source.getActiveSheet();
  const row = e.range.getRow();
  const col = e.range.getColumn();

  if (col !== 11 || row < 3) return;

  const celdaEstado = sheet.getRange(row, 13);
  const estadoActual = celdaEstado.getValue();
  if (estadoActual === "✅ ENVIADO") return;

  const payload = construirPayload(sheet, row);

  celdaEstado.setValue("⏳ Enviando...").setBackground("#fff2cc");

  try {
    const response = UrlFetchApp.fetch(URL_WEB_APP, {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    });

    const res = JSON.parse(response.getContentText());

    if (res.status === "success") {
      celdaEstado.setValue("✅ ENVIADO").setBackground("#d9ead3");
    } else {
      celdaEstado.setValue("❌ " + res.message).setBackground("#f4cccc");
    }

  } catch (err) {
    celdaEstado.setValue("❌ ERROR RED").setBackground("#f4cccc");
  }
}


// ================= CONSTRUCTOR PAYLOAD =================
function construirPayload(sheet, row) {
  return {
    vendedor: VENDEDOR,
    idCte: sheet.getRange(row, 3).getValue(),
    nota: sheet.getRange(row, 2).getValue(),
    nombre: sheet.getRange(row, 4).getValue(),
    telefono: sheet.getRange(row, 5).getValue(),
    producto: sheet.getRange(row, 6).getValue(),
    cantidad: Number(sheet.getRange(row, 7).getValue()),
    precio: Number(sheet.getRange(row, 8).getValue()),
    metodo: sheet.getRange(row, 10).getValue(),
    entrega: sheet.getRange(row, 11).getValue(),
    tipoCte: sheet.getRange(row, 12).getValue(),
    envio: Number(sheet.getRange(row, 14).getValue()) || 0
  };
}
