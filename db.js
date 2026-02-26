// ============================================================
// db.js - Lavie Spa Shared Data Layer
// ============================================================i

// ====================================================
// Firebase 설정 — 본인의 설정값으로 교체하세요!
// ====================================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
  getFirestore, 
  doc, setDoc, getDoc, 
  collection, getDocs, deleteDoc,
  onSnapshot, query, orderBy
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBdaLQFG_Tm1_wBAEt-AN7_pXmjCmjh-sI",
  authDomain: "lavie-spa.firebaseapp.com",
  projectId: "lavie-spa",
  storageBucket: "lavie-spa.firebasestorage.app",
  messagingSenderId: "717486824098",
  appId: "1:717486824098:web:1a82790cf76f3d4381d5fb"
};


const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
```



const DB_KEY = 'laviespa_v2';

const DEFAULT_DATA = {
  spa: {
    name: 'Lavie Spa',
    tagline: 'Vui về khi đến, khoẻ đẹp khi về',
    phone: '0971 45 45 05',
    address: '238/121 Phan Trung, P.Tân Tiến, TP.Biên Hoà, T.Đồng Nai'
  },
  therapists: [
    { id: 't1', name: 'Lan', phone: '0901234567', bank: 'MB Bank - 012345678', active: true },
    { id: 't2', name: 'Hoa', phone: '0912345678', bank: 'Vietcombank - 023456789', active: true },
    { id: 't3', name: 'Mai', phone: '', bank: '', active: true },
    { id: 't4', name: 'Ngọc', phone: '', bank: '', active: true },
  ],
  beds: [
    { id: 'b1', name: 'Giường 1' },
    { id: 'b2', name: 'Giường 2' },
    { id: 'b3', name: 'Giường 3' },
    { id: 'b4', name: 'Giường 4' },
    { id: 'b5', name: 'Giường 5' },
  ],
  categories: [
    { id: 'c1', nameVi: 'Massage Trị Liệu', icon: '💆', translations: {} },
    { id: 'c2', nameVi: 'Body Massage', icon: '🌿', translations: {} },
    { id: 'c3', nameVi: 'Diện Chẩn', icon: '✨', translations: {} },
    { id: 'c4', nameVi: 'Gội Đầu Dưỡng Sinh', icon: '💇', translations: {} },
    { id: 'c5', nameVi: 'Chăm Sóc Da', icon: '🌸', translations: {} },
    { id: 'c6', nameVi: 'Triệt Lông', icon: '⚡', translations: {} },
  ],
  menus: [
    // c1 - Massage Tri Lieu
    { id: 'm1', catId: 'c1', nameVi: 'Massage cổ vai gáy trị liệu', descVi: 'Ngâm chân thảo dược + massage cổ vai gáy - tay + đá nóng + dầu trị liệu + đắp mắt thảo dược', prices: [{duration:'60',amount:250000},{duration:'90',amount:300000}], translations: {}, active: true },
    { id: 'm2', catId: 'c1', nameVi: 'Đả thông kinh lạc lưng vai cổ gáy - tay chuyên sâu', descVi: 'Ngâm chân thảo dược + massage trị liệu + dầu trị liệu + đá nóng + đắp mắt thảo dược + xông hơi', prices: [{duration:'90',amount:350000}], translations: {}, active: true },
    { id: 'm3', catId: 'c1', nameVi: 'Massage chân thư giãn', descVi: 'Ngâm chân thảo dược + massage + đá nóng + đắp mắt thảo dược', prices: [{duration:'60',amount:250000}], translations: {}, active: true },
    { id: 'm4', catId: 'c1', nameVi: 'Massage chân trị liệu', descVi: 'Ngâm chân thảo dược + massage + dầu trị liệu + đá nóng + đắp cao thảo dược + đắp mắt thảo dược', prices: [{duration:'90',amount:350000}], translations: {}, active: true },
    { id: 'm5', catId: 'c1', nameVi: 'Massage trị liệu thắt lưng eo', descVi: 'Ngâm chân thảo dược + massage thắt lưng eo - chân + dầu trị liệu + đá nóng + đắp cao thảo dược + đắp mắt thảo dược', prices: [{duration:'60',amount:350000},{duration:'90',amount:450000}], translations: {}, active: true },
    // c2 - Body
    { id: 'm6', catId: 'c2', nameVi: 'Massage Body Aroma Therapy', descVi: 'Ngâm chân thảo dược + massage + đắp mắt thảo dược', prices: [{duration:'70',amount:300000}], translations: {}, active: true, maleExtra: 50000 },
    { id: 'm7', catId: 'c2', nameVi: 'Massage Body đá nóng', descVi: 'Ngâm chân thảo dược + massage + đá nóng + đắp mắt thảo dược', prices: [{duration:'90',amount:350000}], translations: {}, active: true, maleExtra: 50000 },
    { id: 'm8', catId: 'c2', nameVi: 'Massage Body trị liệu', descVi: 'Ngâm chân thảo dược + massage + đá nóng + dầu trị liệu + xông hơi', prices: [{duration:'110',amount:400000}], translations: {}, active: true, maleExtra: 50000 },
    { id: 'm9', catId: 'c2', nameVi: 'Massage Body Thụy Điển (chuyên sâu)', descVi: 'Ngâm chân thảo dược + massage + đá nóng + dầu trị liệu + đắp cao thảo dược', prices: [{duration:'120',amount:450000}], translations: {}, active: true, maleExtra: 50000 },
    { id: 'm10', catId: 'c2', nameVi: 'Massage bầu dưỡng sinh', descVi: 'Massage chuyên biệt cho bà bầu', prices: [{duration:'60',amount:300000},{duration:'90',amount:350000},{duration:'120',amount:450000}], translations: {}, active: true },
    { id: 'm11', catId: 'c2', nameVi: 'Xông hơi đá muối', descVi: 'Xông hơi với đá muối himalaya', prices: [{duration:'20-40',amount:150000}], translations: {}, active: true },
    // c3 - Dien Chan
    { id: 'm12', catId: 'c3', nameVi: 'Mặt', descVi: 'Diện chẩn vùng mặt', prices: [{duration:'45-60',amount:200000}], translations: {}, active: true, promo: true },
    { id: 'm13', catId: 'c3', nameVi: 'Vai gáy', descVi: 'Diện chẩn vùng vai gáy', prices: [{duration:'60',amount:250000},{duration:'90',amount:300000}], translations: {}, active: true, promo: true },
    { id: 'm14', catId: 'c3', nameVi: 'Lưng', descVi: 'Diện chẩn vùng lưng', prices: [{duration:'60',amount:350000}], translations: {}, active: true, promo: true },
    { id: 'm15', catId: 'c3', nameVi: 'Full body', descVi: 'Diện chẩn toàn thân', prices: [{duration:'120',amount:400000},{duration:'150',amount:500000}], translations: {}, active: true, promo: true },
    // c4 - Goi Dau
    { id: 'm16', catId: 'c4', nameVi: 'Combo 1', descVi: 'Ngâm chân thảo dược + massage cổ vai gáy + đắp mắt thảo dược + dẫn khí trị liệu + gội đầu thảo dược', prices: [{duration:'60',amount:150000}], translations: {}, active: true },
    { id: 'm17', catId: 'c4', nameVi: 'Combo 2', descVi: 'Ngâm chân thảo dược + massage cổ vai gáy + đắp mắt thảo dược + dẫn khí trị liệu + đắp mặt nạ + gội đầu thảo dược', prices: [{duration:'70',amount:180000}], translations: {}, active: true },
    { id: 'm18', catId: 'c4', nameVi: 'Combo 3', descVi: 'Ngâm chân thảo dược + massage cổ vai gáy - tay chuyên sâu + đắp mắt thảo dược + dẫn khí trị liệu + đắp mặt nạ + gội đầu thảo dược', prices: [{duration:'90',amount:250000}], translations: {}, active: true },
    { id: 'm19', catId: 'c4', nameVi: 'Combo 4', descVi: 'Ngâm chân thảo dược + massage cổ vai gáy - tay chuyên sâu + đắp mắt thảo dược + dẫn khí trị liệu + đắp mặt nạ + gội đầu thảo dược', prices: [{duration:'110',amount:350000}], translations: {}, active: true },
    { id: 'm20', catId: 'c4', nameVi: 'Combo 5', descVi: 'Ngâm chân thảo dược + massage cổ vai gáy - tay chuyên sâu + massage mặt + đắp cao thảo dược + đắp mắt thảo dược + dẫn khí trị liệu + gội đầu thảo dược', prices: [{duration:'120',amount:400000}], translations: {}, active: true },
    { id: 'm21', catId: 'c4', nameVi: 'Combo 6', descVi: 'Ngâm chân thảo dược + massage cổ vai gáy + massage tay chuyên sâu + massage chân + xông hơi hút mụn bã nhờn + đắp mắt thảo dược + dẫn khí trị liệu + massage mặt + đắp mặt nạ + gội đầu thảo dược', prices: [{duration:'140',amount:450000}], translations: {}, active: true },
    // c5 - Cham Soc Da
    { id: 'm22', catId: 'c5', nameVi: 'Chăm sóc da cơ bản', descVi: '', prices: [{duration:'',amount:100000}], translations: {}, active: true },
    { id: 'm23', catId: 'c5', nameVi: 'Chăm sóc thư giãn', descVi: '', prices: [{duration:'',amount:200000}], translations: {}, active: true },
    { id: 'm24', catId: 'c5', nameVi: 'Chăm sóc da chuyên sâu', descVi: '', prices: [{duration:'',amount:350000}], translations: {}, active: true },
    { id: 'm25', catId: 'c5', nameVi: 'Nặn mụn chuẩn y khoa', descVi: '', prices: [{duration:'',amount:250000},{duration:'',amount:500000}], translations: {}, active: true },
    { id: 'm26', catId: 'c5', nameVi: 'Cấy tảo', descVi: '', prices: [{duration:'',amount:400000}], translations: {}, active: true },
    { id: 'm27', catId: 'c5', nameVi: 'Phun nốt ruồi phong thuỷ', descVi: '', prices: [{duration:'',amount:400000}], translations: {}, active: true },
    { id: 'm28', catId: 'c5', nameVi: 'Đốt nốt ruồi', descVi: '', prices: [{duration:'',amount:50000},{duration:'',amount:500000}], translations: {}, active: true },
    { id: 'm29', catId: 'c5', nameVi: 'Tắm dưỡng body', descVi: '', prices: [{duration:'',amount:500000}], translations: {}, active: true },
    { id: 'm30', catId: 'c5', nameVi: 'Làm hồng nhũ hoa', descVi: '', prices: [{duration:'',amount:3000000}], translations: {}, active: true },
    { id: 'm31', catId: 'c5', nameVi: 'Khử thâm bikini', descVi: '', prices: [{duration:'',amount:4500000}], translations: {}, active: true },
    // c6 - Triet Long
    { id: 'm32', catId: 'c6', nameVi: 'Nách', descVi: '', prices: [{label:'LT(10 buổi)',amount:1000000},{label:'Trọn đời',amount:2500000}], translations: {}, active: true },
    { id: 'm33', catId: 'c6', nameVi: 'Mép', descVi: '', prices: [{label:'LT(10 buổi)',amount:1000000},{label:'Trọn đời',amount:2500000}], translations: {}, active: true },
    { id: 'm34', catId: 'c6', nameVi: 'Mặt (triệt lông)', descVi: '', prices: [{label:'LT(10 buổi)',amount:2000000},{label:'Trọn đời',amount:4500000}], translations: {}, active: true },
    { id: 'm35', catId: 'c6', nameVi: '1/2 tay', descVi: '', prices: [{label:'LT(10 buổi)',amount:2000000},{label:'Trọn đời',amount:4500000}], translations: {}, active: true },
    { id: 'm36', catId: 'c6', nameVi: 'Cả tay', descVi: '', prices: [{label:'LT(10 buổi)',amount:3000000},{label:'Trọn đời',amount:5500000}], translations: {}, active: true },
    { id: 'm37', catId: 'c6', nameVi: '1/2 chân', descVi: '', prices: [{label:'LT(10 buổi)',amount:3000000},{label:'Trọn đời',amount:5500000}], translations: {}, active: true },
    { id: 'm38', catId: 'c6', nameVi: 'Cả chân', descVi: '', prices: [{label:'LT(10 buổi)',amount:4000000},{label:'Trọn đời',amount:6500000}], translations: {}, active: true },
    { id: 'm39', catId: 'c6', nameVi: 'Bikini', descVi: '', prices: [{label:'LT(10 buổi)',amount:3000000},{label:'Trọn đời',amount:5500000}], translations: {}, active: true },
    { id: 'm40', catId: 'c6', nameVi: 'Bụng - Ngực', descVi: '', prices: [{label:'LT(10 buổi)',amount:3500000},{label:'Trọn đời',amount:6000000}], translations: {}, active: true },
    { id: 'm41', catId: 'c6', nameVi: 'Lưng (triệt lông)', descVi: '', prices: [{label:'LT(10 buổi)',amount:4000000},{label:'Trọn đời',amount:6500000}], translations: {}, active: true },
    { id: 'm42', catId: 'c6', nameVi: 'Toàn thân', descVi: '', prices: [{label:'LT(10 buổi)',amount:16000000},{label:'Trọn đời',amount:21000000}], translations: {}, active: true },
  ],
  sessions: [],   // active/completed sessions
  records: [],    // all historical records
};

// ── STORAGE ──
function loadDB() {
  try {
    const raw = localStorage.getItem(DB_KEY);
    if (!raw) return deepClone(DEFAULT_DATA);
    const saved = JSON.parse(raw);
    // merge to ensure new default keys exist
    return { ...deepClone(DEFAULT_DATA), ...saved };
  } catch(e) { return deepClone(DEFAULT_DATA); }
}

function saveDB(data) {
  localStorage.setItem(DB_KEY, JSON.stringify(data));
}

function deepClone(obj) { return JSON.parse(JSON.stringify(obj)); }

function genId(prefix) {
  return prefix + Date.now() + Math.random().toString(36).slice(2,6);
}

// ── FORMAT ──
function fmtMoney(n) {
  if (!n && n !== 0) return '';
  return Number(n).toLocaleString('vi-VN') + '₫';
}
function fmtMoneyK(n) {
  if (!n && n !== 0) return '';
  if (n >= 1000000) return (n/1000000).toFixed(n%1000000===0?0:1) + 'M';
  return (n/1000) + 'k';
}
function fmtDate(ts) {
  if (!ts) return '';
  return new Date(ts).toLocaleDateString('vi-VN');
}
function fmtTime(ts) {
  if (!ts) return '';
  return new Date(ts).toLocaleTimeString('vi-VN', {hour:'2-digit',minute:'2-digit'});
}
function fmtDateTime(ts) {
  if (!ts) return '';
  return new Date(ts).toLocaleString('vi-VN', {hour:'2-digit',minute:'2-digit',day:'2-digit',month:'2-digit',year:'numeric'});
}

// ── EXPORT TO EXCEL (CSV) ──
function exportToCSV(filename, headers, rows) {
  const BOM = '\uFEFF';
  const csvContent = BOM + [headers, ...rows]
    .map(row => row.map(cell => `"${String(cell).replace(/"/g,'""')}"`).join(','))
    .join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

// ── BACKUP / RESTORE ──
function backupDB(data) {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const ts = new Date().toISOString().slice(0,10);
  a.href = url; a.download = `laviespa_backup_${ts}.json`; a.click();
  URL.revokeObjectURL(url);
}

function restoreDB(file, callback) {
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const data = JSON.parse(e.target.result);
      saveDB(data);
      callback(true, data);
    } catch(err) { callback(false, null); }
  };
  reader.readAsText(file);
}

// ── TRANSLATION via Claude API ──
async function translateToAllLangs(viText) {
  if (!viText || !viText.trim()) return {};
  const langs = {
    ko: '한국어', en: 'English', ja: '日本語',
    zh: '中文（简体）', th: 'ภาษาไทย', ms: 'Bahasa Melayu', ru: 'Русский'
  };
  const prompt = `Translate the following Vietnamese spa service text to these languages. 
Return ONLY a valid JSON object with language codes as keys. Keep proper nouns (brand names) unchanged.
Vietnamese text: "${viText}"
Languages needed: ${Object.entries(langs).map(([k,v])=>`${k} (${v})`).join(', ')}
Return format: {"ko":"...","en":"...","ja":"...","zh":"...","th":"...","ms":"...","ru":"..."}`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    const data = await response.json();
    const text = data.content?.map(b => b.text || '').join('') || '';
    const match = text.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
  } catch(e) { console.error('Translation error:', e); }
  return {};
}

// expose globally
window.DB = { loadDB, saveDB, deepClone, genId, fmtMoney, fmtMoneyK, fmtDate, fmtTime, fmtDateTime, exportToCSV, backupDB, restoreDB, translateToAllLangs, DEFAULT_DATA };
