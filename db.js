// ============================================================
// db.js  —  Lavie Spa  v4  (Firebase Firestore)
// !! 아래 firebaseConfig 값을 본인 Firebase 프로젝트 값으로 교체하세요 !!
// ============================================================

// ── Firebase 설정 (스크린샷의 값 그대로) ──
const FIREBASE_CONFIG = {
  apiKey:            "AIzaSyBdaLQFG_Tm1_wBAEt-AN7_pXmjCmjh-sI",
  authDomain:        "lavie-spa.firebaseapp.com",
  projectId:         "lavie-spa",
  storageBucket:     "lavie-spa.firebasestorage.app",
  messagingSenderId: "717486824098",
  appId:             "1:717486824098:web:1a82790cf76f3d4381d5fb"
};

// ── 기본 데이터 (첫 실행 시 Firestore에 저장됨) ──
const DEFAULT_DATA = {
  therapists: [
    { id:'t1', name:'Lan',  phone:'', bank:'', active:true },
    { id:'t2', name:'Hoa',  phone:'', bank:'', active:true },
    { id:'t3', name:'Mai',  phone:'', bank:'', active:true },
    { id:'t4', name:'Ngọc', phone:'', bank:'', active:true }
  ],
  beds: [
    { id:'b1', name:'Giường 1' },
    { id:'b2', name:'Giường 2' },
    { id:'b3', name:'Giường 3' },
    { id:'b4', name:'Giường 4' },
    { id:'b5', name:'Giường 5' },
    { id:'b6', name:'Giường 6' }
  ],
  categories: [
    { id:'c1', nameVi:'Massage Trị Liệu',   icon:'💆', translations:{} },
    { id:'c2', nameVi:'Body Massage',         icon:'🌿', translations:{} },
    { id:'c3', nameVi:'Diện Chẩn',           icon:'✨', translations:{} },
    { id:'c4', nameVi:'Gội Đầu Dưỡng Sinh', icon:'💇', translations:{} },
    { id:'c5', nameVi:'Chăm Sóc Da',         icon:'🌸', translations:{} },
    { id:'c6', nameVi:'Triệt Lông',          icon:'⚡', translations:{} }
  ],
  menus: [
    {id:'m1', catId:'c1',active:true,nameVi:'Massage cổ vai gáy trị liệu',descVi:'Ngâm chân thảo dược + massage cổ vai gáy - tay + đá nóng + dầu trị liệu + đắp mắt thảo dược',prices:[{duration:'60',amount:250000},{duration:'90',amount:300000}],translations:{}},
    {id:'m2', catId:'c1',active:true,nameVi:'Đả thông kinh lạc lưng vai cổ gáy - tay chuyên sâu',descVi:'Ngâm chân thảo dược + massage trị liệu + dầu trị liệu + đá nóng + đắp mắt thảo dược + xông hơi',prices:[{duration:'90',amount:350000}],translations:{}},
    {id:'m3', catId:'c1',active:true,nameVi:'Massage chân thư giãn',descVi:'Ngâm chân thảo dược + massage + đá nóng + đắp mắt thảo dược',prices:[{duration:'60',amount:250000}],translations:{}},
    {id:'m4', catId:'c1',active:true,nameVi:'Massage chân trị liệu',descVi:'Ngâm chân thảo dược + massage + dầu trị liệu + đá nóng + đắp cao thảo dược + đắp mắt thảo dược',prices:[{duration:'90',amount:350000}],translations:{}},
    {id:'m5', catId:'c1',active:true,nameVi:'Massage trị liệu thắt lưng eo',descVi:'Ngâm chân thảo dược + massage thắt lưng eo - chân + dầu trị liệu + đá nóng + đắp cao thảo dược + đắp mắt thảo dược',prices:[{duration:'60',amount:350000},{duration:'90',amount:450000}],translations:{}},
    {id:'m6', catId:'c2',active:true,maleExtra:50000,nameVi:'Massage Body Aroma Therapy',descVi:'Ngâm chân thảo dược + massage + đắp mắt thảo dược',prices:[{duration:'70',amount:300000}],translations:{}},
    {id:'m7', catId:'c2',active:true,maleExtra:50000,nameVi:'Massage Body đá nóng',descVi:'Ngâm chân thảo dược + massage + đá nóng + đắp mắt thảo dược',prices:[{duration:'90',amount:350000}],translations:{}},
    {id:'m8', catId:'c2',active:true,maleExtra:50000,nameVi:'Massage Body trị liệu',descVi:'Ngâm chân thảo dược + massage + đá nóng + dầu trị liệu + xông hơi',prices:[{duration:'110',amount:400000}],translations:{}},
    {id:'m9', catId:'c2',active:true,maleExtra:50000,nameVi:'Massage Body Thụy Điển (chuyên sâu)',descVi:'Ngâm chân thảo dược + massage + đá nóng + dầu trị liệu + đắp cao thảo dược',prices:[{duration:'120',amount:450000}],translations:{}},
    {id:'m10',catId:'c2',active:true,nameVi:'Massage bầu dưỡng sinh',descVi:'Massage chuyên biệt cho bà bầu',prices:[{duration:'60',amount:300000},{duration:'90',amount:350000},{duration:'120',amount:450000}],translations:{}},
    {id:'m11',catId:'c2',active:true,nameVi:'Xông hơi đá muối',descVi:'Xông hơi với đá muối himalaya',prices:[{duration:'20-40',amount:150000}],translations:{}},
    {id:'m12',catId:'c3',active:true,promo:true,nameVi:'Mặt',descVi:'Diện chẩn vùng mặt',prices:[{duration:'45-60',amount:200000}],translations:{}},
    {id:'m13',catId:'c3',active:true,promo:true,nameVi:'Vai gáy',descVi:'Diện chẩn vùng vai gáy',prices:[{duration:'60',amount:250000},{duration:'90',amount:300000}],translations:{}},
    {id:'m14',catId:'c3',active:true,promo:true,nameVi:'Lưng',descVi:'Diện chẩn vùng lưng',prices:[{duration:'60',amount:350000}],translations:{}},
    {id:'m15',catId:'c3',active:true,promo:true,nameVi:'Full body',descVi:'Diện chẩn toàn thân',prices:[{duration:'120',amount:400000},{duration:'150',amount:500000}],translations:{}},
    {id:'m16',catId:'c4',active:true,nameVi:'Combo 1',descVi:'Ngâm chân thảo dược + massage cổ vai gáy + đắp mắt thảo dược + dẫn khí trị liệu + gội đầu thảo dược',prices:[{duration:'60',amount:150000}],translations:{}},
    {id:'m17',catId:'c4',active:true,nameVi:'Combo 2',descVi:'Ngâm chân thảo dược + massage cổ vai gáy + đắp mắt thảo dược + dẫn khí trị liệu + đắp mặt nạ + gội đầu thảo dược',prices:[{duration:'70',amount:180000}],translations:{}},
    {id:'m18',catId:'c4',active:true,nameVi:'Combo 3',descVi:'Ngâm chân thảo dược + massage cổ vai gáy - tay chuyên sâu + đắp mắt thảo dược + dẫn khí trị liệu + đắp mặt nạ + gội đầu thảo dược',prices:[{duration:'90',amount:250000}],translations:{}},
    {id:'m19',catId:'c4',active:true,nameVi:'Combo 4',descVi:'Ngâm chân thảo dược + massage cổ vai gáy - tay chuyên sâu + đắp mắt thảo dược + dẫn khí trị liệu + đắp mặt nạ + gội đầu thảo dược',prices:[{duration:'110',amount:350000}],translations:{}},
    {id:'m20',catId:'c4',active:true,nameVi:'Combo 5',descVi:'Ngâm chân thảo dược + massage cổ vai gáy - tay chuyên sâu + massage mặt + đắp cao thảo dược + đắp mắt thảo dược + dẫn khí trị liệu + gội đầu thảo dược',prices:[{duration:'120',amount:400000}],translations:{}},
    {id:'m21',catId:'c4',active:true,nameVi:'Combo 6',descVi:'Ngâm chân thảo dược + massage cổ vai gáy + massage tay chuyên sâu + massage chân + xông hơi hút mụn bã nhờn + đắp mắt thảo dược + dẫn khí trị liệu + massage mặt + đắp mặt nạ + gội đầu thảo dược',prices:[{duration:'140',amount:450000}],translations:{}},
    {id:'m22',catId:'c5',active:true,nameVi:'Chăm sóc da cơ bản',descVi:'',prices:[{duration:'',amount:100000}],translations:{}},
    {id:'m23',catId:'c5',active:true,nameVi:'Chăm sóc thư giãn',descVi:'',prices:[{duration:'',amount:200000}],translations:{}},
    {id:'m24',catId:'c5',active:true,nameVi:'Chăm sóc da chuyên sâu',descVi:'',prices:[{duration:'',amount:350000}],translations:{}},
    {id:'m25',catId:'c5',active:true,nameVi:'Nặn mụn chuẩn y khoa',descVi:'',prices:[{duration:'',amount:250000},{duration:'',amount:500000}],translations:{}},
    {id:'m26',catId:'c5',active:true,nameVi:'Cấy tảo',descVi:'',prices:[{duration:'',amount:400000}],translations:{}},
    {id:'m27',catId:'c5',active:true,nameVi:'Phun nốt ruồi phong thuỷ',descVi:'',prices:[{duration:'',amount:400000}],translations:{}},
    {id:'m28',catId:'c5',active:true,nameVi:'Đốt nốt ruồi',descVi:'',prices:[{duration:'',amount:50000},{duration:'',amount:500000}],translations:{}},
    {id:'m29',catId:'c5',active:true,nameVi:'Tắm dưỡng body',descVi:'',prices:[{duration:'',amount:500000}],translations:{}},
    {id:'m30',catId:'c5',active:true,nameVi:'Làm hồng nhũ hoa',descVi:'',prices:[{duration:'',amount:3000000}],translations:{}},
    {id:'m31',catId:'c5',active:true,nameVi:'Khử thâm bikini',descVi:'',prices:[{duration:'',amount:4500000}],translations:{}},
    {id:'m32',catId:'c6',active:true,nameVi:'Nách',descVi:'',prices:[{label:'LT(10 buổi)',amount:1000000},{label:'Trọn đời',amount:2500000}],translations:{}},
    {id:'m33',catId:'c6',active:true,nameVi:'Mép',descVi:'',prices:[{label:'LT(10 buổi)',amount:1000000},{label:'Trọn đời',amount:2500000}],translations:{}},
    {id:'m34',catId:'c6',active:true,nameVi:'Mặt (triệt lông)',descVi:'',prices:[{label:'LT(10 buổi)',amount:2000000},{label:'Trọn đời',amount:4500000}],translations:{}},
    {id:'m35',catId:'c6',active:true,nameVi:'1/2 tay',descVi:'',prices:[{label:'LT(10 buổi)',amount:2000000},{label:'Trọn đời',amount:4500000}],translations:{}},
    {id:'m36',catId:'c6',active:true,nameVi:'Cả tay',descVi:'',prices:[{label:'LT(10 buổi)',amount:3000000},{label:'Trọn đời',amount:5500000}],translations:{}},
    {id:'m37',catId:'c6',active:true,nameVi:'1/2 chân',descVi:'',prices:[{label:'LT(10 buổi)',amount:3000000},{label:'Trọn đời',amount:5500000}],translations:{}},
    {id:'m38',catId:'c6',active:true,nameVi:'Cả chân',descVi:'',prices:[{label:'LT(10 buổi)',amount:4000000},{label:'Trọn đời',amount:6500000}],translations:{}},
    {id:'m39',catId:'c6',active:true,nameVi:'Bikini',descVi:'',prices:[{label:'LT(10 buổi)',amount:3000000},{label:'Trọn đời',amount:5500000}],translations:{}},
    {id:'m40',catId:'c6',active:true,nameVi:'Bụng - Ngực',descVi:'',prices:[{label:'LT(10 buổi)',amount:3500000},{label:'Trọn đời',amount:6000000}],translations:{}},
    {id:'m41',catId:'c6',active:true,nameVi:'Lưng (triệt lông)',descVi:'',prices:[{label:'LT(10 buổi)',amount:4000000},{label:'Trọn đời',amount:6500000}],translations:{}},
    {id:'m42',catId:'c6',active:true,nameVi:'Toàn thân',descVi:'',prices:[{label:'LT(10 buổi)',amount:16000000},{label:'Trọn đời',amount:21000000}],translations:{}}
  ]
};

// ── Firebase SDK (CDN, no build tools needed) ──
// Loaded via <script type="module"> in each HTML file
// This file exports FDB object for use in all pages

// ── Utility helpers (non-async, used everywhere) ──
window.DB = (function(){
  function genId(prefix){
    return (prefix||'id')+'_'+Date.now()+'_'+Math.random().toString(36).slice(2,7);
  }
  function fmtMoney(n){
    if(n===undefined||n===null||n==='') return '';
    var num=Number(n); if(isNaN(num)) return '';
    if(num===0) return '0₫';
    return num.toLocaleString('vi-VN')+'₫';
  }
  function fmtDate(ts){
    if(!ts) return '';
    return new Date(ts).toLocaleDateString('vi-VN',{day:'2-digit',month:'2-digit',year:'numeric'});
  }
  function fmtTime(ts){
    if(!ts) return '';
    return new Date(ts).toLocaleTimeString('vi-VN',{hour:'2-digit',minute:'2-digit'});
  }
  function fmtDateTime(ts){
    if(!ts) return '';
    var d=new Date(ts);
    return d.toLocaleTimeString('vi-VN',{hour:'2-digit',minute:'2-digit'})+' '+
           d.toLocaleDateString('vi-VN',{day:'2-digit',month:'2-digit',year:'numeric'});
  }
  function deepClone(o){ return JSON.parse(JSON.stringify(o)); }
  function exportToCSV(filename,headers,rows){
    var BOM='\uFEFF';
    var lines=[headers].concat(rows).map(function(row){
      return row.map(function(cell){
        return '"'+String(cell==null?'':cell).replace(/"/g,'""')+'"';
      }).join(',');
    });
    var csv=BOM+lines.join('\n');
    var blob=new Blob([csv],{type:'text/csv;charset=utf-8'});
    var url=URL.createObjectURL(blob);
    var a=document.createElement('a');
    a.href=url; a.download=filename; a.click();
    setTimeout(function(){URL.revokeObjectURL(url);},1000);
  }
  function escHtml(s){
    return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }
  return {
    genId:genId, fmtMoney:fmtMoney, fmtDate:fmtDate,
    fmtTime:fmtTime, fmtDateTime:fmtDateTime,
    deepClone:deepClone, exportToCSV:exportToCSV, escHtml:escHtml,
    DEFAULT_DATA:DEFAULT_DATA, FIREBASE_CONFIG:FIREBASE_CONFIG
  };
})();
