// ===== data.js — 默认状态、工具函数 =====
const STORAGE_KEY = 'xiuxian_tavern';
const MAX_MSGS = 500;

const NARRATIVES = ['你走在街上，阳光正好。','手机震了一下，有人发来消息。','窗外传来汽车鸣笛声。','路边的便利店灯火通明。','打开冰箱，剩菜还够吃一顿。','天气预报说今晚有雨。','电梯里遇到邻居点头致意。','咖啡店的店员换了新发型。','地铁站里人来人往。','手机电量只剩15%。','楼下的快递驿站又堆满了包裹。','闻到楼下飘来的饭菜香。','朋友圈刷到一条有趣的内容。','阳台上的绿植该浇水了。','深夜加班，办公室只剩下你一个人。'];

function defaultState() {
  return {
    protagonist: { name:'你', gender:'男', bio:'', status:'', attr:0, len:15, occupation:'', dev:0, appearance:'', height:175, weight:65 },
    timeLocation: { time:'2026年', location:'天心区·御宅小区', detail:'' },
    companions: [{ name:'王铁', gender:'男', bio:'', status:'日常', attr:1, len:16, occupation:'凌云国企总助', dev:10, appearance:'', height:180, weight:80 },{ name:'阿龙', gender:'男', bio:'街头混迹多年，讲义气', status:'在线', attr:1, len:20, occupation:'健身教练', dev:5, appearance:'肌肉结实·板寸头', height:185, weight:85 }] };
}
function defaultConfig() { return { apiBase:'', apiBase2:'', apiModel:'', apiModel2:'', apiKey:'', apiKey2:'', simMode:true, sidebarFold:{}, lastRaw:'', temperature:0.7, topP:0.5, penalty:1.0, contextRounds:10, summaryLimit:50, theme:'dark', shownGuide:false, bioLocked:{}, autoSummarize:false, autoSumEvery:50, autoSumRounds:10 }; }

function defaultWorldBook() { return [
  { title:'一、回复规范与角色', content:'1.1 回复由两部分组成：先输出剧情正文（自然语言推进故事），紧接正文末尾换行后输出三个反引号+status包裹的JSON代码块。若只输出剧情而无status代码块，回复视为不完整。\n\n代码块格式示例：\n```status\n{\n  "protagonist": {\n    "name": "你",\n    "gender": "男",\n    "occupation": "程序员",\n    "dev": 35,\n    "appearance": "黑框眼镜·短发",\n    "height": 175,\n    "weight": 65,\n    "attr": 0.5,\n    "len": 18,\n    "bio": "某互联网公司码农",\n    "status": "加班中"\n  },\n  "companions": [\n    {\n      "name": "张三",\n      "gender": "男",\n      "occupation": "外卖骑手",\n      "dev": 20,\n      "appearance": "晒黑的皮肤",\n      "height": 170,\n      "weight": 70,\n      "attr": 0.3,\n      "len": 12,\n      "bio": "你的室友",\n      "status": "出门跑单"\n    }\n  ],\n\n  "messages": [\n    {"from":"张三","content":"兄弟，今晚一起吃饭吗？我发了工资。"}\n  ],\n  \"timeLocation": {\n    "time": "2026年7月",\n    "location": "天心区·御宅小区",\n    "detail": "3栋402"\n  },\n  "roundSummary": "你下班回到家，发现室友张三正在准备出门跑外卖……"\n}\n```\n\n1.2 每个角色对象的字段说明：\n- name（姓名）：字符串，可任意改名\n- gender（性别）：男/女\n- occupation（职业）：字符串，自由填写\n- dev（开发度）：数字 0~100，整数\n- appearance（外貌）：字符串，外形描述\n- height（身高）：数字，单位cm\n- weight（体重）：数字，单位kg\n- attr（属性）：数字 0/0.5/1，三档可选\n- len（长度）：数字 3~25，单位cm\n- bio（生平）：字符串，角色背景故事\n- status（状态）：字符串，当前状态\n\n1.3 回合摘要生成规则：\n- roundSummary 字段必须存在，不超120字\n- 极简概括本轮剧情关键进展，不可省略\n- 若AI认为没有进展性事件，也要写"平淡的一天"等效描述\n\n1.4 角色管理规则：\n- 所有角色（NPC/路人/敌人/同伴）均放入companions数组\n- 新出现的角色自动加入companions，不可放入其他数组\n- 角色不可删除，只能编辑修改\n\n1.5 属性(attr)修改规则：AI可在剧情中根据角色成长合理调整attr值（0/0.5/1三档），但剧情中须有对应事件支撑（如突破、领悟、训练等），不可凭空改变。\n\n1.6 开发度(dev)修改规则：剧情推进或解决冲突后，AI可自行增加dev值（0~100），增加幅度根据事件重要性AI自行判断（1%~15%不等），但不可超过100。\n\n1.7 手机来信(messages)规则：\n- status代码块中必须包含messages字段（可为空数组[]）\n- 格式：[{"from":"发送者姓名","content":"消息内容"}]\n- AI根据当前对话上下文、开发度、角色生平等判断是否有角色主动发来新消息\n- 每条content不超过200字，from不可为主角名\n- UI会列出所有同伴角色的来信状态：有消息显示内容预览（展开可看全文），无消息显示"暂无"\n- 消息清除规则：主角与对应角色发生了真实互动（对话/见面/事件）后，该角色的历史消息被清除，等待AI在后续回复中发送新消息\n- 单纯的"真灵之眼观察"等被动查看行为不算互动，不消除消息\n- 无人来信时返回空数组[]' },
  { title:'二、故事文风', content:'2.1测试专用' },
  { title:'三、地点参考', content:'3.1测试专用' }
]; }

function esc(s) { return (typeof s !== 'string' ? '' : s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')); }
let toastTimer;
function showToast(m) {
  const e = document.getElementById('toast') || (function() { const d = document.createElement('div'); d.id = 'toast'; d.className = 'fixed bottom-4 left-1/2 -translate-x-1/2 z-[999] px-5 py-2.5 rounded-xl bg-[rgba(25,28,60,.94)] border border-[rgba(100,90,180,.16)] text-sm text-[#c0c0e0] tracking-wider opacity-0 transition-all duration-400 pointer-events-none backdrop-blur'; document.body.appendChild(d); return d; })();
  e.textContent = m; e.classList.add('opacity-100'); clearTimeout(toastTimer); toastTimer = setTimeout(() => e.classList.remove('opacity-100'), 2200);
}
function bar(l, v, m, c) { const p = m > 0 ? Math.min(v / m * 100, 100) : 0; const g = c || 'from-[#4a7aff] to-[#58d6ff]'; const lb = l ? '<span class="text-[rgba(180,180,220,.3)] w-7 shrink-0 text-right">' + l + '</span>' : ''; return '<div class="flex items-center gap-1 text-xs">' + lb + '<div class="progress-outer overflow-hidden"><div class="progress-fill rounded-full bg-gradient-to-r ' + g + '" style="width:' + p + '%"></div></div><span class="text-[rgba(200,200,230,.35)] w-10 text-right shrink-0 text-[10px]">' + p.toFixed(0) + '%</span></div>'; }
function getExpStage(p) { return p < 10 ? '初入' : p < 40 ? '稳固' : p < 60 ? '小成' : p < 90 ? '大成' : p < 99 ? '圆满' : '巅峰'; }
function getHpStage(p) { return p < 10 ? '濒死' : p < 40 ? '重创' : p < 70 ? '轻伤' : p < 90 ? '无碍' : '充盈'; }
function getMpStage(p) { return p < 10 ? '枯竭' : p < 40 ? '亏空' : p < 70 ? '不足' : p < 90 ? '充沛' : '盈满'; }
function renderInvItem(i) { if (typeof i === 'string') return esc(i); return esc(i.name || '?') + '×' + (i.count || 1); }

function cleanNarrative(text) {
  if (!text) return '';
  let r = text.replace(/```[\s\S]*?```/g, '').replace(/```[\s\S]*$/g, '');
  const sepIdx = r.search(/---\s*\n?\s*status\s*\n?\s*\{/);
  if (sepIdx !== -1) r = r.substring(0, sepIdx);
  const dashIdx = r.lastIndexOf('---');
  if (dashIdx !== -1 && r.substring(dashIdx).includes('"protagonist"')) r = r.substring(0, dashIdx);
  const bareIdx = r.search(/\nstatus\s*\n?\s*\{/);
  if (bareIdx !== -1) r = r.substring(0, bareIdx);
  r = r.replace(/---\s*$/g, '').replace(/`{3,}/g, '').trim();
  return r;
}



function repairJSON(str) {
  let r = str.trim(), inS = false, esc = false, stk = [];
  for (let i = 0; i < r.length; i++) { const c = r[i]; if (esc) { esc = false; continue; } if (c === '\\') { esc = true; continue; } if (c === '"') { inS = !inS; continue; } if (inS) continue; if (c === '{' || c === '[') stk.push(c); if (c === '}' || c === ']') stk.pop(); }
  if (inS) r += '"'; r = r.replace(/[,\s]+$/, ''); if (/:\s*$/.test(r)) r += 'null';
  while (stk.length > 0) { const o = stk.pop(); r += (o === '{' ? '}' : ']'); }
  return r;
}

// ===== storage.js — localStorage 读写、数据迁移 =====
let data;

function loadAll() {
  try {
    const r = localStorage.getItem(STORAGE_KEY); if (!r) return null;
    const d = JSON.parse(r);
    if (!d.state) d.state = defaultState();
    if (!d.config) d.config = defaultConfig();
    if (!d.config.sidebarFold) d.config.sidebarFold = {};
    if (d.config.lastRaw === undefined) d.config.lastRaw = '';
    if (d.config.simMode === undefined) d.config.simMode = true;
    if (d.config.temperature === undefined) d.config.temperature = 0.7;
    if (d.config.topP === undefined) d.config.topP = 0.5;
    if (d.config.penalty === undefined) d.config.penalty = 1.0;
    if (d.config.contextRounds === undefined) d.config.contextRounds = 20;
    if (d.config.summaryLimit === undefined) d.config.summaryLimit = 200;
    if (d.config.theme === undefined) d.config.theme = 'dark';
    if (d.config.shownGuide === undefined) d.config.shownGuide = false;
    if (d.config.bioLocked === undefined) d.config.bioLocked = {};
    if (d.config.autoSummarize === undefined) d.config.autoSummarize = false;
    if (d.config.autoSumEvery === undefined) d.config.autoSumEvery = 50;
    if (d.config.autoSumRounds === undefined) d.config.autoSumRounds = 10;
    if (!d.chatHistory) d.chatHistory = d.messages || [];
    if (!d.summaries) d.summaries = [];
    if (!d.logs) d.logs = [];
    if (!d.state.protagonist.name) d.state.protagonist.name = '你';
    if (!d.state.protagonist.gender) d.state.protagonist.gender = '男';
    if (!d.state.timeLocation) d.state.timeLocation = defaultState().timeLocation;
    ['protagonist','companions'].forEach(k => {
      const arr = k === 'protagonist' ? [d.state.protagonist] : d.state[k];
      if (!Array.isArray(arr)) return;
      arr.forEach(c => {
        if (!c.gender) c.gender = '男';
        if (!c.status) c.status = '';
        if (!c.bio) c.bio = '';
        if (c.attr === undefined) c.attr = 0;
        if (c.len === undefined) c.len = 15;
        if (c.occupation === undefined) c.occupation = '';
        if (c.dev === undefined) c.dev = 0;
        if (c.appearance === undefined) c.appearance = '';
        if (c.height === undefined) c.height = 175;
        if (c.weight === undefined) c.weight = 65;
      });
    });
    const wt = d.state.companions.find(c => c.name === '王铁');
    if (!wt) d.state.companions.unshift({ name:'王铁', gender:'男', bio:'', status:'日常', attr:1, len:16, occupation:'凌云国企总助', dev:10, appearance:'', height:180, weight:80 });
    else {
      if (!wt.gender) wt.gender = '男';
      if (!wt.status) wt.status = '日常';
      if (wt.attr === undefined) wt.attr = 1;
      if (wt.len === undefined) wt.len = 16;
      if (wt.occupation === undefined) wt.occupation = '铁匠';
      if (wt.dev === undefined) wt.dev = 10;
      if (wt.height === undefined) wt.height = 180;
      if (wt.weight === undefined) wt.weight = 80;
    }
    return d;
  } catch (_) { return null; }
}

data = loadAll();
if (!data) { data = { state:defaultState(), config:defaultConfig(), chatHistory:[], summaries:[], logs:[], worldBook:defaultWorldBook() }; saveAll(); }
else { if (!Array.isArray(data.worldBook)) data.worldBook = []; delete data.state.tempCharacters; [data.state.protagonist, ...(data.state.companions||[])].forEach(c => { if (c) { const keep = ['name','gender','occupation','dev','appearance','height','weight','attr','len','bio','status','tag']; Object.keys(c).forEach(k => { if (!keep.includes(k)) delete c[k]; }); if (c.attr === undefined) c.attr = 0; if (c.len === undefined) c.len = 15; if (c.occupation === undefined) c.occupation = ''; if (c.dev === undefined) c.dev = 0; if (c.appearance === undefined) c.appearance = ''; if (c.height === undefined) c.height = 175; if (c.weight === undefined) c.weight = 65; } }); }

function saveAll() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (_) {} }
function getState() { return data.state; }
function getConfig() { return data.config; }