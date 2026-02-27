// ============================================================
// db.js  —  Lavie Spa  v5
// - Firebase Firestore 연동
// - 모든 번역 사전 내장 (CORS 오류 없음)
// - 신규 메뉴 추가 시 Google Translate 무료 API 사용
// ============================================================

const FIREBASE_CONFIG = {
  apiKey:            "AIzaSyBdaLQFG_Tm1_wBAEt-AN7_pXmjCmjh-sI",
  authDomain:        "lavie-spa.firebaseapp.com",
  projectId:         "lavie-spa",
  storageBucket:     "lavie-spa.firebasestorage.app",
  messagingSenderId: "717486824098",
  appId:             "1:717486824098:web:1a82790cf76f3d4381d5fb"
};

const DEFAULT_DATA = {
  therapists: [
    { id:'t1', name:'Lan',  phone:'', bank:'', active:true },
    { id:'t2', name:'Hoa',  phone:'', bank:'', active:true },
    { id:'t3', name:'Mai',  phone:'', bank:'', active:true },
    { id:'t4', name:'Ngoc', phone:'', bank:'', active:true }
  ],
  beds: [
    { id:'b1', name:'Giuong 1' },
    { id:'b2', name:'Giuong 2' },
    { id:'b3', name:'Giuong 3' },
    { id:'b4', name:'Giuong 4' },
    { id:'b5', name:'Giuong 5' },
    { id:'b6', name:'Giuong 6' }
  ],
  categories: [
    { id:'c1', nameVi:'Massage Tri Lieu', icon:'💆',
      translations:{ko:'치료 마사지',en:'Therapeutic Massage',ja:'治療マッサージ',zh:'治疗按摩',th:'นวดบำบัด',ms:'Urut Terapi',ru:'Лечебный массаж'} },
    { id:'c2', nameVi:'Body Massage', icon:'🌿',
      translations:{ko:'바디 마사지',en:'Body Massage',ja:'ボディマッサージ',zh:'全身按摩',th:'นวดตัว',ms:'Urut Badan',ru:'Массаж тела'} },
    { id:'c3', nameVi:'Dien Chan', icon:'✨',
      translations:{ko:'경혈 마사지',en:'Facial Acupressure',ja:'経穴マッサージ',zh:'面诊',th:'การกดจุด',ms:'Akupresur',ru:'Акупрессура'} },
    { id:'c4', nameVi:'Goi Dau Duong Sinh', icon:'💇',
      translations:{ko:'헤드 스파',en:'Hair Wash & Wellness',ja:'ヘッドスパ',zh:'洗发养生',th:'สระผมและบำรุง',ms:'Cuci Rambut',ru:'Оздоровительный мытьё'} },
    { id:'c5', nameVi:'Cham Soc Da', icon:'🌸',
      translations:{ko:'피부 관리',en:'Skin Care',ja:'スキンケア',zh:'皮肤护理',th:'ดูแลผิว',ms:'Penjagaan Kulit',ru:'Уход за кожей'} },
    { id:'c6', nameVi:'Triet Long', icon:'⚡',
      translations:{ko:'제모',en:'Hair Removal',ja:'脱毛',zh:'脱毛',th:'กำจัดขน',ms:'Penyingkiran Bulu',ru:'Удаление волос'} }
  ],
  menus: [
    {id:'m1',catId:'c1',active:true,
      nameVi:'Massage co vai gay tri lieu',
      descVi:'Ngam chan thao duoc + massage co vai gay - tay + da nong + dau tri lieu + dap mat thao duoc',
      prices:[{duration:'60',amount:250000},{duration:'90',amount:300000}],
      translations:{ko:'어깨·목 치료 마사지',en:'Neck & Shoulder Therapy',ja:'首・肩の治療マッサージ',zh:'颈肩治疗按摩',th:'นวดบำบัดคอและไหล่',ms:'Urut Terapi Leher & Bahu',ru:'Терапия шеи и плеч'}},
    {id:'m2',catId:'c1',active:true,
      nameVi:'Da thong kinh lac lung vai co gay - tay chuyen sau',
      descVi:'Ngam chan thao duoc + massage tri lieu + dau tri lieu + da nong + dap mat thao duoc + xong hoi',
      prices:[{duration:'90',amount:350000}],
      translations:{ko:'심층 경락 마사지',en:'Deep Meridian Massage',ja:'深層経絡マッサージ',zh:'深度经络按摩',th:'นวดเส้นลึก',ms:'Urut Meridian Dalam',ru:'Меридианный массаж'}},
    {id:'m3',catId:'c1',active:true,
      nameVi:'Massage chan thu gian',
      descVi:'Ngam chan thao duoc + massage + da nong + dap mat thao duoc',
      prices:[{duration:'60',amount:250000}],
      translations:{ko:'발 릴렉스 마사지',en:'Relaxing Foot Massage',ja:'リラクゼーションフットマッサージ',zh:'放松足部按摩',th:'นวดเท้าผ่อนคลาย',ms:'Urut Kaki Relaks',ru:'Расслабляющий массаж стоп'}},
    {id:'m4',catId:'c1',active:true,
      nameVi:'Massage chan tri lieu',
      descVi:'Ngam chan thao duoc + massage + dau tri lieu + da nong + dap cao thao duoc + dap mat thao duoc',
      prices:[{duration:'90',amount:350000}],
      translations:{ko:'발 치료 마사지',en:'Therapeutic Foot Massage',ja:'治療フットマッサージ',zh:'足部治疗按摩',th:'นวดเท้าบำบัด',ms:'Urut Kaki Terapi',ru:'Терапевтический массаж стоп'}},
    {id:'m5',catId:'c1',active:true,
      nameVi:'Massage tri lieu that lung eo',
      descVi:'Ngam chan thao duoc + massage that lung eo - chan + dau tri lieu + da nong + dap cao thao duoc + dap mat thao duoc',
      prices:[{duration:'60',amount:350000},{duration:'90',amount:450000}],
      translations:{ko:'허리 치료 마사지',en:'Lower Back Therapy',ja:'腰部治療マッサージ',zh:'腰部治疗按摩',th:'นวดบำบัดเอว',ms:'Urut Terapi Pinggang',ru:'Терапия поясницы'}},
    {id:'m6',catId:'c2',active:true,maleExtra:50000,
      nameVi:'Massage Body Aroma Therapy',
      descVi:'Ngam chan thao duoc + massage + dap mat thao duoc',
      prices:[{duration:'70',amount:300000}],
      translations:{ko:'바디 아로마 테라피',en:'Body Aroma Therapy',ja:'ボディアロマセラピー',zh:'身体芳香疗法',th:'บอดี้อโรมาเธอราพี',ms:'Aroma Terapi Badan',ru:'Аромамассаж тела'}},
    {id:'m7',catId:'c2',active:true,maleExtra:50000,
      nameVi:'Massage Body da nong',
      descVi:'Ngam chan thao duoc + massage + da nong + dap mat thao duoc',
      prices:[{duration:'90',amount:350000}],
      translations:{ko:'핫스톤 바디 마사지',en:'Hot Stone Body Massage',ja:'ホットストーンボディマッサージ',zh:'热石身体按摩',th:'นวดตัวหินร้อน',ms:'Urut Badan Batu Panas',ru:'Массаж с горячими камнями'}},
    {id:'m8',catId:'c2',active:true,maleExtra:50000,
      nameVi:'Massage Body tri lieu',
      descVi:'Ngam chan thao duoc + massage + da nong + dau tri lieu + xong hoi',
      prices:[{duration:'110',amount:400000}],
      translations:{ko:'바디 치료 마사지',en:'Body Therapy Massage',ja:'ボディ治療マッサージ',zh:'身体治疗按摩',th:'นวดบำบัดตัว',ms:'Urut Terapi Badan',ru:'Терапевтический массаж тела'}},
    {id:'m9',catId:'c2',active:true,maleExtra:50000,
      nameVi:'Massage Body Thuy Dien (chuyen sau)',
      descVi:'Ngam chan thao duoc + massage + da nong + dau tri lieu + dap cao thao duoc',
      prices:[{duration:'120',amount:450000}],
      translations:{ko:'스웨디시 바디 마사지 (심층)',en:'Swedish Body Massage (Deep)',ja:'スウェーデン式ボディマッサージ',zh:'瑞典式深层按摩',th:'นวดสวีดิชตัว (เชิงลึก)',ms:'Urut Badan Sweden (Dalam)',ru:'Шведский массаж тела'}},
    {id:'m10',catId:'c2',active:true,
      nameVi:'Massage bau duong sinh',
      descVi:'Massage chuyen biet cho ba bau',
      prices:[{duration:'60',amount:300000},{duration:'90',amount:350000},{duration:'120',amount:450000}],
      translations:{ko:'임산부 마사지',en:'Prenatal Massage',ja:'マタニティマッサージ',zh:'孕妇按摩',th:'นวดสำหรับหญิงตั้งครรภ์',ms:'Urut Ibu Mengandung',ru:'Массаж для беременных'}},
    {id:'m11',catId:'c2',active:true,
      nameVi:'Xong hoi da muoi',
      descVi:'Xong hoi voi da muoi himalaya',
      prices:[{duration:'20-40',amount:150000}],
      translations:{ko:'히말라야 소금돌 사우나',en:'Himalayan Salt Sauna',ja:'ヒマラヤ岩塩サウナ',zh:'喜马拉雅盐石桑拿',th:'ซาวน่าเกลือหิมาลายา',ms:'Sauna Garam Himalaya',ru:'Сауна с гималайской солью'}},
    {id:'m12',catId:'c3',active:true,promo:true,
      nameVi:'Mat',descVi:'Dien chan vung mat',
      prices:[{duration:'45-60',amount:200000}],
      translations:{ko:'얼굴',en:'Face',ja:'顔',zh:'面部',th:'ใบหน้า',ms:'Muka',ru:'Лицо'}},
    {id:'m13',catId:'c3',active:true,promo:true,
      nameVi:'Vai gay',descVi:'Dien chan vung vai gay',
      prices:[{duration:'60',amount:250000},{duration:'90',amount:300000}],
      translations:{ko:'어깨·목',en:'Shoulder & Neck',ja:'肩・首',zh:'肩颈',th:'ไหล่และคอ',ms:'Bahu & Leher',ru:'Плечи и шея'}},
    {id:'m14',catId:'c3',active:true,promo:true,
      nameVi:'Lung',descVi:'Dien chan vung lung',
      prices:[{duration:'60',amount:350000}],
      translations:{ko:'등',en:'Back',ja:'背中',zh:'背部',th:'หลัง',ms:'Belakang',ru:'Спина'}},
    {id:'m15',catId:'c3',active:true,promo:true,
      nameVi:'Full body',descVi:'Dien chan toan than',
      prices:[{duration:'120',amount:400000},{duration:'150',amount:500000}],
      translations:{ko:'전신',en:'Full Body',ja:'全身',zh:'全身',th:'ทั้งตัว',ms:'Seluruh Badan',ru:'Всё тело'}},
    {id:'m16',catId:'c4',active:true,
      nameVi:'Combo 1',descVi:'Ngam chan thao duoc + massage co vai gay + dap mat thao duoc + dan khi tri lieu + goi dau thao duoc',
      prices:[{duration:'60',amount:150000}],
      translations:{ko:'콤보 1',en:'Combo 1',ja:'コンボ 1',zh:'套餐 1',th:'คอมโบ 1',ms:'Kombo 1',ru:'Комбо 1'}},
    {id:'m17',catId:'c4',active:true,
      nameVi:'Combo 2',descVi:'Ngam chan thao duoc + massage co vai gay + dap mat thao duoc + dan khi tri lieu + dap mat na + goi dau thao duoc',
      prices:[{duration:'70',amount:180000}],
      translations:{ko:'콤보 2',en:'Combo 2',ja:'コンボ 2',zh:'套餐 2',th:'คอมโบ 2',ms:'Kombo 2',ru:'Комбо 2'}},
    {id:'m18',catId:'c4',active:true,
      nameVi:'Combo 3',descVi:'Ngam chan thao duoc + massage co vai gay - tay chuyen sau + dap mat thao duoc + dan khi tri lieu + dap mat na + goi dau thao duoc',
      prices:[{duration:'90',amount:250000}],
      translations:{ko:'콤보 3',en:'Combo 3',ja:'コンボ 3',zh:'套餐 3',th:'คอมโบ 3',ms:'Kombo 3',ru:'Комбо 3'}},
    {id:'m19',catId:'c4',active:true,
      nameVi:'Combo 4',descVi:'Ngam chan thao duoc + massage co vai gay - tay chuyen sau + dap mat thao duoc + dan khi tri lieu + dap mat na + goi dau thao duoc',
      prices:[{duration:'110',amount:350000}],
      translations:{ko:'콤보 4',en:'Combo 4',ja:'コンボ 4',zh:'套餐 4',th:'คอมโบ 4',ms:'Kombo 4',ru:'Комбо 4'}},
    {id:'m20',catId:'c4',active:true,
      nameVi:'Combo 5',descVi:'Ngam chan thao duoc + massage co vai gay - tay chuyen sau + massage mat + dap cao thao duoc + dap mat thao duoc + dan khi tri lieu + goi dau thao duoc',
      prices:[{duration:'120',amount:400000}],
      translations:{ko:'콤보 5',en:'Combo 5',ja:'コンボ 5',zh:'套餐 5',th:'คอมโบ 5',ms:'Kombo 5',ru:'Комбо 5'}},
    {id:'m21',catId:'c4',active:true,
      nameVi:'Combo 6',descVi:'Ngam chan thao duoc + massage co vai gay + massage tay chuyen sau + massage chan + xong hoi hut mun ba nhon + dap mat thao duoc + dan khi tri lieu + massage mat + dap mat na + goi dau thao duoc',
      prices:[{duration:'140',amount:450000}],
      translations:{ko:'콤보 6',en:'Combo 6',ja:'コンボ 6',zh:'套餐 6',th:'คอมโบ 6',ms:'Kombo 6',ru:'Комбо 6'}},
    {id:'m22',catId:'c5',active:true,nameVi:'Cham soc da co ban',descVi:'',prices:[{duration:'',amount:100000}],
      translations:{ko:'기본 피부 관리',en:'Basic Skin Care',ja:'ベーシックスキンケア',zh:'基础皮肤护理',th:'ดูแลผิวเบื้องต้น',ms:'Penjagaan Kulit Asas',ru:'Базовый уход'}},
    {id:'m23',catId:'c5',active:true,nameVi:'Cham soc thu gian',descVi:'',prices:[{duration:'',amount:200000}],
      translations:{ko:'릴렉싱 피부 관리',en:'Relaxing Skin Care',ja:'リラックスケア',zh:'舒缓皮肤护理',th:'ดูแลผิวผ่อนคลาย',ms:'Penjagaan Kulit Relaks',ru:'Расслабляющий уход'}},
    {id:'m24',catId:'c5',active:true,nameVi:'Cham soc da chuyen sau',descVi:'',prices:[{duration:'',amount:350000}],
      translations:{ko:'심층 피부 관리',en:'Deep Skin Care',ja:'ディープスキンケア',zh:'深层皮肤护理',th:'ดูแลผิวเชิงลึก',ms:'Penjagaan Kulit Mendalam',ru:'Глубокий уход'}},
    {id:'m25',catId:'c5',active:true,nameVi:'Nan mun chuan y khoa',descVi:'',prices:[{duration:'',amount:250000},{duration:'',amount:500000}],
      translations:{ko:'의료 블랙헤드 제거',en:'Medical Acne Extraction',ja:'医療ニキビ絞り',zh:'医学祛痘',th:'บีบสิวมาตรฐานการแพทย์',ms:'Peras Jerawat Perubatan',ru:'Медицинское удаление акне'}},
    {id:'m26',catId:'c5',active:true,nameVi:'Cay tao',descVi:'',prices:[{duration:'',amount:400000}],
      translations:{ko:'해조 주입',en:'Algae Infusion',ja:'藻類インフュージョン',zh:'藻类注入',th:'ฉีดสาหร่าย',ms:'Infusi Alga',ru:'Водорослевая инфузия'}},
    {id:'m27',catId:'c5',active:true,nameVi:'Phun not ruoi phong thuy',descVi:'',prices:[{duration:'',amount:400000}],
      translations:{ko:'풍수 점 문신',en:'Feng Shui Mole Tattoo',ja:'風水ほくろ',zh:'风水痣',th:'สักไฝฮวงจุ้ย',ms:'Tatu Tahi Lalat Feng Shui',ru:'Татуировка фэн-шуй'}},
    {id:'m28',catId:'c5',active:true,nameVi:'Dot not ruoi',descVi:'',prices:[{duration:'',amount:50000},{duration:'',amount:500000}],
      translations:{ko:'점 제거',en:'Mole Removal',ja:'ほくろ除去',zh:'去痣',th:'เผาไฝ',ms:'Buang Tahi Lalat',ru:'Удаление родинок'}},
    {id:'m29',catId:'c5',active:true,nameVi:'Tam duong body',descVi:'',prices:[{duration:'',amount:500000}],
      translations:{ko:'바디 영양 목욕',en:'Body Nourishing Bath',ja:'ボディバス',zh:'滋养浴',th:'อาบน้ำบำรุง',ms:'Mandi Badan',ru:'Питательная ванна'}},
    {id:'m30',catId:'c5',active:true,nameVi:'Lam hong nhu hoa',descVi:'',prices:[{duration:'',amount:3000000}],
      translations:{ko:'유두 미백',en:'Nipple Brightening',ja:'乳首ホワイトニング',zh:'乳晕美白',th:'ทำชมพูหัวนม',ms:'Pencerah Puting',ru:'Осветление сосков'}},
    {id:'m31',catId:'c5',active:true,nameVi:'Khu tham bikini',descVi:'',prices:[{duration:'',amount:4500000}],
      translations:{ko:'비키니 미백',en:'Bikini Whitening',ja:'ビキニラインホワイトニング',zh:'比基尼美白',th:'ลดรอยดำบิกินี่',ms:'Pencerah Bikini',ru:'Осветление бикини'}},
    {id:'m32',catId:'c6',active:true,nameVi:'Nach',descVi:'',prices:[{label:'LT(10 buoi)',amount:1000000},{label:'Tron doi',amount:2500000}],
      translations:{ko:'겨드랑이',en:'Underarm',ja:'脇',zh:'腋下',th:'รักแร้',ms:'Ketiak',ru:'Подмышки'}},
    {id:'m33',catId:'c6',active:true,nameVi:'Mep',descVi:'',prices:[{label:'LT(10 buoi)',amount:1000000},{label:'Tron doi',amount:2500000}],
      translations:{ko:'입 주위',en:'Upper Lip',ja:'口元',zh:'嘴边',th:'ริมฝีปาก',ms:'Misai',ru:'Над губой'}},
    {id:'m34',catId:'c6',active:true,nameVi:'Mat (triet long)',descVi:'',prices:[{label:'LT(10 buoi)',amount:2000000},{label:'Tron doi',amount:4500000}],
      translations:{ko:'얼굴 제모',en:'Face (Hair Removal)',ja:'顔（脱毛）',zh:'面部脱毛',th:'ใบหน้า (กำจัดขน)',ms:'Muka (Penyingkiran Bulu)',ru:'Лицо (эпиляция)'}},
    {id:'m35',catId:'c6',active:true,nameVi:'1/2 tay',descVi:'',prices:[{label:'LT(10 buoi)',amount:2000000},{label:'Tron doi',amount:4500000}],
      translations:{ko:'팔 1/2',en:'Half Arm',ja:'腕 1/2',zh:'半臂',th:'แขนครึ่ง',ms:'Separuh Tangan',ru:'Полруки'}},
    {id:'m36',catId:'c6',active:true,nameVi:'Ca tay',descVi:'',prices:[{label:'LT(10 buoi)',amount:3000000},{label:'Tron doi',amount:5500000}],
      translations:{ko:'팔 전체',en:'Full Arm',ja:'腕 全体',zh:'全臂',th:'แขนทั้งหมด',ms:'Keseluruhan Tangan',ru:'Вся рука'}},
    {id:'m37',catId:'c6',active:true,nameVi:'1/2 chan',descVi:'',prices:[{label:'LT(10 buoi)',amount:3000000},{label:'Tron doi',amount:5500000}],
      translations:{ko:'다리 1/2',en:'Half Leg',ja:'足 1/2',zh:'半腿',th:'ขาครึ่ง',ms:'Separuh Kaki',ru:'Полноги'}},
    {id:'m38',catId:'c6',active:true,nameVi:'Ca chan',descVi:'',prices:[{label:'LT(10 buoi)',amount:4000000},{label:'Tron doi',amount:6500000}],
      translations:{ko:'다리 전체',en:'Full Leg',ja:'足 全体',zh:'全腿',th:'ขาทั้งหมด',ms:'Keseluruhan Kaki',ru:'Вся нога'}},
    {id:'m39',catId:'c6',active:true,nameVi:'Bikini',descVi:'',prices:[{label:'LT(10 buoi)',amount:3000000},{label:'Tron doi',amount:5500000}],
      translations:{ko:'비키니',en:'Bikini',ja:'ビキニ',zh:'比基尼',th:'บิกินี่',ms:'Bikini',ru:'Бикини'}},
    {id:'m40',catId:'c6',active:true,nameVi:'Bung - Nguc',descVi:'',prices:[{label:'LT(10 buoi)',amount:3500000},{label:'Tron doi',amount:6000000}],
      translations:{ko:'복부·가슴',en:'Abdomen & Chest',ja:'お腹・胸',zh:'腹胸',th:'หน้าท้อง - หน้าอก',ms:'Perut - Dada',ru:'Живот - Грудь'}},
    {id:'m41',catId:'c6',active:true,nameVi:'Lung (triet long)',descVi:'',prices:[{label:'LT(10 buoi)',amount:4000000},{label:'Tron doi',amount:6500000}],
      translations:{ko:'등 제모',en:'Back (Hair Removal)',ja:'背中（脱毛）',zh:'背部脱毛',th:'หลัง (กำจัดขน)',ms:'Belakang (Penyingkiran Bulu)',ru:'Спина (эпиляция)'}},
    {id:'m42',catId:'c6',active:true,nameVi:'Toan than',descVi:'',prices:[{label:'LT(10 buoi)',amount:16000000},{label:'Tron doi',amount:21000000}],
      translations:{ko:'전신 제모',en:'Full Body (Hair Removal)',ja:'全身（脱毛）',zh:'全身脱毛',th:'ทั้งตัว (กำจัดขน)',ms:'Seluruh Badan (Penyingkiran Bulu)',ru:'Всё тело (эпиляция)'}}
  ]
};

// ── Google Translate 무료 API (신규 메뉴 추가 시 사용) ──
async function translateViaGoogle(text) {
  if (!text || !text.trim()) return {};
  const langs  = ['ko','en','ja','zh-CN','th','ms','ru'];
  const labels = ['ko','en','ja','zh',   'th','ms','ru'];
  const results = {};
  const base = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=vi&dt=t&q=';
  await Promise.all(langs.map(async (lang, i) => {
    try {
      const url = base + encodeURIComponent(text) + '&tl=' + lang;
      const resp = await fetch(url);
      const data = await resp.json();
      results[labels[i]] = data[0].map(item => item[0]).join('');
    } catch(e) {
      results[labels[i]] = text;
    }
  }));
  return results;
}

// ── Utility helpers (window.DB) ──
window.DB = (function(){
  function genId(p){ return (p||'id')+'_'+Date.now()+'_'+Math.random().toString(36).slice(2,7); }
  function fmtMoney(n){
    if(n===undefined||n===null||n==='') return '';
    var num=Number(n); if(isNaN(num)) return '';
    if(num===0) return '0₫';
    return num.toLocaleString('vi-VN')+'₫';
  }
  function fmtDate(ts){ if(!ts) return ''; return new Date(ts).toLocaleDateString('vi-VN',{day:'2-digit',month:'2-digit',year:'numeric'}); }
  function fmtTime(ts){ if(!ts) return ''; return new Date(ts).toLocaleTimeString('vi-VN',{hour:'2-digit',minute:'2-digit'}); }
  function fmtDateTime(ts){
    if(!ts) return '';
    var d=new Date(ts);
    return d.toLocaleTimeString('vi-VN',{hour:'2-digit',minute:'2-digit'})+' '+d.toLocaleDateString('vi-VN',{day:'2-digit',month:'2-digit',year:'numeric'});
  }
  function deepClone(o){ return JSON.parse(JSON.stringify(o)); }
  function exportToCSV(filename,headers,rows){
    var BOM='\uFEFF';
    var lines=[headers].concat(rows).map(function(row){
      return row.map(function(cell){ return '"'+String(cell==null?'':cell).replace(/"/g,'""')+'"'; }).join(',');
    });
    var blob=new Blob([BOM+lines.join('\n')],{type:'text/csv;charset=utf-8'});
    var url=URL.createObjectURL(blob);
    var a=document.createElement('a'); a.href=url; a.download=filename; a.click();
    setTimeout(function(){URL.revokeObjectURL(url);},1000);
  }
  function escHtml(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  return {
    genId, fmtMoney, fmtDate, fmtTime, fmtDateTime,
    deepClone, exportToCSV, escHtml,
    DEFAULT_DATA, FIREBASE_CONFIG,
    translateViaGoogle
  };
})();
