// ===== ui.js — DOM引用、UI渲染函数、弹窗控制 =====
const $ = id => document.getElementById(id);
const chatArea = $('chatArea'), inputBox = $('inputBox'), sendBtn = $('sendBtn');
const menuBtn = $('menuBtn'), sidebar = $('sidebar'), sidebarOverlay = $('sidebarOverlay'), closeSidebar = $('closeSidebar');
const sidebarModules = $('sidebarModules'), delModeBtn = $('delModeBtn'), addCharSidebarBtn = $('addCharSidebarBtn');
const tlDisplay = $('tlDisplay'), extraToggleBtn = $('extraToggleBtn'), extraPanel = $('extraPanel');
const settingsBtn = $('settingsBtn'), settingsOverlay = $('settingsOverlay'), settingsModal = $('settingsModal'), closeSettings = $('closeSettings');
const apiBase = $('apiBase'), apiBase2 = $('apiBase2'), apiModel = $('apiModel'), apiModel2 = $('apiModel2'), apiKey = $('apiKey'), apiKey2 = $('apiKey2'), simMode = $('simMode');
const testMainApiBtn = $('testMainApiBtn'), testBackupApiBtn = $('testBackupApiBtn'), mainApiStatus = $('mainApiStatus'), backupApiStatus = $('backupApiStatus');
const cleanupBtn = $('cleanupBtn'), resetDataBtn = $('resetDataBtn'), rawToggle = $('rawToggle'), rawArea = $('rawArea'), rawContent = $('rawContent'), rawArrow = $('rawArrow');
const summaryBtn = $('summaryBtn'), summaryOverlay = $('summaryOverlay'), summaryModal = $('summaryModal'), summaryList = $('summaryList'), closeSummary = $('closeSummary');
const summaryDelModeBtn = $('summaryDelModeBtn'), summaryDelTools = $('summaryDelTools'), summarySelectAll = $('summarySelectAll'), summaryDeleteSelected = $('summaryDeleteSelected');
const summarizeBtn = $('summarizeBtn');
const summaryPromptBtn = $('summaryPromptBtn'), summaryPromptArea = $('summaryPromptArea'), summaryPromptContent = $('summaryPromptContent');
const autoSummarizeToggle = $('autoSummarizeToggle'), autoSumEvery = $('autoSumEvery'), autoSumRounds = $('autoSumRounds');
const logBtn = $('logBtn'), logOverlay = $('logOverlay'), logModal = $('logModal'), logList = $('logList'), closeLog = $('closeLog'), clearLogBtn = $('clearLogBtn');
const charEditOverlay = $('charEditOverlay'), charEditModal = $('charEditModal'), closeCharEdit = $('closeCharEdit');
const charTypeSelect = $('charTypeSelect'), charNameInput = $('charNameInput'), charRealmSelect = $('charRealmSelect');
const charArtifactList = $('charArtifactList'), charSkillList = $('charSkillList'), charStoneInput = $('charStoneInput'), charInvInput = $('charInvInput'), charFormationList = $('charFormationList');
const saveCharBtn = $('saveCharBtn');
const charGender = $('charGender');
const charStatusField = $('charStatusField');
const charEditIdx = $('charEditIdx'), charEditSrc = $('charEditSrc'), charTypeRow = $('charTypeRow'), charStatusRow = $('charStatusRow');
const charTimeRow = $('charTimeRow'), charTimeTime = $('charTimeTime'), charTimeLoc = $('charTimeLoc'), charTimeDetail = $('charTimeDetail'), charBio = $('charBio'), charBioLock = $('charBioLock');
const charAttrInput = $('charAttrInput'), charLenInput = $('charLenInput'), charDevInput = $('charDevInput'), charOccupation = $('charOccupation'), charAppearance = $('charAppearance'), charHeight = $('charHeight'), charWeight = $('charWeight');
const exportImportBtn = $('exportImportBtn'), exportImportOverlay = $('exportImportOverlay'), exportImportModal = $('exportImportModal'), closeExportImport = $('closeExportImport');
const doExportBtn = $('doExportBtn'), doImportBtn = $('doImportBtn'), importFileInput = $('importFileInput');
const confirmOverlay = $('confirmOverlay'), confirmModal = $('confirmModal'), confirmTitle = $('confirmTitle'), confirmMsg = $('confirmMsg');
const confirmOkBtn = $('confirmOkBtn'), confirmCancelBtn = $('confirmCancelBtn');
const paramBtn = $('paramBtn'), paramOverlay = $('paramOverlay'), paramModal = $('paramModal'), closeParam = $('closeParam');
const tempSlider = $('tempSlider'), topPSlider = $('topPSlider'), penSlider = $('penSlider');
const tempVal = $('tempVal'), topPVal = $('topPVal'), penVal = $('penVal');
const ctxRoundsInput = $('ctxRoundsInput'), slimitInput = $('slimitInput');
const promptGearBtn = $('promptGearBtn'), promptPanel = $('promptPanel'), promptOverlay = $('promptOverlay'), promptContent = $('promptContent');
const copyPromptBtn = $('copyPromptBtn'), closePromptBtn = $('closePromptBtn'), promptCharCount = $('promptCharCount');
const guideBtn = $('guideBtn'), guideOverlay = $('guideOverlay'), guideModal = $('guideModal'), closeGuide = $('closeGuide'), guideCloseBtn = $('guideCloseBtn');
const smsBtn = $('smsBtn'), smsOverlay = $('smsOverlay'), smsModal = $('smsModal'), closeSms = $('closeSms'), smsList = $('smsList');
const tlEditOverlay = $('tlEditOverlay'), tlEditModal = $('tlEditModal'), closeTlEdit = $('closeTlEdit'), saveTlEdit = $('saveTlEdit');
const tlModalTime = $('tlModalTime'), tlModalLoc = $('tlModalLoc'), tlModalDetail = $('tlModalDetail');
const worldBookBtn = $('worldBookBtn'), worldBookOverlay = $('worldBookOverlay'), worldBookModal = $('worldBookModal'), closeWorldBook = $('closeWorldBook');
const worldBookContent = $('worldBookContent'), saveWorldBookBtn = $('saveWorldBookBtn'), resetWorldBookBtn = $('resetWorldBookBtn');
const worldBookEditBtn = $('worldBookEditBtn'), worldBookCopyBtn = $('worldBookCopyBtn'), worldBookSaveRow = $('worldBookSaveRow'), worldBookStructured = $('worldBookStructured');

let deleteMode = false, summaryDeleteMode = false, confirmTimer = null, lt = null;
let isLoading = false, lastUserInput = '';

function showModal(ov, md) { ov.classList.remove('opacity-0','pointer-events-none'); ov.classList.add('opacity-100'); md.classList.remove('opacity-0','pointer-events-none'); md.classList.add('opacity-100'); md.style.pointerEvents = 'auto'; ov.style.pointerEvents = 'auto'; }
function hideModal(ov, md) { ov.classList.remove('opacity-100'); ov.classList.add('opacity-0'); md.classList.remove('opacity-100'); md.classList.add('opacity-0'); ov.style.pointerEvents = 'none'; md.style.pointerEvents = 'none'; setTimeout(() => { ov.classList.add('pointer-events-none'); md.classList.add('pointer-events-none'); }, 300); }
function closeSidebarFn() { sidebar.classList.remove('sidebar-open'); sidebar.classList.add('sidebar-enter','pointer-events-none'); sidebarOverlay.classList.remove('opacity-100'); sidebarOverlay.classList.add('opacity-0'); sidebarOverlay.style.pointerEvents = 'none'; }

function scrollToBottom() { const last = chatArea.lastElementChild; if (last) last.scrollIntoView({ behavior:'smooth', block:'end' }); else chatArea.scrollTop = chatArea.scrollHeight; }
function appendMsg(r, c, sn) {
  const u = r === 'user'; const h = chatArea.querySelector('.text-center'); if (h) h.remove();
  const content = u ? c : cleanNarrative(c);
  const d = document.createElement('div'); d.className = 'chat-msg flex ' + (u ? 'justify-end' : 'justify-start');
  const m = u ? 'max-w-[75%]' : 'max-w-[85%]';
  d.innerHTML = '<div class="' + m + ' rounded-2xl px-4 py-3 ' + (u ? 'bg-gradient-to-br from-[rgba(180,140,60,.15)] to-[rgba(180,120,40,.1)] border border-[rgba(180,140,60,.12)]' : 'bg-[rgba(28,24,20,.6)] border border-[rgba(160,120,60,.1)]') + '"><div class="text-sm leading-relaxed whitespace-pre-wrap text-[rgba(255,255,255,.75)]"></div>' + (sn ? '<div class="text-[10px] mt-1.5 ' + (sn.includes('✓') ? 'text-[rgba(120,200,160,.5)]' : 'text-[rgba(220,180,100,.45)]') + '">' + sn + '</div>' : '') + '</div>';
  chatArea.appendChild(d); scrollToBottom();
  const textDiv = d.querySelector('.text-sm');
  if (textDiv) highlightQuotes(textDiv, content);
}
function renderMessages() { const ms = data.chatHistory || []; chatArea.innerHTML = '<div class="text-center text-[rgba(220,200,160,.25)] text-sm tracking-[2px] pt-8 select-none">— 故事从这里开始 —</div>'; ms.forEach(m => appendMsg(m.role, m.content, m.statusNotice)); scrollToBottom(); }

function createStreamBubble() { const oldB = document.getElementById('streamB'); if (oldB) oldB.remove(); if (lt) { clearInterval(lt); lt = null; } const d = document.createElement('div'); d.id = 'streamB'; d.className = 'chat-msg flex justify-start'; d.innerHTML = '<div class="max-w-[85%] rounded-2xl px-4 py-3 bg-[rgba(28,24,20,.6)] border border-[rgba(160,120,60,.1)]"><div id="streamContent" class="text-sm leading-relaxed text-[rgba(220,200,160,.5)]"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div><div id="streamTimer" class="text-[10px] text-[rgba(220,200,160,.25)] mt-2 tracking-[1px]">修仙世界运转中… 0秒</div></div>'; chatArea.appendChild(d); scrollToBottom(); let sec = 0; lt = setInterval(() => { sec++; const e = document.getElementById('streamTimer'); if (e) e.textContent = '修仙世界运转中… ' + sec + '秒'; }, 1000); return d; }
function removeStreamBubble() { const d = document.getElementById('streamB'); if (d) d.remove(); if (lt) { clearInterval(lt); lt = null; } }
function addRegenBtn() { const msgs = chatArea.querySelectorAll('.chat-msg:not(.justify-end)'); if (!msgs.length) return; const last = msgs[msgs.length - 1]; const inner = last.querySelector('.rounded-2xl'); if (!inner) return; const btn = document.createElement('div'); btn.className = 'text-[10px] mt-1.5 text-[rgba(220,180,100,.4)]'; btn.innerHTML = '<button onclick="event.stopPropagation();regenerate()" class="px-2 py-0.5 rounded bg-[rgba(160,120,60,.12)] border border-[rgba(160,120,60,.14)] hover:bg-[rgba(160,120,60,.2)] transition">🔄 重新生成</button>'; inner.appendChild(btn); }

function addLog(msg) { if (!data.logs) data.logs = []; const ts = new Date().toLocaleTimeString(); data.logs.push('[' + ts + '] ' + msg); if (data.logs.length > 200) data.logs = data.logs.slice(-200); saveAll(); }
function renderLogs() { const logs = data.logs || []; if (!logs.length) { logList.innerHTML = '<div class="text-xs text-[rgba(220,200,160,.2)] text-center py-8">暂无日志</div>'; return; } logList.innerHTML = logs.slice().reverse().map(l => '<div class="leading-relaxed py-0.5 border-b border-[rgba(160,120,60,.05)] text-[11px] text-[rgba(255,255,255,.5)]">' + esc(l) + '</div>').join(''); }

function collapsibleBlock(t, c, h, e) { const id = 'c_' + Math.random().toString(36).slice(2, 6); return '<div class="rounded-lg border border-[rgba(160,120,60,.08)] overflow-hidden"><div class="flex items-center justify-between px-2.5 py-1.5 cursor-pointer hover:bg-[rgba(160,120,60,.06)] transition" onclick="document.getElementById(\'' + id + '\').classList.toggle(\'hidden\');this.querySelector(\'.carrow\').classList.toggle(\'rotate-90\')"><span class="text-xs text-[rgba(220,200,160,.4)]">' + t + (c !== undefined ? ' <span class="text-[rgba(220,200,160,.2)]">（' + c + '）</span>' : '') + '</span><span class="carrow">▸</span></div><div id="' + id + '" class="hidden px-2.5 pb-2 space-y-1">' + (h || '<span class="text-xs text-[rgba(220,200,160,.2)]">' + (e || '无') + '</span>') + '</div></div>'; }
function renderItemLine(item, type) {
  const g = item.grade || ((type === 'skill' ? SKILL_GRADES : ARTIFACT_GRADES).slice(-1)[0]);
  const st = item.status ? '<span class="text-[9px] px-1.5 rounded-full bg-[rgba(180,120,40,.12)] border border-[rgba(180,120,40,.15)] text-[rgba(220,180,120,.55)]">' + esc(item.status) + '</span> ' : '';
  return '<div class="rounded-lg px-2 py-1 cursor-pointer text-xs border border-transparent hover:border-[rgba(160,120,60,.1)]" onclick="this.querySelector(\'.ib\').classList.toggle(\'open\');this.querySelector(\'.ixp\').classList.toggle(\'rotate-180\')"><span class="text-[rgba(255,255,255,.6)]">' + esc(item.name) + '</span> ' + st + gradeTag(g) + '<span class="ixp float-right text-[20px] text-[rgba(220,200,160,.45)]" style="display:inline-block">▾</span><div class="ib artifact-body text-[10px] text-[rgba(220,200,160,.35)] pl-1">' + esc(item.desc || '') + '</div></div>';
}

function renderCharCard(c, o) {
  const st = o?.timeLocation, pr = o?.protagonist, comp = o?.companion, istemp = o?.temp;
  const tl = getState().timeLocation;
  const clpsId = 'l_' + Math.random().toString(36).slice(2, 6);
  const nCol = pr ? 'text-[#e8c860]' : comp ? 'text-[#90d0a0]' : 'text-[rgba(255,255,255,.75)]';
  const hasFold = comp || istemp;
  const body = '<div class="text-xs text-[rgba(255,255,255,.35)]">性别：' + esc(c.gender || '男') + '</div>'
    + (c.occupation ? '<div class="text-xs text-[rgba(255,255,255,.5)]">职业：' + esc(c.occupation) + '</div>' : '')
    + '<div class="text-xs text-[rgba(255,255,255,.5)]">开发度：' + Math.round(c.dev||0) + '%</div>'
    + bar('', c.dev||0, 100, 'from-[#e8c860] to-[#d4a830]')
    + '<div class="text-xs text-[rgba(255,255,255,.5)]">身高体重：' + (c.height||'?') + 'cm/' + (c.weight||'?') + 'kg</div>'
    + (c.appearance ? '<div class="text-xs text-[rgba(200,200,220,.45)]">外貌：' + esc(c.appearance) + '</div>' : '')
    + '<div class="text-xs text-[rgba(255,255,255,.5)]">属性：' + (c.attr??0) + '</div>'
    + '<div class="text-xs text-[rgba(255,255,255,.5)]">长度：' + Math.round(c.len||0) + 'cm</div>'
    + (c.bio ? '<div class="text-xs text-[rgba(220,180,100,.5)] leading-relaxed">' + (deleteMode ? '<span class="text-[10px] cursor-pointer" onclick="event.stopPropagation();toggleBioLock(\'' + esc(c.name) + '\')">' + ((getConfig().bioLocked||{})[c.name] ? '🔒' : '🔓') + '</span> ' : '') + '生平：' + esc(c.bio) + '</div>' : '')
    + '<div class="text-xs text-[rgba(255,255,255,.4)]">状态：' + esc(c.status || c.tag || '') + '</div>';
  const foldHtml = hasFold
    ? '<div class="comp-collapse-btn flex items-center justify-between px-3 py-2 rounded-xl bg-[rgba(30,24,20,.3)] border border-[rgba(160,120,60,.08)] cursor-pointer" onclick="document.getElementById(\'' + clpsId + '\').classList.toggle(\'hidden\');this.querySelector(\'.fld\').classList.toggle(\'rotate-90\')"><div class="flex items-center gap-2"><span class="text-base font-bold tracking-[2px] ' + nCol + '">' + esc(c.name) + '</span></div><span class="fld text-[rgba(220,200,160,.55)] transition-transform" style="display:inline-block;font-size:22px">▸</span></div><div id="' + clpsId + '" class="hidden rounded-xl px-3 py-3 bg-[rgba(30,24,20,.3)] border border-[rgba(160,120,60,.08)] space-y-1.5">' + body + '</div>'
    : '<div class="rounded-xl px-3 py-3 bg-[rgba(30,24,20,.3)] border border-[rgba(160,120,60,.08)] space-y-1.5">' + (st ? '<div class="text-sm tracking-[1px] text-[rgba(255,255,255,.5)]">' + esc(tl.time) + (tl.location ? '·' + esc(tl.location) : '') + '</div>' : '') + '<div class="text-base font-bold tracking-[2px] ' + nCol + '">' + esc(c.name) + '</div>' + body + '</div>';
  return foldHtml;
}
const MODULE_DEFS = [{ key:'protagonist', icon:'◈', label:'主角状态' }, { key:'companions', icon:'✦', label:'同伴' }];

function renderSidebar() {
  const s = getState(), f = getConfig().sidebarFold;
  const tl = getState().timeLocation;
  const tlText = esc(tl.time) + (tl.location ? '·' + esc(tl.location) : '') + (tl.detail ? '·' + esc(tl.detail) : '');
  tlDisplay.innerHTML = '<div class="flex items-center justify-between gap-2"><span class="flex-1">' + tlText + '</span>' + (deleteMode ? '<button onclick="openTlEditModal()" class="px-2 py-0.5 rounded text-[10px] bg-[rgba(160,120,60,.2)] text-[rgba(220,200,160,.7)] hover:bg-[rgba(160,120,60,.3)] transition shrink-0">✎ 编辑</button>' : '') + '</div>';
  sidebarModules.innerHTML = MODULE_DEFS.map(d => { const o = !f[d.key]; return '<div class="module-item ' + (o ? 'module-open' : '') + '"><div class="module-header flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer bg-[rgba(30,24,20,.4)] border border-[rgba(160,120,60,.08)] hover:border-[rgba(160,120,60,.15)] transition" data-key="' + d.key + '"><div class="flex items-center gap-2.5"><span class="text-[rgba(220,200,160,.4)] text-xs">' + d.icon + '</span><span class="text-xs tracking-[2px] text-[rgba(255,255,255,.6)]">' + d.label + '</span><span class="text-[10px] text-[rgba(220,200,160,.3)]" id="sbBadge_' + d.key + '"></span></div><span class="module-arrow text-[rgba(220,200,160,.6)]" style="display:inline-block;font-size:22px">▾</span></div><div class="module-body px-3 pt-3 pb-2 space-y-2 ' + (o ? '' : 'hidden') + '" id="sbBody_' + d.key + '"></div></div>'; }).join('');
  sidebarModules.querySelectorAll('.module-header').forEach(el => { el.addEventListener('click', () => { const k = el.dataset.key; getConfig().sidebarFold[k] = !getConfig().sidebarFold[k]; saveAll(); renderSidebar(); }); });
  renderProtagonist(); renderCompanions();
}
function openTlEditModal() { const tl = getState().timeLocation; tlModalTime.value = tl.time || ''; tlModalLoc.value = tl.location || ''; tlModalDetail.value = tl.detail || ''; showModal(tlEditOverlay, tlEditModal); }
function saveTimeLocationInline() { getState().timeLocation = { time:tlModalTime.value.trim(), location:tlModalLoc.value.trim(), detail:tlModalDetail.value.trim() }; saveAll(); renderSidebar(); hideModal(tlEditOverlay, tlEditModal); showToast('时间地点已更新'); }
function editBtns(type, i) { return deleteMode ? '<div class="absolute top-2 right-2 flex gap-1"><button class="px-2 py-0.5 rounded text-[10px] bg-[rgba(160,120,60,.2)] text-[rgba(220,200,160,.55)] hover:bg-[rgba(160,120,60,.35)] transition" onclick="event.stopPropagation();openEditModal(\'' + type + '\',' + i + ')">编辑</button>' + (type !== 'protagonist' ? '<button class="px-2 py-0.5 rounded text-[10px] bg-[rgba(200,80,60,.25)] text-[rgba(240,180,160,.6)] hover:bg-[rgba(200,80,60,.4)] transition" onclick="event.stopPropagation();deleteCompanion(' + i + ')">删除</button>' : '') + '</div>' : ''; }
function renderProtagonist() { const s = getState().protagonist, b = $('sbBody_protagonist'), badge = $('sbBadge_protagonist'); badge.textContent = (s.occupation || '无业') + ' · ' + (s.status || '在线'); b.innerHTML = '<div class="relative">' + renderCharCard(s, { timeLocation:false, protagonist:true }) + editBtns('protagonist', -1) + '</div>'; }
function renderCompanions() { const s = getState().companions, b = $('sbBody_companions'), badge = $('sbBadge_companions'); badge.textContent = s.length ? s.length + '人' : '无'; if (!s.length) { b.innerHTML = '<div class="text-xs text-[rgba(220,200,160,.2)]">无同伴</div>'; return; } b.innerHTML = s.map((c, i) => '<div class="relative">' + renderCharCard(c, { companion:true }) + editBtns('companion', i) + '</div>').join(''); }


function showDeleteConfirm(type, idx) {
  if (type === 'companion') { showToast('同伴不可删除'); return; }
  confirmTitle.textContent = '⚠ 删除确认'; confirmMsg.textContent = '删除后将无法找回，确定要删除此角色吗？';
  confirmOkBtn.disabled = true; confirmOkBtn.textContent = '确认（10秒）'; confirmCancelBtn.textContent = '取消';
  showModal(confirmOverlay, confirmModal);
  let sec = 10; confirmTimer = setInterval(() => { sec--; confirmOkBtn.textContent = '确认（' + sec + '秒）'; if (sec <= 0) { clearInterval(confirmTimer); confirmTimer = null; confirmOkBtn.disabled = false; confirmOkBtn.textContent = '确认删除'; } }, 1000);
  confirmOkBtn.onclick = function() { if (confirmTimer) { clearInterval(confirmTimer); confirmTimer = null; } closeConfirm(); if (type === 'protagonist') getState().protagonist = defaultState().protagonist; saveAll(); renderSidebar(); showToast('已重置'); };
  confirmCancelBtn.onclick = closeConfirm;
}
function closeConfirm() { if (confirmTimer) { clearInterval(confirmTimer); confirmTimer = null; } hideModal(confirmOverlay, confirmModal); }
function deleteCompanion(idx) {
  const c = getState().companions[idx];
  if (!c) return showToast('⚠ 角色不存在');
  showSimpleConfirm('确定要删除「' + c.name + '」吗？此操作不可撤销。', () => {
    getState().companions.splice(idx, 1);
    saveAll(); renderSidebar(); showToast('✓ 已删除「' + c.name + '」');
  });
}
function showSimpleConfirm(msg, onOk) { confirmTitle.textContent = '确认操作'; confirmMsg.textContent = msg; confirmOkBtn.disabled = false; confirmOkBtn.textContent = '确认'; confirmCancelBtn.textContent = '取消'; showModal(confirmOverlay, confirmModal); confirmOkBtn.onclick = function() { closeConfirm(); if (onOk) onOk(); }; confirmCancelBtn.onclick = closeConfirm; }

function addArtifactRowUI(v) {
  const d = document.createElement('div'); d.className = 'artifact-row'; d.draggable = true;
  d.innerHTML = '<div class="flex gap-1 items-center flex-wrap">' + '<span class="text-[11px] text-[rgba(220,200,160,.35)] cursor-move select-none">⠿</span>' + '<input placeholder="名称" class="flex-1 rounded px-1.5 py-1 text-[11px] bg-[rgba(30,24,18,.6)] border border-[rgba(160,120,60,.16)] text-[#f0e8d8] outline-none" value="' + esc(v?.name || '') + '">' + '<select class="rounded px-1 py-1 text-[10px] bg-[rgba(30,24,18,.6)] border border-[rgba(160,120,60,.16)] text-[#f0e8d8] outline-none">' + ARTIFACT_GRADES.map(g => '<option value="' + g + '"' + (v?.grade === g ? ' selected' : '') + '>' + g + '</option>').join('') + '</select>' + '<input placeholder="状态" class="w-16 rounded px-1.5 py-1 text-[11px] bg-[rgba(30,24,18,.6)] border border-[rgba(160,120,60,.16)] text-[#f0e8d8] outline-none" value="' + esc(v?.status || '完好无缺') + '">' + '<button class="text-[rgba(200,100,60,.5)] hover:text-[rgba(200,100,60,.8)] transition text-xs shrink-0" onclick="this.closest(\'.artifact-row\').remove()">✕</button>' + '</div>' + '<input placeholder="备注（样子、功能）" maxlength="100" class="w-full mt-0.5 rounded px-1.5 py-1 text-[11px] bg-[rgba(30,24,18,.6)] border border-[rgba(160,120,60,.16)] text-[#f0e8d8] outline-none" value="' + esc(v?.desc || '') + '">';
  aDrag(d, charArtifactList, 'artifact-row'); charArtifactList.appendChild(d);
}
function addSkillRowUI(v) {
  const d = document.createElement('div'); d.className = 'skill-row'; d.draggable = true;
  d.innerHTML = '<div class="flex gap-1 items-center">' + '<span class="text-[11px] text-[rgba(220,200,160,.35)] cursor-move select-none">⠿</span>' + '<input placeholder="名称" class="flex-1 rounded px-1.5 py-1 text-[11px] bg-[rgba(30,24,18,.6)] border border-[rgba(160,120,60,.16)] text-[#f0e8d8] outline-none" value="' + esc(v?.name || '') + '">' + '<select class="rounded px-1 py-1 text-[10px] bg-[rgba(30,24,18,.6)] border border-[rgba(160,120,60,.16)] text-[#f0e8d8] outline-none">' + SKILL_GRADES.map(g => '<option value="' + g + '"' + (v?.grade === g ? ' selected' : '') + '>' + g + '</option>').join('') + '</select>' + '<input placeholder="状态" class="w-16 rounded px-1.5 py-1 text-[11px] bg-[rgba(30,24,18,.6)] border border-[rgba(160,120,60,.16)] text-[#f0e8d8] outline-none" value="' + esc(v?.status || '可用') + '">' + '<button class="text-[rgba(200,100,60,.5)] hover:text-[rgba(200,100,60,.8)] transition text-xs shrink-0" onclick="this.closest(\'.skill-row\').remove()">✕</button>' + '</div>' + '<input placeholder="功能介绍" maxlength="100" class="w-full mt-0.5 rounded px-1.5 py-1 text-[11px] bg-[rgba(30,24,18,.6)] border border-[rgba(160,120,60,.16)] text-[#f0e8d8] outline-none" value="' + esc(v?.desc || '') + '">';
  aDrag(d, charSkillList, 'skill-row'); charSkillList.appendChild(d);
}
function addFormationRowUI(v) {
  const d = document.createElement('div'); d.className = 'formation-row'; d.draggable = true;
  d.innerHTML = '<div class="flex gap-1 items-center">' + '<span class="text-[11px] text-[rgba(220,200,160,.35)] cursor-move select-none">⠿</span>' + '<input placeholder="名称" class="flex-1 rounded px-1.5 py-1 text-[11px] bg-[rgba(30,24,18,.6)] border border-[rgba(160,120,60,.16)] text-[#f0e8d8] outline-none" value="' + esc(v?.name || '') + '">' + '<select class="rounded px-1 py-1 text-[10px] bg-[rgba(30,24,18,.6)] border border-[rgba(160,120,60,.16)] text-[#f0e8d8] outline-none">' + FORMATION_GRADES.map(g => '<option value="' + g + '"' + (v?.grade === g ? ' selected' : '') + '>' + g + '</option>').join('') + '</select>' + '<input placeholder="状态" class="w-16 rounded px-1.5 py-1 text-[11px] bg-[rgba(30,24,18,.6)] border border-[rgba(160,120,60,.16)] text-[#f0e8d8] outline-none" value="' + esc(v?.status || '完好') + '">' + '<button class="text-[rgba(200,100,60,.5)] hover:text-[rgba(200,100,60,.8)] transition text-xs shrink-0" onclick="this.closest(\'.formation-row\').remove()">✕</button>' + '</div>' + '<input placeholder="备注" maxlength="100" class="w-full mt-0.5 rounded px-1.5 py-1 text-[11px] bg-[rgba(30,24,18,.6)] border border-[rgba(160,120,60,.16)] text-[#f0e8d8] outline-none" value="' + esc(v?.desc || '') + '">';
  aDrag(d, charFormationList, 'formation-row'); charFormationList.appendChild(d);
}
function aDrag(d, container, className) {
  d.addEventListener('dragstart', e => { e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', ''); d.classList.add('opacity-40'); });
  d.addEventListener('dragend', () => { d.classList.remove('opacity-40'); container.querySelectorAll('.' + className).forEach(el => el.classList.remove('drag-over')); });
  d.addEventListener('dragover', e => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; d.classList.add('drag-over'); });
  d.addEventListener('dragleave', () => d.classList.remove('drag-over'));
  d.addEventListener('drop', e => { e.preventDefault(); e.stopPropagation(); d.classList.remove('drag-over'); const rows = [...container.querySelectorAll('.' + className)]; const dragged = rows.find(r => r.classList.contains('opacity-40')); if (!dragged || dragged === d) return; const rect = d.getBoundingClientRect(); const after = (e.clientY - rect.top) > rect.height / 2; if (after) { if (d.nextSibling) container.insertBefore(dragged, d.nextSibling); else container.appendChild(dragged); } else { container.insertBefore(dragged, d); } });
}
function collectCharItems(c, g, type) {
  const items = []; const cls = type === 'artifact' ? '.artifact-row' : (type === 'formation' ? '.formation-row' : '.skill-row');
  const defStatus = type === 'artifact' ? '完好无缺' : (type === 'formation' ? '完好' : '可用');
  c.querySelectorAll(cls).forEach(row => {
    const inputs = row.querySelectorAll('input:not(.art-cat-chk)'), sel = row.querySelector('select');
    const catChks = row.querySelectorAll('.art-cat-chk'); if (!inputs.length) return;
    const name = inputs[0]?.value.trim(); if (!name) return;
    const status = inputs[1]?.value.trim() || defStatus; const desc = inputs[2]?.value.trim() || '功能未知';
    const item = { name, grade: sel?.value || g[g.length - 1], status, desc };

    items.push(item);
  }); return items;
}
function openEditModal(type, idx) {
  if (sidebar.classList.contains('sidebar-open')) closeSidebarFn();
  charEditIdx.value = idx; charEditSrc.value = type;
  let c; if (type === 'protagonist') c = getState().protagonist; else c = getState().companions[idx];
  if (!c) return;
  if (type === 'protagonist') { charTypeRow.style.display = 'none'; charTimeRow.style.display = 'none'; }
  else { charTypeRow.style.display = ''; charTimeRow.style.display = 'none'; charTypeSelect.innerHTML = '<option value="companion">同伴</option>'; charTypeSelect.value = 'companion'; charTypeSelect.disabled = false; }
  charNameInput.value = c.name || ''; charStatusField.value = c.status || '';
  charGender.value = c.gender || '男';
  if (charBio) charBio.value = c.bio || '';
  if (charBioLock) charBioLock.checked = !!(getConfig().bioLocked || {})[c.name];
  if (type === 'protagonist') { const tl = getState().timeLocation; charTimeTime.value = tl.time || ''; charTimeLoc.value = tl.location || ''; charTimeDetail.value = tl.detail || ''; }
  if (charAttrInput) { charAttrInput.value = c.attr ?? 0; charLenInput.value = Math.round(c.len ?? 15); charDevInput.value = Math.round(c.dev ?? 0); charOccupation.value = c.occupation || ''; charAppearance.value = c.appearance || ''; charHeight.value = c.height ?? 175; charWeight.value = c.weight ?? 65; }
  showModal(charEditOverlay, charEditModal);
}
function closeCE() { hideModal(charEditOverlay, charEditModal); }
function toggleBioLock(name) { const bl = getConfig().bioLocked || {}; bl[name] = !bl[name]; getConfig().bioLocked = bl; saveAll(); renderSidebar(); }

function renderWorldBookSections(arr) {
  if (!Array.isArray(arr) || !arr.length) return '<div class="text-xs text-[rgba(220,200,160,.2)] text-center py-8">暂无内容</div>';
  return arr.map((sec, i) => {
    const id = 'wbs_' + i;
    return '<div class="rounded-lg border border-[rgba(160,120,60,.08)] overflow-hidden mb-2"><div class="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-[rgba(160,120,60,.06)] transition" onclick="document.getElementById(\'' + id + '\').classList.toggle(\'hidden\');this.querySelector(\'.wbs-arrow\').classList.toggle(\'rotate-90\')"><span class="text-xs text-[rgba(255,255,255,.65)] font-medium">' + esc(sec.title||'') + '</span><span class="flex items-center gap-1"><span class="wbs-arrow text-[rgba(220,200,160,.5)] transition-transform" style="display:inline-block;font-size:16px">▸</span></span></div><div id="' + id + '" class="hidden px-3 pb-2"><pre class="text-[11px] text-[rgba(255,255,255,.5)] leading-relaxed whitespace-pre-wrap font-[\'PingFang_SC\',\'Microsoft_YaHei\'] mb-2" id="wbsPre_' + i + '">' + esc(sec.content||'') + '</pre><textarea class="w-full rounded p-2 text-[11px] bg-[rgba(30,24,18,.6)] border border-[rgba(160,120,60,.16)] text-[#f0e8d8] outline-none resize-y hidden" id="wbsEdit_' + i + '" rows="4">' + esc(sec.content||'') + '</textarea><div class="flex gap-1"><button class="px-2 py-0.5 rounded text-[10px] bg-[rgba(160,120,60,.2)] text-[rgba(220,200,160,.55)] hover:bg-[rgba(160,120,60,.35)] transition" onclick="editWbSection(' + i + ')">✏️ 编辑</button><button class="px-2 py-0.5 rounded text-[10px] bg-[rgba(60,160,60,.2)] text-[rgba(140,220,140,.55)] hover:bg-[rgba(60,160,60,.35)] transition hidden" id="wbsSave_' + i + '" onclick="saveWbSection(' + i + ')">💾 保存</button><button class="px-2 py-0.5 rounded text-[10px] bg-[rgba(200,60,60,.25)] text-[rgba(240,200,200,.6)] hover:bg-[rgba(200,60,60,.4)] transition" onclick="delWbSection(' + i + ')">🗑 删除</button></div></div></div>';
  }).join('');
}
function editWbSection(idx) {
  const pre = document.getElementById('wbsPre_' + idx), ta = document.getElementById('wbsEdit_' + idx), save = document.getElementById('wbsSave_' + idx);
  if (pre && ta && save) { pre.classList.add('hidden'); ta.classList.remove('hidden'); save.classList.remove('hidden'); }
}
function saveWbSection(idx) {
  const ta = document.getElementById('wbsEdit_' + idx), pre = document.getElementById('wbsPre_' + idx), save = document.getElementById('wbsSave_' + idx);
  if (!ta || !pre || !save) return;
  const wb = data.worldBook; if (!Array.isArray(wb) || !wb[idx]) return;
  wb[idx].content = ta.value; saveAll(); pre.textContent = wb[idx].content; pre.classList.remove('hidden'); ta.classList.add('hidden'); save.classList.add('hidden'); showToast('已保存');
}
function delWbSection(idx) {
  showSimpleConfirm('确定删除【' + ((data.worldBook||[])[idx]||{}).title + '】？', () => {
    const wb = data.worldBook; if (Array.isArray(wb)) { wb.splice(idx, 1); saveAll(); renderWorldBook(); }
  });
}
function addWbSection() {
  const t = prompt('请输入新目录名称：');
  if (t && t.trim()) {
    if (!Array.isArray(data.worldBook)) data.worldBook = [];
    data.worldBook.push({ title: t.trim(), content: '' }); saveAll(); renderWorldBook();
  }
}
function renderWorldBook() {
  const wb = data.worldBook; if (!Array.isArray(wb)) data.worldBook = defaultWorldBook();
  worldBookStructured.innerHTML = renderWorldBookSections(data.worldBook);
}

function renderSmsList() {
  const ms = data.messages || [];
  const names = new Set(); (getState().companions||[]).forEach(c => { if (c.name !== getState().protagonist.name) names.add(c.name); });
  ms.forEach(m => { if (m.from && m.from !== getState().protagonist.name) names.add(m.from); });
  const msgMap = {}; ms.forEach(m => { if (m.from) msgMap[m.from] = m.content; });
  if (!names.size) { smsList.innerHTML = '<div class="text-xs text-[rgba(220,200,160,.2)] text-center py-8">暂无来信</div>'; return; }
  smsList.innerHTML = Array.from(names).map((name, i) => {
    const id = 'sms_' + i; const content = msgMap[name] || null;
    const sender = '<span class="text-[#90d0a0] font-medium">' + esc(name) + '</span>';
    const preview = content ? esc(content.slice(0,20) + (content.length>20?'...':'')) : '<span class="text-[rgba(220,200,160,.2)]">暂无</span>';
    const body = content ? '<div class="text-xs text-[rgba(255,255,255,.7)] leading-relaxed whitespace-pre-wrap">' + esc(content) + '</div>' : '<div class="text-xs text-[rgba(220,200,160,.2)]">暂无来信</div>';
    return '<div class="rounded-lg border border-[rgba(160,120,60,.08)] overflow-hidden"><div class="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-[rgba(160,120,60,.06)] transition" onclick="document.getElementById(\'' + id + '\').classList.toggle(\'hidden\');this.querySelector(\'.sms-arrow\').classList.toggle(\'rotate-90\')"><div class="flex items-center gap-2"><span class="text-xs">' + sender + '</span><span class="text-[10px] text-[rgba(220,200,160,.35)]">' + preview + '</span></div><span class="sms-arrow text-[rgba(220,200,160,.5)] transition-transform" style="display:inline-block;font-size:14px">▸</span></div><div id="' + id + '" class="hidden px-3 pb-3">' + body + '</div></div>';
  }).join('');
}
function highlightQuotes(textDiv, content) {
  const matches = [];
  const re1 = /\u201c[^\u201d]*?\u201d/g;
  const re2 = /"[^"]*?"/g;
  let m;
  while ((m = re1.exec(content)) !== null) matches.push({ start: m.index, end: m.index + m[0].length });
  while ((m = re2.exec(content)) !== null) matches.push({ start: m.index, end: m.index + m[0].length });
  matches.sort((a, b) => a.start - b.start);
  if (!matches.length) { textDiv.textContent = content; return; }
  const frag = document.createDocumentFragment();
  let lastIdx = 0;
  for (const seg of matches) {
    if (seg.start > lastIdx) frag.appendChild(document.createTextNode(content.substring(lastIdx, seg.start)));
    const span = document.createElement('span');
    span.className = 'dialogue-ht';
    span.textContent = content.substring(seg.start, seg.end);
    frag.appendChild(span);
    lastIdx = seg.end;
  }
  if (lastIdx < content.length) frag.appendChild(document.createTextNode(content.substring(lastIdx)));
  textDiv.appendChild(frag);
}