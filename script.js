'use strict';
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const LS = { g(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v) } catch (e) { return d } }, s(k, v) { localStorage.setItem(k, JSON.stringify(v)) } };
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* ---------- Icons (inline SVG images) ---------- */
const SVGP = {
    brief: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M3 13h18"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
    moon: '<path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    bell: '<path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 01-3.4 0"/>',
    menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
    x: '<path d="M18 6L6 18M6 6l12 12"/>',
    eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/><circle cx="12" cy="12" r="3"/>',
    eyeoff: '<path d="M17.9 17.9A10.9 10.9 0 0112 20C5 20 1 12 1 12a18.5 18.5 0 015.1-5.9M9.9 4.2A9.1 9.1 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.2 3.2M1 1l22 22"/>',
    pin: '<path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>',
    clip: '<path d="M21.4 11l-9.2 9.2a6 6 0 01-8.5-8.5l9.2-9.2a4 4 0 015.7 5.7l-9.2 9.2a2 2 0 01-2.8-2.8l8.5-8.5"/>',
    user: '<path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    brain: '<path d="M9 18h6M10 22h4M12 2a7 7 0 00-4 12.7V17h8v-2.3A7 7 0 0012 2z"/>',
    trophy: '<path d="M8 21h8M12 17v4M7 4h10v6a5 5 0 01-10 0V4zM7 6H3v2a4 4 0 004 4M17 6h4v2a4 4 0 01-4 4"/>'
};
const HP = '<path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 00-7.8 7.8l1 1.1L12 21.2l7.8-7.7 1-1.1a5.5 5.5 0 000-7.8z"/>';
const STP = '<polygon points="12 2 15.1 8.3 22 9.3 17 14.1 18.2 21 12 17.8 5.8 21 7 14.1 2 9.3 8.9 8.3"/>';
const FL = {
    f_en: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 16"><rect width="24" height="16" fill="#fff"/><g fill="#b22234"><rect width="24" height="2.29"/><rect y="4.57" width="24" height="2.29"/><rect y="9.14" width="24" height="2.29"/><rect y="13.71" width="24" height="2.29"/></g><rect width="10" height="9.14" fill="#3c3b6e"/></svg>',
    f_uz: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 16"><rect width="24" height="5.2" fill="#0099b5"/><rect y="5.2" width="24" height="0.5" fill="#ce1126"/><rect y="5.7" width="24" height="4.6" fill="#fff"/><rect y="10.3" width="24" height="0.5" fill="#ce1126"/><rect y="10.8" width="24" height="5.2" fill="#1eb53a"/><circle cx="4" cy="2.6" r="1.5" fill="#fff"/><circle cx="4.6" cy="2.6" r="1.25" fill="#0099b5"/></svg>',
    f_ru: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 16"><rect width="24" height="5.34" fill="#fff"/><rect y="5.33" width="24" height="5.34" fill="#0039a6"/><rect y="10.66" width="24" height="5.34" fill="#d52b1e"/></svg>'
};
const SV = (p, st, fi) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${fi}" stroke="${st}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
function U(n) {
    let s;
    if (FL[n]) s = FL[n];
    else if (n === 'heart') s = SV(HP, '#9ca3af', 'none');
    else if (n === 'hearton') s = SV(HP, '#ef4444', '#ef4444');
    else if (n === 'star') s = SV(STP, '#f59e0b', '#f59e0b');
    else if (n === 'star0') s = SV(STP, '#9ca3af', '#9ca3af');
    else s = SV(SVGP[n], '#6366f1', 'none');
    return 'data:image/svg+xml,' + encodeURIComponent(s);
}
const I = (n, c = 'i') => `<img class="${c}" src="${U(n)}" alt="">`;

/* ---------- i18n ---------- */
const RAW = `home|Home|Bosh sahifa|Главная
jobs|Jobs|Vakansiyalar|Вакансии
companies|Companies|Kompaniyalar|Компании
test|Career Test|Karyera testi|Тест карьеры
saved|Saved Jobs|Saqlanganlar|Избранное
apps|Applications|Arizalar|Отклики
profile|Profile|Profil|Профиль
signin|Sign In|Kirish|Войти
signup|Sign Up|Ro‘yxatdan o‘tish|Регистрация
logout|Log out|Chiqish|Выйти
name|Full name|To‘liq ism|Полное имя
email|Email|Email|Эл. почта
pass|Password|Parol|Пароль
pass2|Confirm password|Parolni tasdiqlang|Повторите пароль
remember|Remember me|Eslab qolish|Запомнить меня
heroT|Find a job you will love|O‘zingizga mos ishni toping|Найдите работу мечты
heroS|Thousands of vacancies from top employers|Yetakchi ish beruvchilardan minglab vakansiyalar|Тысячи вакансий от лучших работодателей
searchPh|Job title, company, skill…|Lavozim, kompaniya, ko‘nikma…|Должность, компания, навык…
find|Search|Qidirish|Найти
anyCity|All locations|Barcha hududlar|Все города
anyCat|All categories|Barcha kategoriyalar|Все категории
any|Any|Farqi yo‘q|Любой
filters|Filters|Filtrlar|Фильтры
location|Location|Hudud|Город
category|Category|Kategoriya|Категория
type|Job type|Ish turi|Тип занятости
exp|Experience|Tajriba|Опыт
work|Work format|Ish formati|Формат работы
salary|Min. salary (USD/mo)|Min. maosh (USD/oy)|Мин. зарплата (USD/мес)
new|Newest|Eng yangi|Новые
old|Oldest|Eng eski|Старые
sal|Highest salary|Yuqori maosh|Высокая зарплата
pop|Most popular|Mashhur|Популярные
reset|Reset|Tozalash|Сбросить
show|Show results|Natijalarni ko‘rsatish|Показать
found|jobs found|ta vakansiya|вакансий найдено
featured|Featured jobs|Tanlangan vakansiyalar|Рекомендуемые вакансии
popJobs|Popular jobs|Mashhur vakansiyalar|Популярные вакансии
rec|Recommended for you|Siz uchun tavsiya|Рекомендовано вам
topComp|Top companies|Top kompaniyalar|Топ компании
cats|Browse by category|Kategoriyalar bo‘yicha|По категориям
apply|Apply|Ariza topshirish|Откликнуться
save|Save|Saqlash|Сохранить
applied|Applied|Topshirilgan|Отправлено
details|Details|Batafsil|Подробнее
noRes|Nothing found. Try other filters.|Hech narsa topilmadi.|Ничего не найдено.
more|Load more|Yana yuklash|Показать ещё
today|Today|Bugun|Сегодня
dago|days ago|kun oldin|дн. назад
emp|employees|xodim|сотрудников
since|since|yildan|с
openJobs|Open vacancies|Ochiq vakansiyalar|Открытые вакансии
reviews|Reviews|Sharhlar|Отзывы
writeRev|Write a review|Sharh yozing|Написать отзыв
send|Send|Yuborish|Отправить
revDone|Review added|Sharh qo‘shildi|Отзыв добавлен
cv|CV / Resume (PDF, DOC)|CV / Rezyume (PDF, DOC)|Резюме (PDF, DOC)
cover|Cover letter|Qo‘shimcha xat|Сопроводительное письмо
phone|Phone|Telefon|Телефон
submit|Submit application|Ariza yuborish|Отправить отклик
doneApp|Application sent!|Ariza yuborildi!|Отклик отправлен!
needCv|Please attach your CV|CV faylni biriktiring|Прикрепите резюме
already|You already applied|Siz allaqachon topshirgansiz|Вы уже откликнулись
st0|Sent|Yuborildi|Отправлен
st1|Viewed|Ko‘rildi|Просмотрен
st2|Interview|Intervyu|Собеседование
st3|Offer|Taklif|Оффер
noApps|No applications yet|Hali arizalar yo‘q|Откликов пока нет
noSaved|No saved jobs yet. Tap the heart!|Saqlangan vakansiyalar yo‘q|Нет избранных вакансий
withdraw|Withdraw|Bekor qilish|Отозвать
loginFirst|Please sign in first|Avval tizimga kiring|Сначала войдите
errEmail|Enter a valid email|Email noto‘g‘ri|Неверная почта
errPass|Password must be 6+ characters|Parol kamida 6 belgi|Пароль минимум 6 символов
errName|Enter your name|Ismingizni kiriting|Введите имя
errCred|Wrong email or password|Email yoki parol xato|Неверная почта или пароль
errExists|Account already exists|Bunday akkaunt mavjud|Аккаунт уже существует
errMatch|Passwords do not match|Parollar mos emas|Пароли не совпадают
title|Job title|Lavozim|Должность
summary|About me|Men haqimda|Обо мне
skills|Skills (comma separated)|Ko‘nikmalar (vergul bilan)|Навыки (через запятую)
education|Education (one per line)|Ta’lim (har qatorda bittadan)|Образование (по строке)
experience|Experience (one per line)|Tajriba (har qatorda bittadan)|Опыт (по строке)
languages|Languages (comma separated)|Tillar (vergul bilan)|Языки (через запятую)
saveProf|Save profile|Profilni saqlash|Сохранить профиль
profSaved|Profile saved|Profil saqlandi|Профиль сохранён
buildCv|CV Builder|CV yaratish|Конструктор резюме
print|Print / Save PDF|Chop etish / PDF|Печать / PDF
template|Template|Shablon|Шаблон
modern|Modern|Zamonaviy|Современный
classic|Classic|Klassik|Классический
accent|Accent color|Asosiy rang|Цвет акцента
editProf|Edit profile|Profilni tahrirlash|Редактировать профиль
complete|Profile completeness|Profil to‘liqligi|Заполненность профиля
statApps|Applications|Arizalar|Отклики
statSaved|Saved|Saqlangan|Избранное
statInt|Interviews|Intervyular|Собеседования
notif|Notifications|Bildirishnomalar|Уведомления
markRead|Mark all read|Hammasini o‘qilgan deb belgilash|Прочитать все
noNotif|No notifications|Bildirishnoma yo‘q|Нет уведомлений
testT|Career Compatibility Test|Karyera mosligi testi|Тест профессиональной совместимости
testS|Rate 16 random statements. Every test is different.|16 ta tasodifiy fikrni baholang. Har safar yangi test.|Оцените 16 случайных утверждений. Каждый тест новый.
start|Start test|Testni boshlash|Начать тест
retake|Retake test|Qayta topshirish|Пройти заново
question|Question|Savol|Вопрос
of|of|/|из
rate|How much would you enjoy this?|Bu sizga qanchalik yoqadi?|Насколько вам это нравится?
love|Love it|Juda yoqadi|Обожаю
like|Like it|Yoqadi|Нравится
neutral|Neutral|Farqi yo‘q|Нейтрально
dislike|Dislike|Yoqmaydi|Не нравится
best|Best career match|Eng mos kasb|Лучшая профессия
yourRes|Your compatibility|Sizning moslik darajangiz|Ваша совместимость
recJobs|Jobs for your result|Natijangizga mos vakansiyalar|Вакансии по результату
welcome|Welcome to JobFinder!|JobFinder’ga xush kelibsiz!|Добро пожаловать в JobFinder!
desc|{c} is hiring a {t}. Join a friendly team, work on meaningful projects and grow every month. Key skills: {s}.|{c} {t} qidirmoqda. Do‘stona jamoa, qiziqarli loyihalar va rivojlanish imkoniyati. Asosiy ko‘nikmalar: {s}.|{c} ищет {t}. Дружная команда, интересные проекты и рост каждый месяц. Ключевые навыки: {s}.
cat_it|IT & Software|IT va dasturlash|IT и разработка
cat_design|Design|Dizayn|Дизайн
cat_marketing|Marketing|Marketing|Маркетинг
cat_finance|Finance|Moliya|Финансы
cat_sales|Sales|Sotuv|Продажи
cat_education|Education|Ta’lim|Образование
cat_health|Healthcare|Sog‘liqni saqlash|Медицина
cat_engineering|Engineering|Muhandislik|Инженерия
ty_full|Full-time|To‘liq stavka|Полная занятость
ty_part|Part-time|Yarim stavka|Частичная
ty_contract|Contract|Shartnoma|Контракт
ty_intern|Internship|Stajirovka|Стажировка
ex_0|No experience|Tajribasiz|Без опыта
ex_1|1–3 years|1–3 yil|1–3 года
ex_2|3–5 years|3–5 yil|3–5 лет
ex_3|5+ years|5+ yil|5+ лет
wk_remote|Remote|Masofaviy|Удалённо
wk_onsite|On-site|Ofisda|В офисе
wk_hybrid|Hybrid|Gibrid|Гибрид
jobsN|Jobs|Vakansiya|Вакансий
compN|Companies|Kompaniya|Компаний
catN|Categories|Kategoriya|Категорий`;
const T = { en: {}, uz: {}, ru: {} };
RAW.split('\n').forEach(l => { const a = l.split('|'); T.en[a[0]] = a[1]; T.uz[a[0]] = a[2]; T.ru[a[0]] = a[3]; });
let lang = LS.g('jf_lang', 'en'); if (!T[lang]) lang = 'en';
const t = k => (T[lang] && T[lang][k]) || T.en[k] || k;

/* ---------- Data ---------- */
const CATS = ['it', 'design', 'marketing', 'finance', 'sales', 'education', 'health', 'engineering'];
const CITIES = ['Tashkent', 'Samarkand', 'Bukhara', 'Andijan', 'Namangan', 'Fergana', 'Nukus'];
const TITLES = [['Frontend Developer', 'it', ['JavaScript', 'React', 'CSS']], ['Backend Developer', 'it', ['Node.js', 'SQL', 'API']], ['Data Analyst', 'it', ['SQL', 'Python', 'Excel']], ['QA Engineer', 'it', ['Testing', 'Selenium', 'Jira']],
['UI/UX Designer', 'design', ['Figma', 'Prototyping', 'Research']], ['Graphic Designer', 'design', ['Photoshop', 'Illustrator', 'Branding']], ['Digital Marketer', 'marketing', ['SEO', 'Ads', 'Analytics']], ['SMM Manager', 'marketing', ['Content', 'Instagram', 'Copywriting']],
['Accountant', 'finance', ['1C', 'Excel', 'Tax']], ['Financial Analyst', 'finance', ['Excel', 'Modeling', 'Reporting']], ['Sales Manager', 'sales', ['Negotiation', 'CRM', 'B2B']], ['Account Executive', 'sales', ['Pitching', 'CRM', 'English']],
['English Teacher', 'education', ['IELTS', 'Teaching', 'Communication']], ['Curriculum Designer', 'education', ['Pedagogy', 'Content', 'Planning']], ['Nurse', 'health', ['Care', 'Nursing', 'Empathy']], ['Pharmacist', 'health', ['Pharmacy', 'Consulting', 'Accuracy']],
['Civil Engineer', 'engineering', ['AutoCAD', 'Construction', 'Estimates']], ['Mechanical Engineer', 'engineering', ['SolidWorks', 'Maintenance', 'Design']]];
const COMP = [['Silk Road Tech', 'it', 'Tashkent'], ['Oltin Bank', 'finance', 'Tashkent'], ['Registan Digital', 'marketing', 'Samarkand'], ['Chorsu Retail', 'sales', 'Tashkent'], ['Amir Academy', 'education', 'Bukhara'],
['MedLife Clinic', 'health', 'Tashkent'], ['Turon Build', 'engineering', 'Namangan'], ['Pixel Orbit Studio', 'design', 'Tashkent'], ['Fergana Logistics', 'sales', 'Fergana'], ['Navoi Systems', 'it', 'Samarkand']]
    .map((c, i) => ({ id: i, name: c[0], cat: c[1], city: c[2], size: [50, 120, 300, 800][i % 4], founded: 2005 + i * 2 }));
const SEED_REV = [[5, 'Great team and friendly culture.'], [4, 'Good salary and fair management.'], [4, 'Lots of learning opportunities.'], [3, 'Busy periods but rewarding work.']];
const TYPES = ['full', 'part', 'contract'], WORK = ['remote', 'onsite', 'hybrid'];
const BASE = { it: 1200, design: 800, marketing: 700, finance: 900, sales: 700, education: 500, health: 600, engineering: 900 };
let seed = 7; const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
const JOBS = [];
for (let i = 0; i < 64; i++) {
    const tt = TITLES[i % TITLES.length]; let pool = COMP.filter(c => c.cat === tt[1]); if (!pool.length) pool = COMP;
    const c = pool[Math.floor(rnd() * pool.length)], exp = Math.floor(rnd() * 4);
    const min = Math.round(BASE[tt[1]] * (1 + exp * .45) * (.8 + rnd() * .5) / 50) * 50;
    JOBS.push({ id: i + 1, title: ['Junior ', '', 'Senior ', 'Lead '][exp] + tt[0], co: c.id, city: rnd() < .7 ? c.city : CITIES[Math.floor(rnd() * CITIES.length)], cat: tt[1], type: rnd() < .15 ? 'intern' : TYPES[Math.floor(rnd() * 3)], exp, work: WORK[Math.floor(rnd() * 3)], min, max: Math.round(min * 1.35 / 50) * 50, days: Math.floor(rnd() * 30), pop: Math.floor(50 + rnd() * 950), feat: i % 6 === 0, skills: tt[2] });
}
const QS = [['it', 'Writing code and building apps'], ['it', 'Fixing technical problems in computer systems'], ['it', 'Learning how data and algorithms work'], ['it', 'Setting up networks and servers'],
['design', 'Sketching layouts and visuals'], ['design', 'Choosing colors and typography'], ['design', 'Making products beautiful to use'], ['design', 'Editing photos or video'],
['marketing', 'Planning campaigns and brand stories'], ['marketing', 'Writing catchy social media posts'], ['marketing', 'Analyzing audience trends'], ['marketing', 'Organizing events and promotions'],
['finance', 'Working with budgets and numbers'], ['finance', 'Spotting errors in reports'], ['finance', 'Planning investments'], ['finance', 'Tracking costs precisely'],
['sales', 'Negotiating deals with clients'], ['sales', 'Meeting new people to pitch ideas'], ['sales', 'Hitting ambitious targets'], ['sales', 'Building long-term customer relationships'],
['education', 'Explaining ideas to others'], ['education', 'Mentoring someone step by step'], ['education', 'Creating learning materials'], ['education', 'Helping people grow their skills'],
['health', 'Caring for people’s wellbeing'], ['health', 'Staying calm in urgent situations'], ['health', 'Learning about the human body'], ['health', 'Supporting patients with empathy'],
['engineering', 'Designing machines or buildings'], ['engineering', 'Solving real-world physical problems'], ['engineering', 'Measuring and testing precisely'], ['engineering', 'Managing construction or production']];

/* ---------- State & storage helpers ---------- */
let F = { q: '', city: '', cat: '', type: '', exp: '', work: '', sal: 0, sort: 'new' }, shown = 12, view = 'home', TQ = null, lock = false;
const email = () => localStorage.getItem('jf_session') || sessionStorage.getItem('jf_session') || '';
const uk = k => 'jf_' + k + '_' + (email() || 'guest');
const users = () => LS.g('jf_users', []);
const prof = () => LS.g(uk('prof'), {});
const savedIds = () => LS.g(uk('saved'), []);
const apps = () => LS.g(uk('apps'), []);
const notifs = () => LS.g(uk('notif'), []);
const co = j => COMP[j.co];
const money = n => '$' + n.toLocaleString('en-US');
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[a[i], a[j]] = [a[j], a[i]]; } return a; };
const locale = () => lang === 'ru' ? 'ru-RU' : lang === 'uz' ? 'uz-UZ' : 'en-US';
const stars = r => { r = Math.round(r); return I('star', 'i s').repeat(r) + I('star0', 'i s').repeat(5 - r); };
const ago = d => d === 0 ? t('today') : d + ' ' + t('dago');
function toast(m) { const e = $('#toast'); e.textContent = m; e.classList.add('on'); clearTimeout(toast.t); toast.t = setTimeout(() => e.classList.remove('on'), 2600); }
function notif(x) { if (!email()) return; const a = notifs(); a.unshift({ id: Date.now() + Math.random(), x, t: Date.now(), r: 0 }); LS.s(uk('notif'), a.slice(0, 30)); badge(); }
function badge() { const n = notifs().filter(x => !x.r).length, b = $('#badge'); b.textContent = n; b.hidden = !n; }
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .08 });
const rev = () => $$('.reveal:not(.in)').forEach(e => io.observe(e));
const initials = n => n.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
const lcol = id => `hsl(${id * 47 % 360} 60% 45%)`;

/* ---------- Seed demo user ---------- */
if (!users().length) {
    LS.s('jf_users', [{ name: 'Demo User', email: 'demo@jobfinder.uz', pass: btoa('demo1234') }]);
    LS.s('jf_prof_demo@jobfinder.uz', { name: 'Demo User', title: 'Frontend Developer', phone: '+998 90 123 45 67', city: 'Tashkent', summary: 'Passionate web developer who loves building clean, fast interfaces.', skills: 'JavaScript, React, CSS, Figma', education: 'BSc Computer Science — TUIT, 2022', experience: 'Junior Web Developer — Silk Road Tech, 2022–2024', languages: 'English, Uzbek, Russian' });
}

/* ---------- Rendering: jobs ---------- */
function card(j) {
    const c = co(j), sv = savedIds().includes(j.id);
    return `<article class="card job reveal"><div class="ch"><div class="logo" style="background:${lcol(c.id)}">${initials(c.name)}</div><div><h3 data-open="${j.id}">${esc(j.title)}</h3><a class="co" data-co="${c.id}">${esc(c.name)}</a></div><button class="heart ${sv ? 'on' : ''}" data-save="${j.id}" aria-label="save">${I('heart', 'i h0')}${I('hearton', 'i h1')}</button></div>
<div class="tags"><span>${I('pin')} ${j.city}</span><span>${t('ty_' + j.type)}</span><span>${t('wk_' + j.work)}</span><span>${t('ex_' + j.exp)}</span></div>
<div class="sal">${money(j.min)} – ${money(j.max)}</div><div class="foot"><small>${ago(j.days)}</small><button class="btn sm" data-open="${j.id}">${t('details')}</button></div></article>`;
}
function grid(sel, list, emptyKey) { $(sel).innerHTML = list.length ? list.map(card).join('') : `<div class="empty">${t(emptyKey || 'noRes')}</div>`; rev(); }
function filtered() {
    const q = F.q.trim().toLowerCase();
    const l = JOBS.filter(j => {
        if (q && ![j.title, co(j).name, j.city, j.skills.join(' '), t('cat_' + j.cat), j.cat].join(' ').toLowerCase().includes(q)) return false;
        if (F.city && j.city !== F.city) return false; if (F.cat && j.cat !== F.cat) return false; if (F.type && j.type !== F.type) return false;
        if (F.exp !== '' && j.exp !== +F.exp) return false; if (F.work && j.work !== F.work) return false; if (F.sal && j.max < F.sal) return false; return true;
    });
    const s = { new: (a, b) => a.days - b.days, old: (a, b) => b.days - a.days, sal: (a, b) => b.max - a.max, pop: (a, b) => b.pop - a.pop }[F.sort];
    return l.sort(s);
}
function rJobs() { const l = filtered(); $('#count').textContent = l.length + ' ' + t('found'); grid('#gJobs', l.slice(0, shown)); $('#more').hidden = shown >= l.length; }
function recs(n) {
    const p = prof(), sk = (p.skills || '').toLowerCase().split(',').map(s => s.trim()).filter(Boolean), ti = (p.title || '').toLowerCase(), tr = LS.g(uk('test'), null);
    return JOBS.map(j => {
        let s = 0; j.skills.forEach(k => { if (sk.includes(k.toLowerCase())) s += 3; });
        if (ti && j.title.toLowerCase().split(' ').some(w => w.length > 3 && ti.includes(w))) s += 4;
        if (tr && j.cat === tr.best) s += 3; if (p.city && p.city === j.city) s += 1; return { j, s: s + j.pop / 1000 };
    }).sort((a, b) => b.s - a.s).slice(0, n).map(x => x.j);
}
function ratingOf(c) { const r = revs(c); return r.reduce((a, x) => a + x[0], 0) / r.length; }
function revs(c) { return SEED_REV.slice(c.id % 3, c.id % 3 + 2).concat(LS.g('jf_rev', {})[c.id] || []); }
function compCard(c) {
    const n = JOBS.filter(j => j.co === c.id).length;
    return `<article class="card reveal"><div class="ch"><div class="logo" style="background:${lcol(c.id)}">${initials(c.name)}</div><div><h3 data-co="${c.id}">${esc(c.name)}</h3><span class="co">${t('cat_' + c.cat)} · ${c.city}</span></div></div>
<div class="tags"><span class="star">${stars(ratingOf(c))}</span><span>${ratingOf(c).toFixed(1)}</span><span>${n} ${t('jobsN')}</span></div><button class="btn ghost sm" data-co="${c.id}">${t('details')}</button></article>`;
}
function rHome() {
    $('#hstats').innerHTML = `<div><b>${JOBS.length}</b>${t('jobsN')}</div><div><b>${COMP.length}</b>${t('compN')}</div><div><b>${CATS.length}</b>${t('catN')}</div>`;
    $('#chips').innerHTML = CATS.map(c => `<button data-cat="${c}">${t('cat_' + c)}</button>`).join('');
    grid('#gFeat', JOBS.filter(j => j.feat).slice(0, 6)); grid('#gPop', JOBS.slice().sort((a, b) => b.pop - a.pop).slice(0, 6)); grid('#gRec', recs(6));
    $('#gTop').innerHTML = COMP.slice(0, 6).map(compCard).join(''); rev();
}
function rComp() { $('#gComp').innerHTML = COMP.map(compCard).join(''); rev(); }
function rSaved() { grid('#gSaved', JOBS.filter(j => savedIds().includes(j.id)), 'noSaved'); }
function rApps() {
    const a = apps(); $('#listApps').innerHTML = a.length ? a.map(x => {
        const j = JOBS.find(j => j.id === x.job);
        return `<div class="app reveal"><div class="li" style="border:0"><div><b data-open="${j.id}" style="cursor:pointer">${esc(j.title)}</b><br><span class="co">${esc(co(j).name)} · ${new Date(x.t).toLocaleDateString(locale())} · ${I('clip')} ${esc(x.cv)}</span></div><button data-wd="${x.id}">${t('withdraw')}</button></div>
<div class="steps">${[0, 1, 2, 3].map(i => `<span class="${i <= x.st ? 'd' : ''}">${t('st' + i)}</span>`).join('')}</div></div>`;
    }).join('') : `<div class="empty">${t('noApps')}</div>`; rev();
}
function tick() {
    if (!email()) return; const a = apps(); let ch = false;
    a.forEach(x => { const s = Math.min(3, Math.floor((Date.now() - x.t) / 20000)); if (s > x.st) { x.st = s; ch = true; notif(JOBS.find(j => j.id === x.job).title + ' — ' + t('st' + s)); } });
    if (ch) { LS.s(uk('apps'), a); if (view === 'apps') rApps(); }
}

/* ---------- Modals ---------- */
function openM(h) { $('#mBody').innerHTML = h; $('#modal').classList.add('open'); document.body.classList.add('lock'); $('.box').scrollTop = 0; }
function closeM() { $('#modal').classList.remove('open'); document.body.classList.remove('lock'); }
function openJob(id) {
    const j = JOBS.find(x => x.id === id), c = co(j); j.pop++;
    const did = apps().some(a => a.job === id), sv = savedIds().includes(id);
    openM(`<div class="ch"><div class="logo" style="background:${lcol(c.id)}">${initials(c.name)}</div><div><h2 style="margin:0">${esc(j.title)}</h2><a class="co" data-co="${c.id}">${esc(c.name)}</a></div></div>
<div class="tags"><span>${I('pin')} ${j.city}</span><span>${t('ty_' + j.type)}</span><span>${t('wk_' + j.work)}</span><span>${t('ex_' + j.exp)}</span><span>${t('cat_' + j.cat)}</span></div>
<div class="sal" style="font-size:1.3rem">${money(j.min)} – ${money(j.max)} / ${lang === 'ru' ? 'мес' : lang === 'uz' ? 'oy' : 'mo'}</div>
<p style="margin-top:12px">${esc(t('desc').replace('{c}', c.name).replace('{t}', j.title).replace('{s}', j.skills.join(', ')))}</p>
<h4>${t('skills').split(' (')[0]}</h4><div>${j.skills.map(s => `<span class="chip">${s}</span> `).join('')}</div>
<div class="acts"><button class="btn" data-apply="${id}" ${did ? 'disabled' : ''}>${did ? t('applied') : t('apply')}</button><button class="btn ghost ${sv ? 'on' : ''}" data-save="${id}">${I('heart', 'i h0')}${I('hearton', 'i h1')} ${t('save')}</button></div>`);
}
function openApply(id) {
    if (!email()) { closeM(); toast(t('loginFirst')); return go('auth'); }
    if (apps().some(a => a.job === id)) return toast(t('already'));
    const j = JOBS.find(x => x.id === id), p = prof();
    openM(`<h2 style="margin:0 0 4px">${t('apply')}</h2><p>${esc(j.title)} — ${esc(co(j).name)}</p>
<form id="aform" data-job="${id}" style="margin-top:14px"><label><span>${t('name')}</span><input id="aName" value="${esc(p.name || '')}" required></label>
<label><span>${t('email')}</span><input id="aEmail" type="email" value="${esc(email())}" required></label><label><span>${t('phone')}</span><input id="aPhone" value="${esc(p.phone || '')}"></label>
<label><span>${t('cv')}</span><input id="aCv" type="file" accept=".pdf,.doc,.docx"></label><label><span>${t('cover')}</span><textarea id="aCover" rows="4"></textarea></label>
<p class="err" id="aErr"></p><button class="btn full">${t('submit')}</button></form>`);
}
function openCo(id) {
    const c = COMP[id], r = revs(c), list = JOBS.filter(j => j.co === id);
    openM(`<div class="ch"><div class="logo" style="background:${lcol(c.id)}">${initials(c.name)}</div><div><h2 style="margin:0">${esc(c.name)}</h2><span class="star">${stars(ratingOf(c))}</span> ${ratingOf(c).toFixed(1)} (${r.length})</div></div>
<p style="margin-top:12px">${t('cat_' + c.cat)} · ${c.city} · ${c.size}+ ${t('emp')} · ${t('since')} ${c.founded}</p>
<h4>${t('openJobs')} (${list.length})</h4>${list.map(j => `<div class="li"><button data-open="${j.id}">${esc(j.title)}</button><span class="sal">${money(j.min)}+</span></div>`).join('')}
<h4>${t('reviews')}</h4>${r.map(x => `<div class="rv"><span class="star">${stars(x[0])}</span> ${esc(x[1])}${x[2] ? ' — <small>' + esc(x[2]) + '</small>' : ''}</div>`).join('')}
<h4>${t('writeRev')}</h4><form id="revForm" data-co="${id}"><select id="rvR">${[5, 4, 3, 2, 1].map(n => `<option value="${n}">${n} / 5</option>`).join('')}</select><br><br><textarea id="rvT" rows="2" required></textarea><br><br><button class="btn sm">${t('send')}</button></form>`);
}

/* ---------- Profile / CV ---------- */
const PF = { pName: 'name', pTitle: 'title', pPhone: 'phone', pCity: 'city', pSummary: 'summary', pSkills: 'skills', pEdu: 'education', pExp: 'experience', pLang: 'languages' };
function rProf() {
    const p = prof(); Object.keys(PF).forEach(id => $('#' + id).value = p[PF[id]] || '');
    const a = apps(); $('#pstats').innerHTML = `<div><b>${a.length}</b>${t('statApps')}</div><div><b>${savedIds().length}</b>${t('statSaved')}</div><div><b>${a.filter(x => x.st >= 2).length}</b>${t('statInt')}</div>`;
    const done = Object.values(PF).filter(k => (p[k] || '').trim()).length, pc = Math.round(done / 9 * 100);
    $('#pcBar').style.width = '0'; setTimeout(() => $('#pcBar').style.width = pc + '%', 60);
    const tr = LS.g(uk('test'), null);
    $('#testSum').innerHTML = `<p style="margin:8px 0"><b>${pc}%</b></p>` + (tr ? `<p>${I('brain')} ${t('best')}: <b>${t('cat_' + tr.best)}</b> (${tr.pct[tr.best]}%)</p>` : `<button class="btn ghost sm" data-v="test">${t('test')}</button>`);
    grid('#gProfRec', recs(6));
}
function cvHtml() {
    const p = prof(), c = LS.g(uk('cv'), { tpl: 'modern', color: '#4f46e5' });
    const L = s => (s || '').split('\n').map(x => x.trim()).filter(Boolean), C = s => (s || '').split(',').map(x => x.trim()).filter(Boolean);
    return `<div class="cv ${c.tpl}" style="--ac:${esc(c.color)}"><div class="cvh"><h1>${esc(p.name || '')}</h1><h3>${esc(p.title || '')}</h3><p>${esc(email())} · ${esc(p.phone || '')} · ${esc(p.city || '')}</p></div>
<h4>${t('summary')}</h4><p>${esc(p.summary || '')}</p><h4>${t('experience').split(' (')[0]}</h4><ul>${L(p.experience).map(x => `<li>${esc(x)}</li>`).join('')}</ul>
<h4>${t('education').split(' (')[0]}</h4><ul>${L(p.education).map(x => `<li>${esc(x)}</li>`).join('')}</ul><h4>${t('skills').split(' (')[0]}</h4><div>${C(p.skills).map(x => `<span class="chip">${esc(x)}</span>`).join('')}</div>
<h4>${t('languages').split(' (')[0]}</h4><p>${esc(C(p.languages).join(' · '))}</p></div>`;
}
function rCv() { const c = LS.g(uk('cv'), { tpl: 'modern', color: '#4f46e5' }); $('#cvTpl').value = c.tpl; $('#cvColor').value = c.color; $('#cvPrev').innerHTML = cvHtml(); }

/* ---------- Career test ---------- */
function rTest() {
    if (TQ) return showQ(); const r = LS.g(uk('test'), null); $('#gTest').innerHTML = '';
    if (r) return showRes(r);
    $('#testBox').innerHTML = `<div>${I('brain', 'big')}</div><h2>${t('testT')}</h2><p style="color:var(--mu);margin-bottom:18px">${t('testS')}</p><button class="btn" data-start="1">${t('start')}</button>`;
}
function startTest() { TQ = { ids: shuffle(QS.map((q, i) => i)).slice(0, 16), i: 0, ans: [], p: 0 }; lock = false; $('#gTest').innerHTML = ''; showQ(); }
function showQ() {
    const n = TQ.ids.length, q = QS[TQ.ids[TQ.i]], o = shuffle([[3, 'love'], [2, 'like'], [1, 'neutral'], [0, 'dislike']]);
    $('#testBox').innerHTML = `<div class="prog"><i id="tp" style="width:${TQ.p}%"></i></div><div class="qc">${t('question')} ${TQ.i + 1} ${t('of')} ${n}</div>
<div class="q"><h2>“${q[1]}”</h2><p style="color:var(--mu);margin-bottom:14px">${t('rate')}</p><div class="opts">${o.map(x => `<button class="opt" data-s="${x[0]}">${t(x[1])}</button>`).join('')}</div></div>`;
    TQ.p = TQ.i / n * 100; requestAnimationFrame(() => requestAnimationFrame(() => { const b = $('#tp'); if (b) b.style.width = TQ.p + '%'; }));
}
function answer(btn) {
    if (lock) return; lock = true; btn.classList.add('sel');
    setTimeout(() => {
        TQ.ans.push({ c: QS[TQ.ids[TQ.i]][0], s: +btn.dataset.s }); TQ.i++;
        const q = $('.q'); if (q) q.classList.add('out');
        setTimeout(() => { lock = false; if (TQ.i >= TQ.ids.length) finish(); else showQ(); }, 260);
    }, 420);
}
function finish() {
    const sc = {}, ct = {}; CATS.forEach(c => { sc[c] = 0; ct[c] = 0; }); TQ.ans.forEach(a => { sc[a.c] += a.s; ct[a.c]++; });
    const pct = {}; CATS.forEach(c => { if (ct[c]) pct[c] = Math.round(sc[c] / (ct[c] * 3) * 100); });
    const best = Object.keys(pct).sort((a, b) => pct[b] - pct[a])[0], r = { pct, best, d: Date.now() };
    LS.s(uk('test'), r); notif(t('best') + ': ' + t('cat_' + best)); TQ = null; showRes(r);
}
function showRes(r) {
    const keys = Object.keys(r.pct).sort((a, b) => r.pct[b] - r.pct[a]);
    $('#testBox').innerHTML = `<div>${I('trophy', 'big')}</div><p class="qc">${t('best')}</p><div class="best">${t('cat_' + r.best)} — ${r.pct[r.best]}%</div><h4 style="margin:14px 0 4px;text-align:left">${t('yourRes')}</h4>
${keys.map(k => `<div class="rbar"><span>${t('cat_' + k)} — ${r.pct[k]}%</span><div class="prog"><i data-w="${r.pct[k]}"></i></div></div>`).join('')}<button class="btn" data-start="1" style="margin-top:12px">${t('retake')}</button>`;
    setTimeout(() => $$('#testBox .prog i[data-w]').forEach(i => i.style.width = i.dataset.w + '%'), 80);
    $('#gTest').innerHTML = `<h2 style="grid-column:1/-1">${t('recJobs')}</h2>` + JOBS.filter(j => j.cat === r.best).sort((a, b) => b.pop - a.pop).slice(0, 6).map(card).join(''); rev();
}

/* ---------- Navigation & views ---------- */
function renderView() { ({ home: rHome, jobs: rJobs, companies: rComp, test: rTest, saved: rSaved, apps: rApps, profile: rProf, cv: rCv, auth: () => { } })[view](); }
function go(v) {
    if (['saved', 'apps', 'profile', 'cv'].includes(v) && !email()) { toast(t('loginFirst')); v = 'auth'; }
    view = v; $$('.view').forEach(s => s.classList.toggle('on', s.id === 'v-' + v));
    $$('#nav a').forEach(a => a.classList.toggle('act', a.dataset.v === v));
    $('#nav').classList.remove('open'); $('#filters').classList.remove('open'); $('#notifPanel').hidden = true; closeM();
    window.scrollTo({ top: 0, behavior: 'smooth' }); renderView(); history.replaceState(null, '', '#' + v);
}
function tab(x) { $('#fIn').hidden = x !== 'in'; $('#fUp').hidden = x !== 'up'; $$('.tabs button').forEach(b => b.classList.toggle('on', b.dataset.tab === x)); }
function updateHeader() {
    const on = !!email(), p = on ? prof() : {};
    $('#authBtns').hidden = on; $('#userBox').hidden = !on; $('#bellw').hidden = !on;
    if (on) { $('#avatar').innerHTML = I('user') + ' ' + esc((p.name || email()).split(' ')[0]); badge(); }
}
function options(el, items, all) { $(el).innerHTML = (all ? `<option value="">${t(all)}</option>` : '') + items.map(i => `<option value="${i[0]}">${i[1]}</option>`).join(''); }
function fillSelects() {
    const city = CITIES.map(c => [c, c]);
    options('#fCity', city, 'anyCity'); options('#hCity', city, 'anyCity'); options('#fCat', CATS.map(c => [c, t('cat_' + c)]), 'anyCat');
    options('#fType', ['full', 'part', 'contract', 'intern'].map(x => [x, t('ty_' + x)]), 'any'); options('#fExp', [0, 1, 2, 3].map(x => [x, t('ex_' + x)]), 'any');
    options('#fWork', WORK.map(x => [x, t('wk_' + x)]), 'any'); options('#fSal', [300, 600, 1000, 1500, 2500].map(x => [x, x + '+']), 'any');
    options('#fSort', [['new', t('new')], ['old', t('old')], ['sal', t('sal')], ['pop', t('pop')]]); syncCtl();
}
function syncCtl() {
    $('#q').value = F.q; $('#hq').value = F.q; $('#fCity').value = F.city; $('#hCity').value = F.city; $('#fCat').value = F.cat; $('#fType').value = F.type;
    $('#fExp').value = F.exp; $('#fWork').value = F.work; $('#fSal').value = F.sal || ''; $('#fSort').value = F.sort;
}
function applyLang() {
    document.documentElement.lang = lang; $$('#lang button').forEach(b => b.classList.toggle('on', b.dataset.lang === lang)); LS.s('jf_lang', lang);
    $$('[data-i]').forEach(e => e.textContent = t(e.dataset.i)); $$('[data-ph]').forEach(e => e.placeholder = t(e.dataset.ph));
    fillSelects(); updateHeader(); renderView();
}
function setTheme(m) { document.documentElement.dataset.theme = m; $('#themeImg').src = U(m === 'dark' ? 'sun' : 'moon'); LS.s('jf_theme', m); }
function toggleSave(id) {
    if (!email()) { toast(t('loginFirst')); return go('auth'); }
    let s = savedIds(); const on = !s.includes(id); s = on ? s.concat(id) : s.filter(x => x !== id); LS.s(uk('saved'), s);
    $$(`[data-save="${id}"]`).forEach(h => { h.classList.toggle('on', on); h.classList.remove('pop'); void h.offsetWidth; h.classList.add('pop'); });
    if (view === 'saved') setTimeout(rSaved, 400);
}
function login(mail, remember) {
    localStorage.removeItem('jf_session'); sessionStorage.removeItem('jf_session');
    (remember ? localStorage : sessionStorage).setItem('jf_session', mail); updateHeader(); go('profile');
}

/* ---------- Events ---------- */
document.addEventListener('click', e => {
    const x = e.target.closest('[data-v],[data-open],[data-save],[data-co],[data-apply],[data-auth],[data-eye],[data-tab],[data-cat],[data-wd],[data-start],.opt'); if (!x) return; const d = x.dataset;
    if (x.classList.contains('opt')) return answer(x);
    if (d.eye) { const i = $('#' + d.eye); i.type = i.type === 'password' ? 'text' : 'password'; x.firstElementChild.src = U(i.type === 'password' ? 'eye' : 'eyeoff'); return; }
    if (d.tab) return tab(d.tab);
    if (d.auth) { go('auth'); return tab(d.auth); }
    if (d.v) return go(d.v);
    if (d.cat) { F = { q: '', city: '', cat: d.cat, type: '', exp: '', work: '', sal: 0, sort: F.sort }; shown = 12; syncCtl(); return go('jobs'); }
    if (d.save) return toggleSave(+d.save);
    if (d.open) return openJob(+d.open);
    if (d.co) return openCo(+d.co);
    if (d.apply) return openApply(+d.apply);
    if (d.start) return startTest();
    if (d.wd) { LS.s(uk('apps'), apps().filter(a => a.id !== +d.wd)); return rApps(); }
});
document.addEventListener('submit', e => {
    e.preventDefault(); const f = e.target;
    if (f.id === 'hform') { F.q = $('#hq').value; F.city = $('#hCity').value; shown = 12; syncCtl(); go('jobs'); }
    else if (f.id === 'fIn') {
        const m = $('#inEmail').value.trim().toLowerCase(), u = users().find(x => x.email === m && x.pass === btoa($('#inPass').value));
        if (!u) { $('#inErr').textContent = t('errCred'); return; } $('#inErr').textContent = ''; login(m, $('#inRem').checked);
    } else if (f.id === 'fUp') {
        const n = $('#upName').value.trim(), m = $('#upEmail').value.trim().toLowerCase(), p = $('#upPass').value, er = $('#upErr');
        if (n.length < 2) er.textContent = t('errName'); else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(m)) er.textContent = t('errEmail');
        else if (p.length < 6) er.textContent = t('errPass'); else if (p !== $('#upPass2').value) er.textContent = t('errMatch');
        else if (users().some(u => u.email === m)) er.textContent = t('errExists');
        else {
            er.textContent = ''; LS.s('jf_users', users().concat({ name: n, email: m, pass: btoa(p) })); LS.s('jf_prof_' + m, { name: n });
            login(m, true); notif(t('welcome'));
        }
    } else if (f.id === 'profForm') {
        const p = {}; Object.keys(PF).forEach(id => p[PF[id]] = $('#' + id).value.trim()); LS.s(uk('prof'), p); updateHeader(); toast(t('profSaved')); rProf();
    } else if (f.id === 'aform') {
        const file = $('#aCv').files[0]; if (!file) { $('#aErr').textContent = t('needCv'); return; }
        const id = +f.dataset.job, j = JOBS.find(x => x.id === id), a = apps();
        a.unshift({ id: Date.now(), job: id, t: Date.now(), st: 0, cv: file.name, cover: $('#aCover').value }); LS.s(uk('apps'), a);
        notif(j.title + ' — ' + t('st0')); closeM(); toast(t('doneApp'));
    } else if (f.id === 'revForm') {
        if (!email()) { closeM(); toast(t('loginFirst')); return go('auth'); }
        const id = +f.dataset.co, all = LS.g('jf_rev', {}); (all[id] = all[id] || []).push([+$('#rvR').value, $('#rvT').value.trim(), prof().name || '']); LS.s('jf_rev', all);
        toast(t('revDone')); openCo(id); if (view === 'companies') rComp();
    }
});
const FM = { fCity: 'city', fCat: 'cat', fType: 'type', fExp: 'exp', fWork: 'work', fSal: 'sal', fSort: 'sort' };
Object.keys(FM).forEach(id => $('#' + id).addEventListener('change', e => { F[FM[id]] = FM[id] === 'sal' ? +e.target.value : e.target.value; shown = 12; rJobs(); }));
$('#q').addEventListener('input', e => { F.q = e.target.value; shown = 12; rJobs(); });
$('#more').addEventListener('click', () => { shown += 12; rJobs(); });
$('#fReset').addEventListener('click', () => { F = { q: '', city: '', cat: '', type: '', exp: '', work: '', sal: 0, sort: 'new' }; shown = 12; syncCtl(); rJobs(); });
$('#fToggle').addEventListener('click', () => $('#filters').classList.add('open'));
$('#fClose').addEventListener('click', () => $('#filters').classList.remove('open'));
$('#fApply').addEventListener('click', () => $('#filters').classList.remove('open'));
$('#mSearch').addEventListener('click', () => { go('jobs'); setTimeout(() => $('#q').focus(), 300); });
$('#burger').addEventListener('click', () => $('#nav').classList.toggle('open'));
$('#lang').addEventListener('click', e => { const b = e.target.closest('[data-lang]'); if (!b) return; lang = b.dataset.lang; applyLang(); });
$('#theme').addEventListener('click', () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));
$('#logout').addEventListener('click', () => { localStorage.removeItem('jf_session'); sessionStorage.removeItem('jf_session'); updateHeader(); go('home'); });
$('#mClose').addEventListener('click', closeM);
$('#modal').addEventListener('click', e => { if (e.target.id === 'modal') closeM(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeM(); });
$('#printCv').addEventListener('click', () => window.print());
const saveCv = () => { LS.s(uk('cv'), { tpl: $('#cvTpl').value, color: $('#cvColor').value }); $('#cvPrev').innerHTML = cvHtml(); };
$('#cvTpl').addEventListener('change', saveCv); $('#cvColor').addEventListener('input', saveCv);
$('#bell').addEventListener('click', () => {
    const p = $('#notifPanel'); p.hidden = !p.hidden; if (p.hidden) return;
    const n = notifs();
    p.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center;padding:4px 8px"><b>${t('notif')}</b><button class="btn ghost sm" id="readAll">${t('markRead')}</button></div>` +
        (n.length ? n.map(x => `<div class="n ${x.r ? '' : 'un'}">${esc(x.x)}<small>${new Date(x.t).toLocaleString(locale())}</small></div>`).join('') : `<div class="n">${t('noNotif')}</div>`);
    $('#readAll').onclick = () => { LS.s(uk('notif'), notifs().map(x => (x.r = 1, x))); badge(); $('#notifPanel').hidden = true; };
});
document.addEventListener('click', e => { if (!e.target.closest('#bellw')) $('#notifPanel').hidden = true; });

/* ---------- Init ---------- */
$$('img[data-ic]').forEach(i => i.src = U(i.dataset.ic));
setTheme(LS.g('jf_theme', window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
tab('in'); applyLang();
{ const h = location.hash.slice(1); if (['home', 'jobs', 'companies', 'test', 'saved', 'apps', 'profile', 'cv', 'auth'].includes(h)) go(h); else go('home'); }
tick(); setInterval(tick, 5000);
window.addEventListener('load', () => setTimeout(() => $('#loader').classList.add('off'), 600));

/* ---------- Hero video ---------- */
{
    const v = $('#hv'), h = $('.hero');
    if (v && h) {
        const ok = () => { v.classList.add('ok'); h.classList.add('vid'); };
        v.addEventListener('loadeddata', ok); if (v.readyState >= 2) ok();
        if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) v.pause();
        else { const p = v.play(); if (p && p.catch) p.catch(() => { }); }
    }
}
