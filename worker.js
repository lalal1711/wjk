const HTML = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>个人站</title>
<script src="https://cdn.tailwindcss.com"><\/script>
<style>
.tab-active{border-bottom:2px solid #3b82f6;color:#3b82f6;}
.panel{display:none;}
.panel.active{display:block;}
</style>
</head>
<body class="bg-gray-900 text-gray-100 min-h-screen">
<div class="max-w-4xl mx-auto p-6">
<h1 class="text-3xl font-bold mb-8 text-center">📦 我的个人站</h1>
<div class="flex space-x-6 border-b border-gray-700 mb-6">
<button onclick="switchTab('notes')" id="tab-notes" class="pb-2 px-1 tab-active font-medium">📝 备忘</button>
<button onclick="switchTab('bookmarks')" id="tab-bookmarks" class="pb-2 px-1 text-gray-400 hover:text-gray-200 font-medium">🔖 收藏</button>
<button onclick="switchTab('backup')" id="tab-backup" class="pb-2 px-1 text-gray-400 hover:text-gray-200 font-medium">💾 备份</button>
</div>

<div id="panel-notes" class="panel active space-y-4">
<div class="bg-gray-800 rounded-lg p-4 space-y-3">
<input id="note-title" placeholder="标题" class="w-full bg-gray-700 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
<<textarea id="note-content" placeholder="内容..." rows="3" class="w-full bg-gray-700 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
<input id="note-tags" placeholder="标签，空格分隔" class="w-full bg-gray-700 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
<button onclick="addNote()" class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-medium">添加备忘</button>
</div>
<div id="notes-list" class="space-y-3"></div>
</div>

<div id="panel-bookmarks" class="panel space-y-4">
<div class="bg-gray-800 rounded-lg p-4 space-y-3">
<input id="bm-title" placeholder="网站名称" class="w-full bg-gray-700 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
<input id="bm-url" placeholder="https://..." class="w-full bg-gray-700 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
<input id="bm-tags" placeholder="标签，空格分隔" class="w-full bg-gray-700 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
<button onclick="addBookmark()" class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-medium">添加收藏</button>
</div>
<div id="bookmarks-list" class="space-y-3"></div>
</div>

<div id="panel-backup" class="panel space-y-4">
<div class="bg-gray-800 rounded-lg p-4">
<input type="file" id="file-input" class="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 mb-3">
<button onclick="uploadFile()" class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-medium">上传备份</button>
</div>
<div id="files-list" class="space-y-2"></div>
</div>
</div>

<script>
function switchTab(tab){
document.querySelectorAll('.panel').forEach(el=>el.classList.remove('active'));
document.getElementById('panel-'+tab).classList.add('active');
document.querySelectorAll('[id^="tab-"]').forEach(el=>{
el.classList.remove('tab-active');
el.classList.add('text-gray-400');
});
document.getElementById('tab-'+tab).classList.add('tab-active');
document.getElementById('tab-'+tab).classList.remove('text-gray-400');
if(tab==='notes')loadNotes();
if(tab==='bookmarks')loadBookmarks();
if(tab==='backup')loadFiles();
}
function escapeHtml(t){
if(!t)return'';
return t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
async function addNote(){
const title=document.getElementById('note-title').value;
const content=document.getElementById('note-content').value;
const tags=document.getElementById('note-tags').value;
if(!title)return alert('请输入标题');
await fetch('/api/notes',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({title,content,tags})});
document.getElementById('note-title').value='';
document.getElementById('note-content').value='';
document.getElementById('note-tags').value='';
loadNotes();
}
async function loadNotes(){
const res=await fetch('/api/notes');
const notes=await res.json();
let html='';
for(const n of notes){
html+='<div class="bg-gray-800 rounded-lg p-4"><div class="flex justify-between items-start"><div><h3 class="font-bold text-lg">'+escapeHtml(n.title)+'</h3><p class="text-gray-400 mt-1 whitespace-pre-wrap">'+escapeHtml(n.content)+'</p><div class="flex gap-2 mt-2 flex-wrap">';
if(n.tags){for(const t of n.tags.split(' ')){if(t)html+='<span class="text-xs bg-gray-700 px-2 py-1 rounded">'+escapeHtml(t)+'</span>';}}
html+='<span class="text-xs text-gray-500">'+new Date(n.created_at).toLocaleString()+'</span></div></div><button onclick="deleteNote('+n.id+')" class="text-red-400 hover:text-red-300 ml-4">删除</button></div></div>';
}
document.getElementById('notes-list').innerHTML=html||'<p class="text-gray-500 text-center">暂无备忘</p>';
}
async function deleteNote(id){
if(!confirm('确定删除？'))return;
await fetch('/api/notes/'+id,{method:'DELETE'});
loadNotes();
}
async function addBookmark(){
const title=document.getElementById('bm-title').value;
const url=document.getElementById('bm-url').value;
const tags=document.getElementById('bm-tags').value;
if(!title||!url)return alert('请填写名称和链接');
await fetch('/api/bookmarks',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({title,url,tags})});
document.getElementById('bm-title').value='';
document.getElementById('bm-url').value='';
document.getElementById('bm-tags').value='';
loadBookmarks();
}
async function loadBookmarks(){
const res=await fetch('/api/bookmarks');
const items=await res.json();
let html='';
for(const b of items){
html+='<div class="bg-gray-800 rounded-lg p-4 flex justify-between items-center"><div><a href="'+escapeHtml(b.url)+'" target="_blank" class="text-blue-400 hover:text-blue-300 font-medium text-lg">'+escapeHtml(b.title)+'</a><div class="flex gap-2 mt-1 flex-wrap">';
if(b.tags){for(const t of b.tags.split(' ')){if(t)html+='<span class="text-xs bg-gray-700 px-2 py-1 rounded">'+escapeHtml(t)+'</span>';}}
html+='<span class="text-xs text-gray-500">'+new Date(b.created_at).toLocaleString()+'</span></div></div><button onclick="deleteBookmark('+b.id+')" class="text-red-400 hover:text-red-300">删除</button></div>';
}
document.getElementById('bookmarks-list').innerHTML=html||'<p class="text-gray-500 text-center">暂无收藏</p>';
}
async function deleteBookmark(id){
if(!confirm('确定删除？'))return;
await fetch('/api/bookmarks/'+id,{method:'DELETE'});
loadBookmarks();
}
async function uploadFile(){
const input=document.getElementById('file-input');
if(!input.files[0])return alert('请选择文件');
const formData=new FormData();
formData.append('file',input.files[0]);
await fetch('/api/upload',{method:'POST',body:formData});
input.value='';
loadFiles();
}
async function loadFiles(){
const res=await fetch('/api/files');
const files=await res.json();
let html='';
for(const f of files){
html+='<div class="bg-gray-800 rounded-lg p-3 flex justify-between items-center"><div class="flex items-center gap-3"><span class="text-2xl">📄</span><div><p class="font-medium">'+escapeHtml(f.key)+'</p><p class="text-xs text-gray-500">'+(f.size/1024).toFixed(1)+' KB · '+new Date(f.uploaded).toLocaleString()+'</p></div></div><div class="flex gap-3"><a href="/api/files/'+encodeURIComponent(f.key)+'" download class="text-blue-400 hover:text-blue-300">下载</a><button onclick="deleteFile(\''+f.key.replace(/'/g,"\\'")+'\')" class="text-red-400 hover:text-red-300">删除</button></div></div>';
}
document.getElementById('files-list').innerHTML=html||'<p class="text-gray-500 text-center">暂无备份文件</p>';
}
async function deleteFile(key){
if(!confirm('确定删除？'))return;
await fetch('/api/files/'+encodeURIComponent(key),{method:'DELETE'});
loadFiles();
}
switchTab('notes');
<<\/script>
</body>
</html>`;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    
    if (path === '/' || path === '/index.html') {
      return new Response(HTML, {headers: {'Content-Type': 'text/html; charset=utf-8'}});
    }
    
    try {
      if (path === '/api/init' && request.method === 'POST') {
        await env.DB.exec(`
          CREATE TABLE IF NOT EXISTS notes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT,
            tags TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
          );
          CREATE TABLE IF NOT EXISTS bookmarks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            url TEXT NOT NULL,
            tags TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
          );
        `);
        return json({success: true, message: '数据库初始化完成'});
      }
      
      if (path === '/api/notes' && request.method === 'GET') {
        const { results } = await env.DB.prepare('SELECT * FROM notes ORDER BY created_at DESC').all();
        return json(results || []);
      }
      if (path === '/api/notes' && request.method === 'POST') {
        const body = await request.json();
        await env.DB.prepare('INSERT INTO notes (title, content, tags) VALUES (?, ?, ?)')
          .bind(body.title || '', body.content || '', body.tags || '').run();
        return json({success: true});
      }
      if (path.startsWith('/api/notes/') && request.method === 'DELETE') {
        const id = path.split('/')[3];
        await env.DB.prepare('DELETE FROM notes WHERE id = ?').bind(id).run();
        return json({success: true});
      }
      
      if (path === '/api/bookmarks' && request.method === 'GET') {
        const { results } = await env.DB.prepare('SELECT * FROM bookmarks ORDER BY created_at DESC').all();
        return json(results || []);
      }
      if (path === '/api/bookmarks' && request.method === 'POST') {
        const body = await request.json();
        await env.DB.prepare('INSERT INTO bookmarks (title, url, tags) VALUES (?, ?, ?)')
          .bind(body.title || '', body.url || '', body.tags || '').run();
        return json({success: true});
      }
      if (path.startsWith('/api/bookmarks/') && request.method === 'DELETE') {
        const id = path.split('/')[3];
        await env.DB.prepare('DELETE FROM bookmarks WHERE id = ?').bind(id).run();
        return json({success: true});
      }
      
      if (path === '/api/upload' && request.method === 'POST') {
        const formData = await request.formData();
        const file = formData.get('file');
        if (!file) return json({error: 'No file'}, 400);
        await env.BUCKET.put(file.name, file.stream());
        return json({success: true});
      }
      
      if (path === '/api/files' && request.method === 'GET') {
        const list = await env.BUCKET.list();
        return json(list.objects || []);
      }
      
      if (path.startsWith('/api/files/') && request.method === 'GET') {
        const key = decodeURIComponent(path.split('/api/files/')[1]);
        const object = await env.BUCKET.get(key);
        if (!object) return json({error: 'Not found'}, 404);
        const headers = new Headers();
        object.writeHttpMetadata(headers);
        headers.set('etag', object.httpEtag);
        headers.set('Content-Disposition', 'attachment; filename="' + key + '"');
        return new Response(object.body, {headers});
      }
      
      if (path.startsWith('/api/files/') && request.method === 'DELETE') {
        const key = decodeURIComponent(path.split('/api/files/')[1]);
        await env.BUCKET.delete(key);
        return json({success: true});
      }
      
      return json({error: 'Not found'}, 404);
    } catch (e) {
      return json({error: e.message}, 500);
    }
  }
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {'Content-Type': 'application/json; charset=utf-8'}
  });
}
