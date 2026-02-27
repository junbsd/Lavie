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


// ── Lavie Spa Logo (base64) ──
const LAVIE_LOGO_B64 = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzNDAgMTAwIiB3aWR0aD0iMzQwIiBoZWlnaHQ9IjEwMCI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImcxIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjYwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjRjVDODQyIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI0Q0OTIwQSIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZzIiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjRURCODMwIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI0I4NzAxMCIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CgogIDwhLS0g7Jes7ISxIOyLpOujqOyXoyDslYTsnbTsvZggLS0+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNiw0KSI+CiAgICA8IS0tIOuouOumrOy5tOudvSDsmKTrpbjsqr0g7Z2Q66aEIC0tPgogICAgPHBhdGggZD0iTTUwLDQgQzU5LDIgNjcsOSA2OSwyMCBDNzEsMzEgNjcsNDMgNjAsNTEKICAgICAgICAgICAgIEM2NCw0NCA2NiwzNSA2NCwyNiBDNjIsMTUgNTYsNyA1MCw0IFoiCiAgICAgICAgICBmaWxsPSJ1cmwoI2cxKSIgb3BhY2l0eT0iMC44OCIvPgogICAgPCEtLSDrqLjrpqwgLS0+CiAgICA8ZWxsaXBzZSBjeD0iNDAiIGN5PSIyNSIgcng9IjE1IiByeT0iMTYiIGZpbGw9InVybCgjZzEpIi8+CiAgICA8IS0tIOyWvOq1tCDsnYzsmIEgLS0+CiAgICA8cGF0aCBkPSJNNDQsMTcgQzQ4LDIwIDQ5LDI2IDQ3LDMyIEM0NSwzNyA0MSwzOSAzOCwzOAogICAgICAgICAgICAgQzQzLDM3IDQ3LDMyIDQ3LDI2IEM0NywyMCA0NCwxNyA0NCwxNyBaIgogICAgICAgICAgZmlsbD0iIzhCNUEwMCIgb3BhY2l0eT0iMC4yOCIvPgogICAgPCEtLSDrqqkgLS0+CiAgICA8cmVjdCB4PSIzNCIgeT0iMzkiIHdpZHRoPSI5IiBoZWlnaHQ9IjEwIiByeD0iNC41IiBmaWxsPSJ1cmwoI2cxKSIvPgogICAgPCEtLSDrqrjthrUgLS0+CiAgICA8cGF0aCBkPSJNMjMsNDggQzE2LDU1IDE0LDY3IDE4LDc5IEMyMSw4OCAyOSw5MyAzNSw5NAogICAgICAgICAgICAgQzMwLDg3IDI4LDc4IDMwLDY5IEMzMiw2MSAzNyw1NiA0MCw1NAogICAgICAgICAgICAgQzQzLDU2IDQ2LDYxIDQ2LDY2IEM0Niw3MiA0NCw3OSA0Miw4MwogICAgICAgICAgICAgQzQ2LDc3IDUxLDY5IDUxLDYyIEM1MSw1NCA0Niw0OCA0MCw0NgogICAgICAgICAgICAgQzM2LDQ0IDI5LDQ1IDIzLDQ4IFoiCiAgICAgICAgICBmaWxsPSJ1cmwoI2cyKSIvPgogICAgPCEtLSDrqLjrpqzsubTrnb0g7Jm87Kq9IO2dkOumhCAtLT4KICAgIDxwYXRoIGQ9Ik0zNCw0IEMyMywzIDEzLDEwIDksMjIgQzYsMzMgOSw0NyAxNSw1NwogICAgICAgICAgICAgQzExLDYwIDcsNjggMTEsNzYgQzEzLDgyIDE5LDg1IDI1LDg0CiAgICAgICAgICAgICBDMTksNzcgMTksNjggMjQsNjEgQzE4LDQ5IDE3LDMzIDIzLDIxCiAgICAgICAgICAgICBDMjcsMTEgMzEsNSAzNCw0IFoiCiAgICAgICAgICBmaWxsPSJ1cmwoI2cxKSIgb3BhY2l0eT0iMC45Ii8+CiAgPC9nPgoKICA8IS0tICJMYXZpZSIgLS0+CiAgPHRleHQgeD0iODgiIHk9IjU2IgogICAgICAgIGZvbnQtZmFtaWx5PSJHZW9yZ2lhLFBhbGF0aW5vLCdUaW1lcyBOZXcgUm9tYW4nLHNlcmlmIgogICAgICAgIGZvbnQtc2l6ZT0iNDEiIGZvbnQtd2VpZ2h0PSJib2xkIgogICAgICAgIGZpbGw9InVybCgjZzEpIiBsZXR0ZXItc3BhY2luZz0iMC41Ij5MYXZpZTwvdGV4dD4KCiAgPCEtLSAiU3BhIiDsnbTtg6Trpq0gLS0+CiAgPHRleHQgeD0iMjI1IiB5PSI1NiIKICAgICAgICBmb250LWZhbWlseT0iR2VvcmdpYSxQYWxhdGlubywnVGltZXMgTmV3IFJvbWFuJyxzZXJpZiIKICAgICAgICBmb250LXNpemU9IjQxIiBmb250LXdlaWdodD0iYm9sZCIgZm9udC1zdHlsZT0iaXRhbGljIgogICAgICAgIGZpbGw9IiNGNUM4NDIiPlNwYTwvdGV4dD4KCiAgPCEtLSDtg5zqt7jrnbzsnbggLS0+CiAgPHRleHQgeD0iODgiIHk9Ijc3IgogICAgICAgIGZvbnQtZmFtaWx5PSJHZW9yZ2lhLFBhbGF0aW5vLCdUaW1lcyBOZXcgUm9tYW4nLHNlcmlmIgogICAgICAgIGZvbnQtc2l6ZT0iMTMiIGZvbnQtc3R5bGU9Iml0YWxpYyIKICAgICAgICBmaWxsPSIjRURCODMwIiBvcGFjaXR5PSIwLjkiPlZ1aSB24bq7IGtoaSDEkeG6v24sIGtob+G6uyDEkeG6uXAga2hpIHbhu4E8L3RleHQ+Cjwvc3ZnPg==";

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
    { id:'c1', nameVi:'Massage Trị Liệu', icon:'💆',
      translations:{ko:'치료 마사지',en:'Therapeutic Massage',ja:'治療マッサージ',zh:'治疗按摩',th:'นวดบำบัด',ms:'Urut Terapi',ru:'Лечебный массаж'} },
    { id:'c2', nameVi:'Body Massage', icon:'🌿',
      translations:{ko:'바디 마사지',en:'Body Massage',ja:'ボディマッサージ',zh:'全身按摩',th:'นวดตัว',ms:'Urut Badan',ru:'Массаж тела'} },
    { id:'c3', nameVi:'Diện Chẩn', icon:'✨',
      translations:{ko:'경혈 마사지',en:'Facial Acupressure',ja:'経穴マッサージ',zh:'面诊',th:'การกดจุด',ms:'Akupresur',ru:'Акупрессура'} },
    { id:'c4', nameVi:'Gội Đầu Dưỡng Sinh', icon:'💇',
      translations:{ko:'헤드 스파',en:'Hair Wash & Wellness',ja:'ヘッドスパ',zh:'洗发养生',th:'สระผมและบำรุง',ms:'Cuci Rambut',ru:'Оздоровительный мытьё'} },
    { id:'c5', nameVi:'Chăm Sóc Da', icon:'🌸',
      translations:{ko:'피부 관리',en:'Skin Care',ja:'スキンケア',zh:'皮肤护理',th:'ดูแลผิว',ms:'Penjagaan Kulit',ru:'Уход за кожей'} },
    { id:'c6', nameVi:'Triệt Lông', icon:'⚡',
      translations:{ko:'제모',en:'Hair Removal',ja:'脱毛',zh:'脱毛',th:'กำจัดขน',ms:'Penyingkiran Bulu',ru:'Удаление волос'} }
  ],
  menus: [
    {id:'m1',catId:'c1',active:true,
      nameVi:'Massage cổ vai gáy trị liệu',
      descVi:'Ngâm chân thảo dược + massage cổ vai gáy - tay + đá nóng + dầu trị liệu + đắp mắt thảo dược',
      prices:[{duration:'60',amount:250000},{duration:'90',amount:300000}],
      translations:{ko:'어깨·목 치료 마사지',en:'Neck & Shoulder Therapy',ja:'首・肩の治療マッサージ',zh:'颈肩治疗按摩',th:'นวดบำบัดคอและไหล่',ms:'Urut Terapi Leher & Bahu',ru:'Терапия шеи и плеч',ko_desc:'약초족욕 + 어깨·목·팔 마사지 + 핫스톤 + 치료오일 + 약초눈팩',en_desc:'Herbal foot soak + neck/shoulder/arm massage + hot stone + therapy oil + herbal eye patch',ja_desc:'薬草足湯 + 首・肩・腕マッサージ + ホットストーン + オイル + 薬草アイパッチ',zh_desc:'草药泡脚 + 颈肩臂按摩 + 热石 + 治疗精油 + 草药眼贴',th_desc:'แช่เท้าสมุนไพร + นวดคอไหล่แขน + หินร้อน + น้ำมันบำบัด + แผ่นปิดตาสมุนไพร',ms_desc:'Rendam kaki herba + urut leher bahu tangan + batu panas + minyak terapi + patch mata herba',ru_desc:'Ванночка + массаж шеи/плеч/рук + горячие камни + масло + патч для глаз'}},
    {id:'m2',catId:'c1',active:true,
      nameVi:'Đả thông kinh lạc lưng vai cổ gáy - tay chuyên sâu',
      descVi:'Ngâm chân thảo dược + massage trị liệu + dầu trị liệu + đá nóng + đắp mắt thảo dược + xông hơi',
      prices:[{duration:'90',amount:350000}],
      translations:{ko:'심층 경락 마사지',en:'Deep Meridian Massage',ja:'深層経絡マッサージ',zh:'深度经络按摩',th:'นวดเส้นลึก',ms:'Urut Meridian Dalam',ru:'Меридианный массаж',ko_desc:'약초족욕 + 심층 치료마사지 + 치료오일 + 핫스톤 + 약초눈팩 + 스팀',en_desc:'Herbal foot soak + deep therapy massage + therapy oil + hot stone + herbal eye patch + steam',ja_desc:'薬草足湯 + 深層マッサージ + オイル + ホットストーン + アイパッチ + スチーム',zh_desc:'草药泡脚 + 深层按摩 + 精油 + 热石 + 草药眼贴 + 蒸汽',th_desc:'แช่เท้าสมุนไพร + นวดบำบัดเชิงลึก + น้ำมัน + หินร้อน + แผ่นปิดตา + ไอน้ำ',ms_desc:'Rendam kaki herba + urut terapi dalam + minyak + batu panas + patch mata + wap',ru_desc:'Ванночка + глубокий массаж + масло + горячие камни + патч + пар'}},
    {id:'m3',catId:'c1',active:true,
      nameVi:'Massage chân thư giãn',
      descVi:'Ngâm chân thảo dược + massage + đá nóng + đắp mắt thảo dược',
      prices:[{duration:'60',amount:250000}],
      translations:{ko:'발 릴렉스 마사지',en:'Relaxing Foot Massage',ja:'リラクゼーションフットマッサージ',zh:'放松足部按摩',th:'นวดเท้าผ่อนคลาย',ms:'Urut Kaki Relaks',ru:'Расслабляющий массаж стоп',ko_desc:'약초족욕 + 마사지 + 핫스톤 + 약초눈팩',en_desc:'Herbal foot soak + massage + hot stone + herbal eye patch',ja_desc:'薬草足湯 + マッサージ + ホットストーン + 薬草アイパッチ',zh_desc:'草药泡脚 + 按摩 + 热石 + 草药眼贴',th_desc:'แช่เท้าสมุนไพร + นวด + หินร้อน + แผ่นปิดตาสมุนไพร',ms_desc:'Rendam kaki herba + urut + batu panas + patch mata herba',ru_desc:'Ванночка + массаж + горячие камни + патч для глаз'}},
    {id:'m4',catId:'c1',active:true,
      nameVi:'Massage chân trị liệu',
      descVi:'Ngâm chân thảo dược + massage + dầu trị liệu + đá nóng + đắp cao thảo dược + đắp mắt thảo dược',
      prices:[{duration:'90',amount:350000}],
      translations:{ko:'발 치료 마사지',en:'Therapeutic Foot Massage',ja:'治療フットマッサージ',zh:'足部治疗按摩',th:'นวดเท้าบำบัด',ms:'Urut Kaki Terapi',ru:'Терапевтический массаж стоп',ko_desc:'약초족욕 + 마사지 + 치료오일 + 핫스톤 + 약초고약 + 약초눈팩',en_desc:'Herbal foot soak + massage + therapy oil + hot stone + herbal plaster + herbal eye patch',ja_desc:'薬草足湯 + マッサージ + オイル + ホットストーン + 薬草湿布 + アイパッチ',zh_desc:'草药泡脚 + 按摩 + 精油 + 热石 + 草药膏药 + 眼贴',th_desc:'แช่เท้าสมุนไพร + นวด + น้ำมัน + หินร้อน + แผ่นสมุนไพร + แผ่นปิดตา',ms_desc:'Rendam kaki herba + urut + minyak + batu panas + plaster herba + patch mata',ru_desc:'Ванночка + массаж + масло + горячие камни + пластырь + патч'}},
    {id:'m5',catId:'c1',active:true,
      nameVi:'Massage trị liệu thắt lưng eo',
      descVi:'Ngâm chân thảo dược + massage thắt lưng eo - chân + dầu trị liệu + đá nóng + đắp cao thảo dược + đắp mắt thảo dược',
      prices:[{duration:'60',amount:350000},{duration:'90',amount:450000}],
      translations:{ko:'허리 치료 마사지',en:'Lower Back Therapy',ja:'腰部治療マッサージ',zh:'腰部治疗按摩',th:'นวดบำบัดเอว',ms:'Urut Terapi Pinggang',ru:'Терапия поясницы',ko_desc:'약초족욕 + 허리·다리 마사지 + 치료오일 + 핫스톤 + 약초고약 + 약초눈팩',en_desc:'Herbal foot soak + lower back/leg massage + therapy oil + hot stone + herbal plaster + herbal eye patch',ja_desc:'薬草足湯 + 腰・脚マッサージ + オイル + ホットストーン + 薬草湿布 + アイパッチ',zh_desc:'草药泡脚 + 腰腿按摩 + 精油 + 热石 + 草药膏药 + 眼贴',th_desc:'แช่เท้าสมุนไพร + นวดเอว/ขา + น้ำมัน + หินร้อน + แผ่นสมุนไพร + แผ่นปิดตา',ms_desc:'Rendam kaki herba + urut pinggang/kaki + minyak + batu panas + plaster + patch mata',ru_desc:'Ванночка + массаж поясницы/ног + масло + горячие камни + пластырь + патч'}},
    {id:'m6',catId:'c2',active:true,maleExtra:50000,
      nameVi:'Massage Body Aroma Therapy',
      descVi:'Ngâm chân thảo dược + massage + đắp mắt thảo dược',
      prices:[{duration:'70',amount:300000}],
      translations:{ko:'바디 아로마 테라피',en:'Body Aroma Therapy',ja:'ボディアロマセラピー',zh:'身体芳香疗法',th:'บอดี้อโรมาเธอราพี',ms:'Aroma Terapi Badan',ru:'Аромамассаж тела',ko_desc:'약초족욕 + 전신마사지 + 약초눈팩',en_desc:'Herbal foot soak + full body massage + herbal eye patch',ja_desc:'薬草足湯 + 全身マッサージ + 薬草アイパッチ',zh_desc:'草药泡脚 + 全身按摩 + 草药眼贴',th_desc:'แช่เท้าสมุนไพร + นวดทั้งตัว + แผ่นปิดตาสมุนไพร',ms_desc:'Rendam kaki herba + urut seluruh badan + patch mata herba',ru_desc:'Ванночка + массаж всего тела + патч для глаз'}},
    {id:'m7',catId:'c2',active:true,maleExtra:50000,
      nameVi:'Massage Body đá nóng',
      descVi:'Ngâm chân thảo dược + massage + đá nóng + đắp mắt thảo dược',
      prices:[{duration:'90',amount:350000}],
      translations:{ko:'핫스톤 바디 마사지',en:'Hot Stone Body Massage',ja:'ホットストーンボディマッサージ',zh:'热石身体按摩',th:'นวดตัวหินร้อน',ms:'Urut Badan Batu Panas',ru:'Массаж с горячими камнями',ko_desc:'약초족욕 + 전신마사지 + 핫스톤 + 약초눈팩',en_desc:'Herbal foot soak + body massage + hot stone + herbal eye patch',ja_desc:'薬草足湯 + ボディマッサージ + ホットストーン + 薬草アイパッチ',zh_desc:'草药泡脚 + 全身按摩 + 热石 + 草药眼贴',th_desc:'แช่เท้าสมุนไพร + นวดตัว + หินร้อน + แผ่นปิดตาสมุนไพร',ms_desc:'Rendam kaki herba + urut badan + batu panas + patch mata herba',ru_desc:'Ванночка + массаж тела + горячие камни + патч для глаз'}},
    {id:'m8',catId:'c2',active:true,maleExtra:50000,
      nameVi:'Massage Body trị liệu',
      descVi:'Ngâm chân thảo dược + massage + đá nóng + dầu trị liệu + xông hơi',
      prices:[{duration:'110',amount:400000}],
      translations:{ko:'바디 치료 마사지',en:'Body Therapy Massage',ja:'ボディ治療マッサージ',zh:'身体治疗按摩',th:'นวดบำบัดตัว',ms:'Urut Terapi Badan',ru:'Терапевтический массаж тела',ko_desc:'약초족욕 + 전신마사지 + 핫스톤 + 치료오일 + 스팀',en_desc:'Herbal foot soak + body massage + hot stone + therapy oil + steam',ja_desc:'薬草足湯 + ボディマッサージ + ホットストーン + オイル + スチーム',zh_desc:'草药泡脚 + 全身按摩 + 热石 + 精油 + 蒸汽',th_desc:'แช่เท้าสมุนไพร + นวดตัว + หินร้อน + น้ำมัน + ไอน้ำ',ms_desc:'Rendam kaki herba + urut badan + batu panas + minyak + wap',ru_desc:'Ванночка + массаж тела + горячие камни + масло + пар'}},
    {id:'m9',catId:'c2',active:true,maleExtra:50000,
      nameVi:'Massage Body Thụy Điển (chuyên sâu)',
      descVi:'Ngâm chân thảo dược + massage + đá nóng + dầu trị liệu + đắp cao thảo dược',
      prices:[{duration:'120',amount:450000}],
      translations:{ko:'스웨디시 바디 마사지 (심층)',en:'Swedish Body Massage (Deep)',ja:'スウェーデン式ボディマッサージ',zh:'瑞典式深层按摩',th:'นวดสวีดิชตัว (เชิงลึก)',ms:'Urut Badan Sweden (Dalam)',ru:'Шведский массаж тела',ko_desc:'약초족욕 + 전신마사지 + 핫스톤 + 치료오일 + 약초고약',en_desc:'Herbal foot soak + body massage + hot stone + therapy oil + herbal plaster',ja_desc:'薬草足湯 + ボディマッサージ + ホットストーン + オイル + 薬草湿布',zh_desc:'草药泡脚 + 全身按摩 + 热石 + 精油 + 草药膏药',th_desc:'แช่เท้าสมุนไพร + นวดตัว + หินร้อน + น้ำมัน + แผ่นสมุนไพร',ms_desc:'Rendam kaki herba + urut badan + batu panas + minyak + plaster herba',ru_desc:'Ванночка + массаж тела + горячие камни + масло + травяной пластырь'}},
    {id:'m10',catId:'c2',active:true,
      nameVi:'Massage bầu dưỡng sinh',
      descVi:'Massage chuyên biệt cho bà bầu',
      prices:[{duration:'60',amount:300000},{duration:'90',amount:350000},{duration:'120',amount:450000}],
      translations:{ko:'임산부 마사지',en:'Prenatal Massage',ja:'マタニティマッサージ',zh:'孕妇按摩',th:'นวดสำหรับหญิงตั้งครรภ์',ms:'Urut Ibu Mengandung',ru:'Массаж для беременных',ko_desc:'임산부를 위한 전문 마사지',en_desc:'Specialized massage for pregnant women',ja_desc:'妊婦のための専門マッサージ',zh_desc:'专为孕妇设计的按摩',th_desc:'นวดเฉพาะทางสำหรับหญิงตั้งครรภ์',ms_desc:'Urut khusus untuk ibu mengandung',ru_desc:'Специализированный массаж для беременных'}},
    {id:'m11',catId:'c2',active:true,
      nameVi:'Xông hơi đá muối',
      descVi:'Xông hơi với đá muối himalaya',
      prices:[{duration:'20-40',amount:150000}],
      translations:{ko:'히말라야 소금돌 사우나',en:'Himalayan Salt Sauna',ja:'ヒマラヤ岩塩サウナ',zh:'喜马拉雅盐石桑拿',th:'ซาวน่าเกลือหิมาลายา',ms:'Sauna Garam Himalaya',ru:'Сауна с гималайской солью',ko_desc:'히말라야 소금돌 스팀 사우나',en_desc:'Steam sauna with Himalayan salt stones',ja_desc:'ヒマラヤ岩塩を使ったスチームサウナ',zh_desc:'喜马拉雅岩盐蒸汽桑拿',th_desc:'ซาวน่าไอน้ำด้วยหินเกลือหิมาลายา',ms_desc:'Sauna wap dengan batu garam Himalaya',ru_desc:'Паровая сауна с гималайскими камнями'}},
    {id:'m12',catId:'c3',active:true,promo:true,
      nameVi:'Mặt',descVi:'Diện chẩn vùng mặt',
      prices:[{duration:'45-60',amount:200000}],
      translations:{ko:'얼굴',en:'Face',ja:'顔',zh:'面部',th:'ใบหน้า',ms:'Muka',ru:'Лицо',ko_desc:'얼굴 경혈 치료',en_desc:'Facial acupressure therapy',ja_desc:'顔面のツボ療法',zh_desc:'面部穴位按摩',th_desc:'การบำบัดกดจุดบนใบหน้า',ms_desc:'Terapi akupresur muka',ru_desc:'Акупрессура лица'}},
    {id:'m13',catId:'c3',active:true,promo:true,
      nameVi:'Vai gáy',descVi:'Diện chẩn vùng vai gáy',
      prices:[{duration:'60',amount:250000},{duration:'90',amount:300000}],
      translations:{ko:'어깨·목',en:'Shoulder & Neck',ja:'肩・首',zh:'肩颈',th:'ไหล่และคอ',ms:'Bahu & Leher',ru:'Плечи и шея',ko_desc:'어깨·목 경혈 치료',en_desc:'Shoulder and neck acupressure therapy',ja_desc:'肩・首のツボ療法',zh_desc:'肩颈穴位按摩',th_desc:'การบำบัดกดจุดไหล่และคอ',ms_desc:'Terapi akupresur bahu dan leher',ru_desc:'Акупрессура плеч и шеи'}},
    {id:'m14',catId:'c3',active:true,promo:true,
      nameVi:'Lưng',descVi:'Diện chẩn vùng lưng',
      prices:[{duration:'60',amount:350000}],
      translations:{ko:'등',en:'Back',ja:'背中',zh:'背部',th:'หลัง',ms:'Belakang',ru:'Спина'}},
    {id:'m15',catId:'c3',active:true,promo:true,
      nameVi:'Full body',descVi:'Diện chẩn toàn thân',
      prices:[{duration:'120',amount:400000},{duration:'150',amount:500000}],
      translations:{ko:'전신',en:'Full Body',ja:'全身',zh:'全身',th:'ทั้งตัว',ms:'Seluruh Badan',ru:'Всё тело'}},
    {id:'m16',catId:'c4',active:true,
      nameVi:'Combo 1',descVi:'Ngâm chân thảo dược + massage cổ vai gáy + đắp mắt thảo dược + dẫn khí trị liệu + gội đầu thảo dược',
      prices:[{duration:'60',amount:150000}],
      translations:{ko:'콤보 1',en:'Combo 1',ja:'コンボ 1',zh:'套餐 1',th:'คอมโบ 1',ms:'Kombo 1',ru:'Комбо 1',ko_desc:'약초족욕 + 목·어깨 마사지 + 약초눈팩 + 기공치료 + 약초샴푸',en_desc:'Herbal foot soak + neck/shoulder massage + herbal eye patch + qi therapy + herbal shampoo',ja_desc:'薬草足湯 + 首肩マッサージ + アイパッチ + 気功療法 + 薬草シャンプー',zh_desc:'草药泡脚 + 颈肩按摩 + 草药眼贴 + 气功疗法 + 草药洗发',th_desc:'แช่เท้าสมุนไพร + นวดคอไหล่ + แผ่นปิดตา + บำบัดด้วยลมปราณ + สระผมสมุนไพร',ms_desc:'Rendam kaki herba + urut leher/bahu + patch mata + terapi qi + syampu herba',ru_desc:'Ванночка + массаж шеи/плеч + патч + Ки-терапия + шампунь'}},
    {id:'m17',catId:'c4',active:true,
      nameVi:'Combo 2',descVi:'Ngâm chân thảo dược + massage cổ vai gáy + đắp mắt thảo dược + dẫn khí trị liệu + đắp mặt nạ + gội đầu thảo dược',
      prices:[{duration:'70',amount:180000}],
      translations:{ko:'콤보 2',en:'Combo 2',ja:'コンボ 2',zh:'套餐 2',th:'คอมโบ 2',ms:'Kombo 2',ru:'Комбо 2',ko_desc:'약초족욕 + 목·어깨 마사지 + 약초눈팩 + 기공치료 + 마스크팩 + 약초샴푸',en_desc:'Herbal foot soak + neck/shoulder massage + herbal eye patch + qi therapy + face mask + herbal shampoo',ja_desc:'薬草足湯 + 首肩マッサージ + アイパッチ + 気功療法 + フェイスマスク + 薬草シャンプー',zh_desc:'草药泡脚 + 颈肩按摩 + 草药眼贴 + 气功疗法 + 面膜 + 草药洗发',th_desc:'แช่เท้าสมุนไพร + นวดคอไหล่ + แผ่นปิดตา + บำบัดด้วยลมปราณ + มาส์กหน้า + สระผมสมุนไพร',ms_desc:'Rendam kaki herba + urut leher/bahu + patch mata + terapi qi + masker muka + syampu herba',ru_desc:'Ванночка + массаж шеи/плеч + патч + Ки-терапия + маска + шампунь'}},
    {id:'m18',catId:'c4',active:true,
      nameVi:'Combo 3',descVi:'Ngâm chân thảo dược + massage cổ vai gáy - tay chuyên sâu + đắp mắt thảo dược + dẫn khí trị liệu + đắp mặt nạ + gội đầu thảo dược',
      prices:[{duration:'90',amount:250000}],
      translations:{ko:'콤보 3',en:'Combo 3',ja:'コンボ 3',zh:'套餐 3',th:'คอมโบ 3',ms:'Kombo 3',ru:'Комбо 3',ko_desc:'약초족욕 + 목·어깨·팔 심층마사지 + 약초눈팩 + 기공치료 + 마스크팩 + 약초샴푸',en_desc:'Herbal foot soak + deep neck/shoulder/arm massage + herbal eye patch + qi therapy + face mask + herbal shampoo',ja_desc:'薬草足湯 + 首肩腕深層マッサージ + アイパッチ + 気功療法 + マスク + シャンプー',zh_desc:'草药泡脚 + 颈肩臂深层按摩 + 草药眼贴 + 气功疗法 + 面膜 + 草药洗发',th_desc:'แช่เท้าสมุนไพร + นวดลึกคอไหล่แขน + แผ่นปิดตา + บำบัดด้วยลมปราณ + มาส์กหน้า + สระผมสมุนไพร',ms_desc:'Rendam kaki herba + urut dalam leher/bahu/tangan + patch mata + terapi qi + masker + syampu herba',ru_desc:'Ванночка + глубокий массаж шеи/плеч/рук + патч + Ки-терапия + маска + шампунь'}},
    {id:'m19',catId:'c4',active:true,
      nameVi:'Combo 4',descVi:'Ngâm chân thảo dược + massage cổ vai gáy - tay chuyên sâu + đắp mắt thảo dược + dẫn khí trị liệu + đắp mặt nạ + gội đầu thảo dược',
      prices:[{duration:'110',amount:350000}],
      translations:{ko:'콤보 4',en:'Combo 4',ja:'コンボ 4',zh:'套餐 4',th:'คอมโบ 4',ms:'Kombo 4',ru:'Комбо 4',ko_desc:'약초족욕 + 목·어깨·팔 심층마사지 + 약초눈팩 + 기공치료 + 마스크팩 + 약초샴푸 (110분)',en_desc:'Herbal foot soak + deep neck/shoulder/arm massage + herbal eye patch + qi therapy + face mask + herbal shampoo (110min)',ja_desc:'薬草足湯 + 首肩腕深層マッサージ + アイパッチ + 気功療法 + マスク + シャンプー(110分)',zh_desc:'草药泡脚 + 颈肩臂深层按摩 + 草药眼贴 + 气功疗法 + 面膜 + 草药洗发(110分)',th_desc:'แช่เท้าสมุนไพร + นวดลึกคอไหล่แขน + แผ่นปิดตา + บำบัดด้วยลมปราณ + มาส์กหน้า + สระผมสมุนไพร(110นาที)',ms_desc:'Rendam kaki herba + urut dalam leher/bahu/tangan + patch mata + terapi qi + masker + syampu herba (110min)',ru_desc:'Ванночка + глубокий массаж + патч + Ки-терапия + маска + шампунь (110 мин)'}},
    {id:'m20',catId:'c4',active:true,
      nameVi:'Combo 5',descVi:'Ngâm chân thảo dược + massage cổ vai gáy - tay chuyên sâu + massage mặt + đắp cao thảo dược + đắp mắt thảo dược + dẫn khí trị liệu + gội đầu thảo dược',
      prices:[{duration:'120',amount:400000}],
      translations:{ko:'콤보 5',en:'Combo 5',ja:'コンボ 5',zh:'套餐 5',th:'คอมโบ 5',ms:'Kombo 5',ru:'Комбо 5',ko_desc:'약초족욕 + 심층마사지 + 얼굴마사지 + 약초고약 + 약초눈팩 + 기공치료 + 약초샴푸',en_desc:'Herbal foot soak + deep massage + face massage + herbal plaster + herbal eye patch + qi therapy + herbal shampoo',ja_desc:'薬草足湯 + 深層マッサージ + 顔マッサージ + 薬草湿布 + アイパッチ + 気功療法 + シャンプー',zh_desc:'草药泡脚 + 深层按摩 + 面部按摩 + 草药膏药 + 眼贴 + 气功疗法 + 草药洗发',th_desc:'แช่เท้าสมุนไพร + นวดลึก + นวดหน้า + แผ่นสมุนไพร + แผ่นปิดตา + บำบัดด้วยลมปราณ + สระผมสมุนไพร',ms_desc:'Rendam kaki herba + urut dalam + urut muka + plaster herba + patch mata + terapi qi + syampu herba',ru_desc:'Ванночка + глубокий массаж + массаж лица + пластырь + патч + Ки-терапия + шампунь'}},
    {id:'m21',catId:'c4',active:true,
      nameVi:'Combo 6',descVi:'Ngâm chân thảo dược + massage cổ vai gáy + massage tay chuyên sâu + massage chân + xông hơi hút mụn bã nhờn + đắp mắt thảo dược + dẫn khí trị liệu + massage mặt + đắp mặt nạ + gội đầu thảo dược',
      prices:[{duration:'140',amount:450000}],
      translations:{ko:'콤보 6',en:'Combo 6',ja:'コンボ 6',zh:'套餐 6',th:'คอมโบ 6',ms:'Kombo 6',ru:'Комбо 6',ko_desc:'약초족욕 + 목·어깨마사지 + 팔심층 + 발마사지 + 모공스팀 + 약초눈팩 + 기공치료 + 얼굴마사지 + 마스크팩 + 약초샴푸',en_desc:'Herbal foot soak + neck/shoulder + deep arm + foot massage + pore steam + eye patch + qi therapy + face massage + mask + herbal shampoo',ja_desc:'薬草足湯 + 首肩 + 腕深層 + フット + 毛穴スチーム + アイパッチ + 気功 + 顔マッサージ + マスク + シャンプー',zh_desc:'草药泡脚 + 颈肩 + 手臂深层 + 脚 + 毛孔蒸汽 + 眼贴 + 气功疗法 + 面部按摩 + 面膜 + 草药洗发',th_desc:'แช่เท้าสมุนไพร + คอไหล่ + แขนลึก + เท้า + ไอน้ำขยายรูขุมขน + แผ่นปิดตา + ลมปราณ + นวดหน้า + มาส์ก + สระผมสมุนไพร',ms_desc:'Rendam kaki herba + leher/bahu + tangan dalam + kaki + wap liang + patch mata + qi + urut muka + masker + syampu herba',ru_desc:'Ванночка + шея/плечи + руки (глубокий) + ноги + пар для пор + патч + Ки-терапия + лицо + маска + шампунь'}},
    {id:'m22',catId:'c5',active:true,nameVi:'Chăm sóc da cơ bản',descVi:'',prices:[{duration:'',amount:100000}],
      translations:{ko:'기본 피부 관리',en:'Basic Skin Care',ja:'ベーシックスキンケア',zh:'基础皮肤护理',th:'ดูแลผิวเบื้องต้น',ms:'Penjagaan Kulit Asas',ru:'Базовый уход'}},
    {id:'m23',catId:'c5',active:true,nameVi:'Chăm sóc thư giãn',descVi:'',prices:[{duration:'',amount:200000}],
      translations:{ko:'릴렉싱 피부 관리',en:'Relaxing Skin Care',ja:'リラックスケア',zh:'舒缓皮肤护理',th:'ดูแลผิวผ่อนคลาย',ms:'Penjagaan Kulit Relaks',ru:'Расслабляющий уход'}},
    {id:'m24',catId:'c5',active:true,nameVi:'Chăm sóc da chuyên sâu',descVi:'',prices:[{duration:'',amount:350000}],
      translations:{ko:'심층 피부 관리',en:'Deep Skin Care',ja:'ディープスキンケア',zh:'深层皮肤护理',th:'ดูแลผิวเชิงลึก',ms:'Penjagaan Kulit Mendalam',ru:'Глубокий уход'}},
    {id:'m25',catId:'c5',active:true,nameVi:'Nặn mụn chuẩn y khoa',descVi:'',prices:[{duration:'',amount:250000},{duration:'',amount:500000}],
      translations:{ko:'의료 블랙헤드 제거',en:'Medical Acne Extraction',ja:'医療ニキビ絞り',zh:'医学祛痘',th:'บีบสิวมาตรฐานการแพทย์',ms:'Peras Jerawat Perubatan',ru:'Медицинское удаление акне'}},
    {id:'m26',catId:'c5',active:true,nameVi:'Cấy tảo',descVi:'',prices:[{duration:'',amount:400000}],
      translations:{ko:'해조 주입',en:'Algae Infusion',ja:'藻類インフュージョン',zh:'藻类注入',th:'ฉีดสาหร่าย',ms:'Infusi Alga',ru:'Водорослевая инфузия'}},
    {id:'m27',catId:'c5',active:true,nameVi:'Phun nốt ruồi phong thuỷ',descVi:'',prices:[{duration:'',amount:400000}],
      translations:{ko:'풍수 점 문신',en:'Feng Shui Mole Tattoo',ja:'風水ほくろ',zh:'风水痣',th:'สักไฝฮวงจุ้ย',ms:'Tatu Tahi Lalat Feng Shui',ru:'Татуировка фэн-шуй'}},
    {id:'m28',catId:'c5',active:true,nameVi:'Đốt nốt ruồi',descVi:'',prices:[{duration:'',amount:50000},{duration:'',amount:500000}],
      translations:{ko:'점 제거',en:'Mole Removal',ja:'ほくろ除去',zh:'去痣',th:'เผาไฝ',ms:'Buang Tahi Lalat',ru:'Удаление родинок'}},
    {id:'m29',catId:'c5',active:true,nameVi:'Tắm dưỡng body',descVi:'',prices:[{duration:'',amount:500000}],
      translations:{ko:'바디 영양 목욕',en:'Body Nourishing Bath',ja:'ボディバス',zh:'滋养浴',th:'อาบน้ำบำรุง',ms:'Mandi Badan',ru:'Питательная ванна'}},
    {id:'m30',catId:'c5',active:true,nameVi:'Làm hồng nhũ hoa',descVi:'',prices:[{duration:'',amount:3000000}],
      translations:{ko:'유두 미백',en:'Nipple Brightening',ja:'乳首ホワイトニング',zh:'乳晕美白',th:'ทำชมพูหัวนม',ms:'Pencerah Puting',ru:'Осветление сосков'}},
    {id:'m31',catId:'c5',active:true,nameVi:'Khử thâm bikini',descVi:'',prices:[{duration:'',amount:4500000}],
      translations:{ko:'비키니 미백',en:'Bikini Whitening',ja:'ビキニラインホワイトニング',zh:'比基尼美白',th:'ลดรอยดำบิกินี่',ms:'Pencerah Bikini',ru:'Осветление бикини'}},
    {id:'m32',catId:'c6',active:true,nameVi:'Nách',descVi:'',prices:[{label:'LT(10 buổi)',amount:1000000},{label:'Trọn đời',amount:2500000}],
      translations:{ko:'겨드랑이',en:'Underarm',ja:'脇',zh:'腋下',th:'รักแร้',ms:'Ketiak',ru:'Подмышки'}},
    {id:'m33',catId:'c6',active:true,nameVi:'Mép',descVi:'',prices:[{label:'LT(10 buổi)',amount:1000000},{label:'Trọn đời',amount:2500000}],
      translations:{ko:'입 주위',en:'Upper Lip',ja:'口元',zh:'嘴边',th:'ริมฝีปาก',ms:'Misai',ru:'Над губой'}},
    {id:'m34',catId:'c6',active:true,nameVi:'Mặt (triệt lông)',descVi:'',prices:[{label:'LT(10 buổi)',amount:2000000},{label:'Trọn đời',amount:4500000}],
      translations:{ko:'얼굴 제모',en:'Face (Hair Removal)',ja:'顔（脱毛）',zh:'面部脱毛',th:'ใบหน้า (กำจัดขน)',ms:'Muka (Penyingkiran Bulu)',ru:'Лицо (эпиляция)'}},
    {id:'m35',catId:'c6',active:true,nameVi:'1/2 tay',descVi:'',prices:[{label:'LT(10 buổi)',amount:2000000},{label:'Trọn đời',amount:4500000}],
      translations:{ko:'팔 1/2',en:'Half Arm',ja:'腕 1/2',zh:'半臂',th:'แขนครึ่ง',ms:'Separuh Tangan',ru:'Полруки'}},
    {id:'m36',catId:'c6',active:true,nameVi:'Cả tay',descVi:'',prices:[{label:'LT(10 buổi)',amount:3000000},{label:'Trọn đời',amount:5500000}],
      translations:{ko:'팔 전체',en:'Full Arm',ja:'腕 全体',zh:'全臂',th:'แขนทั้งหมด',ms:'Keseluruhan Tangan',ru:'Вся рука'}},
    {id:'m37',catId:'c6',active:true,nameVi:'1/2 chân',descVi:'',prices:[{label:'LT(10 buổi)',amount:3000000},{label:'Trọn đời',amount:5500000}],
      translations:{ko:'다리 1/2',en:'Half Leg',ja:'足 1/2',zh:'半腿',th:'ขาครึ่ง',ms:'Separuh Kaki',ru:'Полноги'}},
    {id:'m38',catId:'c6',active:true,nameVi:'Cả chân',descVi:'',prices:[{label:'LT(10 buổi)',amount:4000000},{label:'Trọn đời',amount:6500000}],
      translations:{ko:'다리 전체',en:'Full Leg',ja:'足 全体',zh:'全腿',th:'ขาทั้งหมด',ms:'Keseluruhan Kaki',ru:'Вся нога'}},
    {id:'m39',catId:'c6',active:true,nameVi:'Bikini',descVi:'',prices:[{label:'LT(10 buổi)',amount:3000000},{label:'Trọn đời',amount:5500000}],
      translations:{ko:'비키니',en:'Bikini',ja:'ビキニ',zh:'比基尼',th:'บิกินี่',ms:'Bikini',ru:'Бикини'}},
    {id:'m40',catId:'c6',active:true,nameVi:'Bụng - Ngực',descVi:'',prices:[{label:'LT(10 buổi)',amount:3500000},{label:'Trọn đời',amount:6000000}],
      translations:{ko:'복부·가슴',en:'Abdomen & Chest',ja:'お腹・胸',zh:'腹胸',th:'หน้าท้อง - หน้าอก',ms:'Perut - Dada',ru:'Живот - Грудь'}},
    {id:'m41',catId:'c6',active:true,nameVi:'Lưng (triệt lông)',descVi:'',prices:[{label:'LT(10 buổi)',amount:4000000},{label:'Trọn đời',amount:6500000}],
      translations:{ko:'등 제모',en:'Back (Hair Removal)',ja:'背中（脱毛）',zh:'背部脱毛',th:'หลัง (กำจัดขน)',ms:'Belakang (Penyingkiran Bulu)',ru:'Спина (эпиляция)'}},
    {id:'m42',catId:'c6',active:true,nameVi:'Toàn thân',descVi:'',prices:[{label:'LT(10 buổi)',amount:16000000},{label:'Trọn đời',amount:21000000}],
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
    translateViaGoogle,
    LAVIE_LOGO_B64: typeof LAVIE_LOGO_B64 !== "undefined" ? LAVIE_LOGO_B64 : null
  };
})();
