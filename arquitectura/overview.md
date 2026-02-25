# Arquitectura DMX MASTER

## Modelo Distribuido

DMX MASTER opera bajo un esquema distribuido:

- 11 Nodos Vendedores (Google Sheets independientes)
- 1 Matriz Central (Web App Apps Script)
- Comunicación vía HTTP POST (JSON)

## Flujo Operativo

1. El vendedor registra operación.
2. Lógica local valida y calcula.
3. Se genera ID y tipo de cliente.
4. Se envía payload a la matriz.
5. La matriz valida, consolida y responde.
6. El nodo actualiza estado final.

## Principios del Sistema

- Descentralización operativa
- Centralización estratégica
- Consistencia transaccional
- Tolerancia a modificaciones
