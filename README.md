# 🍛 Annam Pulao (अन्नम पुलाव) - Tablet POS & 58mm Thermal Billing

Custom touch billing web application designed for Android tablets, handy 58mm thermal printers (via **RawBT** / Web Bluetooth), and **WhatsApp billing**.

---

## 🚀 Quick Start

### 1. Start the Server
Run the lightweight server on your billing counter PC/laptop:
```bash
node server.js
```

### 2. Open on Tablet
Connect your tablet to the same Wi-Fi network and open Chrome:
- **Tablet URL:** `http://<YOUR_IP>:3000` (e.g. `http://192.168.242.197:3000`)
- **Local PC:** `http://localhost:3000`

### 3. Login
- **Cashier Username:** `annampulao`
- **PIN:** `1234` (or tap **One-Touch Cashier Access**)

---

## 🖨️ RawBT Handy Thermal Printer Setup (58mm)

1. **Install RawBT on your Android Tablet** from Google Play Store:
   - App: **RawBT Print Service** (`ru.a402d.rawbtprinter`)
2. In RawBT Settings, select your handy Bluetooth/USB thermal printer (Metentian, PT-210, MTP-II, etc.) and paper size **58mm**.
3. In the Web App:
   - Tap **"Printer & Setup"** in the top navigation bar.
   - Choose **RawBT App Intent** (recommended for Android tablets) or **RawBT Background WebSocket** (`ws://127.0.0.1:40213`) for silent 1-tap printing.
   - Tap **"Send Test Print to RawBT"** to verify your printer roll.

---

## 💬 WhatsApp Bill Sharing

1. Enter the customer's 10-digit mobile number in the **"WhatsApp Mobile No."** field on the cart panel.
2. Tap **"WhatsApp"** or **"⚡ 1-TAP SAVE & PRINT"**.
3. The app formats an itemized bill with dish names, quantities, and total, opening WhatsApp directly with the customer chat.

---

* **Dual-Mode Mobile & Tablet Responsive POS:** On mobile phones and portrait tablets, avoids squished dual-column crowding with an instant segmented switcher (`[ Menu Dishes ] | [ Current Bill ]`) and a floating sticky bill bar (`🛒 3 items • ₹520 | View Bill & Print ➔`). On desktop/landscape tablets, operates as an enterprise side-by-side POS workstation.
* **Non-Obscured Tile Standards:** Food tile images feature a guaranteed height with `object-fit: cover; flex-shrink: 0; min-height: 95px`, eliminating image squishing or text area collision on any device.
* **Editable Menu Catalog & Pricing:** Full menu management tab (`Menu Items`) to edit dish prices (e.g. Mutton Pulao ₹270), update food images via presets or custom URLs, change Marathi/English titles, add new custom dishes, or reset to defaults.
* **KOT & 58mm Thermal Printing:** 1-tap Kitchen Order Ticket and RawBT customer receipt for handy Metentian/ESC-POS Bluetooth/USB thermal printers.
* **WhatsApp Billing:** 1-tap itemized receipt sent to customer WhatsApp number via `wa.me`.
* **Payment Modes & Tables:** Cash, UPI (instant QR generation), Card, and Due with dynamic table count management (T-1 to T-N).
* **Daily Sales & Closing:** Complete sales dashboard with day-end summary print.
