# DMX MASTER SYSTEM
Plataforma Distribuida de Inteligencia Operativa

## 🧠 Arquitectura

Sistema basado en Google Apps Script que opera bajo un modelo distribuido:

- Nodos vendedores autónomos
- Matriz central consolidada
- Comunicación vía Web App (REST JSON)

## 🏗 Componentes

### 📍 Nodos Vendedores
Lógica local de validación, generación de ID, cálculo y envío de datos.

### 🧠 Matriz Central
Procesamiento consolidado, validación maestra y respuesta sincronizada.

## 🔄 Flujo

Nodo → Web App → Matriz → Respuesta → Confirmación

## 🎯 Objetivo
Escalar operación comercial sin perder control centralizado.
