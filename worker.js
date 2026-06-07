const HTML = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>个人站</title>
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📦</text></svg>">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/marked@9/marked.min.js"><\/script>
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#060a10;--bg2:#0c1018;
  --s0:rgba(255,255,255,0.03);--s1:rgba(255,255,255,0.055);--s2:rgba(255,255,255,0.085);
  --b0:rgba(255,255,255,0.07);--b1:rgba(255,255,255,0.13);
  --ac:#6366f1;--ac2:#818cf8;--acg:rgba(99,102,241,0.18);--acs:rgba(99,102,241,0.07);
  --tx:#e2e8f0;--ts:#8892a4;--tm:#475569;
  --re:#f43f5e;--gr:#10b981;--ye:#f59e0b;
  --r:14px;--rs:9px;
  --font:'DM Sans',sans-serif;--display:'Syne',sans-serif;--mono:'JetBrains Mono',monospace;
}
html{scroll-behavior:smooth}
body{font-family:var(--font);background:var(--bg);color:var(--tx);min-height:100vh;font-size:15px;
  background-image:radial-gradient(ellipse 110% 55% at 10% -5%,rgba(99,102,241,.09) 0%,transparent 55%),
  radial-gradient(ellipse 70% 45% at 92% 105%,rgba(99,102,241,.06) 0%,transparent 50%);}

/* ── Login ── */
#login-screen{position:fixed;inset:0;z-index:10000;display:flex;align-items:center;justify-content:center;
  background:var(--bg);background-image:inherit;transition:opacity .4s}
#login-screen.out{opacity:0;pointer-events:none}
.lbox{background:var(--s0);border:1px solid var(--b0);border-radius:20px;padding:40px 36px;
  max-width:360px;width:90%;text-align:center;box-shadow:0 30px 80px rgba(0,0,0,.5)}
.lbox h1{font-family:var(--display);font-size:1.6rem;font-weight:800;margin:10px 0 6px;
  background:linear-gradient(130deg,#c7d2fe,#6366f1);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.lbox p{color:var(--ts);font-size:.875rem;margin-bottom:22px}
.lbox input{width:100%;background:rgba(255,255,255,.05);border:1px solid var(--b0);border-radius:var(--rs);
  padding:12px 14px;color:var(--tx);font-family:var(--font);font-size:.9rem;outline:none;
  text-align:center;letter-spacing:.08em;margin-bottom:10px;transition:border-color .2s,box-shadow .2s}
.lbox input:focus{border-color:rgba(99,102,241,.45);box-shadow:0 0 0 3px rgba(99,102,241,.1)}
.lbox .l-btn{width:100%;padding:12px;border-radius:var(--rs);border:none;background:var(--ac);
  color:#fff;font-family:var(--font);font-size:.9rem;font-weight:600;cursor:pointer;transition:all .2s}
.lbox .l-btn:hover{background:#5457e0;transform:translateY(-1px);box-shadow:0 6px 20px rgba(99,102,241,.35)}
.lbox .l-btn:disabled{opacity:.6;transform:none;cursor:wait}
.l-err{color:#fda4af;font-size:.8rem;margin-top:8px;min-height:18px}
.l-remember{display:flex;align-items:center;justify-content:center;gap:6px;margin-top:12px;
  font-size:.78rem;color:var(--ts);cursor:pointer}
.l-remember input{width:auto;margin:0;padding:0;letter-spacing:0}

/* ── App ── */
.app{max-width:880px;margin:0 auto;padding:36px 22px 100px}
header{display:flex;align-items:center;justify-content:space-between;margin-bottom:32px;gap:12px}
.logo{font-family:var(--display);font-size:1.4rem;font-weight:800;letter-spacing:-.02em;
  background:linear-gradient(130deg,#c7d2fe 0%,#818cf8 50%,#6366f1 100%);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;flex-shrink:0}
.hdr-right{display:flex;align-items:center;gap:8px}
#status-dot{display:flex;align-items:center;gap:7px;font-size:.78rem;color:var(--ts);
  background:var(--s0);border:1px solid var(--b0);border-radius:99px;padding:5px 13px}
#status-dot .pip{width:7px;height:7px;border-radius:50%;background:var(--ye);
  box-shadow:0 0 6px var(--ye);animation:blink 1.6s ease infinite}
#status-dot.ok .pip{background:var(--gr);box-shadow:0 0 6px var(--gr);animation:none}
#status-dot.err .pip{background:var(--re);box-shadow:0 0 6px var(--re);animation:none}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.35}}
.logout-btn{padding:5px 12px;border-radius:99px;border:1px solid var(--b0);background:var(--s1);
  color:var(--ts);font-family:var(--font);font-size:.75rem;cursor:pointer;transition:all .2s;
  display:none}
.logout-btn:hover{color:var(--re);border-color:rgba(244,63,94,.3)}

/* ── Tabs ── */
.tabs{display:flex;gap:3px;background:var(--s0);border:1px solid var(--b0);
  border-radius:var(--r);padding:5px;margin-bottom:26px}
.tab-btn{flex:1;display:flex;align-items:center;justify-content:center;gap:7px;
  padding:9px 12px;border-radius:var(--rs);border:none;font-family:var(--font);font-size:.84rem;
  font-weight:600;color:var(--ts);background:none;cursor:pointer;transition:all .18s}
.tab-btn:hover{color:var(--tx);background:var(--s1)}
.tab-btn.active{background:var(--s2);color:var(--tx);box-shadow:0 1px 4px rgba(0,0,0,.35),inset 0 0 0 1px var(--b1)}
.badge{font-size:.7rem;font-weight:700;padding:1px 7px;border-radius:99px;
  background:var(--acg);color:var(--ac2);transition:all .2s;display:inline-block}
@keyframes badgePop{0%{transform:scale(1)}40%{transform:scale(1.6)}70%{transform:scale(.9)}100%{transform:scale(1)}}
.badge.pop{animation:badgePop .35s ease}

/* ── Form ── */
.form-card{background:var(--s0);border:1px solid var(--b0);border-radius:var(--r);padding:20px;margin-bottom:22px}
.fgrid{display:flex;flex-direction:column;gap:10px}
.frow{display:grid;grid-template-columns:1fr 1fr;gap:10px}
input,textarea{width:100%;background:rgba(255,255,255,.045);border:1px solid var(--b0);
  border-radius:var(--rs);padding:10px 13px;color:var(--tx);font-family:var(--font);
  font-size:.875rem;outline:none;resize:none;transition:border-color .18s,box-shadow .18s,background .18s}
input::placeholder,textarea::placeholder{color:var(--tm)}
input:focus,textarea:focus{border-color:rgba(99,102,241,.45);background:rgba(99,102,241,.04);
  box-shadow:0 0 0 3px rgba(99,102,241,.1)}
.ffoot{display:flex;align-items:center;justify-content:space-between}
.char-count{font-size:.73rem;color:var(--tm);font-family:var(--mono)}

/* ── Buttons ── */
.btn{display:inline-flex;align-items:center;gap:6px;padding:9px 18px;border-radius:var(--rs);
  border:none;font-family:var(--font);font-size:.84rem;font-weight:600;cursor:pointer;transition:all .18s}
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
.srch-ico{position:absolute;left:11px;top:50%;transform:translateY(-50%);color:var(--tm);font-size:.8rem;pointer-events:none}
.srch input{padding-left:32px!important;padding-right:32px!important}
.srch-clr{position:absolute;right:9px;top:50%;transform:translateY(-50%);
  width:18px;height:18px;border-radius:50%;border:none;background:var(--s2);color:var(--ts);
  font-size:.7rem;cursor:pointer;display:none;align-items:center;justify-content:center;
  transition:all .15s;line-height:1}
.srch-clr:hover{background:var(--b1);color:var(--tx)}
.srch-clr.show{display:flex}
.sort-btn{display:flex;align-items:center;gap:5px;padding:8px 12px;border-radius:var(--rs);
  background:var(--s0);border:1px solid var(--b0);color:var(--ts);font-family:var(--font);
  font-size:.79rem;font-weight:500;cursor:pointer;transition:all .18s;white-space:nowrap}
.sort-btn:hover{color:var(--tx);background:var(--s1)}
.exp-btn{display:flex;align-items:center;gap:5px;padding:8px 12px;border-radius:var(--rs);
  background:var(--s0);border:1px solid var(--b0);color:var(--ts);font-family:var(--font);
  font-size:.79rem;font-weight:500;cursor:pointer;transition:all .18s;white-space:nowrap}
.exp-btn:hover{background:var(--acg);border-color:rgba(99,102,241,.3);color:var(--ac2)}

/* ── Tag filters ── */
.tag-row{display:flex;gap:5px;flex-wrap:wrap;margin-bottom:14px}
.tf{padding:4px 11px;border-radius:99px;font-size:.74rem;font-weight:500;
  background:var(--s1);border:1px solid var(--b0);color:var(--ts);cursor:pointer;transition:all .18s}
.tf:hover{color:var(--tx);border-color:var(--b1)}
.tf.on{background:var(--acg);border-color:rgba(99,102,241,.35);color:var(--ac2)}

/* ── Skeleton ── */
.skel-card{pointer-events:none}
.skel-line{border-radius:6px;height:14px;
  background:linear-gradient(90deg,var(--s1) 25%,var(--s2) 50%,var(--s1) 75%);
  background-size:200% 100%;animation:shimmer 1.6s infinite}
@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}

/* ── Cards ── */
.list{display:flex;flex-direction:column;gap:10px}
.card{background:var(--s0);border:1px solid var(--b0);border-radius:var(--r);
  padding:16px 18px;transition:border-color .18s,box-shadow .18s,transform .18s;
  animation:fadeUp .22s ease both}
.card:hover{border-color:var(--b1);box-shadow:0 6px 28px rgba(0,0,0,.28);transform:translateY(-1px)}
@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
.chead{display:flex;align-items:flex-start;justify-content:space-between;gap:12px}
.ctitle{font-weight:700;font-size:.94rem;letter-spacing:-.01em;line-height:1.4}
.cbody{color:var(--ts);font-size:.875rem;margin-top:7px;line-height:1.75;overflow:hidden;
  transition:max-height .3s ease}
.cbody.clamped{max-height:78px;position:relative}
.cbody.clamped::after{content:'';position:absolute;bottom:0;left:0;right:0;height:30px;
  background:linear-gradient(transparent,var(--bg2))}
.cbody p{margin-bottom:.5em}.cbody p:last-child{margin-bottom:0}
.cbody h1,.cbody h2,.cbody h3{font-size:1em;font-weight:700;color:var(--tx);margin:.4em 0}
.cbody code{font-family:var(--mono);font-size:.82em;background:var(--s2);padding:1px 5px;border-radius:4px}
.cbody pre{background:var(--s2);border-radius:var(--rs);padding:10px 12px;overflow-x:auto;margin:.5em 0}
.cbody pre code{background:none;padding:0}
.cbody ul,.cbody ol{padding-left:1.4em}
.cbody a{color:var(--ac2)}
.expand-toggle{display:inline-flex;align-items:center;gap:4px;margin-top:6px;
  font-size:.75rem;color:var(--ac2);cursor:pointer;border:none;background:none;
  font-family:var(--font);font-weight:500;padding:0;transition:color .15s}
.expand-toggle:hover{color:#c7d2fe}
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
.bm-link{color:var(--ac2);font-weight:700;font-size:.94rem;text-decoration:none;
  letter-spacing:-.01em;transition:color .18s}
.bm-link:hover{color:#c7d2fe}
.bm-url{color:var(--tm);font-size:.72rem;font-family:var(--mono);margin-top:3px;
  overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:420px}
.dedup-warn{font-size:.75rem;color:var(--ye);margin-top:4px;display:none}
.edit-zone{display:flex;flex-direction:column;gap:8px;margin-top:4px}
.edit-btns{display:flex;gap:7px}
.fcard-inner{display:flex;align-items:center;gap:14px}
.ficon{width:42px;height:42px;border-radius:var(--rs);background:var(--s1);
  border:1px solid var(--b0);display:flex;align-items:center;justify-content:center;
  font-size:1.3rem;flex-shrink:0}
.fname{font-weight:600;font-size:.9rem}
.fmeta{font-size:.74rem;color:var(--ts);margin-top:2px;font-family:var(--mono)}
.dropzone{border:2px dashed var(--b0);border-radius:var(--r);padding:36px 24px;
  text-align:center;cursor:pointer;transition:all .2s;color:var(--ts);font-size:.875rem}
.dropzone:hover,.dropzone.drag{border-color:rgba(99,102,241,.5);background:var(--acs);color:var(--tx)}
.dropzone input[type=file]{display:none}
.drop-ico{font-size:2.5rem;margin-bottom:10px}
.sel-info{display:none;align-items:center;justify-content:space-between;
  margin-top:14px;padding:12px 14px;background:var(--s1);border-radius:var(--rs);border:1px solid var(--b0)}
.sel-name{font-size:.875rem;font-weight:500;color:var(--tx);min-width:0;
  overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-right:12px}
.empty{text-align:center;padding:56px 20px;color:var(--tm)}
.empty-ico{font-size:2.8rem;margin-bottom:12px;opacity:.45}
.empty p{font-size:.875rem;line-height:1.6}
.draft-hint{font-size:.73rem;color:var(--ye);margin-top:-4px;display:none}
.draft-hint.show{display:block}

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
.panel{display:none}
.panel.active{display:block;animation:pIn .18s ease}
@keyframes pIn{from{opacity:0}to{opacity:1}}

/* ── URL title loading ── */
.title-loading::placeholder{color:var(--ac2)!important;animation:blink 1s infinite}

/* ── Responsive ── */
@media(max-width:580px){
  .app{padding:22px 14px 70px}
  .frow{grid-template-columns:1fr}
  .tabs{gap:2px;padding:4px}
  .tab-btn{padding:8px 8px;font-size:.78rem}
  .tab-btn .tab-lbl{display:none}
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

<div id="login-screen">
  <div class="lbox">
    <div style="font-size:3.2rem">📦</div>
    <h1>个人站</h1>
    <p id="login-sub">请输入访问密码</p>
    <input type="password" id="pwd" placeholder="••••••••" autocomplete="current-password"
      onkeydown="if(event.key==='Enter')doLogin()">
    <p class="l-err" id="l-err"></p>
    <button class="l-btn" id="l-btn" onclick="doLogin()">进入 →</button>
    <label class="l-remember"><input type="checkbox" id="rememberMe"> 记住我（7天）</label>
  </div>
</div>

<div id="app" style="display:none">
  <div class="app">
    <header>
      <div class="logo">📦 个人站</div>
      <div class="hdr-right">
        <div id="status-dot"><span class="pip"></span><span id="status-txt">连接中…</span></div>
        <button class="logout-btn" id="logout-btn" onclick="doLogout()">退出</button>
      </div>
    </header>

    <div class="tabs">
      <button class="tab-btn active" id="tab-notes" onclick="switchTab('notes')">
        📝 <span class="tab-lbl">备忘</span><span class="badge" id="badge-notes">0</span>
      </button>
      <button class="tab-btn" id="tab-bookmarks" onclick="switchTab('bookmarks')">
        🔖 <span class="tab-lbl">收藏</span><span class="badge" id="badge-bookmarks">0</span>
      </button>
      <button class="tab-btn" id="tab-backup" onclick="switchTab('backup')">
        💾 <span class="tab-lbl">备份</span><span class="badge" id="badge-backup">0</span>
      </button>
    </div>

    <!-- Notes -->
    <div id="panel-notes" class="panel active">
      <div class="form-card">
        <div class="fgrid">
          <input id="n-title" placeholder="标题" maxlength="100" oninput="saveDraft('n-title',this.value)">
          <textarea id="n-content" placeholder="内容…支持 Markdown" rows="3" maxlength="5000"
            oninput="saveDraft('n-content',this.value);updCount(this,'n-cnt')"></textarea>
          <div class="frow">
            <div>
              <input id="n-tags" placeholder="标签（空格分隔）" oninput="saveDraft('n-tags',this.value)">
              <p class="draft-hint" id="draft-hint-notes">📝 已恢复草稿</p>
            </div>
            <div class="ffoot">
              <span class="char-count"><span id="n-cnt">0</span>/5000</span>
              <button class="btn btn-p" onclick="addNote()">＋ 添加</button>
            </div>
          </div>
        </div>
      </div>
      <div class="toolbar">
        <div class="srch">
          <span class="srch-ico">🔍</span>
          <input id="sq-notes" placeholder="搜索备忘…" oninput="onSearch(this,'notes','sqc-notes')">
          <button class="srch-clr" id="sqc-notes" onclick="clrSearch('notes')">✕</button>
        </div>
        <button class="sort-btn" onclick="toggleSort('notes')" id="sort-notes">↓ 最新</button>
        <button class="exp-btn" onclick="exportNotes()" title="导出为 Markdown">⬇ 导出</button>
      </div>
      <div id="tags-notes" class="tag-row"></div>
      <div id="notes-list" class="list"></div>
    </div>

    <!-- Bookmarks -->
    <div id="panel-bookmarks" class="panel">
      <div class="form-card">
        <div class="fgrid">
          <div class="frow">
            <div>
              <input id="b-title" placeholder="网站名称（粘贴链接后自动获取）">
            </div>
            <div>
              <input id="b-url" placeholder="https://…" onpaste="onUrlPaste()" oninput="onUrlInput()">
              <p class="dedup-warn" id="dedup-warn">⚠️ 该链接已收藏过</p>
            </div>
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
          <span class="srch-ico">🔍</span>
          <input id="sq-bookmarks" placeholder="搜索收藏…" oninput="onSearch(this,'bookmarks','sqc-bookmarks')">
          <button class="srch-clr" id="sqc-bookmarks" onclick="clrSearch('bookmarks')">✕</button>
        </div>
        <button class="sort-btn" onclick="toggleSort('bookmarks')" id="sort-bookmarks">↓ 最新</button>
        <button class="exp-btn" onclick="exportBookmarks()" title="导出为 JSON">⬇ 导出</button>
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
          <span class="srch-ico">🔍</span>
          <input id="sq-backup" placeholder="搜索文件…" oninput="onSearch(this,'backup','sqc-backup')">
          <button class="srch-clr" id="sqc-backup" onclick="clrSearch('backup')">✕</button>
        </div>
        <button class="sort-btn" onclick="toggleSort('backup')" id="sort-backup">↓ 最新</button>
      </div>
      <div id="files-list" class="list"></div>
    </div>
  </div>
</div>

<script>
/* ═══ STATE ═══ */
var ND=[], BD=[], FD=[];
var atag={notes:null, bookmarks:null};
var sortD={notes:true, bookmarks:true, backup:true};
var editId=null;
var curFile=null;
var expandedNotes=[];
var prevCounts={notes:-1, bookmarks:-1, backup:-1};
var currentToken='';
var authRequired=false;

/* ═══ UTILS ═══ */
function esc(t){if(!t)return'';return(t+'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function fmtDate(d){
  var dt=new Date(d);
  var M=['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
  return M[dt.getMonth()]+dt.getDate()+'日 '+String(dt.getHours()).padStart(2,'0')+':'+String(dt.getMinutes()).padStart(2,'0');
}
function fmtSize(b){if(!b)return'—';if(b<1024)return b+'B';if(b<1048576)return(b/1024).toFixed(1)+'KB';return(b/1048576).toFixed(2)+'MB';}
function fileIco(n){
  var e=((n||'').split('.').pop()||'').toLowerCase();
  var m={pdf:'📄',doc:'📝',docx:'📝',xls:'📊',xlsx:'📊',ppt:'📋',pptx:'📋',
    zip:'📦',rar:'📦','7z':'📦',tar:'📦',gz:'📦',
    jpg:'🖼',jpeg:'🖼',png:'🖼',gif:'🎞',svg:'🎨',webp:'🖼',
    mp4:'🎬',mov:'🎬',avi:'🎬',mkv:'🎬',
    mp3:'🎵',wav:'🎵',flac:'🎵',m4a:'🎵',
    js:'⚡',ts:'⚡',py:'🐍',json:'📋',html:'🌐',css:'🎨',sh:'⌨',go:'🐹',
    txt:'📄',md:'📝',csv:'📊',sql:'🗄',env:'🔑'};
  return m[e]||'📁';
}
function mdRender(t){
  if(!t)return'';
  try{if(typeof marked!=='undefined')return marked.parse(t,{breaks:true});}catch(e){}
  return esc(t).replace(/\n/g,'<br>');
}
function updCount(el,id){document.getElementById(id).textContent=el.value.length;}

/* ═══ DRAFT ═══ */
function saveDraft(k,v){try{localStorage.setItem('wjk_d_'+k,v);}catch(e){}}
function loadDraft(k){try{return localStorage.getItem('wjk_d_'+k)||'';}catch(e){return '';}}
function clrDraft(keys){keys.forEach(function(k){try{localStorage.removeItem('wjk_d_'+k);}catch(e){}});}
function restoreDrafts(){
  var keys=['n-title','n-content','n-tags'];
  var any=false;
  keys.forEach(function(k){var v=loadDraft(k);if(v){document.getElementById(k).value=v;any=true;}});
  if(any){
    document.getElementById('n-cnt').textContent=document.getElementById('n-content').value.length;
    document.getElementById('draft-hint-notes').classList.add('show');
    setTimeout(function(){document.getElementById('draft-hint-notes').classList.remove('show');},3000);
  }
}

/* ═══ API ═══ */
async function api(path, method, body){
  var opts={method:method||'GET',headers:{}};
  if(currentToken)opts.headers['X-Token']=currentToken;
  if(body){opts.headers['Content-Type']='application/json';opts.body=JSON.stringify(body);}
  var res=await fetch('/api'+path,opts);
  if(res.status===401){if(authRequired){sessionStorage.removeItem('wjk_t');localStorage.removeItem('wjk_t');showLogin('密码已失效，请重新登录');}throw new Error('Unauthorized');}
  if(!res.ok)throw new Error(res.status+' '+res.statusText);
  if(res.status===204||res.status===201)return null;
  return res.json();
}

/* ═══ TOAST ═══ */
function toast(msg,type){
  var el=document.createElement('div');
  el.className='toast '+(type||'info');
  var ico={ok:'✓',err:'✕',info:'ℹ'};
  el.innerHTML='<b style="font-size:1rem">'+(ico[type]||'ℹ')+'<\/b><span>'+esc(msg)+'<\/span>';
  document.getElementById('toasts').appendChild(el);
  setTimeout(function(){el.classList.add('out');setTimeout(function(){el.remove();},220);},3200);
}

/* ═══ CONFIRM MODAL ═══ */
function confirmDlg(msg){
  return new Promise(function(res){
    var mo=document.getElementById('modal');
    document.getElementById('modal-msg').textContent=msg;
    mo.classList.add('show');
    var ok=document.getElementById('m-ok'),cn=document.getElementById('m-cancel');
    function close(v){mo.classList.remove('show');ok.onclick=null;cn.onclick=null;res(v);}
    ok.onclick=function(){close(true);};cn.onclick=function(){close(false);};
    mo.onclick=function(e){if(e.target===mo)close(false);};
  });
}

/* ═══ STATUS ═══ */
function setStatus(type,txt){
  var el=document.getElementById('status-dot');el.className=type;
  document.getElementById('status-txt').textContent=txt;
}

/* ═══ AUTH ═══ */
function showLogin(msg){
  document.getElementById('login-screen').style.display='';
  document.getElementById('login-screen').classList.remove('out');
  document.getElementById('app').style.display='none';
  if(msg){document.getElementById('l-err').textContent=msg;}
}
function showApp(){
  var ls=document.getElementById('login-screen');
  ls.classList.add('out');
  setTimeout(function(){ls.style.display='none';},400);
  document.getElementById('app').style.display='';
  if(authRequired)document.getElementById('logout-btn').style.display='';
}
async function doLogin(){
  var pwd=document.getElementById('pwd').value;
  var btn=document.getElementById('l-btn');
  if(!pwd)return;
  btn.disabled=true;btn.textContent='验证中…';
  document.getElementById('l-err').textContent='';
  try{
    var res=await fetch('/api/notes',{headers:{'X-Token':pwd}});
    if(res.status===401){document.getElementById('l-err').textContent='密码错误';btn.disabled=false;btn.textContent='进入 →';return;}
    if(!res.ok)throw new Error(res.status);
    currentToken=pwd;
    var rem=document.getElementById('rememberMe').checked;
    if(rem){try{localStorage.setItem('wjk_t',pwd);}catch(e){}}
    sessionStorage.setItem('wjk_t',pwd);
    showApp();
    loadAll();
  }catch(e){document.getElementById('l-err').textContent='连接失败：'+e.message;}
  btn.disabled=false;btn.textContent='进入 →';
}
function doLogout(){
  try{sessionStorage.removeItem('wjk_t');localStorage.removeItem('wjk_t');}catch(e){}
  currentToken='';
  document.getElementById('pwd').value='';
  document.getElementById('l-err').textContent='';
  showLogin();
}

/* ═══ TABS ═══ */
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

/* ═══ BADGES ═══ */
function updBadges(){
  var map={notes:ND.length, bookmarks:BD.length, backup:FD.length};
  Object.keys(map).forEach(function(k){
    var el=document.getElementById('badge-'+k);
    el.textContent=map[k];
    if(prevCounts[k]!==-1 && map[k]!==prevCounts[k]){
      el.classList.remove('pop');void el.offsetWidth;el.classList.add('pop');
    }
    prevCounts[k]=map[k];
  });
}

/* ═══ TAG FILTERS ═══ */
function getTags(data,key){var m={};data.forEach(function(d){(d[key]||'').split(' ').forEach(function(t){if(t)m[t]=(m[t]||0)+1;});});return Object.keys(m).sort();}
function renderTags(cid,tags,panel){
  var el=document.getElementById(cid);if(!tags.length){el.innerHTML='';return;}
  var at=atag[panel];
  var h='<button class="tf'+(at===null?' on':'')+'" onclick="setTag(\''+panel+'\',null)">全部<\/button>';
  tags.forEach(function(t){h+='<button class="tf'+(at===t?' on':'')+'" onclick="setTag(\''+panel+'\',\''+esc(t)+'\')">'+esc(t)+'<\/button>';});
  el.innerHTML=h;
}
function setTag(p,tag){atag[p]=tag;if(p==='notes')renderNotes();if(p==='bookmarks')renderBookmarks();}

/* ═══ SORT ═══ */
function toggleSort(p){
  sortD[p]=!sortD[p];
  document.getElementById('sort-'+p).textContent=(sortD[p]?'↓':'↑')+' '+(sortD[p]?'最新':'最旧');
  if(p==='notes')renderNotes();if(p==='bookmarks')renderBookmarks();if(p==='backup')renderFiles();
}

/* ═══ SEARCH ═══ */
function onSearch(el,panel,clrId){
  document.getElementById(clrId).classList.toggle('show',!!el.value);
  if(panel==='notes')renderNotes();if(panel==='bookmarks')renderBookmarks();if(panel==='backup')renderFiles();
}
function clrSearch(panel){
  document.getElementById('sq-'+panel).value='';
  document.getElementById('sqc-'+panel).classList.remove('show');
  if(panel==='notes')renderNotes();if(panel==='bookmarks')renderBookmarks();if(panel==='backup')renderFiles();
}

/* ═══ EXPORT ═══ */
function dlFile(name,content,type){
  var b=new Blob([content],{type:type});var u=URL.createObjectURL(b);
  var a=document.createElement('a');a.href=u;a.download=name;a.click();URL.revokeObjectURL(u);
}
function exportNotes(){
  if(!ND.length)return toast('暂无数据可导出','err');
  var md='# 备忘导出\n\n';
  ND.forEach(function(n){
    md+='## '+( n.title||'无标题')+'\n\n';
    if(n.content)md+=n.content+'\n\n';
    if(n.tags)md+='**标签：** '+n.tags+'\n\n';
    md+='> '+fmtDate(n.created_at)+'\n\n---\n\n';
  });
  dlFile('notes_'+new Date().toISOString().slice(0,10)+'.md',md,'text/markdown');
  toast('已导出 '+ND.length+' 条备忘','ok');
}
function exportBookmarks(){
  if(!BD.length)return toast('暂无数据可导出','err');
  dlFile('bookmarks_'+new Date().toISOString().slice(0,10)+'.json',JSON.stringify(BD,null,2),'application/json');
  toast('已导出 '+BD.length+' 个书签','ok');
}

/* ═══ SKELETON ═══ */
function skelCards(){
  var h='';
  for(var i=0;i<3;i++){
    h+='<div class="card skel-card" style="animation-delay:'+(i*.1)+'s">'+
      '<div class="skel-line" style="width:55%;margin-bottom:12px"></div>'+
      '<div class="skel-line" style="width:100%;margin-bottom:7px"></div>'+
      '<div class="skel-line" style="width:80%;margin-bottom:14px"></div>'+
      '<div style="display:flex;gap:8px">'+
      '<div class="skel-line" style="width:48px;height:20px;border-radius:99px"></div>'+
      '<div class="skel-line" style="width:64px;height:20px;border-radius:99px"></div>'+
      '<\/div><\/div>';
  }
  return h;
}

/* ═══ NOTES ═══ */
function filtNotes(){
  var q=(document.getElementById('sq-notes').value||'').toLowerCase();
  var tag=atag.notes;
  var d=ND.filter(function(n){
    return (!q||(n.title||'').toLowerCase().includes(q)||(n.content||'').toLowerCase().includes(q))&&
      (!tag||(n.tags||'').split(' ').includes(tag));
  });
  return sortD.notes?d:d.slice().reverse();
}
function renderNotes(){
  renderTags('tags-notes',getTags(ND,'tags'),'notes');
  var d=filtNotes();var el=document.getElementById('notes-list');
  if(!d.length){el.innerHTML='<div class="empty"><div class="empty-ico">📝<\/div><p>'+(ND.length?'没有匹配的备忘':'还没有备忘，写下第一条吧 👆')+'<\/p><\/div>';return;}
  el.innerHTML=d.map(function(n,i){
    var delay=(i*.04)+'s';
    if(editId===n.id){
      return '<div class="card" style="animation-delay:'+delay+'"><div class="edit-zone">'+
        '<input id="et-'+n.id+'" value="'+esc(n.title)+'">'+
        '<textarea id="ec-'+n.id+'" rows="4">'+esc(n.content||'')+'<\/textarea>'+
        '<input id="eg-'+n.id+'" value="'+esc(n.tags||'')+'" placeholder="标签（空格分隔）">'+
        '<div class="edit-btns"><button class="btn btn-p btn-sm" onclick="saveEdit('+n.id+')">保存<\/button>'+
        '<button class="btn btn-g btn-sm" onclick="cancelEdit()">取消<\/button><\/div><\/div><\/div>';
    }
    var raw=n.content||'';
    var isLong=raw.length>160||raw.split('\n').length>3;
    var isExp=expandedNotes.indexOf(n.id)>-1;
    var tags=n.tags?(n.tags.split(' ').filter(Boolean).map(function(t){return '<span class="pill">'+esc(t)+'<\/span>';}).join('')):'';
    return '<div class="card" style="animation-delay:'+delay+'">'+
      '<div class="chead"><div style="flex:1;min-width:0"><div class="ctitle">'+esc(n.title)+'<\/div>'+
      (raw?'<div class="cbody'+(isLong&&!isExp?' clamped':'')+'">'+mdRender(raw)+'<\/div>':'')+
      (isLong?'<button class="expand-toggle" onclick="toggleExpand('+n.id+')">'+(isExp?'▲ 收起':'▼ 展开')+'<\/button>':'')+
      '<\/div><div class="acts">'+
      '<button class="ibtn edt" onclick="startEdit('+n.id+')" title="编辑">✏️<\/button>'+
      '<button class="ibtn del" onclick="delNote('+n.id+')" title="删除">🗑<\/button>'+
      '<\/div><\/div><div class="cfoot">'+tags+'<span class="ts">'+fmtDate(n.created_at)+'<\/span><\/div><\/div>';
  }).join('');
}
function toggleExpand(id){
  var idx=expandedNotes.indexOf(id);
  if(idx>-1)expandedNotes.splice(idx,1);else expandedNotes.push(id);
  renderNotes();
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
  clrDraft(['n-title','n-content','n-tags']);
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
  document.getElementById('notes-list').innerHTML=skelCards();
  try{ND=await api('/notes');updBadges();renderNotes();}
  catch(e){document.getElementById('notes-list').innerHTML='<div class="empty"><div class="empty-ico">⚠️<\/div><p>加载失败：'+e.message+'<\/p><\/div>';}
}

/* ═══ BOOKMARKS ═══ */
function filtBMs(){
  var q=(document.getElementById('sq-bookmarks').value||'').toLowerCase();
  var tag=atag.bookmarks;
  var d=BD.filter(function(b){
    return (!q||(b.title||'').toLowerCase().includes(q)||(b.url||'').toLowerCase().includes(q)||(b.tags||'').toLowerCase().includes(q))&&
      (!tag||(b.tags||'').split(' ').includes(tag));
  });
  return sortD.bookmarks?d:d.slice().reverse();
}
function renderBookmarks(){
  renderTags('tags-bookmarks',getTags(BD,'tags'),'bookmarks');
  var d=filtBMs();var el=document.getElementById('bookmarks-list');
  if(!d.length){el.innerHTML='<div class="empty"><div class="empty-ico">🔖<\/div><p>'+(BD.length?'没有匹配的收藏':'还没有收藏，添加第一个 👆')+'<\/p><\/div>';return;}
  el.innerHTML=d.map(function(b,i){
    var tags=b.tags?(b.tags.split(' ').filter(Boolean).map(function(t){return '<span class="pill">'+esc(t)+'<\/span>';}).join('')):'';
    return '<div class="card" style="animation-delay:'+(i*.04)+'s">'+
      '<div class="chead"><div style="flex:1;min-width:0">'+
      '<a href="'+esc(b.url)+'" target="_blank" rel="noopener" class="bm-link">'+esc(b.title)+'<\/a>'+
      '<div class="bm-url">'+esc(b.url)+'<\/div><\/div>'+
      '<div class="acts">'+
      '<button class="ibtn cpy" onclick="copyURL(\''+esc(b.url)+'\')" title="复制链接">⎘<\/button>'+
      '<button class="ibtn del" onclick="delBM('+b.id+')" title="删除">🗑<\/button>'+
      '<\/div><\/div><div class="cfoot">'+tags+'<span class="ts">'+fmtDate(b.created_at)+'<\/span><\/div><\/div>';
  }).join('');
}
function copyURL(url){navigator.clipboard.writeText(url).then(function(){toast('链接已复制','ok');}).catch(function(){toast('复制失败','err');});}
var dedupTimer=null;
function onUrlInput(){
  var url=document.getElementById('b-url').value.trim();
  var warn=document.getElementById('dedup-warn');
  if(!url){warn.style.display='none';return;}
  var norm=url.toLowerCase().replace(/\/$/,'');
  var dup=BD.some(function(b){return(b.url||'').toLowerCase().replace(/\/$/,'')=== norm;});
  warn.style.display=dup?'block':'none';
}
var titleFetchTimer=null;
function onUrlPaste(){
  clearTimeout(titleFetchTimer);
  titleFetchTimer=setTimeout(function(){
    var url=document.getElementById('b-url').value.trim();
    var tEl=document.getElementById('b-title');
    if(!url||tEl.value)return;
    if(!/^https?:\/\//i.test(url))url='https://'+url;
    tEl.classList.add('title-loading');tEl.placeholder='获取标题中…';
    api('/fetch-title?url='+encodeURIComponent(url)).then(function(d){
      if(d&&d.title&&!tEl.value)tEl.value=d.title;
    }).catch(function(){}).finally(function(){
      tEl.classList.remove('title-loading');tEl.placeholder='网站名称（粘贴链接后自动获取）';
    });
  },300);
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
  document.getElementById('dedup-warn').style.display='none';
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
  document.getElementById('bookmarks-list').innerHTML=skelCards();
  try{BD=await api('/bookmarks');updBadges();renderBookmarks();}
  catch(e){document.getElementById('bookmarks-list').innerHTML='<div class="empty"><div class="empty-ico">⚠️<\/div><p>加载失败：'+e.message+'<\/p><\/div>';}
}

/* ═══ FILES ═══ */
function filtFiles(){
  var q=(document.getElementById('sq-backup').value||'').toLowerCase();
  var d=FD.filter(function(f){return !q||(f.name||'').toLowerCase().includes(q);});
  return sortD.backup?d:d.slice().reverse();
}
function renderFiles(){
  var d=filtFiles();var el=document.getElementById('files-list');
  if(!d.length){el.innerHTML='<div class="empty"><div class="empty-ico">💾<\/div><p>'+(FD.length?'没有匹配的文件':'还没有备份记录')+'<\/p><\/div>';return;}
  el.innerHTML=d.map(function(f,i){
    return '<div class="card" style="animation-delay:'+(i*.04)+'s"><div class="fcard-inner">'+
      '<div class="ficon">'+fileIco(f.name)+'<\/div>'+
      '<div style="flex:1;min-width:0"><div class="fname">'+esc(f.name)+'<\/div>'+
      '<div class="fmeta">'+fmtSize(f.size)+'&ensp;·&ensp;'+fmtDate(f.date)+'<\/div><\/div>'+
      '<button class="ibtn del" onclick="delFile('+f.id+')" title="删除记录">🗑<\/button><\/div><\/div>';
  }).join('');
}
function onFileSel(input){
  curFile=input.files[0];
  if(curFile){
    document.getElementById('drop-text').style.display='none';
    var si=document.getElementById('sel-info');si.style.display='flex';
    document.getElementById('sel-name').textContent='📄 '+curFile.name+' · '+fmtSize(curFile.size);
  }
}
async function backupFile(){
  if(!curFile)return toast('请先选择文件','err');
  var f=curFile;
  var u=URL.createObjectURL(f);var a=document.createElement('a');a.href=u;a.download=f.name;a.click();URL.revokeObjectURL(u);
  var tmp={id:Date.now(),name:f.name,size:f.size,date:new Date().toISOString()};
  FD.unshift(tmp);updBadges();renderFiles();
  curFile=null;document.getElementById('f-input').value='';
  document.getElementById('drop-text').style.display='';document.getElementById('sel-info').style.display='none';
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

/* ═══ DRAG & DROP ═══ */
var dz=document.getElementById('dropzone');
dz.addEventListener('dragover',function(e){e.preventDefault();dz.classList.add('drag');});
dz.addEventListener('dragleave',function(){dz.classList.remove('drag');});
dz.addEventListener('drop',function(e){
  e.preventDefault();dz.classList.remove('drag');
  var f=e.dataTransfer.files[0];
  if(f){var dt=new DataTransfer();dt.items.add(f);document.getElementById('f-input').files=dt.files;onFileSel(document.getElementById('f-input'));}
});

/* ═══ KEYBOARD ═══ */
document.addEventListener('keydown',function(e){
  if((e.ctrlKey||e.metaKey)&&e.key==='Enter'){
    var p=document.querySelector('.panel.active');if(!p)return;
    if(p.id==='panel-notes')addNote();
    else if(p.id==='panel-bookmarks')addBookmark();
    else if(p.id==='panel-backup')backupFile();
  }
  if(e.key==='Escape')document.getElementById('modal').classList.remove('show');
});

/* ═══ INIT ═══ */
async function loadAll(){
  setStatus('ok','已连接 Supabase');
  restoreDrafts();
  Promise.all([loadNotes(),loadBookmarks(),loadFiles()]);
}
async function init(){
  var saved=null;
  try{saved=sessionStorage.getItem('wjk_t')||localStorage.getItem('wjk_t');}catch(e){}
  try{
    var testToken=saved||'';
    var res=await fetch('/api/notes',{headers:testToken?{'X-Token':testToken}:{}});
    if(res.status===401){
      authRequired=true;
      if(saved){
        // Saved token is invalid
        try{sessionStorage.removeItem('wjk_t');localStorage.removeItem('wjk_t');}catch(e){}
        document.getElementById('l-err').textContent='密码已过期，请重新登录';
      }
      showLogin();
    }else if(res.ok){
      currentToken=testToken;
      authRequired=!!testToken;
      showApp();
      loadAll();
    }
  }catch(e){
    authRequired=false;
    if(saved){currentToken=saved;authRequired=true;}
    showApp();loadAll();
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
      return json({ error: '请配置 SUPABASE_URL 和 SUPABASE_KEY' }, 500);
    }

    // ── Auth middleware ──
    if (env.AUTH_PASSWORD) {
      const token = request.headers.get('X-Token');
      if (token !== env.AUTH_PASSWORD) {
        return json({ error: 'Unauthorized' }, 401);
      }
    }

    const h = {
      'apikey': SUPABASE_KEY,
      'Authorization': 'Bearer ' + SUPABASE_KEY,
      'Content-Type': 'application/json'
    };

    try {
      // ── fetch-title ──
      if (path === '/api/fetch-title' && request.method === 'GET') {
        const targetUrl = url.searchParams.get('url');
        if (!targetUrl) return json({ title: '' });
        try {
          const ctrl = new AbortController();
          const tid = setTimeout(() => ctrl.abort(), 5000);
          const r = await fetch(targetUrl, {
            headers: { 'User-Agent': 'Mozilla/5.0 (compatible)' },
            signal: ctrl.signal
          });
          clearTimeout(tid);
          const text = await r.text();
          const m = text.slice(0, 80000).match(/<title[^>]*>([^<]{1,200})<\/title>/i);
          const title = m ? m[1].trim().replace(/\s+/g, ' ') : '';
          return json({ title });
        } catch (e) {
          return json({ title: '' });
        }
      }

      // ── Notes ──
      if (path === '/api/notes' && request.method === 'GET') {
        const r = await fetch(SUPABASE_URL + '/rest/v1/notes?select=*&order=created_at.desc', { headers: h });
        return new Response(r.body, { status: r.status, headers: { 'Content-Type': 'application/json' } });
      }
      if (path === '/api/notes' && request.method === 'POST') {
        const body = await request.json();
        const r = await fetch(SUPABASE_URL + '/rest/v1/notes', {
          method: 'POST', headers: { ...h, 'Prefer': 'return=minimal' }, body: JSON.stringify(body)
        });
        return new Response(null, { status: r.status });
      }
      if (path.startsWith('/api/notes/') && request.method === 'PATCH') {
        const id = path.split('/')[3];
        const body = await request.json();
        const r = await fetch(SUPABASE_URL + '/rest/v1/notes?id=eq.' + id, {
          method: 'PATCH', headers: { ...h, 'Prefer': 'return=minimal' }, body: JSON.stringify(body)
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
          method: 'POST', headers: { ...h, 'Prefer': 'return=minimal' }, body: JSON.stringify(body)
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
          method: 'POST', headers: { ...h, 'Prefer': 'return=minimal' }, body: JSON.stringify(body)
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
