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

## 📋 Features Included

* **Branding & Theme:** Matches the Annam Pulao banner with royal maroon, turmeric gold, and leaf green accents.
* **Full Authentic Menu:** Pulao specials, mutton & chicken starters, morning thalis (11 AM to 2:30 PM), parathas, and solkadhi.
* **KOT Printing:** 1-tap Kitchen Order Ticket for the chef.
* **Payment Modes:** Cash, UPI (Dynamic QR code modal for customer scanning), Card, and Khata/Due.
* **Daily Sales & Closing:** View today's revenue breakdown (Cash vs UPI) and print a consolidated 58mm Day Summary report.
