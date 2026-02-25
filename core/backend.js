
// =============================
// DMX MASTER - CORE ORQUESTADOR
// =============================

function procesarOperacionCentral(payload) {

  if (!validarDatos(payload)) {
    return respuestaError("Datos inválidos");
  }

  const resultadoCRM = procesarCRM(payload);
  const resultadoInventario = procesarInventario(payload);
  const resultadoReporte = registrarReporte(payload);

  return respuestaOK("Procesado correctamente", {
    crm: resultadoCRM,
    inventario: resultadoInventario,
    reporte: resultadoReporte
  });
}
