const HTML = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>个人站</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#060a10;
  --s0:rgba(255,255,255,0.03);
  --s1:rgba(255,255,255,0.055);
  --s2:rgba(255,255,255,0.08);
  --b0:rgba(255,255,255,0.07);
  --b1:rgba(255,255,255,0.13);
  --ac:#6366f1;--ac2:#818cf8;--acg:rgba(99,102,241,0.18);--acs:rgba(99,102,241,0.08);
  --tx:#e2e8f0;--ts:#8892a4;--tm:#475569;
  --re:#f43f5e;--gr:#10b981;--ye:#f59e0b;
  --r:14px;--rs:9px;
  --font:'DM Sans',sans-serif;
  --display:'Syne',sans-serif;
  --mono:'JetBrains Mono',monospace;
}
html{scroll-behavior:smooth}
body{
  font-family:var(--font);
  background:var(--bg);
  color:var(--tx);
  min-height:100vh;
  background-image:
    radial-gradient(ellipse 110% 55% at 10% -5%, rgba(99,102,241,.09) 0%, transparent 55%),
    radial-gradient(ellipse 70% 45% at 92% 105%, rgba(99,102,241,.06) 0%, transparent 50%);
  font-size:15px;
}

/* ── Layout ── */
.app{max-width:880px;margin:0 auto;padding:36px 22px 100px}
header{display:flex;align-items:center;justify-content:space-between;margin-bottom:32px}
.logo{font-family:var(--display);font-size:1.45rem;font-weight:800;letter-spacing:-.02em;
  background:linear-gradient(130deg,#c7d2fe 0%,#818cf8 50%,#6366f1 100%);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent}

/* Status */
#status-dot{display:flex;align-items:center;gap:7px;font-size:.78rem;color:var(--ts);
  background:var(--s0);border:1px solid var(--b0);border-radius:99px;padding:5px 13px}
#status-dot .pip{width:7px;height:7px;border-radius:50%;background:var(--ye);
  box-shadow:0 0 6px var(--ye);animation:blink 1.6s ease infinite}
#status-dot.ok .pip{background:var(--gr);box-shadow:0 0 6px var(--gr);animation:none}
#status-dot.err .pip{background:var(--re);box-shadow:0 0 6px var(--re);animation:none}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.35}}

/* ── Tabs ── */
.tabs{display:flex;gap:3px;background:var(--s0);border:1px solid var(--b0);
  border-radius:var(--r);padding:5px;margin-bottom:26px}
.tab-btn{flex:1;display:flex;align-items:center;justify-content:center;gap:7px;
  padding:9px 12px;border-radius:var(--rs);border:none;
  font-family:var(--font);font-size:.84rem;font-weight:600;color:var(--ts);
  background:none;cursor:pointer;transition:all .18s;position:relative}
.tab-btn:hover{color:var(--tx);background:var(--s1)}
.tab-btn.active{background:var(--s2);color:var(--tx);
  box-shadow:0 1px 4px rgba(0,0,0,.35),inset 0 0 0 1px var(--b1)}
.badge{font-size:.7rem;font-weight:700;padding:1px 7px;border-radius:99px;
  background:var(--acg);color:var(--ac2);transition:all .2s}

/* ── Form ── */
.form-card{background:var(--s0);border:1px solid var(--b0);border-radius:var(--r);padding:20px;margin-bottom:22px}
.fgrid{display:flex;flex-direction:column;gap:10px}
.frow{display:grid;grid-template-columns:1fr 1fr;gap:10px}
label.flabel{font-size:.76rem;font-weight:600;color:var(--ts);letter-spacing:.03em;text-transform:uppercase;margin-bottom:4px;display:block}
input,textarea{
  width:100%;background:rgba(255,255,255,.045);border:1px solid var(--b0);
  border-radius:var(--rs);padding:10px 13px;color:var(--tx);
  font-family:var(--font);font-size:.875rem;outline:none;resize:none;
  transition:border-color .18s,box-shadow .18s,background .18s}
input::placeholder,textarea::placeholder{color:var(--tm)}
input:focus,textarea:focus{border-color:rgba(99,102,241,.45);background:rgba(99,102,241,.04);
  box-shadow:0 0 0 3px rgba(99,102,241,.1)}
.ffoot{display:flex;align-items:center;justify-content:space-between}
.char-count{font-size:.73rem;color:var(--tm);font-family:var(--mono)}

/* ── Buttons ── */
.btn{display:inline-flex;align-items:center;gap:6px;padding:9px 18px;
  border-radius:var(--rs);border:none;font-family:var(--font);font-size:.84rem;
  font-weight:600;cursor:pointer;transition:all .18s;line-height:1}
.btn-p{background:var(--ac);color:#fff}
.btn-p:hover{background:#5457e0;transform:translateY(-1px);box-shadow:0 6px 18px rgba(99,102,241,.35)}
.btn-p:active{transform:none;box-shadow:none}
.btn-g{background:var(--s1);color:var(--ts);border:1px solid var(--b0)}
.btn-g:hover{background:var(--s2);color:var(--tx)}
.btn-sm{padding:6px 12px;font-size:.79rem}
.btn-r{background:rgba(244,63,94,.1);color:var(--re);border:1px solid rgba(244,63,94,.2)}
.btn-r:hover{background:rgba(244,63,94,.18)}

/* ── Toolbar ── */
.toolbar{display:flex;align-items:center;gap:9px;margin-bottom:14px;flex-wrap:wrap}
.srch{flex:1;position:relative;min-width:160px}
.srch-icon{position:absolute;left:11px;top:50%;transform:translateY(-50%);
  color:var(--tm);pointer-events:none}
.srch input{padding-left:33px!important}
.sort-btn{display:flex;align-items:center;gap:5px;padding:8px 12px;
  border-radius:var(--rs);background:var(--s0);border:1px solid var(--b0);
  color:var(--ts);font-family:var(--font);font-size:.79rem;font-weight:500;
  cursor:pointer;transition:all .18s;white-space:nowrap}
.sort-btn:hover{color:var(--tx);background:var(--s1)}

/* ── Tag filters ── */
.tag-row{display:flex;gap:5px;flex-wrap:wrap;margin-bottom:14px;min-height:0}
.tf{padding:4px 11px;border-radius:99px;font-size:.74rem;font-weight:500;
  background:var(--s1);border:1px solid var(--b0);color:var(--ts);
  cursor:pointer;transition:all .18s}
.tf:hover{color:var(--tx);border-color:var(--b1)}
.tf.on{background:var(--acg);border-color:rgba(99,102,241,.35);color:var(--ac2)}

/* ── Cards ── */
.list{display:flex;flex-direction:column;gap:10px}
.card{background:var(--s0);border:1px solid var(--b0);border-radius:var(--r);
  padding:16px 18px;transition:border-color .18s,box-shadow .18s,transform .18s;
  animation:fadeUp .22s ease both}
.card:hover{border-color:var(--b1);box-shadow:0 6px 28px rgba(0,0,0,.28);transform:translateY(-1px)}
@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
.chead{display:flex;align-items:flex-start;justify-content:space-between;gap:12px}
.ctitle{font-weight:700;font-size:.94rem;letter-spacing:-.01em;line-height:1.4}
.cbody{color:var(--ts);font-size:.85rem;margin-top:7px;white-space:pre-wrap;line-height:1.75}
.cfoot{display:flex;align-items:center;gap:6px;margin-top:11px;flex-wrap:wrap}
.pill{background:var(--s2);border:1px solid var(--b0);border-radius:99px;
  padding:2px 9px;font-size:.71rem;color:var(--ts)}
.ts{font-size:.71rem;color:var(--tm);margin-left:auto;font-family:var(--mono)}
.acts{display:flex;gap:5px;flex-shrink:0}
.ibtn{width:30px;height:30px;border-radius:var(--rs);border:1px solid var(--b0);
  background:var(--s1);color:var(--ts);cursor:pointer;display:flex;align-items:center;
  justify-content:center;transition:all .18s;font-size:.85rem}
.ibtn:hover{background:var(--s2);color:var(--tx);border-color:var(--b1)}
.ibtn.del:hover{background:rgba(244,63,94,.12);border-color:rgba(244,63,94,.28);color:var(--re)}
.ibtn.cpy:hover{background:rgba(16,185,129,.1);border-color:rgba(16,185,129,.28);color:var(--gr)}
.ibtn.edt:hover{background:var(--acg);border-color:rgba(99,102,241,.3);color:var(--ac2)}

/* ── Bookmark ── */
.bm-link{color:var(--ac2);font-weight:700;font-size:.94rem;text-decoration:none;
  letter-spacing:-.01em;transition:color .18s}
.bm-link:hover{color:#c7d2fe}
.bm-url{color:var(--tm);font-size:.72rem;font-family:var(--mono);margin-top:3px;
  overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:420px}

/* ── Edit form ── */
.edit-zone{display:flex;flex-direction:column;gap:8px;margin-top:4px}
.edit-btns{display:flex;gap:7px}

/* ── File card ── */
.fcard-inner{display:flex;align-items:center;gap:14px}
.ficon{width:42px;height:42px;border-radius:var(--rs);background:var(--s1);
  border:1px solid var(--b0);display:flex;align-items:center;justify-content:center;
  font-size:1.3rem;flex-shrink:0}
.fname{font-weight:600;font-size:.9rem}
.fmeta{font-size:.74rem;color:var(--ts);margin-top:2px;font-family:var(--mono)}

/* ── Drop zone ── */
.dropzone{border:2px dashed var(--b0);border-radius:var(--r);padding:36px 24px;
  text-align:center;cursor:pointer;transition:all .2s;color:var(--ts);
  font-size:.875rem;background:transparent}
.dropzone:hover,.dropzone.drag{border-color:rgba(99,102,241,.5);
  background:var(--acs);color:var(--tx)}
.dropzone input[type=file]{display:none}
.drop-ico{font-size:2.5rem;margin-bottom:10px}
.sel-info{display:none;align-items:center;justify-content:space-between;
  margin-top:14px;padding:12px 14px;background:var(--s1);border-radius:var(--rs);
  border:1px solid var(--b0)}
.sel-name{font-size:.875rem;font-weight:500;color:var(--tx);min-width:0;
  overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-right:12px}

/* ── Empty ── */
.empty{text-align:center;padding:56px 20px;color:var(--tm)}
.empty-ico{font-size:2.8rem;margin-bottom:12px;opacity:.45}
.empty p{font-size:.875rem;line-height:1.6}

/* ── Toast ── */
#toasts{position:fixed;top:20px;right:20px;display:flex;flex-direction:column;gap:8px;z-index:9999;pointer-events:none}
.toast{display:flex;align-items:center;gap:9px;padding:11px 16px;border-radius:10px;
  font-size:.84rem;font-weight:500;animation:tIn .22s ease;max-width:300px;
  pointer-events:auto;backdrop-filter:blur(16px);box-shadow:0 8px 28px rgba(0,0,0,.45)}
.toast.ok{background:rgba(16,185,129,.14);border:1px solid rgba(16,185,129,.28);color:#6ee7b7}
.toast.err{background:rgba(244,63,94,.14);border:1px solid rgba(244,63,94,.28);color:#fda4af}
.toast.info{background:rgba(99,102,241,.14);border:1px solid rgba(99,102,241,.28);color:#c7d2fe}
.toast.out{animation:tOut .2s ease forwards}
@keyframes tIn{from{opacity:0;transform:translateX(16px)}to{opacity:1;transform:none}}
@keyframes tOut{to{opacity:0;transform:translateX(16px)}}

/* ── Modal ── */
#modal{position:fixed;inset:0;z-index:9998;display:flex;align-items:center;justify-content:center;
  background:rgba(0,0,0,.72);backdrop-filter:blur(5px);
  opacity:0;visibility:hidden;transition:opacity .2s,visibility .2s}
#modal.show{opacity:1;visibility:visible}
.mbox{background:#0c1018;border:1px solid var(--b1);border-radius:var(--r);padding:30px;
  max-width:370px;width:90%;transform:scale(.94);transition:transform .2s;text-align:center;
  box-shadow:0 20px 60px rgba(0,0,0,.6)}
#modal.show .mbox{transform:scale(1)}
.mico{font-size:2rem;margin-bottom:10px}
.mmsg{font-size:.875rem;color:var(--ts);margin-bottom:22px;line-height:1.65}
.mbtns{display:flex;gap:10px;justify-content:center}

/* ── Panel ── */
.panel{display:none}
.panel.active{display:block;animation:pIn .18s ease}
@keyframes pIn{from{opacity:0}to{opacity:1}}

/* ── Responsive ── */
@media(max-width:580px){
  .app{padding:22px 14px 70px}
  .frow{grid-template-columns:1fr}
  .tabs{gap:2px;padding:4px}
  .tab-btn{padding:8px 8px;font-size:.78rem}
  .tab-btn span:first-child{display:none}
}
<\/style>
</head>
<body>

<div id="toasts"></div>

<div id="modal">
  <div class="mbox">
    <div class="mico">🗑</div>
    <p id="modal-msg" class="mmsg"></p>
    <div class="mbtns">
      <button class="btn btn-g" id="m-cancel">取消</button>
      <button class="btn btn-r" id="m-ok">删除</button>
    </div>
  </div>
</div>

<div class="app">

  <header>
    <div class="logo">📦 个人站</div>
    <div id="status-dot">
      <span class="pip"></span>
      <span id="status-txt">连接中…</span>
    </div>
  </header>

  <div class="tabs">
    <button class="tab-btn active" id="tab-notes" onclick="switchTab('notes')">
      <span>📝</span> 备忘 <span class="badge" id="badge-notes">0</span>
    </button>
    <button class="tab-btn" id="tab-bookmarks" onclick="switchTab('bookmarks')">
      <span>🔖</span> 收藏 <span class="badge" id="badge-bookmarks">0</span>
    </button>
    <button class="tab-btn" id="tab-backup" onclick="switchTab('backup')">
      <span>💾</span> 备份 <span class="badge" id="badge-backup">0</span>
    </button>
  </div>

  <!-- Notes -->
  <div id="panel-notes" class="panel active">
    <div class="form-card">
      <div class="fgrid">
        <input id="n-title" placeholder="标题" maxlength="100">
        <textarea id="n-content" placeholder="内容…" rows="3" oninput="updCount(this,'n-cnt')" maxlength="2000"></textarea>
        <div class="frow">
          <input id="n-tags" placeholder="标签（空格分隔）">
          <div class="ffoot">
            <span class="char-count"><span id="n-cnt">0</span>/2000</span>
            <button class="btn btn-p" onclick="addNote()">＋ 添加</button>
          </div>
        </div>
      </div>
    </div>
    <div class="toolbar">
      <div class="srch">
        <span class="srch-icon">🔍</span>
        <input id="sq-notes" placeholder="搜索备忘…" oninput="renderNotes()">
      </div>
      <button class="sort-btn" onclick="toggleSort('notes')" id="sort-notes">↓ 最新</button>
    </div>
    <div id="tags-notes" class="tag-row"></div>
    <div id="notes-list" class="list"></div>
  </div>

  <!-- Bookmarks -->
  <div id="panel-bookmarks" class="panel">
    <div class="form-card">
      <div class="fgrid">
        <div class="frow">
          <input id="b-title" placeholder="网站名称">
          <input id="b-url" placeholder="https://…">
        </div>
        <div class="frow">
          <input id="b-tags" placeholder="标签（空格分隔）">
          <div class="ffoot">
            <span></span>
            <button class="btn btn-p" onclick="addBookmark()">＋ 添加</button>
          </div>
        </div>
      </div>
    </div>
    <div class="toolbar">
      <div class="srch">
        <span class="srch-icon">🔍</span>
        <input id="sq-bookmarks" placeholder="搜索收藏…" oninput="renderBookmarks()">
      </div>
      <button class="sort-btn" onclick="toggleSort('bookmarks')" id="sort-bookmarks">↓ 最新</button>
    </div>
    <div id="tags-bookmarks" class="tag-row"></div>
    <div id="bookmarks-list" class="list"></div>
  </div>

  <!-- Backup -->
  <div id="panel-backup" class="panel">
    <div class="form-card">
      <label class="dropzone" id="dropzone">
        <input type="file" id="f-input" onchange="onFileSel(this)">
        <div id="drop-text">
          <div class="drop-ico">📂</div>
          <p style="font-weight:600">点击选择文件，或拖拽到此处</p>
          <p style="font-size:.78rem;margin-top:5px;opacity:.55">文件下载到本地，云端仅记录元数据</p>
        </div>
      </label>
      <div class="sel-info" id="sel-info">
        <span class="sel-name" id="sel-name"></span>
        <button class="btn btn-p btn-sm" onclick="backupFile()">💾 备份</button>
      </div>
    </div>
    <div class="toolbar">
      <div class="srch">
        <span class="srch-icon">🔍</span>
        <input id="sq-backup" placeholder="搜索文件…" oninput="renderFiles()">
      </div>
      <button class="sort-btn" onclick="toggleSort('backup')" id="sort-backup">↓ 最新</button>
    </div>
    <div id="files-list" class="list"></div>
  </div>

</div>

<script>
var ND=[], BD=[], FD=[];
var atag={notes:null, bookmarks:null};
var sortD={notes:true, bookmarks:true, backup:true};
var editId=null;
var curFile=null;

function esc(t){if(!t)return'';return(t+'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}

function fmtDate(d){
  var dt=new Date(d);
  var mo=['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
  return mo[dt.getMonth()]+dt.getDate()+'日 '+String(dt.getHours()).padStart(2,'0')+':'+String(dt.getMinutes()).padStart(2,'0');
}

function fmtSize(b){
  if(!b)return'—';
  if(b<1024)return b+'B';
  if(b<1048576)return(b/1024).toFixed(1)+'KB';
  return(b/1048576).toFixed(2)+'MB';
}

function fileIco(name){
  var ext=((name||'').split('.').pop()||'').toLowerCase();
  var m={pdf:'📄',doc:'📝',docx:'📝',xls:'📊',xlsx:'📊',ppt:'📋',pptx:'📋',
    zip:'📦',rar:'📦','7z':'📦',tar:'📦',gz:'📦',
    jpg:'🖼',jpeg:'🖼',png:'🖼',gif:'🎞',svg:'🎨',webp:'🖼',ico:'🖼',
    mp4:'🎬',mov:'🎬',avi:'🎬',mkv:'🎬',
    mp3:'🎵',wav:'🎵',flac:'🎵',m4a:'🎵',
    js:'⚡',ts:'⚡',py:'🐍',json:'📋',html:'🌐',css:'🎨',sh:'⌨',go:'🐹',rs:'🦀',
    txt:'📄',md:'📝',csv:'📊',sql:'🗄',env:'🔑'};
  return m[ext]||'📁';
}

async function api(path, method, body){
  var opts={method:method||'GET',headers:{}};
  if(body){opts.headers['Content-Type']='application/json';opts.body=JSON.stringify(body);}
  var res=await fetch('/api'+path,opts);
  if(!res.ok)throw new Error(res.status+' '+res.statusText);
  if(res.status===204||res.status===201)return null;
  return res.json();
}

function updCount(el,id){document.getElementById(id).textContent=el.value.length;}

/* ── Toast ── */
function toast(msg, type){
  var el=document.createElement('div');
  el.className='toast '+(type||'info');
  var ico={ok:'✓',err:'✕',info:'ℹ'};
  el.innerHTML='<b style="font-size:1rem">'+(ico[type]||'ℹ')+'<\/b><span>'+esc(msg)+'<\/span>';
  document.getElementById('toasts').appendChild(el);
  setTimeout(function(){el.classList.add('out');setTimeout(function(){el.remove();},220);},3000);
}

/* ── Confirm modal ── */
function confirmDlg(msg){
  return new Promise(function(res){
    var mo=document.getElementById('modal');
    document.getElementById('modal-msg').textContent=msg;
    mo.classList.add('show');
    var ok=document.getElementById('m-ok');
    var cn=document.getElementById('m-cancel');
    function close(v){mo.classList.remove('show');ok.onclick=null;cn.onclick=null;res(v);}
    ok.onclick=function(){close(true);};
    cn.onclick=function(){close(false);};
    mo.onclick=function(e){if(e.target===mo)close(false);};
  });
}

/* ── Status ── */
function setStatus(type,txt){
  var el=document.getElementById('status-dot');
  el.className=type;
  document.getElementById('status-txt').textContent=txt;
}

/* ── Tabs ── */
function switchTab(tab){
  ['notes','bookmarks','backup'].forEach(function(t){
    document.getElementById('panel-'+t).classList.remove('active');
    document.getElementById('tab-'+t).classList.remove('active');
  });
  document.getElementById('panel-'+tab).classList.add('active');
  document.getElementById('tab-'+tab).classList.add('active');
  editId=null;
  if(tab==='notes')renderNotes();
  if(tab==='bookmarks')renderBookmarks();
  if(tab==='backup')renderFiles();
}

/* ── Badges ── */
function updBadges(){
  document.getElementById('badge-notes').textContent=ND.length;
  document.getElementById('badge-bookmarks').textContent=BD.length;
  document.getElementById('badge-backup').textContent=FD.length;
}

/* ── Tag filters ── */
function getTags(data, key){
  var map={};
  data.forEach(function(d){(d[key]||'').split(' ').forEach(function(t){if(t)map[t]=(map[t]||0)+1;});});
  return Object.keys(map).sort();
}

function renderTags(cid, tags, panel){
  var el=document.getElementById(cid);
  if(!tags.length){el.innerHTML='';return;}
  var at=atag[panel];
  var h='<button class="tf'+(at===null?' on':'')+'" onclick="setTag(\''+panel+'\',null)">全部<\/button>';
  tags.forEach(function(t){
    h+='<button class="tf'+(at===t?' on':'')+'" onclick="setTag(\''+panel+'\',\''+esc(t)+'\')">'+esc(t)+'<\/button>';
  });
  el.innerHTML=h;
}

function setTag(panel, tag){
  atag[panel]=tag;
  if(panel==='notes')renderNotes();
  if(panel==='bookmarks')renderBookmarks();
}

/* ── Sort ── */
function toggleSort(panel){
  sortD[panel]=!sortD[panel];
  var btn=document.getElementById('sort-'+panel);
  btn.textContent=(sortD[panel]?'↓':'↑')+' '+(sortD[panel]?'最新':'最旧');
  if(panel==='notes')renderNotes();
  if(panel==='bookmarks')renderBookmarks();
  if(panel==='backup')renderFiles();
}

/* ──────── NOTES ──────── */
function filtNotes(){
  var q=(document.getElementById('sq-notes').value||'').toLowerCase();
  var tag=atag.notes;
  var d=ND.filter(function(n){
    var mq=!q||(n.title||'').toLowerCase().includes(q)||(n.content||'').toLowerCase().includes(q);
    var mt=!tag||(n.tags||'').split(' ').includes(tag);
    return mq&&mt;
  });
  return sortD.notes?d:d.slice().reverse();
}

function renderNotes(){
  renderTags('tags-notes',getTags(ND,'tags'),'notes');
  var d=filtNotes();
  var el=document.getElementById('notes-list');
  if(!d.length){
    el.innerHTML='<div class="empty"><div class="empty-ico">📝<\/div><p>'+(ND.length?'没有匹配的备忘':'还没有备忘，写下第一条吧 👆')+'<\/p><\/div>';
    return;
  }
  el.innerHTML=d.map(function(n,i){
    var delay=(i*0.04)+'s';
    if(editId===n.id){
      return '<div class="card" style="animation-delay:'+delay+'">'+
        '<div class="edit-zone">'+
        '<input id="et-'+n.id+'" value="'+esc(n.title)+'">'+
        '<textarea id="ec-'+n.id+'" rows="3">'+esc(n.content||'')+'<\/textarea>'+
        '<input id="eg-'+n.id+'" value="'+esc(n.tags||'')+'" placeholder="标签（空格分隔）">'+
        '<div class="edit-btns">'+
        '<button class="btn btn-p btn-sm" onclick="saveEdit('+n.id+')">保存<\/button>'+
        '<button class="btn btn-g btn-sm" onclick="cancelEdit()">取消<\/button>'+
        '<\/div><\/div><\/div>';
    }
    var tags=n.tags?(n.tags.split(' ').filter(Boolean).map(function(t){return '<span class="pill">'+esc(t)+'<\/span>';}).join('')):'';
    return '<div class="card" style="animation-delay:'+delay+'">'+
      '<div class="chead"><div style="flex:1;min-width:0">'+
      '<div class="ctitle">'+esc(n.title)+'<\/div>'+
      (n.content?'<div class="cbody">'+esc(n.content)+'<\/div>':'')+
      '<\/div><div class="acts">'+
      '<button class="ibtn edt" onclick="startEdit('+n.id+')" title="编辑">✏️<\/button>'+
      '<button class="ibtn del" onclick="delNote('+n.id+')" title="删除">🗑<\/button>'+
      '<\/div><\/div>'+
      '<div class="cfoot">'+tags+'<span class="ts">'+fmtDate(n.created_at)+'<\/span><\/div>'+
      '<\/div>';
  }).join('');
}

async function addNote(){
  var title=document.getElementById('n-title').value.trim();
  var content=document.getElementById('n-content').value.trim();
  var tags=document.getElementById('n-tags').value.trim();
  if(!title)return toast('请输入标题','err');
  var tmp={id:Date.now(),title:title,content:content,tags:tags,created_at:new Date().toISOString()};
  ND.unshift(tmp);updBadges();renderNotes();
  ['n-title','n-content','n-tags'].forEach(function(id){document.getElementById(id).value='';});
  document.getElementById('n-cnt').textContent='0';
  try{await api('/notes','POST',{title:title,content:content,tags:tags});toast('已添加','ok');loadNotes();}
  catch(e){toast('同步失败：'+e.message,'err');ND=ND.filter(function(n){return n.id!==tmp.id;});renderNotes();updBadges();}
}

function startEdit(id){editId=id;renderNotes();setTimeout(function(){var el=document.getElementById('et-'+id);if(el)el.focus();},50);}
function cancelEdit(){editId=null;renderNotes();}

async function saveEdit(id){
  var t=document.getElementById('et-'+id).value.trim();
  var c=document.getElementById('ec-'+id).value.trim();
  var g=document.getElementById('eg-'+id).value.trim();
  if(!t)return toast('标题不能为空','err');
  var idx=ND.findIndex(function(n){return n.id===id;});
  if(idx>-1)ND[idx]=Object.assign({},ND[idx],{title:t,content:c,tags:g});
  editId=null;renderNotes();
  try{await api('/notes/'+id,'PATCH',{title:t,content:c,tags:g});toast('已更新','ok');}
  catch(e){toast('更新失败：'+e.message,'err');loadNotes();}
}

async function delNote(id){
  if(!await confirmDlg('确定删除这条备忘吗？此操作无法撤销。'))return;
  ND=ND.filter(function(n){return n.id!==id;});updBadges();renderNotes();
  try{await api('/notes/'+id,'DELETE');toast('已删除','ok');}
  catch(e){toast('删除失败：'+e.message,'err');loadNotes();}
}

async function loadNotes(){
  try{ND=await api('/notes');updBadges();renderNotes();}
  catch(e){document.getElementById('notes-list').innerHTML='<div class="empty"><div class="empty-ico">⚠️<\/div><p>加载失败：'+e.message+'<\/p><\/div>';}
}

/* ──────── BOOKMARKS ──────── */
function filtBMs(){
  var q=(document.getElementById('sq-bookmarks').value||'').toLowerCase();
  var tag=atag.bookmarks;
  var d=BD.filter(function(b){
    var mq=!q||(b.title||'').toLowerCase().includes(q)||(b.url||'').toLowerCase().includes(q)||(b.tags||'').toLowerCase().includes(q);
    var mt=!tag||(b.tags||'').split(' ').includes(tag);
    return mq&&mt;
  });
  return sortD.bookmarks?d:d.slice().reverse();
}

function renderBookmarks(){
  renderTags('tags-bookmarks',getTags(BD,'tags'),'bookmarks');
  var d=filtBMs();
  var el=document.getElementById('bookmarks-list');
  if(!d.length){
    el.innerHTML='<div class="empty"><div class="empty-ico">🔖<\/div><p>'+(BD.length?'没有匹配的收藏':'还没有收藏，添加第一个 👆')+'<\/p><\/div>';
    return;
  }
  el.innerHTML=d.map(function(b,i){
    var tags=b.tags?(b.tags.split(' ').filter(Boolean).map(function(t){return '<span class="pill">'+esc(t)+'<\/span>';}).join('')):'';
    return '<div class="card" style="animation-delay:'+(i*0.04)+'s">'+
      '<div class="chead"><div style="flex:1;min-width:0">'+
      '<a href="'+esc(b.url)+'" target="_blank" rel="noopener" class="bm-link">'+esc(b.title)+'<\/a>'+
      '<div class="bm-url">'+esc(b.url)+'<\/div><\/div>'+
      '<div class="acts">'+
      '<button class="ibtn cpy" onclick="copyURL(\''+esc(b.url)+'\')" title="复制链接">⎘<\/button>'+
      '<button class="ibtn del" onclick="delBM('+b.id+')" title="删除">🗑<\/button>'+
      '<\/div><\/div>'+
      '<div class="cfoot">'+tags+'<span class="ts">'+fmtDate(b.created_at)+'<\/span><\/div>'+
      '<\/div>';
  }).join('');
}

function copyURL(url){
  navigator.clipboard.writeText(url)
    .then(function(){toast('链接已复制','ok');})
    .catch(function(){toast('复制失败','err');});
}

async function addBookmark(){
  var title=document.getElementById('b-title').value.trim();
  var url=document.getElementById('b-url').value.trim();
  var tags=document.getElementById('b-tags').value.trim();
  if(!title||!url)return toast('请填写名称和链接','err');
  if(!/^https?:\/\//i.test(url))url='https://'+url;
  var tmp={id:Date.now(),title:title,url:url,tags:tags,created_at:new Date().toISOString()};
  BD.unshift(tmp);updBadges();renderBookmarks();
  ['b-title','b-url','b-tags'].forEach(function(id){document.getElementById(id).value='';});
  try{await api('/bookmarks','POST',{title:title,url:url,tags:tags});toast('已添加','ok');loadBookmarks();}
  catch(e){toast('同步失败：'+e.message,'err');BD=BD.filter(function(b){return b.id!==tmp.id;});renderBookmarks();updBadges();}
}

async function delBM(id){
  if(!await confirmDlg('确定删除这个收藏吗？'))return;
  BD=BD.filter(function(b){return b.id!==id;});updBadges();renderBookmarks();
  try{await api('/bookmarks/'+id,'DELETE');toast('已删除','ok');}
  catch(e){toast('删除失败：'+e.message,'err');loadBookmarks();}
}

async function loadBookmarks(){
  try{BD=await api('/bookmarks');updBadges();renderBookmarks();}
  catch(e){document.getElementById('bookmarks-list').innerHTML='<div class="empty"><div class="empty-ico">⚠️<\/div><p>加载失败：'+e.message+'<\/p><\/div>';}
}

/* ──────── FILES ──────── */
function filtFiles(){
  var q=(document.getElementById('sq-backup').value||'').toLowerCase();
  var d=FD.filter(function(f){return !q||(f.name||'').toLowerCase().includes(q);});
  return sortD.backup?d:d.slice().reverse();
}

function renderFiles(){
  var d=filtFiles();
  var el=document.getElementById('files-list');
  if(!d.length){
    el.innerHTML='<div class="empty"><div class="empty-ico">💾<\/div><p>'+(FD.length?'没有匹配的文件':'还没有备份记录')+'<\/p><\/div>';
    return;
  }
  el.innerHTML=d.map(function(f,i){
    return '<div class="card" style="animation-delay:'+(i*0.04)+'s">'+
      '<div class="fcard-inner">'+
      '<div class="ficon">'+fileIco(f.name)+'<\/div>'+
      '<div style="flex:1;min-width:0"><div class="fname">'+esc(f.name)+'<\/div>'+
      '<div class="fmeta">'+fmtSize(f.size)+'&ensp;·&ensp;'+fmtDate(f.date)+'<\/div><\/div>'+
      '<button class="ibtn del" onclick="delFile('+f.id+')" title="删除记录">🗑<\/button>'+
      '<\/div><\/div>';
  }).join('');
}

function onFileSel(input){
  curFile=input.files[0];
  if(curFile){
    document.getElementById('drop-text').style.display='none';
    var si=document.getElementById('sel-info');
    si.style.display='flex';
    document.getElementById('sel-name').textContent='📄 '+curFile.name+' · '+fmtSize(curFile.size);
  }
}

async function backupFile(){
  if(!curFile)return toast('请先选择文件','err');
  var f=curFile;
  var url=URL.createObjectURL(f);
  var a=document.createElement('a');a.href=url;a.download=f.name;a.click();
  URL.revokeObjectURL(url);
  var tmp={id:Date.now(),name:f.name,size:f.size,date:new Date().toISOString()};
  FD.unshift(tmp);updBadges();renderFiles();
  curFile=null;
  document.getElementById('f-input').value='';
  document.getElementById('drop-text').style.display='';
  document.getElementById('sel-info').style.display='none';
  try{await api('/files','POST',{name:f.name,size:f.size});toast('文件已下载并记录','ok');loadFiles();}
  catch(e){toast('记录同步失败：'+e.message,'err');FD=FD.filter(function(x){return x.id!==tmp.id;});renderFiles();updBadges();}
}

async function delFile(id){
  if(!await confirmDlg('确定删除这条备份记录吗？'))return;
  FD=FD.filter(function(f){return f.id!==id;});updBadges();renderFiles();
  try{await api('/files/'+id,'DELETE');toast('已删除','ok');}
  catch(e){toast('删除失败：'+e.message,'err');loadFiles();}
}

async function loadFiles(){
  try{FD=await api('/files');updBadges();renderFiles();}
  catch(e){document.getElementById('files-list').innerHTML='<div class="empty"><div class="empty-ico">⚠️<\/div><p>加载失败：'+e.message+'<\/p><\/div>';}
}

/* ── Drag & drop ── */
var dz=document.getElementById('dropzone');
dz.addEventListener('dragover',function(e){e.preventDefault();dz.classList.add('drag');});
dz.addEventListener('dragleave',function(){dz.classList.remove('drag');});
dz.addEventListener('drop',function(e){
  e.preventDefault();dz.classList.remove('drag');
  var f=e.dataTransfer.files[0];
  if(f){
    var dt=new DataTransfer();dt.items.add(f);
    document.getElementById('f-input').files=dt.files;
    onFileSel(document.getElementById('f-input'));
  }
});

/* ── Keyboard shortcuts ── */
document.addEventListener('keydown',function(e){
  if((e.ctrlKey||e.metaKey)&&e.key==='Enter'){
    var p=document.querySelector('.panel.active');
    if(!p)return;
    if(p.id==='panel-notes')addNote();
    else if(p.id==='panel-bookmarks')addBookmark();
    else if(p.id==='panel-backup')backupFile();
  }
  if(e.key==='Escape'){document.getElementById('modal').classList.remove('show');}
});

/* ── Init ── */
async function init(){
  try{
    await api('/notes');
    setStatus('ok','已连接 Supabase');
    Promise.all([loadNotes(),loadBookmarks(),loadFiles()]);
  }catch(e){
    setStatus('err','连接失败');
    toast('连接 Supabase 失败：'+e.message,'err');
  }
}
init();
<\/script>
</body>
</html>`;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (path === '/' || path === '/index.html') {
      return new Response(HTML, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    }

    const SUPABASE_URL = env.SUPABASE_URL;
    const SUPABASE_KEY = env.SUPABASE_KEY;

    if (!SUPABASE_URL || !SUPABASE_KEY) {
      return json({ error: '请配置 SUPABASE_URL 和 SUPABASE_KEY 环境变量' }, 500);
    }

    const h = {
      'apikey': SUPABASE_KEY,
      'Authorization': 'Bearer ' + SUPABASE_KEY,
      'Content-Type': 'application/json'
    };

    try {
      // ── Notes ──
      if (path === '/api/notes' && request.method === 'GET') {
        const r = await fetch(SUPABASE_URL + '/rest/v1/notes?select=*&order=created_at.desc', { headers: h });
        return new Response(r.body, { status: r.status, headers: { 'Content-Type': 'application/json' } });
      }
      if (path === '/api/notes' && request.method === 'POST') {
        const body = await request.json();
        const r = await fetch(SUPABASE_URL + '/rest/v1/notes', {
          method: 'POST', headers: Object.assign({}, h, { 'Prefer': 'return=minimal' }),
          body: JSON.stringify(body)
        });
        return new Response(null, { status: r.status });
      }
      if (path.startsWith('/api/notes/') && request.method === 'PATCH') {
        const id = path.split('/')[3];
        const body = await request.json();
        const r = await fetch(SUPABASE_URL + '/rest/v1/notes?id=eq.' + id, {
          method: 'PATCH', headers: Object.assign({}, h, { 'Prefer': 'return=minimal' }),
          body: JSON.stringify(body)
        });
        return new Response(null, { status: r.status });
      }
      if (path.startsWith('/api/notes/') && request.method === 'DELETE') {
        const id = path.split('/')[3];
        await fetch(SUPABASE_URL + '/rest/v1/notes?id=eq.' + id, { method: 'DELETE', headers: h });
        return json({ ok: true });
      }

      // ── Bookmarks ──
      if (path === '/api/bookmarks' && request.method === 'GET') {
        const r = await fetch(SUPABASE_URL + '/rest/v1/bookmarks?select=*&order=created_at.desc', { headers: h });
        return new Response(r.body, { status: r.status, headers: { 'Content-Type': 'application/json' } });
      }
      if (path === '/api/bookmarks' && request.method === 'POST') {
        const body = await request.json();
        const r = await fetch(SUPABASE_URL + '/rest/v1/bookmarks', {
          method: 'POST', headers: Object.assign({}, h, { 'Prefer': 'return=minimal' }),
          body: JSON.stringify(body)
        });
        return new Response(null, { status: r.status });
      }
      if (path.startsWith('/api/bookmarks/') && request.method === 'DELETE') {
        const id = path.split('/')[3];
        await fetch(SUPABASE_URL + '/rest/v1/bookmarks?id=eq.' + id, { method: 'DELETE', headers: h });
        return json({ ok: true });
      }

      // ── Files ──
      if (path === '/api/files' && request.method === 'GET') {
        const r = await fetch(SUPABASE_URL + '/rest/v1/files?select=*&order=date.desc', { headers: h });
        return new Response(r.body, { status: r.status, headers: { 'Content-Type': 'application/json' } });
      }
      if (path === '/api/files' && request.method === 'POST') {
        const body = await request.json();
        const r = await fetch(SUPABASE_URL + '/rest/v1/files', {
          method: 'POST', headers: Object.assign({}, h, { 'Prefer': 'return=minimal' }),
          body: JSON.stringify(body)
        });
        return new Response(null, { status: r.status });
      }
      if (path.startsWith('/api/files/') && request.method === 'DELETE') {
        const id = path.split('/')[3];
        await fetch(SUPABASE_URL + '/rest/v1/files?id=eq.' + id, { method: 'DELETE', headers: h });
        return json({ ok: true });
      }

      return json({ error: 'Not found' }, 404);
    } catch (e) {
      return json({ error: e.message }, 500);
    }
  }
};

function json(data, status) {
  return new Response(JSON.stringify(data), {
    status: status || 200,
    headers: { 'Content-Type': 'application/json; charset=utf-8' }
  });
}
