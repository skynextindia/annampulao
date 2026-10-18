# 📚 Technical References & Hardware Integrations

This document details the hardware integration protocols, printer specifications, and API patterns used in the **Annam Pulao Tablet POS**.

---

## 1. RawBT Thermal Printer Integration (58mm)

### A. Android Intent / URL Scheme (Recommended)
RawBT registers custom URI handlers and an Android Intent filter to receive base64 encoded print jobs directly from web browsers.

* **Package:** `ru.a402d.rawbtprinter`
* **Intent URL Format:**
  ```javascript
  const base64Data = btoa(unescape(encodeURIComponent(plainTextPayload)));
  const intentUrl = `intent:base64,${base64Data}#Intent;scheme=rawbt;package=ru.a402d.rawbtprinter;S.browser_fallback_url=http%3A%2F%2Frawbt.ru;end;`;
  window.location.href = intentUrl;
  ```
* **Direct Scheme Fallback:**
  ```javascript
  window.location.href = `rawbt:data:application/octet-stream;base64,${base64Data}`;
  ```

### B. RawBT Local WebSocket Service (Silent Background Printing)
RawBT includes a local WebSocket daemon that runs on the Android tablet:
* **Endpoint:** `ws://127.0.0.1:40213/`
* **JSON Payload Format:**
  ```json
  {
    "type": "print",
    "data": "Formatted 32-column receipt text..."
  }
  ```

### C. 58mm Thermal Print Layout Standards
* **Paper Width:** 58mm (~2.28 inches).
* **Printable Area:** 48mm (~384 dots).
* **Character Width (Font A / Monospace):** Exactly **32 characters** per line.
* **Column Alignment Specification:**
  ```text
  |-- Item (16 chars) --| Qty(3) | Rate(5) | Total(6) --| = 32 chars
  Annam Mutton P     1    270    270
  Solkadhi           2     30     60
  ```

---

## 2. Web Bluetooth ESC/POS Direct Protocol

For direct pairing without third-party apps via Chromium Web Bluetooth:
* **GATT Primary Service UUIDs:**
  * `000018f0-0000-1000-8000-00805f9b34fb` (Standard ESC/POS Service)
  * `49535343-fe7d-4ae5-8fa9-9fafd205e455` (ISSC Transparent Serial)
  * `e7810a71-73ae-499d-8c15-faa9aef0c3f2` (Custom POS Printer GATT)
* **ESC/POS Control Bytes:**
  * Initialize Printer: `\x1b\x40`
  * Bold ON / OFF: `\x1b\x45\x01` / `\x1b\x45\x00`
  * Align Center: `\x1b\x61\x01`
  * Align Left: `\x1b\x61\x00`
  * Cut Paper: `\x1d\x56\x41\x10`

---

## 3. WhatsApp Direct Bill Sharing

Instant receipt delivery without paid WhatsApp Business APIs:
* **Link Structure:**
  ```text
  https://wa.me/91{10_DIGIT_PHONE}?text={URL_ENCODED_RECEIPT_TEXT}
  ```
* **Message Formatting:**
  * `*bold*` for headers & totals.
  * `_italics_` for caterer tagline & subtext.
  * Monospaced line dividers `══════════════════════` for clear reading.

---

## 4. UPI Payment Integration

* **Specification:** NPCI Unified Payments Interface QR Standard.
* **URI Format:**
  ```text
  upi://pay?pa={UPI_ID}&pn={PAYEE_NAME}&am={AMOUNT}&cu=INR&tn={TRANSACTION_NOTE}
  ```
* **Example:**
  `upi://pay?pa=9552377733@upi&pn=Annam%20Pulao&am=600.00&cu=INR&tn=HotelBill`
