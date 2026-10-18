/**
 * ANNAM PULAO (अन्नम पुलाव) - TABLET POS & BILLING SYSTEM
 * Vijaya Caterers Shital Bharate | Mob: 955 23 777 33
 * Supports RawBT 58mm Thermal Printing, WhatsApp Billing, Offline POS
 */

// ================= GLOBAL STATE =================
const AppState = {
  currentUser: 'annampulao',
  isLoggedIn: true,
  cart: [],
  orderType: 'dine-in', // 'dine-in' | 'parcel' | 'quick'
  tableNumber: 'T-1',
  paymentMode: 'CASH', // 'CASH' | 'UPI' | 'CARD' | 'DUE'
  customerPhone: '',
  customerName: '',
  discount: 0,
  parcelCharge: 0,
  hasParcelFee: false,
  activeCategory: 'all',
  activeDiet: 'all',
  searchQuery: '',
  menuItems: [], // Loaded dynamically from Storage
  mgmtCategory: 'all',
  mgmtSearchQuery: '',
  mobilePosView: 'menu', // 'menu' | 'cart'
  bluetoothDevice: null,
  bluetoothServer: null,
  bluetoothCharacteristic: null,
  config: {
    hotelName: 'ANNAM PULAO (अन्नम पुलाव)',
    ownerName: 'Vijaya Caterers Shital Bharate',
    phone: '955 23 777 33',
    upiId: '9552377733@upi',
    footerMsg: 'The Authentic Taste of Original Indian Spices..! 🙏 Visit Again!',
    printerMode: 'rawbt-intent', // 'rawbt-intent' | 'rawbt-ws' | 'web-bluetooth' | 'browser'
    paperWidth: '58',
    feedLines: 4,
    parcelFeeRate: 15,
    tableCount: 8
  }
};

// ================= AUTHENTIC MENU DATA =================
const DEFAULT_MENU_ITEMS = [
  // PULAO SPECIALS
  {
    id: 'p1',
    name_mr: 'अन्नम मटण पुलाव',
    name_en: 'Annam Mutton Pulav',
    price: 270,
    category: 'pulao',
    diet: 'non-veg',
    image: 'assets/images/mutton_pulao.jpg',
    desc: 'The Authentic Taste of Original Indian Spices with tender mutton chunks & fragrant rice',
    badge: 'Popular'
  },
  {
    id: 'p2',
    name_mr: 'अन्नम चिकन पुलाव',
    name_en: 'Annam Chicken Pulav',
    price: 230,
    category: 'pulao',
    diet: 'non-veg',
    image: 'assets/images/mutton_pulao.jpg',
    desc: 'Spiced slow-cooked flavorful chicken pulao with special masala',
    badge: 'Best Seller'
  },

  // STARTERS & FRY
  {
    id: 's1',
    name_mr: 'मटण चॉप्स फ्राय (३ पिस)',
    name_en: 'Mutton Chops Fry (3 Pcs)',
    price: 290,
    category: 'starters',
    diet: 'non-veg',
    image: 'assets/images/starters_fry.jpg',
    desc: 'Tender marinated mutton chops pan-fried to crisp perfection',
    badge: 'Chef Special'
  },
  {
    id: 's2',
    name_mr: 'मटण खेमा कलेजी',
    name_en: 'Mutton Keema Kaleji',
    price: 290,
    category: 'starters',
    diet: 'non-veg',
    image: 'assets/images/starters_fry.jpg',
    desc: 'Spiced minced mutton gravy tossed with fresh tender liver',
    badge: ''
  },
  {
    id: 's3',
    name_mr: 'मटण पाया सूप',
    name_en: 'Mutton Paya Soup',
    price: 120,
    category: 'starters',
    diet: 'non-veg',
    image: 'assets/images/starters_fry.jpg',
    desc: 'Healthy, hot slow-simmered bone broth packed with rich spices',
    badge: 'Hot'
  },
  {
    id: 's4',
    name_mr: 'चिकन तंगडी फ्राय - २ पीस',
    name_en: 'Chicken Tangdi Fry (2 Pcs)',
    price: 270,
    category: 'starters',
    diet: 'non-veg',
    image: 'assets/images/starters_fry.jpg',
    desc: 'Crispy fried chicken drumsticks seasoned with authentic red spices',
    badge: ''
  },
  {
    id: 's5',
    name_mr: 'चिकन 65 फ्राईड',
    name_en: 'Chicken 65 Fry',
    price: 180,
    category: 'starters',
    diet: 'non-veg',
    image: 'assets/images/starters_fry.jpg',
    desc: 'Spicy deep-fried boneless chicken bites with curry leaves & green chilies',
    badge: 'Crispy'
  },

  // SAKALCHA MENU / THALIS (11:00 AM - 2:30 PM)
  {
    id: 't1',
    name_mr: 'अन्नम स्पे. चिकन थाळी',
    name_en: 'Annam Spe. Chicken Thali',
    price: 260,
    category: 'thali',
    diet: 'non-veg',
    image: 'assets/images/chicken_thali.jpg',
    desc: 'चिकन मसाला 1 प्लेट, रस्सा सालन, चपाती/पराठा 2, खुशका राईस 1 प्लेट, रायता',
    timing: '11:00 AM - 2:30 PM',
    badge: 'Special'
  },
  {
    id: 't2',
    name_mr: 'अन्नम स्पे. अंडा मसाला थाळी',
    name_en: 'Annam Spe. Egg Masala Thali',
    price: 190,
    category: 'thali',
    diet: 'non-veg',
    image: 'assets/images/chicken_thali.jpg',
    desc: 'अंडा मसाला 1 प्लेट, रस्सा सालन, चपाती/पराठा 2, खुशका राईस 1 प्लेट, रायता',
    timing: '11:00 AM - 2:30 PM',
    badge: ''
  },
  {
    id: 't3',
    name_mr: 'अन्नम स्पे. व्हेज थाळी',
    name_en: 'Annam Spe. Veg Thali',
    price: 160,
    category: 'thali',
    diet: 'veg',
    image: 'assets/images/chicken_thali.jpg',
    desc: 'चपाती/पराठा 2, मिक्स व्हेज, उसळ, सालन, खुशका राईस 1 प्लेट, पापड, रायता',
    timing: '11:00 AM - 2:30 PM',
    badge: 'Pure Veg'
  },

  // BREADS & DRINKS
  {
    id: 'b1',
    name_mr: 'अन्नम तूप / घी पराठा',
    name_en: 'Annam Ghee Paratha',
    price: 40,
    category: 'paratha',
    diet: 'veg',
    image: 'assets/images/solkadhi_paratha.jpg',
    desc: 'Hot flaky layered paratha cooked in pure desi ghee',
    badge: ''
  },
  {
    id: 'b2',
    name_mr: 'अन्नम बटर पराठा',
    name_en: 'Annam Butter Paratha',
    price: 50,
    category: 'paratha',
    diet: 'veg',
    image: 'assets/images/solkadhi_paratha.jpg',
    desc: 'Layered paratha pan-toasted with generous Amul butter',
    badge: ''
  },
  {
    id: 'b3',
    name_mr: 'सोलकडी',
    name_en: 'Solkadhi',
    price: 30,
    category: 'paratha',
    diet: 'veg',
    image: 'assets/images/solkadhi_paratha.jpg',
    desc: 'Traditional digestive pink coconut-kokum drink with fresh coriander',
    badge: 'Refreshing'
  }
];

// ================= AUDIO SYNTHESIZER (TACTILE POS CLICKS) =================
const AudioFX = {
  ctx: null,
  init() {
    try {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!this.ctx && window.AudioContext) {
        this.ctx = new AudioContext();
      }
    } catch (e) {
      console.warn('Audio not supported', e);
    }
  },
  tap() {
    if (!this.ctx) this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch (e) {}
  },
  success() {
    if (!this.ctx) this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.28);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.28);
    } catch (e) {}
  }
};

// ================= STORAGE HELPERS =================
const Storage = {
  ORDERS_KEY: 'annam_pulao_orders_v1',
  CONFIG_KEY: 'annam_pulao_config_v1',

  getOrders() {
    try {
      const raw = localStorage.getItem(this.ORDERS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  },

  saveOrder(order) {
    const orders = this.getOrders();
    orders.unshift(order);
    localStorage.setItem(this.ORDERS_KEY, JSON.stringify(orders));
    return orders;
  },

  getConfig() {
    try {
      const raw = localStorage.getItem(this.CONFIG_KEY);
      return raw ? { ...AppState.config, ...JSON.parse(raw) } : AppState.config;
    } catch (e) {
      return AppState.config;
    }
  },

  MENU_KEY: 'annam_pulao_menu_v2',

  getMenuItems() {
    try {
      const raw = localStorage.getItem(this.MENU_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    this.saveMenuItems(DEFAULT_MENU_ITEMS);
    return DEFAULT_MENU_ITEMS;
  },

  saveMenuItems(items) {
    try {
      localStorage.setItem(this.MENU_KEY, JSON.stringify(items));
    } catch (e) {}
  },

  resetMenu() {
    localStorage.removeItem(this.MENU_KEY);
    return this.getMenuItems();
  },

  saveConfig(cfg) {
    localStorage.setItem(this.CONFIG_KEY, JSON.stringify(cfg));
  }
};

// ================= DOM ELEMENT REFERENCES =================
const DOM = {
  // Navigation
  navTabs: document.getElementById('navTabs'),
  tabPanes: document.querySelectorAll('.tab-pane'),
  todayOrdersCount: document.getElementById('todayOrdersCount'),
  clockDisplay: document.getElementById('clockDisplay'),
  lockAppBtn: document.getElementById('lockAppBtn'),
  currentUserName: document.getElementById('currentUserName'),

  // POS Menu
  itemsGrid: document.getElementById('itemsGrid'),
  categoryCarousel: document.getElementById('categoryCarousel'),
  menuSearchInput: document.getElementById('menuSearchInput'),
  clearSearchBtn: document.getElementById('clearSearchBtn'),
  dietButtons: document.querySelectorAll('.diet-btn'),

  // POS Cart
  cartItemsList: document.getElementById('cartItemsList'),
  cartEmptyState: document.getElementById('cartEmptyState'),
  cartTotalItemsCount: document.getElementById('cartTotalItemsCount'),
  subtotalAmount: document.getElementById('subtotalAmount'),
  parcelChargeCheckbox: document.getElementById('parcelChargeCheckbox'),
  parcelChargeRate: document.getElementById('parcelChargeRate'),
  discountInput: document.getElementById('discountInput'),
  grandTotalAmount: document.getElementById('grandTotalAmount'),

  orderTypeBtns: document.querySelectorAll('.order-type-btn'),
  tableSelectInput: document.getElementById('tableSelectInput'),
  customerPhoneInput: document.getElementById('customerPhoneInput'),
  customerNameInput: document.getElementById('customerNameInput'),
  payModeBtns: document.querySelectorAll('.pay-mode-btn'),

  // Actions
  clearCartBtn: document.getElementById('clearCartBtn'),
  printKotBtn: document.getElementById('printKotBtn'),
  sendWhatsappBtn: document.getElementById('sendWhatsappBtn'),
  printRawbtBtn: document.getElementById('printRawbtBtn'),
  printAndShareBtn: document.getElementById('printAndShareBtn'),

  // Modals
  loginModal: document.getElementById('loginModal'),
  loginForm: document.getElementById('loginForm'),
  loginUsername: document.getElementById('loginUsername'),
  loginPin: document.getElementById('loginPin'),
  quickLoginBtn: document.getElementById('quickLoginBtn'),

  receiptPreviewModal: document.getElementById('receiptPreviewModal'),
  closeReceiptModalBtn: document.getElementById('closeReceiptModalBtn'),
  thermalReceiptPaper: document.getElementById('thermalReceiptPaper'),
  rmPrintRawbtBtn: document.getElementById('rmPrintRawbtBtn'),
  rmSendWaBtn: document.getElementById('rmSendWaBtn'),
  rmPrintBrowserBtn: document.getElementById('rmPrintBrowserBtn'),

  // Mobile POS navigation & Floating bar
  posLayout: document.getElementById('posLayout'),
  posMobileNav: document.getElementById('posMobileNav'),
  mobShowMenuBtn: document.getElementById('mobShowMenuBtn'),
  mobShowCartBtn: document.getElementById('mobShowCartBtn'),
  mobCartBadge: document.getElementById('mobCartBadge'),
  mobCartTotal: document.getElementById('mobCartTotal'),
  mobBackToMenuBtn: document.getElementById('mobBackToMenuBtn'),
  mobileFloatingBillBar: document.getElementById('mobileFloatingBillBar'),
  mfbCount: document.getElementById('mfbCount'),
  mfbTotal: document.getElementById('mfbTotal'),
  mfbActionBtn: document.getElementById('mfbActionBtn'),

  // Menu Management
  openAddDishModalBtn: document.getElementById('openAddDishModalBtn'),
  resetMenuToDefaultBtn: document.getElementById('resetMenuToDefaultBtn'),
  menuMgmtSearchInput: document.getElementById('menuMgmtSearchInput'),
  clearMenuMgmtSearchBtn: document.getElementById('clearMenuMgmtSearchBtn'),
  menuMgmtCatFilter: document.getElementById('menuMgmtCatFilter'),
  menuMgmtGrid: document.getElementById('menuMgmtGrid'),
  countMgmtAll: document.getElementById('countMgmtAll'),
  countMgmtPulao: document.getElementById('countMgmtPulao'),
  countMgmtStarters: document.getElementById('countMgmtStarters'),
  countMgmtThali: document.getElementById('countMgmtThali'),
  countMgmtParatha: document.getElementById('countMgmtParatha'),

  // Menu Edit Modal
  menuEditModal: document.getElementById('menuEditModal'),
  menuModalTitle: document.getElementById('menuModalTitle'),
  closeMenuModalBtn: document.getElementById('closeMenuModalBtn'),
  cancelMenuModalBtn: document.getElementById('cancelMenuModalBtn'),
  menuDishForm: document.getElementById('menuDishForm'),
  editDishId: document.getElementById('editDishId'),
  editDishNameMr: document.getElementById('editDishNameMr'),
  editDishNameEn: document.getElementById('editDishNameEn'),
  editDishPrice: document.getElementById('editDishPrice'),
  editDishCategory: document.getElementById('editDishCategory'),
  editDishDiet: document.getElementById('editDishDiet'),
  editDishTiming: document.getElementById('editDishTiming'),
  editDishImagePreset: document.getElementById('editDishImagePreset'),
  editDishImageUrl: document.getElementById('editDishImageUrl'),
  dishEditPreviewImg: document.getElementById('dishEditPreviewImg'),
  editDishDesc: document.getElementById('editDishDesc'),

  upiQrModal: document.getElementById('upiQrModal'),
  closeUpiModalBtn: document.getElementById('closeUpiModalBtn'),
  upiModalAmount: document.getElementById('upiModalAmount'),
  upiQrImage: document.getElementById('upiQrImage'),
  upiModalIdTag: document.getElementById('upiModalIdTag'),
  confirmUpiReceivedBtn: document.getElementById('confirmUpiReceivedBtn'),

  toastNotice: document.getElementById('toastNotice'),
  toastIcon: document.getElementById('toastIcon'),
  toastMsg: document.getElementById('toastMsg'),

  // Orders table
  ordersTableBody: document.getElementById('ordersTableBody'),
  ordersEmpty: document.getElementById('ordersEmpty'),
  orderSearchInput: document.getElementById('orderSearchInput'),
  refreshOrdersBtn: document.getElementById('refreshOrdersBtn'),

  // Tables
  tablesFloorGrid: document.getElementById('tablesFloorGrid'),
  tableCountInput: document.getElementById('tableCountInput'),
  decreaseTableCountBtn: document.getElementById('decreaseTableCountBtn'),
  increaseTableCountBtn: document.getElementById('increaseTableCountBtn'),
  applyTableCountBtn: document.getElementById('applyTableCountBtn'),
  cfgTableCount: document.getElementById('cfgTableCount'),

  // Reports
  repTotalSales: document.getElementById('repTotalSales'),
  repCashSales: document.getElementById('repCashSales'),
  repUpiSales: document.getElementById('repUpiSales'),
  repTotalBills: document.getElementById('repTotalBills'),
  topDishesList: document.getElementById('topDishesList'),
  orderTypeStats: document.getElementById('orderTypeStats'),
  printDaySummaryBtn: document.getElementById('printDaySummaryBtn'),

  // Settings
  cfgHotelName: document.getElementById('cfgHotelName'),
  cfgOwnerName: document.getElementById('cfgOwnerName'),
  cfgPhone: document.getElementById('cfgPhone'),
  cfgUpiId: document.getElementById('cfgUpiId'),
  cfgFooterMsg: document.getElementById('cfgFooterMsg'),
  saveHotelConfigBtn: document.getElementById('saveHotelConfigBtn'),
  resetSalesDataBtn: document.getElementById('resetSalesDataBtn'),
  paperWidthSelect: document.getElementById('paperWidthSelect'),
  printerFeedLines: document.getElementById('printerFeedLines'),
  testPrintRawbtBtn: document.getElementById('testPrintRawbtBtn'),
  connectBtPrinterBtn: document.getElementById('connectBtPrinterBtn'),
  printerQuickStatus: document.getElementById('printerQuickStatus'),
  rawbtIntentLink: document.getElementById('rawbtIntentLink')
};

// ================= TOAST NOTIFICATION =================
function showToast(message, icon = '✨') {
  DOM.toastIcon.textContent = icon;
  DOM.toastMsg.textContent = message;
  DOM.toastNotice.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    DOM.toastNotice.classList.remove('show');
  }, 3200);
}

// ================= LIVE CLOCK =================
function startLiveClock() {
  function update() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    DOM.clockDisplay.textContent = timeStr;
  }
  update();
  setInterval(update, 1000);
}

// ================= BILL NUMBER GENERATOR =================
function generateBillNumber() {
  const today = new Date();
  const year = today.getFullYear().toString().slice(-2);
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  const orders = Storage.getOrders();
  const todayOrders = orders.filter(o => o.dateStr === today.toDateString());
  const seq = (todayOrders.length + 1).toString().padStart(3, '0');
  return `AP-${day}${month}-${seq}`;
}

// ================= RENDER MENU ITEMS =================
function renderMenuItems() {
  DOM.itemsGrid.innerHTML = '';

  const query = AppState.searchQuery.toLowerCase().trim();
  const cat = AppState.activeCategory;
  const diet = AppState.activeDiet;

  const sourceItems = AppState.menuItems && AppState.menuItems.length ? AppState.menuItems : DEFAULT_MENU_ITEMS;
  const filtered = sourceItems.filter(item => {
    // Category filter
    if (cat !== 'all' && item.category !== cat) return false;
    // Diet filter
    if (diet !== 'all' && item.diet !== diet) return false;
    // Search filter (handles English & Marathi terms)
    if (query) {
      const matchEng = item.name_en.toLowerCase().includes(query);
      const matchMr = item.name_mr.includes(query);
      const matchDesc = item.desc ? item.desc.toLowerCase().includes(query) : false;
      if (!matchEng && !matchMr && !matchDesc) return false;
    }
    return true;
  });

  if (filtered.length === 0) {
    DOM.itemsGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">
        <p style="font-size: 28px; margin-bottom: 8px;">🍽️</p>
        <p style="font-size: 14px; font-weight: 700;">No dishes found</p>
        <p style="font-size: 11px;">Try searching for another dish or reset filters</p>
      </div>
    `;
    return;
  }

  filtered.forEach(item => {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.setAttribute('data-id', item.id);

    // Calculate count currently in cart
    const cartItem = AppState.cart.find(c => c.id === item.id);
    const inCartQty = cartItem ? cartItem.qty : 0;

    // Diet badge markup
    const dietBadge = item.diet === 'non-veg'
      ? `<span class="nv-box"><span class="nv-tri"></span></span>`
      : `<span class="v-box"><span class="v-dot"></span></span>`;

    // Image fallback
    const imgSrc = item.image || 'assets/images/mutton_pulao.jpg';

    card.innerHTML = `
      <div class="card-img-wrap">
        <img class="card-img" src="${imgSrc}" alt="${item.name_en}" loading="lazy" onerror="this.src='assets/images/mutton_pulao.jpg'">
        <div class="card-diet-badge">${dietBadge}</div>
        ${item.timing ? `<span class="card-timing-tag">${item.timing}</span>` : ''}
      </div>
      <div class="card-body">
        <div>
          <div class="card-title-marathi">${item.name_mr}</div>
          <div class="card-title-eng">${item.name_en}</div>
          ${item.desc ? `<div class="card-desc">${item.desc}</div>` : ''}
        </div>
        <div class="card-footer-row">
          <span class="card-price">₹${item.price}</span>
          <button class="card-add-btn" title="Add to Bill">+</button>
        </div>
      </div>
      ${inCartQty > 0 ? `<div class="card-qty-badge">${inCartQty} in cart</div>` : ''}
    `;

    // High-speed tablet touch and click handlers
    let touchStartY = 0;
    let touchMoved = false;
    let lastTapTime = 0;

    const handleSelect = (e) => {
      const now = Date.now();
      if (now - lastTapTime < 200) return;
      lastTapTime = now;
      AudioFX.tap();
      addToCart(item);
    };

    card.addEventListener('touchstart', (e) => {
      touchMoved = false;
      if (e.touches && e.touches[0]) {
        touchStartY = e.touches[0].clientY;
      }
    }, { passive: true });

    card.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches[0]) {
        if (Math.abs(e.touches[0].clientY - touchStartY) > 8) {
          touchMoved = true;
        }
      }
    }, { passive: true });

    card.addEventListener('touchend', (e) => {
      if (!touchMoved) {
        e.preventDefault();
        handleSelect(e);
      }
    });

    card.addEventListener('click', (e) => {
      handleSelect(e);
    });

    DOM.itemsGrid.appendChild(card);
  });
}

// Fast non-destructive badge update (keeps DOM intact for tablet responsiveness)
function updateCardBadges() {
  document.querySelectorAll('.item-card').forEach(card => {
    const id = card.getAttribute('data-id');
    const cartItem = AppState.cart.find(c => c.id === id);
    let badge = card.querySelector('.card-qty-badge');
    if (cartItem && cartItem.qty > 0) {
      if (badge) {
        badge.textContent = `${cartItem.qty} in cart`;
      } else {
        badge = document.createElement('div');
        badge.className = 'card-qty-badge';
        badge.textContent = `${cartItem.qty} in cart`;
        card.appendChild(badge);
      }
    } else if (badge) {
      badge.remove();
    }
  });
}

// ================= CART OPERATIONS =================
function addToCart(item) {
  const existing = AppState.cart.find(c => c.id === item.id);
  if (existing) {
    existing.qty += 1;
  } else {
    AppState.cart.push({
      id: item.id,
      name_mr: item.name_mr,
      name_en: item.name_en,
      price: item.price,
      qty: 1
    });
  }
  renderCart();
  updateCardBadges();
}

function updateCartItemQty(id, delta) {
  const item = AppState.cart.find(c => c.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    AppState.cart = AppState.cart.filter(c => c.id !== id);
  }
  AudioFX.tap();
  renderCart();
  updateCardBadges();
}

function removeCartItem(id) {
  AppState.cart = AppState.cart.filter(c => c.id !== id);
  AudioFX.tap();
  renderCart();
  updateCardBadges();
}

function clearCart() {
  if (AppState.cart.length === 0) return;
  AppState.cart = [];
  AppState.customerPhone = '';
  AppState.customerName = '';
  DOM.customerPhoneInput.value = '';
  DOM.customerNameInput.value = '';
  DOM.discountInput.value = '';
  DOM.parcelChargeCheckbox.checked = false;
  AppState.hasParcelFee = false;
  AppState.discount = 0;
  renderCart();
  updateCardBadges();
  showToast('Cart cleared', '🧹');
}

function calculateCartTotals() {
  const subtotal = AppState.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const totalItems = AppState.cart.reduce((sum, item) => sum + item.qty, 0);

  let parcelFee = 0;
  if (AppState.hasParcelFee || AppState.orderType === 'parcel') {
    parcelFee = AppState.config.parcelFeeRate || 15;
  }

  const discount = Math.max(0, parseFloat(DOM.discountInput.value) || 0);
  const grandTotal = Math.max(0, subtotal + parcelFee - discount);

  return { subtotal, totalItems, parcelFee, discount, grandTotal };
}

function renderCart() {
  const { subtotal, totalItems, grandTotal } = calculateCartTotals();

  DOM.cartTotalItemsCount.textContent = totalItems;
  DOM.subtotalAmount.textContent = `₹${subtotal.toFixed(2)}`;
  DOM.grandTotalAmount.textContent = `₹${grandTotal.toFixed(2)}`;

  // Update mobile indicators & floating bill bar
  if (DOM.mobCartBadge) DOM.mobCartBadge.textContent = totalItems;
  if (DOM.mobCartTotal) DOM.mobCartTotal.textContent = `₹${grandTotal.toFixed(2)}`;
  if (DOM.mfbCount) DOM.mfbCount.textContent = `${totalItems} ${totalItems === 1 ? 'dish' : 'dishes'}`;
  if (DOM.mfbTotal) DOM.mfbTotal.textContent = `₹${grandTotal.toFixed(2)}`;

  if (DOM.mobileFloatingBillBar) {
    if (totalItems > 0 && AppState.mobilePosView !== 'cart') {
      DOM.mobileFloatingBillBar.classList.add('has-items');
    } else {
      DOM.mobileFloatingBillBar.classList.remove('has-items');
    }
  }

  if (AppState.cart.length === 0) {
    DOM.cartItemsList.innerHTML = '';
    DOM.cartEmptyState.style.display = 'flex';
    return;
  }

  DOM.cartEmptyState.style.display = 'none';
  DOM.cartItemsList.innerHTML = '';

  AppState.cart.forEach(item => {
    const row = document.createElement('div');
    row.className = 'cart-item-row';
    row.innerHTML = `
      <div class="ci-name-wrap">
        <span class="ci-name-marathi">${item.name_mr}</span>
        <span class="ci-name-eng">${item.name_en}</span>
      </div>
      <div class="ci-qty-ctrls">
        <button class="qty-btn btn-minus" data-id="${item.id}">-</button>
        <span class="qty-val">${item.qty}</span>
        <button class="qty-btn btn-plus" data-id="${item.id}">+</button>
      </div>
      <div class="ci-rate">₹${item.price}</div>
      <div class="ci-total">₹${item.price * item.qty}</div>
      <button class="ci-del-btn" data-id="${item.id}" title="Remove item">✕</button>
    `;

    // Event listeners
    row.querySelector('.btn-minus').addEventListener('click', () => updateCartItemQty(item.id, -1));
    row.querySelector('.btn-plus').addEventListener('click', () => updateCartItemQty(item.id, 1));
    row.querySelector('.ci-del-btn').addEventListener('click', () => removeCartItem(item.id));

    DOM.cartItemsList.appendChild(row);
  });
}

// ================= 58MM THERMAL RECEIPT BUILDER =================
function generate58mmReceiptHTML(order) {
  const cfg = AppState.config;
  const isKOT = order.isKOT;

  let itemsRows = '';
  order.items.forEach(item => {
    // Format for 58mm (approx 32 chars width)
    if (isKOT) {
      itemsRows += `
        <tr>
          <td style="font-weight:700;">${item.name_en}</td>
          <td style="text-align:right; font-size:13px; font-weight:800;">${item.qty}</td>
        </tr>
        <tr>
          <td colspan="2" style="font-size:9px; color:#555; padding-bottom:4px;">${item.name_mr}</td>
        </tr>
      `;
    } else {
      itemsRows += `
        <tr>
          <td>${item.name_en}</td>
          <td style="text-align:center;">${item.qty}</td>
          <td style="text-align:right;">${item.price}</td>
          <td style="text-align:right; font-weight:700;">${item.price * item.qty}</td>
        </tr>
      `;
    }
  });

  if (isKOT) {
    return `
      <div class="r-center r-bold r-big">*** KITCHEN TICKET (KOT) ***</div>
      <div class="r-center r-bold">${cfg.hotelName}</div>
      <div class="r-divider"></div>
      <div class="r-row"><span>Token/Table:</span><span class="r-bold">${order.tableNumber}</span></div>
      <div class="r-row"><span>Bill No:</span><span>${order.billNo}</span></div>
      <div class="r-row"><span>Time:</span><span>${order.timeStr}</span></div>
      <div class="r-row"><span>Type:</span><span class="r-bold">${order.orderType.toUpperCase()}</span></div>
      <div class="r-double-divider"></div>
      <table class="r-table">
        <thead>
          <tr>
            <th>ITEM NAME</th>
            <th style="text-align:right;">QTY</th>
          </tr>
        </thead>
        <tbody>
          ${itemsRows}
        </tbody>
      </table>
      <div class="r-double-divider"></div>
      <div class="r-center r-bold">Total Items: ${order.totalItems}</div>
      <div class="r-divider"></div>
      <div class="r-center" style="font-size:9px;">Order Prepared By Chef</div>
    `;
  }

  return `
    <div class="r-center r-bold r-big">${cfg.hotelName}</div>
    <div class="r-center" style="font-size:10px;">${cfg.ownerName}</div>
    <div class="r-center r-bold" style="font-size:11px;">Ph: ${cfg.phone}</div>
    <div class="r-center" style="font-size:9px; margin-top:2px;">THE AUTHENTIC TASTE OF INDIAN SPICES</div>
    <div class="r-divider"></div>

    <div class="r-row"><span>Bill No:</span><span class="r-bold">${order.billNo}</span></div>
    <div class="r-row"><span>Date & Time:</span><span>${order.timeStr}</span></div>
    <div class="r-row"><span>Table / Type:</span><span class="r-bold">${order.tableNumber} (${order.orderType})</span></div>
    ${order.customerPhone ? `<div class="r-row"><span>Customer:</span><span>+91 ${order.customerPhone}</span></div>` : ''}
    <div class="r-double-divider"></div>

    <table class="r-table">
      <thead>
        <tr>
          <th>ITEM</th>
          <th style="text-align:center;">QTY</th>
          <th style="text-align:right;">RATE</th>
          <th style="text-align:right;">AMT</th>
        </tr>
      </thead>
      <tbody>
        ${itemsRows}
      </tbody>
    </table>

    <div class="r-double-divider"></div>
    <div class="r-row"><span>Sub Total (${order.totalItems} Items):</span><span>₹${order.subtotal.toFixed(2)}</span></div>
    ${order.parcelFee > 0 ? `<div class="r-row"><span>Parcel Packaging:</span><span>₹${order.parcelFee.toFixed(2)}</span></div>` : ''}
    ${order.discount > 0 ? `<div class="r-row"><span>Discount:</span><span>-₹${order.discount.toFixed(2)}</span></div>` : ''}
    <div class="r-divider"></div>

    <div class="r-row r-bold r-big" style="font-size:14px; margin: 4px 0;">
      <span>GRAND TOTAL:</span>
      <span>₹${order.grandTotal.toFixed(2)}</span>
    </div>
    <div class="r-row"><span>Payment Mode:</span><span class="r-bold">${order.paymentMode}</span></div>
    <div class="r-divider"></div>

    <div class="r-center r-bold" style="font-size:10px; margin-top:4px;">${cfg.footerMsg}</div>
    <div class="r-center" style="font-size:9px; margin-top:2px;">Designed for Fast Tablet Billing</div>
  `;
}

// ================= RAWBT ESC/POS FORMATTER (58MM) =================
/**
 * RawBT ESC/POS text formatter for 58mm (32 characters per line)
 */
function buildRawbtTextPayload(order) {
  const cfg = AppState.config;
  const W = 32; // 32 chars width for 58mm thermal paper

  function center(text) {
    if (text.length >= W) return text.slice(0, W);
    const left = Math.floor((W - text.length) / 2);
    return ' '.repeat(left) + text;
  }

  function leftRight(left, right) {
    const space = Math.max(1, W - left.length - right.length);
    return left + ' '.repeat(space) + right;
  }

  function divider(char = '-') {
    return char.repeat(W);
  }

  let lines = [];
  lines.push(center(cfg.hotelName));
  lines.push(center(cfg.ownerName));
  lines.push(center('Ph: ' + cfg.phone));
  lines.push(center('AUTHENTIC INDIAN SPICES'));
  lines.push(divider());

  lines.push(leftRight(`Bill: ${order.billNo}`, order.timeStr.slice(0, 11)));
  lines.push(leftRight(`Table: ${order.tableNumber}`, `Type: ${order.orderType}`));
  if (order.customerPhone) {
    lines.push(leftRight('Cust: +91 ' + order.customerPhone, ''));
  }
  lines.push(divider('='));

  // Table header: Item (16) Qty (3) Rate (5) Total (6) = 30 + 2 spaces = 32
  lines.push('Item            Qty  Rate  Total');
  lines.push(divider());

  order.items.forEach(it => {
    let name = it.name_en.slice(0, 15).padEnd(15, ' ');
    let qty = String(it.qty).padStart(3, ' ');
    let rate = String(it.price).padStart(5, ' ');
    let tot = String(it.price * it.qty).padStart(6, ' ');
    lines.push(`${name} ${qty} ${rate} ${tot}`);
  });

  lines.push(divider('='));
  lines.push(leftRight(`Subtotal (${order.totalItems} itm):`, `Rs.${order.subtotal.toFixed(2)}`));
  if (order.parcelFee > 0) {
    lines.push(leftRight('Parcel Packing:', `Rs.${order.parcelFee.toFixed(2)}`));
  }
  if (order.discount > 0) {
    lines.push(leftRight('Discount:', `-Rs.${order.discount.toFixed(2)}`));
  }
  lines.push(divider());
  lines.push(leftRight('GRAND TOTAL:', `Rs.${order.grandTotal.toFixed(2)}`));
  lines.push(leftRight('Paid Via:', order.paymentMode));
  lines.push(divider());
  lines.push(center(cfg.footerMsg));
  lines.push(center('*** THANK YOU VISIT AGAIN ***'));

  // Extra feed lines for clean tear
  const feedCount = parseInt(cfg.feedLines, 10) || 4;
  for (let i = 0; i < feedCount; i++) {
    lines.push('');
  }

  return lines.join('\n');
}

// ================= RAWBT PRINT DISPATCHER =================
function printToRawbt(order) {
  const textContent = buildRawbtTextPayload(order);
  const mode = AppState.config.printerMode;

  console.log('Sending print payload via mode:', mode);

  // Method 1: RawBT URL Intent / Scheme (Best for Android Tablet)
  if (mode === 'rawbt-intent') {
    try {
      // RawBT supports Base64 encoded UTF-8 string
      const base64Content = btoa(unescape(encodeURIComponent(textContent)));
      
      // Intent URL scheme for Android Chrome
      const intentUrl = `intent:base64,${base64Content}#Intent;scheme=rawbt;package=ru.a402d.rawbtprinter;S.browser_fallback_url=http%3A%2F%2Frawbt.ru;end;`;
      
      // Also direct scheme fallback
      DOM.rawbtIntentLink.href = intentUrl;
      DOM.rawbtIntentLink.click();
      
      showToast('Sent to RawBT Thermal Printer!', '🖨️');
      return true;
    } catch (err) {
      console.error('RawBT Intent error:', err);
      // Fallback to browser print
      window.print();
      return true;
    }
  }

  // Method 2: RawBT Local WebSocket (Silent, no app switch)
  if (mode === 'rawbt-ws') {
    try {
      const ws = new WebSocket('ws://127.0.0.1:40213/');
      ws.onopen = () => {
        ws.send(JSON.stringify({
          type: 'print',
          data: textContent
        }));
        showToast('Printed via RawBT WebSocket!', '🖨️');
        setTimeout(() => ws.close(), 1000);
      };
      ws.onerror = (e) => {
        console.warn('RawBT WebSocket not reachable, falling back to intent', e);
        // Fallback to intent
        const base64Content = btoa(unescape(encodeURIComponent(textContent)));
        window.location.href = `intent:base64,${base64Content}#Intent;scheme=rawbt;package=ru.a402d.rawbtprinter;end;`;
      };
      return true;
    } catch (e) {
      window.print();
    }
  }

  // Method 3: Direct Web Bluetooth to 58mm printer
  if (mode === 'web-bluetooth') {
    printViaWebBluetooth(textContent);
    return true;
  }

  // Method 4: Standard Browser Print
  window.print();
  return true;
}

// ================= WEB BLUETOOTH ESC/POS PRINT =================
async function printViaWebBluetooth(textData) {
  try {
    if (!navigator.bluetooth) {
      showToast('Web Bluetooth not supported on this browser. Use RawBT Intent.', '⚠️');
      window.print();
      return;
    }

    if (!AppState.bluetoothCharacteristic) {
      showToast('Pairing with Bluetooth Thermal Printer...', '📶');
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: [
          '000018f0-0000-1000-8000-00805f9b34fb', // Standard thermal printer service
          '49535343-fe7d-4ae5-8fa9-9fafd205e455', // ISSC Transparent
          'e7810a71-73ae-499d-8c15-faa9aef0c3f2'
        ]
      });

      const server = await device.gatt.connect();
      const services = await server.getPrimaryServices();
      let char = null;

      for (const service of services) {
        const characteristics = await service.getCharacteristics();
        for (const c of characteristics) {
          if (c.properties.write || c.properties.writeWithoutResponse) {
            char = c;
            break;
          }
        }
        if (char) break;
      }

      if (!char) {
        throw new Error('No writable ESC/POS characteristic found');
      }

      AppState.bluetoothCharacteristic = char;
      AppState.bluetoothDevice = device;
    }

    // Convert text to ESC/POS bytes
    const encoder = new TextEncoder();
    const data = encoder.encode(textData + '\n\n\n');
    await AppState.bluetoothCharacteristic.writeValue(data);
    showToast('Bluetooth Print Sent Successfully!', '✅');

  } catch (err) {
    console.error('Bluetooth Print failed:', err);
    showToast('Bluetooth print failed, opening RawBT...', '⚠️');
    // Fallback to intent
    const base64 = btoa(unescape(encodeURIComponent(textData)));
    window.location.href = `intent:base64,${base64}#Intent;scheme=rawbt;package=ru.a402d.rawbtprinter;end;`;
  }
}

// ================= WHATSAPP RECEIPT BUILDER =================
function generateWhatsAppMessage(order) {
  const cfg = AppState.config;
  let itemsText = '';

  order.items.forEach(it => {
    itemsText += `🍛 *${it.name_en}* (${it.name_mr})\n   ${it.qty} x ₹${it.price} = *₹${it.qty * it.price}*\n`;
  });

  const msg = 
`🍲 *${cfg.hotelName}*
_${cfg.ownerName}_
📞 *${cfg.phone}*
══════════════════════
🧾 *Bill No:* ${order.billNo}
📅 *Date:* ${order.timeStr}
🍽️ *Type:* ${order.tableNumber} (${order.orderType.toUpperCase()})
══════════════════════
${itemsText}══════════════════════
Subtotal (${order.totalItems} Items): ₹${order.subtotal.toFixed(2)}
${order.parcelFee > 0 ? `Parcel Packing: ₹${order.parcelFee.toFixed(2)}\n` : ''}${order.discount > 0 ? `Discount: -₹${order.discount.toFixed(2)}\n` : ''}💰 *GRAND TOTAL: ₹${order.grandTotal.toFixed(2)}*
💳 *Payment Mode:* ${order.paymentMode}
══════════════════════
✨ _${cfg.footerMsg}_
🙏 *Thank you! Visit Annam Pulao again.*`;

  return msg;
}

function sendWhatsAppBill(order) {
  let phone = order.customerPhone || DOM.customerPhoneInput.value.trim();
  phone = phone.replace(/[^0-9]/g, '');

  if (phone.length === 10) {
    phone = '91' + phone;
  }

  const message = generateWhatsAppMessage(order);
  const encodedMsg = encodeURIComponent(message);

  if (phone) {
    // Open direct WhatsApp chat with message prefilled
    const waUrl = `https://wa.me/${phone}?text=${encodedMsg}`;
    window.open(waUrl, '_blank');
    showToast(`WhatsApp Bill opened for +${phone}`, '💬');
  } else {
    // No phone entered - prompt or copy to clipboard
    navigator.clipboard.writeText(message);
    showToast('No phone entered. Bill text copied to clipboard!', '📋');
  }
}

// ================= CREATE & COMMIT ORDER =================
function commitCurrentOrder(paymentModeOverride = null, isKOT = false) {
  if (AppState.cart.length === 0) {
    showToast('Cart is empty! Add items first.', '⚠️');
    return null;
  }

  const totals = calculateCartTotals();
  const now = new Date();
  const timeStr = now.toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric'
  }) + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const order = {
    id: 'ord_' + Date.now(),
    billNo: generateBillNumber(),
    dateStr: now.toDateString(),
    timeStr: timeStr,
    timestamp: now.getTime(),
    orderType: AppState.orderType,
    tableNumber: DOM.tableSelectInput.value,
    customerPhone: DOM.customerPhoneInput.value.trim(),
    customerName: DOM.customerNameInput.value.trim(),
    items: JSON.parse(JSON.stringify(AppState.cart)),
    subtotal: totals.subtotal,
    totalItems: totals.totalItems,
    parcelFee: totals.parcelFee,
    discount: totals.discount,
    grandTotal: totals.grandTotal,
    paymentMode: paymentModeOverride || AppState.paymentMode,
    isKOT: isKOT
  };

  // Only persist real orders, not pure KOT slips
  if (!isKOT) {
    Storage.saveOrder(order);
    AudioFX.success();
    updateOrdersBadge();
  }

  return order;
}

// ================= MODAL CONTROLLERS =================
let activePreviewOrder = null;

function openReceiptPreview(order) {
  activePreviewOrder = order;
  DOM.thermalReceiptPaper.innerHTML = generate58mmReceiptHTML(order);
  DOM.receiptPreviewModal.classList.add('show');
}

function closeReceiptPreview() {
  DOM.receiptPreviewModal.classList.remove('show');
  activePreviewOrder = null;
}

function openUpiQrModal(amount) {
  const cfg = AppState.config;
  DOM.upiModalAmount.textContent = `₹${amount.toFixed(2)}`;
  DOM.upiModalIdTag.textContent = cfg.upiId;

  // Generate UPI URI
  const upiUrl = `upi://pay?pa=${encodeURIComponent(cfg.upiId)}&pn=${encodeURIComponent('Annam Pulao')}&am=${amount.toFixed(2)}&cu=INR&tn=HotelBill`;
  // Generate high quality QR using quickchart api (or fallback offline svg)
  DOM.upiQrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiUrl)}`;

  DOM.upiQrModal.classList.add('show');
}

function closeUpiQrModal() {
  DOM.upiQrModal.classList.remove('show');
}

// ================= ORDERS HISTORY VIEW =================
function renderOrdersHistory() {
  const orders = Storage.getOrders();
  const search = DOM.orderSearchInput.value.toLowerCase().trim();

  const filtered = orders.filter(o => {
    if (!search) return true;
    return (
      o.billNo.toLowerCase().includes(search) ||
      (o.customerPhone && o.customerPhone.includes(search)) ||
      o.tableNumber.toLowerCase().includes(search) ||
      o.paymentMode.toLowerCase().includes(search)
    );
  });

  if (filtered.length === 0) {
    DOM.ordersTableBody.innerHTML = '';
    DOM.ordersEmpty.style.display = 'block';
    return;
  }

  DOM.ordersEmpty.style.display = 'none';
  DOM.ordersTableBody.innerHTML = '';

  filtered.forEach(o => {
    const tr = document.createElement('tr');
    const itemsPreview = o.items.map(it => `${it.qty}x ${it.name_en}`).join(', ');

    tr.innerHTML = `
      <td style="font-weight:700; color:var(--brand-gold-bright);">${o.billNo}</td>
      <td>${o.timeStr}</td>
      <td><span style="background:rgba(255,255,255,0.1); padding:2px 6px; border-radius:4px; font-weight:700;">${o.tableNumber}</span> (${o.orderType})</td>
      <td>${o.customerPhone ? `+91 ${o.customerPhone}` : (o.customerName || '-')}</td>
      <td style="max-width:200px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="${itemsPreview}">${itemsPreview}</td>
      <td style="font-weight:800; color:#fff;">₹${o.grandTotal.toFixed(2)}</td>
      <td><span style="font-weight:700; font-size:11px; padding:2px 6px; border-radius:4px; background:${o.paymentMode === 'UPI' ? '#1565c0' : '#2e7d32'}; color:#fff;">${o.paymentMode}</span></td>
      <td>
        <div class="order-actions-cell">
          <button class="btn-tbl-action reprint" data-id="${o.id}" title="Reprint RawBT">🖨️ Print</button>
          <button class="btn-tbl-action whatsapp" data-id="${o.id}" title="Send WhatsApp">💬 WA</button>
        </div>
      </td>
    `;

    tr.querySelector('.btn-tbl-action.reprint').addEventListener('click', () => {
      openReceiptPreview(o);
      printToRawbt(o);
    });

    tr.querySelector('.btn-tbl-action.whatsapp').addEventListener('click', () => {
      sendWhatsAppBill(o);
    });

    DOM.ordersTableBody.appendChild(tr);
  });
}

function updateOrdersBadge() {
  const orders = Storage.getOrders();
  const todayStr = new Date().toDateString();
  const todayCount = orders.filter(o => o.dateStr === todayStr).length;
  DOM.todayOrdersCount.textContent = todayCount;
}

// ================= TABLES VIEW & DYNAMIC MANAGEMENT =================
function getTablesList() {
  const count = parseInt(AppState.config.tableCount, 10) || 8;
  const list = [];
  for (let i = 1; i <= count; i++) {
    list.push({ id: `T-${i}`, name: `Table ${i}`, seats: 4 });
  }
  list.push({ id: 'Parcel-1', name: 'Parcel #1', seats: 0 });
  list.push({ id: 'Parcel-2', name: 'Parcel #2', seats: 0 });
  list.push({ id: 'Counter', name: 'Counter', seats: 0 });
  return list;
}

function updateTableDropdown() {
  const tables = getTablesList();
  const currentVal = DOM.tableSelectInput.value;
  DOM.tableSelectInput.innerHTML = '';

  tables.forEach(tbl => {
    const opt = document.createElement('option');
    opt.value = tbl.id;
    opt.textContent = tbl.name;
    DOM.tableSelectInput.appendChild(opt);
  });

  // Restore previous selection if still available
  if (tables.some(t => t.id === currentVal)) {
    DOM.tableSelectInput.value = currentVal;
  }
}

function setTableCount(newCount) {
  let val = parseInt(newCount, 10);
  if (isNaN(val) || val < 1) val = 1;
  if (val > 50) val = 50;

  AppState.config.tableCount = val;
  Storage.saveConfig(AppState.config);

  if (DOM.tableCountInput) DOM.tableCountInput.value = val;
  if (DOM.cfgTableCount) DOM.cfgTableCount.value = val;

  updateTableDropdown();
  renderTablesFloor();
  showToast(`Dining table count updated to ${val}`, '🍽️');
}

function renderTablesFloor() {
  const tables = getTablesList();
  const orders = Storage.getOrders();
  const todayStr = new Date().toDateString();
  const todayOrders = orders.filter(o => o.dateStr === todayStr);

  if (DOM.tableCountInput) {
    DOM.tableCountInput.value = AppState.config.tableCount || 8;
  }
  if (DOM.cfgTableCount) {
    DOM.cfgTableCount.value = AppState.config.tableCount || 8;
  }

  DOM.tablesFloorGrid.innerHTML = '';

  tables.forEach(tbl => {
    // Find latest active order for this table
    const tableOrder = todayOrders.find(o => o.tableNumber === tbl.id);
    const isOccupied = !!tableOrder;

    const card = document.createElement('div');
    card.className = `table-floor-card ${isOccupied ? 'occupied' : 'vacant'}`;

    card.innerHTML = `
      <div class="tfc-header">
        <span class="tfc-title">${tbl.name}</span>
        <span class="tfc-badge ${isOccupied ? 'occupied' : 'vacant'}">
          ${isOccupied ? 'Billed' : 'Available'}
        </span>
      </div>
      <div class="tfc-amount">
        ${isOccupied ? `₹${tableOrder.grandTotal.toFixed(2)}` : 'Vacant'}
      </div>
      <div class="tfc-time">
        ${isOccupied ? `${tableOrder.timeStr.slice(11)} • Bill ${tableOrder.billNo}` : 'Tap to select this table'}
      </div>
    `;

    card.addEventListener('click', () => {
      AudioFX.tap();
      DOM.tableSelectInput.value = tbl.id;
      switchTab('pos');
      showToast(`Selected ${tbl.name} for billing`, '🍽️');
    });

    DOM.tablesFloorGrid.appendChild(card);
  });
}

// ================= DAILY REPORTS =================
function renderReports() {
  const orders = Storage.getOrders();
  const todayStr = new Date().toDateString();
  const todayOrders = orders.filter(o => o.dateStr === todayStr);

  let totalSales = 0;
  let cashSales = 0;
  let upiSales = 0;
  const dishCounts = {};
  const typeCounts = { 'dine-in': 0, 'parcel': 0, 'quick': 0 };

  todayOrders.forEach(o => {
    totalSales += o.grandTotal;
    if (o.paymentMode === 'CASH') cashSales += o.grandTotal;
    if (o.paymentMode === 'UPI') upiSales += o.grandTotal;

    if (typeCounts[o.orderType] !== undefined) {
      typeCounts[o.orderType]++;
    }

    o.items.forEach(it => {
      dishCounts[it.name_en] = (dishCounts[it.name_en] || 0) + it.qty;
    });
  });

  DOM.repTotalSales.textContent = `₹${totalSales.toFixed(2)}`;
  DOM.repCashSales.textContent = `₹${cashSales.toFixed(2)}`;
  DOM.repUpiSales.textContent = `₹${upiSales.toFixed(2)}`;
  DOM.repTotalBills.textContent = todayOrders.length;

  // Top Dishes
  const sortedDishes = Object.entries(dishCounts).sort((a, b) => b[1] - a[1]);
  if (sortedDishes.length === 0) {
    DOM.topDishesList.innerHTML = '<p class="empty-note">No sales recorded yet today.</p>';
  } else {
    DOM.topDishesList.innerHTML = sortedDishes.slice(0, 5).map(([name, count], idx) => `
      <div style="display:flex; justify-content:space-between; padding:6px 0; border-bottom:1px solid rgba(255,255,255,0.05);">
        <span>${idx + 1}. ${name}</span>
        <span style="font-weight:800; color:var(--brand-gold);">${count} sold</span>
      </div>
    `).join('');
  }

  // Type Breakdown
  DOM.orderTypeStats.innerHTML = `
    <div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid rgba(255,255,255,0.05);">
      <span>🍽️ Dine-In Orders:</span>
      <span style="font-weight:800; color:#fff;">${typeCounts['dine-in']}</span>
    </div>
    <div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid rgba(255,255,255,0.05);">
      <span>🥡 Parcel / Takeaway:</span>
      <span style="font-weight:800; color:#fff;">${typeCounts['parcel']}</span>
    </div>
    <div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid rgba(255,255,255,0.05);">
      <span>⚡ Quick Counter Sale:</span>
      <span style="font-weight:800; color:#fff;">${typeCounts['quick']}</span>
    </div>
  `;
}

// ================= TAB NAVIGATION =================
function switchTab(targetTabId) {
  AudioFX.tap();

  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.classList.toggle('active', tab.getAttribute('data-tab') === targetTabId);
  });

  DOM.tabPanes.forEach(pane => {
    pane.classList.remove('active');
  });

  const activePane = document.getElementById(`pane${targetTabId.charAt(0).toUpperCase() + targetTabId.slice(1)}`);
  if (activePane) {
    activePane.classList.add('active');
  }

  if (targetTabId === 'orders') renderOrdersHistory();
  if (targetTabId === 'tables') renderTablesFloor();
  if (targetTabId === 'menu') renderMenuManagement();
  if (targetTabId === 'reports') renderReports();
}

// ================= MOBILE POS VIEW SWITCHER =================
function setMobilePosView(view) {
  AppState.mobilePosView = view;
  if (!DOM.posLayout) return;

  if (view === 'cart') {
    DOM.posLayout.classList.add('show-cart-mobile');
    if (DOM.mobShowCartBtn) DOM.mobShowCartBtn.classList.add('active');
    if (DOM.mobShowMenuBtn) DOM.mobShowMenuBtn.classList.remove('active');
    if (DOM.mobileFloatingBillBar) DOM.mobileFloatingBillBar.classList.remove('has-items');
  } else {
    DOM.posLayout.classList.remove('show-cart-mobile');
    if (DOM.mobShowMenuBtn) DOM.mobShowMenuBtn.classList.add('active');
    if (DOM.mobShowCartBtn) DOM.mobShowCartBtn.classList.remove('active');
    const { totalItems } = calculateCartTotals();
    if (totalItems > 0 && DOM.mobileFloatingBillBar) {
      DOM.mobileFloatingBillBar.classList.add('has-items');
    }
  }
}

// ================= MENU MANAGEMENT (EDITABLE PRICES & DISHES) =================
function renderMenuManagement() {
  if (!DOM.menuMgmtGrid) return;
  DOM.menuMgmtGrid.innerHTML = '';

  const items = AppState.menuItems || [];
  const cat = AppState.mgmtCategory || 'all';
  const query = (AppState.mgmtSearchQuery || '').toLowerCase().trim();

  // Update category counts
  if (DOM.countMgmtAll) DOM.countMgmtAll.textContent = items.length;
  if (DOM.countMgmtPulao) DOM.countMgmtPulao.textContent = items.filter(i => i.category === 'pulao').length;
  if (DOM.countMgmtStarters) DOM.countMgmtStarters.textContent = items.filter(i => i.category === 'starters').length;
  if (DOM.countMgmtThali) DOM.countMgmtThali.textContent = items.filter(i => i.category === 'thali').length;
  if (DOM.countMgmtParatha) DOM.countMgmtParatha.textContent = items.filter(i => i.category === 'paratha').length;

  const filtered = items.filter(item => {
    if (cat !== 'all' && item.category !== cat) return false;
    if (query) {
      const matchEng = item.name_en.toLowerCase().includes(query);
      const matchMr = item.name_mr.includes(query);
      if (!matchEng && !matchMr) return false;
    }
    return true;
  });

  if (filtered.length === 0) {
    DOM.menuMgmtGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">
        <p style="font-size: 28px; margin-bottom: 8px;">🍽️</p>
        <p style="font-size: 14px; font-weight: 700;">No dishes found</p>
        <p style="font-size: 11px;">Tap "+ Add New Dish" above to add a dish to the menu.</p>
      </div>
    `;
    return;
  }

  filtered.forEach(item => {
    const card = document.createElement('div');
    card.className = 'menu-mgmt-card';
    const imgSrc = item.image || 'assets/images/mutton_pulao.jpg';
    const dietBadge = item.diet === 'non-veg'
      ? `<span class="nv-box"><span class="nv-tri"></span></span>`
      : `<span class="v-box"><span class="v-dot"></span></span>`;

    card.innerHTML = `
      <div class="mmc-thumb-wrap">
        <img class="mmc-thumb" src="${imgSrc}" alt="${item.name_en}" onerror="this.src='assets/images/mutton_pulao.jpg'">
      </div>
      <div class="mmc-body">
        <div>
          <div class="mmc-title-row">
            <span class="mmc-name-mr">${item.name_mr}</span>
            ${dietBadge}
          </div>
          <div class="mmc-name-en">${item.name_en}</div>
          <div class="mmc-meta-row">
            <span class="mmc-category-tag">${item.category}</span>
            ${item.timing ? `<span class="mmc-category-tag" style="background:#fee2e2; color:#b91c1c;">${item.timing}</span>` : ''}
          </div>
        </div>
        <div class="mmc-footer-row">
          <span class="mmc-price">₹${item.price}</span>
          <div class="mmc-actions">
            <button class="btn-card-edit" data-id="${item.id}" type="button" title="Edit Price & Details">✏️ Edit</button>
            <button class="btn-card-del" data-id="${item.id}" type="button" title="Delete Dish">🗑️</button>
          </div>
        </div>
      </div>
    `;

    card.querySelector('.btn-card-edit').addEventListener('click', () => openMenuEditModal(item.id));
    card.querySelector('.btn-card-del').addEventListener('click', () => deleteMenuDish(item.id));
    DOM.menuMgmtGrid.appendChild(card);
  });
}

function openMenuEditModal(dishId = null) {
  AudioFX.tap();
  DOM.menuDishForm.reset();

  if (dishId) {
    const item = (AppState.menuItems || []).find(i => i.id === dishId);
    if (!item) return;
    DOM.menuModalTitle.textContent = `Edit Dish: ${item.name_en}`;
    DOM.editDishId.value = item.id;
    DOM.editDishNameMr.value = item.name_mr;
    DOM.editDishNameEn.value = item.name_en;
    DOM.editDishPrice.value = item.price;
    DOM.editDishCategory.value = item.category;
    DOM.editDishDiet.value = item.diet;
    DOM.editDishTiming.value = item.timing || '';
    DOM.editDishDesc.value = item.desc || '';
    DOM.editDishImageUrl.value = item.image || 'assets/images/mutton_pulao.jpg';
    DOM.dishEditPreviewImg.src = item.image || 'assets/images/mutton_pulao.jpg';
  } else {
    DOM.menuModalTitle.textContent = 'Add New Dish (नवीन पदार्थ)';
    DOM.editDishId.value = '';
    DOM.editDishImageUrl.value = 'assets/images/mutton_pulao.jpg';
    DOM.dishEditPreviewImg.src = 'assets/images/mutton_pulao.jpg';
  }

  DOM.menuEditModal.classList.add('active');
}

function closeMenuEditModal() {
  DOM.menuEditModal.classList.remove('active');
}

function saveMenuDish() {
  const id = DOM.editDishId.value.trim();
  const nameMr = DOM.editDishNameMr.value.trim();
  const nameEn = DOM.editDishNameEn.value.trim();
  const price = parseFloat(DOM.editDishPrice.value) || 0;
  const category = DOM.editDishCategory.value;
  const diet = DOM.editDishDiet.value;
  const timing = DOM.editDishTiming.value.trim();
  const desc = DOM.editDishDesc.value.trim();
  const image = DOM.editDishImageUrl.value.trim() || 'assets/images/mutton_pulao.jpg';

  if (!nameMr || !nameEn || price <= 0) {
    alert('Please enter valid Marathi name, English name, and price.');
    return;
  }

  let items = AppState.menuItems && AppState.menuItems.length ? [...AppState.menuItems] : [...DEFAULT_MENU_ITEMS];

  if (id) {
    // Update existing dish
    const index = items.findIndex(i => i.id === id);
    if (index !== -1) {
      items[index] = { ...items[index], name_mr: nameMr, name_en: nameEn, price, category, diet, timing, desc, image };
      showToast(`Updated "${nameEn}" (₹${price})`, '✅');
    }
  } else {
    // Add new dish
    const newId = 'dish_' + Date.now();
    items.push({
      id: newId,
      name_mr: nameMr,
      name_en: nameEn,
      price,
      category,
      diet,
      timing,
      desc,
      image,
      badge: 'New'
    });
    showToast(`Added "${nameEn}" to menu!`, '🎉');
  }

  AppState.menuItems = items;
  Storage.saveMenuItems(items);
  renderMenuItems();
  renderMenuManagement();
  closeMenuEditModal();
}

function deleteMenuDish(id) {
  const item = (AppState.menuItems || []).find(i => i.id === id);
  if (!item) return;
  if (!confirm(`Are you sure you want to delete "${item.name_en}" from the menu?`)) return;

  AppState.menuItems = (AppState.menuItems || []).filter(i => i.id !== id);
  Storage.saveMenuItems(AppState.menuItems);
  renderMenuItems();
  renderMenuManagement();
  showToast(`Deleted "${item.name_en}"`, '🗑️');
}

function resetMenuToDefault() {
  if (!confirm('Reset all menu items and prices back to original defaults? Any custom dishes will be replaced.')) return;
  AppState.menuItems = Storage.resetMenu();
  renderMenuItems();
  renderMenuManagement();
  showToast('Restored default menu catalog!', '🔄');
}

// ================= EVENT LISTENERS INITIALIZATION =================
function initEventListeners() {
  // Navigation tabs
  DOM.navTabs.addEventListener('click', (e) => {
    const tabBtn = e.target.closest('.nav-tab');
    if (!tabBtn) return;
    const target = tabBtn.getAttribute('data-tab');
    switchTab(target);
  });

  // Search input
  DOM.menuSearchInput.addEventListener('input', (e) => {
    AppState.searchQuery = e.target.value;
    DOM.clearSearchBtn.classList.toggle('show', e.target.value.length > 0);
    renderMenuItems();
  });

  DOM.clearSearchBtn.addEventListener('click', () => {
    DOM.menuSearchInput.value = '';
    AppState.searchQuery = '';
    DOM.clearSearchBtn.classList.remove('show');
    renderMenuItems();
  });

  // Category pills
  DOM.categoryCarousel.addEventListener('click', (e) => {
    const pill = e.target.closest('.cat-pill');
    if (!pill) return;
    AudioFX.tap();
    document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    AppState.activeCategory = pill.getAttribute('data-cat');
    renderMenuItems();
  });

  // Diet filter buttons
  DOM.dietButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      AudioFX.tap();
      DOM.dietButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      AppState.activeDiet = btn.getAttribute('data-diet');
      renderMenuItems();
    });
  });

  // Order type switcher
  DOM.orderTypeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      AudioFX.tap();
      DOM.orderTypeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      AppState.orderType = btn.getAttribute('data-type');
      if (AppState.orderType === 'parcel') {
        DOM.parcelChargeCheckbox.checked = true;
        AppState.hasParcelFee = true;
      }
      renderCart();
    });
  });

  // Parcel Fee Checkbox
  DOM.parcelChargeCheckbox.addEventListener('change', (e) => {
    AppState.hasParcelFee = e.target.checked;
    renderCart();
  });

  // Discount input
  DOM.discountInput.addEventListener('input', () => {
    renderCart();
  });

  // Payment Mode buttons
  DOM.payModeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      AudioFX.tap();
      DOM.payModeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      AppState.paymentMode = btn.getAttribute('data-mode');

      // If user chooses UPI, open the QR modal automatically for ease of collection!
      if (AppState.paymentMode === 'UPI') {
        const totals = calculateCartTotals();
        if (totals.grandTotal > 0) {
          openUpiQrModal(totals.grandTotal);
        }
      }
    });
  });

  // Main Action Buttons
  DOM.clearCartBtn.addEventListener('click', clearCart);

  // KOT button
  DOM.printKotBtn.addEventListener('click', () => {
    if (AppState.cart.length === 0) {
      showToast('Cart is empty for KOT!', '⚠️');
      return;
    }
    const kotOrder = commitCurrentOrder(null, true);
    openReceiptPreview(kotOrder);
    printToRawbt(kotOrder);
    showToast('Kitchen KOT Sent to Printer!', '👨‍🍳');
  });

  // WhatsApp Button
  DOM.sendWhatsappBtn.addEventListener('click', () => {
    if (AppState.cart.length === 0) {
      showToast('Add items before sending bill!', '⚠️');
      return;
    }
    const order = commitCurrentOrder();
    if (order) {
      sendWhatsAppBill(order);
    }
  });

  // Print RawBT Button
  DOM.printRawbtBtn.addEventListener('click', () => {
    if (AppState.cart.length === 0) {
      showToast('Cart is empty!', '⚠️');
      return;
    }
    const order = commitCurrentOrder();
    if (order) {
      openReceiptPreview(order);
      printToRawbt(order);
    }
  });

  // 1-Tap Save & Print
  DOM.printAndShareBtn.addEventListener('click', () => {
    if (AppState.cart.length === 0) {
      showToast('Cart is empty!', '⚠️');
      return;
    }
    const order = commitCurrentOrder();
    if (order) {
      openReceiptPreview(order);
      printToRawbt(order);
      if (order.customerPhone) {
        setTimeout(() => sendWhatsAppBill(order), 600);
      }
      // Reset cart for next order
      setTimeout(() => clearCart(), 1500);
    }
  });

  // Modal Closers
  DOM.closeReceiptModalBtn.addEventListener('click', closeReceiptPreview);
  DOM.closeUpiModalBtn.addEventListener('click', closeUpiQrModal);

  // Close modals on backdrop click
  DOM.receiptPreviewModal.addEventListener('click', (e) => {
    if (e.target === DOM.receiptPreviewModal) closeReceiptPreview();
  });
  DOM.upiQrModal.addEventListener('click', (e) => {
    if (e.target === DOM.upiQrModal) closeUpiQrModal();
  });

  // Close on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeReceiptPreview();
      closeUpiQrModal();
      DOM.loginModal.classList.remove('show');
    }
  });

  // Modal Action Buttons
  DOM.rmPrintRawbtBtn.addEventListener('click', () => {
    if (activePreviewOrder) printToRawbt(activePreviewOrder);
  });

  DOM.rmSendWaBtn.addEventListener('click', () => {
    if (activePreviewOrder) sendWhatsAppBill(activePreviewOrder);
  });

  DOM.rmPrintBrowserBtn.addEventListener('click', () => {
    window.print();
  });

  DOM.confirmUpiReceivedBtn.addEventListener('click', () => {
    closeUpiQrModal();
    const order = commitCurrentOrder('UPI');
    if (order) {
      openReceiptPreview(order);
      printToRawbt(order);
      setTimeout(() => clearCart(), 1500);
      showToast('UPI Payment Confirmed & Bill Printed!', '✅');
    }
  });

  // Lock / Logout Screen
  DOM.lockAppBtn.addEventListener('click', () => {
    DOM.loginModal.classList.add('show');
  });

  DOM.loginForm.addEventListener('submit', () => {
    DOM.loginModal.classList.remove('show');
    showToast('Logged in as ' + DOM.loginUsername.value, '👋');
  });

  DOM.quickLoginBtn.addEventListener('click', () => {
    DOM.loginModal.classList.remove('show');
    showToast('Logged in to Annam Pulao Tab POS', '⚡');
  });

  // Settings Handlers
  document.querySelectorAll('input[name="printerMode"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      AppState.config.printerMode = e.target.value;
      Storage.saveConfig(AppState.config);
      showToast(`Printer mode set to: ${e.target.value}`, '⚙️');
    });
  });

  DOM.saveHotelConfigBtn.addEventListener('click', () => {
    AppState.config.hotelName = DOM.cfgHotelName.value.trim();
    AppState.config.ownerName = DOM.cfgOwnerName.value.trim();
    AppState.config.phone = DOM.cfgPhone.value.trim();
    AppState.config.upiId = DOM.cfgUpiId.value.trim();
    AppState.config.footerMsg = DOM.cfgFooterMsg.value.trim();
    if (DOM.cfgTableCount) {
      const cnt = parseInt(DOM.cfgTableCount.value, 10);
      if (!isNaN(cnt)) setTableCount(cnt);
    }
    Storage.saveConfig(AppState.config);
    showToast('Restaurant details saved successfully!', '💾');
  });

  // Table count edit toolbar listeners
  if (DOM.decreaseTableCountBtn) {
    DOM.decreaseTableCountBtn.addEventListener('click', () => {
      AudioFX.tap();
      setTableCount((AppState.config.tableCount || 8) - 1);
    });
  }

  if (DOM.increaseTableCountBtn) {
    DOM.increaseTableCountBtn.addEventListener('click', () => {
      AudioFX.tap();
      setTableCount((AppState.config.tableCount || 8) + 1);
    });
  }

  if (DOM.applyTableCountBtn) {
    DOM.applyTableCountBtn.addEventListener('click', () => {
      AudioFX.tap();
      setTableCount(DOM.tableCountInput.value);
    });
  }

  if (DOM.tableCountInput) {
    DOM.tableCountInput.addEventListener('change', () => {
      setTableCount(DOM.tableCountInput.value);
    });
  }

  DOM.testPrintRawbtBtn.addEventListener('click', () => {
    const sampleOrder = {
      billNo: 'AP-TEST-01',
      dateStr: new Date().toDateString(),
      timeStr: new Date().toLocaleTimeString(),
      tableNumber: 'TEST',
      orderType: 'dine-in',
      customerPhone: '9552377733',
      items: [
        { name_en: 'Annam Mutton Pulav', name_mr: 'अन्नम मटण पुलाव', qty: 1, price: 270 },
        { name_en: 'Solkadhi', name_mr: 'सोलकडी', qty: 2, price: 30 }
      ],
      subtotal: 330,
      totalItems: 3,
      parcelFee: 0,
      discount: 0,
      grandTotal: 330,
      paymentMode: 'TEST'
    };
    printToRawbt(sampleOrder);
  });

  DOM.connectBtPrinterBtn.addEventListener('click', () => {
    printViaWebBluetooth('*** ANNAM PULAO TEST BT PRINT ***\nPrinter Paired Successfully!\n\n\n');
  });

  DOM.resetSalesDataBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear today\'s sales records?')) {
      localStorage.removeItem(Storage.ORDERS_KEY);
      updateOrdersBadge();
      renderReports();
      renderOrdersHistory();
      showToast('Sales data reset', '🗑️');
    }
  });

  DOM.printDaySummaryBtn.addEventListener('click', () => {
    const orders = Storage.getOrders();
    const todayStr = new Date().toDateString();
    const todayOrders = orders.filter(o => o.dateStr === todayStr);
    let total = todayOrders.reduce((s, o) => s + o.grandTotal, 0);

    const summaryOrder = {
      billNo: 'DAY-END',
      timeStr: new Date().toLocaleString(),
      tableNumber: 'ALL',
      orderType: 'SUMMARY',
      customerPhone: '',
      items: [
        { name_en: 'Total Bills', name_mr: 'एकूण बिले', qty: todayOrders.length, price: 0 },
        { name_en: 'Day Revenue', name_mr: 'एकूण गल्ला', qty: 1, price: total }
      ],
      subtotal: total,
      totalItems: todayOrders.length,
      parcelFee: 0,
      discount: 0,
      grandTotal: total,
      paymentMode: 'CONSOLIDATED'
    };
    printToRawbt(summaryOrder);
    showToast('Printed Day Summary Report!', '🖨️');
  });

  DOM.orderSearchInput.addEventListener('input', renderOrdersHistory);
  DOM.refreshOrdersBtn.addEventListener('click', () => {
    renderOrdersHistory();
    showToast('Orders refreshed', '🔄');
  });

  // Mobile POS Dual-Nav Switcher
  if (DOM.mobShowMenuBtn) {
    DOM.mobShowMenuBtn.addEventListener('click', () => setMobilePosView('menu'));
  }
  if (DOM.mobShowCartBtn) {
    DOM.mobShowCartBtn.addEventListener('click', () => setMobilePosView('cart'));
  }
  if (DOM.mobBackToMenuBtn) {
    DOM.mobBackToMenuBtn.addEventListener('click', () => setMobilePosView('menu'));
  }
  if (DOM.mfbActionBtn) {
    DOM.mfbActionBtn.addEventListener('click', () => setMobilePosView('cart'));
  }

  // Menu Management Listeners
  if (DOM.openAddDishModalBtn) {
    DOM.openAddDishModalBtn.addEventListener('click', () => openMenuEditModal(null));
  }
  if (DOM.resetMenuToDefaultBtn) {
    DOM.resetMenuToDefaultBtn.addEventListener('click', resetMenuToDefault);
  }
  if (DOM.closeMenuModalBtn) {
    DOM.closeMenuModalBtn.addEventListener('click', closeMenuEditModal);
  }
  if (DOM.cancelMenuModalBtn) {
    DOM.cancelMenuModalBtn.addEventListener('click', closeMenuEditModal);
  }
  if (DOM.menuDishForm) {
    DOM.menuDishForm.addEventListener('submit', (e) => {
      e.preventDefault();
      saveMenuDish();
    });
  }
  if (DOM.editDishImagePreset) {
    DOM.editDishImagePreset.addEventListener('change', (e) => {
      const val = e.target.value;
      if (val !== 'custom') {
        DOM.editDishImageUrl.value = val;
        DOM.dishEditPreviewImg.src = val;
      }
    });
  }
  if (DOM.editDishImageUrl) {
    DOM.editDishImageUrl.addEventListener('input', (e) => {
      DOM.dishEditPreviewImg.src = e.target.value.trim() || 'assets/images/mutton_pulao.jpg';
    });
  }
  if (DOM.menuMgmtSearchInput) {
    DOM.menuMgmtSearchInput.addEventListener('input', (e) => {
      AppState.mgmtSearchQuery = e.target.value;
      DOM.clearMenuMgmtSearchBtn.classList.toggle('show', e.target.value.length > 0);
      renderMenuManagement();
    });
  }
  if (DOM.clearMenuMgmtSearchBtn) {
    DOM.clearMenuMgmtSearchBtn.addEventListener('click', () => {
      DOM.menuMgmtSearchInput.value = '';
      AppState.mgmtSearchQuery = '';
      DOM.clearMenuMgmtSearchBtn.classList.remove('show');
      renderMenuManagement();
    });
  }
  if (DOM.menuMgmtCatFilter) {
    DOM.menuMgmtCatFilter.addEventListener('click', (e) => {
      const pill = e.target.closest('.cat-pill');
      if (!pill) return;
      AudioFX.tap();
      DOM.menuMgmtCatFilter.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      AppState.mgmtCategory = pill.getAttribute('data-mgmt-cat') || 'all';
      renderMenuManagement();
    });
  }
}

// ================= APP INITIALIZATION =================
function initApp() {
  // Load stored config
  const savedConfig = Storage.getConfig();
  AppState.config = { ...AppState.config, ...savedConfig };

  // Set inputs to saved config values
  DOM.cfgHotelName.value = AppState.config.hotelName;
  DOM.cfgOwnerName.value = AppState.config.ownerName;
  DOM.cfgPhone.value = AppState.config.phone;
  DOM.cfgUpiId.value = AppState.config.upiId;
  DOM.cfgFooterMsg.value = AppState.config.footerMsg;

  // Select printer mode radio
  const activeRadio = document.querySelector(`input[name="printerMode"][value="${AppState.config.printerMode}"]`);
  if (activeRadio) activeRadio.checked = true;

  // Populate sample seed order if empty so the user can immediately test
  const existingOrders = Storage.getOrders();
  if (existingOrders.length === 0) {
    Storage.saveOrder({
      id: 'ord_sample_1',
      billNo: 'AP-1910-001',
      dateStr: new Date().toDateString(),
      timeStr: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timestamp: Date.now() - 3600000,
      orderType: 'dine-in',
      tableNumber: 'T-2',
      customerPhone: '9552377733',
      customerName: 'Shital Bharate',
      items: [
        { id: 'p1', name_en: 'Annam Mutton Pulav', name_mr: 'अन्नम मटण पुलाव', qty: 2, price: 270 },
        { id: 'b3', name_en: 'Solkadhi', name_mr: 'सोलकडी', qty: 2, price: 30 }
      ],
      subtotal: 600,
      totalItems: 4,
      parcelFee: 0,
      discount: 0,
      grandTotal: 600,
      paymentMode: 'UPI'
    });
  }

  if (DOM.cfgTableCount) DOM.cfgTableCount.value = AppState.config.tableCount || 8;
  if (DOM.tableCountInput) DOM.tableCountInput.value = AppState.config.tableCount || 8;

  // Load menu items from storage
  AppState.menuItems = Storage.getMenuItems();

  // Start features
  startLiveClock();
  updateTableDropdown();
  renderMenuItems();
  renderCart();
  updateOrdersBadge();
  initEventListeners();

  console.log('Annam Pulao Tablet Billing System initialized successfully.');
}

// Bootstrap once DOM is ready
document.addEventListener('DOMContentLoaded', initApp);
