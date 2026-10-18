# 🏗️ Architecture & Technical Documentation

## 1. Overview
Annam Pulao POS is an offline-first single-page web application (PWA) tailored for tablet touchscreen use and instant thermal receipt printing.

```
annam-pulao-billing/
├── index.html         # Application structure, touch panels, and modals
├── style.css          # Flat enterprise design system (White + Green + Red)
├── app.js             # State engine, menu catalog, RawBT ESC/POS, and WhatsApp logic
├── server.js          # Zero-dependency local Node.js network server
├── manifest.json      # PWA installable manifest
├── assets/
│   └── images/        # Optimized dish imagery (Mutton Pulao, Thali, Solkadhi)
├── REFERENCES.md      # Protocol & integration specs (RawBT, Bluetooth, UPI)
└── README.md          # Setup & operational guide
```

---

## 2. Core Modules

### A. State Management (`AppState` & `Storage`)
* **Local Persistence:** Uses browser `localStorage` under `annam_pulao_orders_v1` and `annam_pulao_config_v1`.
* **Zero Cloud Dependency:** Functions 100% offline; sales records and table configurations persist across browser sessions and reboots.

### B. High-Speed Tablet Touch Engine
* **Touch-Action Manipulation:** Eliminates 300ms mobile browser tap delays.
* **Non-Destructive In-Place Updates:** `updateCardBadges()` modifies DOM nodes directly without re-rendering the item catalog, preventing dropped taps on touchscreen glass.
* **Modal Overlay Isolation:** Inactive modals use `display: none !important;` to ensure they never intercept or block touch hits.

### C. Thermal Receipt Engine (58mm ESC/POS)
* **Monospaced 32-Column Grid:** Formats receipts with fixed-width column math.
* **Dispatch Pipeline:** Routes through user-configured modes:
  1. `rawbt-intent`: Android Intent link via `intent:base64,...`
  2. `rawbt-ws`: Silent WebSocket stream to local RawBT background service
  3. `web-bluetooth`: Direct GATT serial write to 58mm printer
  4. `browser`: Standard `@media print` with 58mm auto-cut CSS rules.
