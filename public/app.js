const API_BASE = '/api';

const statusBar = document.getElementById('status-bar');
let notesData=[], bookmarksData=[], filesData=[];

function setStatus(msg, type='loading'){
  if(type==='ok') statusBar.className='bg-green-900/50 border border-green-700 rounded-lg p-4 mb-6 text-center';
  else if(type==='error') statusBar.className='bg-red-900/50 border border-red-700 rounded-lg p-4 mb-6 text-center';
  else statusBar.className='bg-yellow-900/50 border border-yellow-700 rounded-lg p-4 mb-6 text-center';
  statusBar.innerHTML='<p class="'+((type==='ok')?'text-green-200':(type==='error')?'text-red-200':'text-yellow-200')+' font-medium">'+msg+'</p>';
}

function switchTab(tab){
  document.querySelectorAll('.panel').forEach(el=>el.classList.remove('active'));
  document.getElementById('panel-'+tab).classList.add('active');
  document.querySelectorAll('[id^="tab-"]').forEach(el=>{
    el.classList.remove('tab-active');
    el.classList.add('text-gray-400');
  });
  document.getElementById('tab-'+tab).classList.add('tab-active');
  document.getElementById('tab-'+tab).classList.remove('text-gray-400');
  if(tab==='notes') renderNotes();
  if(tab==='bookmarks') renderBookmarks();
  if(tab==='backup') renderFiles();
}

function escapeHtml(t){
  if(!t)return'';
  return t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

async function api(path, method='GET', body=null){
  const opts={method,headers:{}};
  if(body){opts.headers['Content-Type']='application/json';opts.body=JSON.stringify(body);}
  const res=await fetch(API_BASE+path,opts);
  if(!res.ok) throw new Error('HTTP '+res.status);
  return res.status===204?null:await res.json();
}

function renderNotes(){
  let html='';
  for(const n of notesData){
    html+='<div class="bg-gray-800 rounded-lg p-4"><div class="flex justify-between items-start"><div><h3 class="font-bold text-lg">'+escapeHtml(n.title)+'</h3><p class="text-gray-400 mt-1 whitespace-pre-wrap">'+escapeHtml(n.content)+'</p><div class="flex gap-2 mt-2 flex-wrap">';
    if(n.tags){for(const t of n.tags.split(' ')){if(t)html+='<span class="text-xs bg-gray-700 px-2 py-1 rounded">'+escapeHtml(t)+'</span>';}}
    html+='<span class="text-xs text-gray-500">'+new Date(n.created_at).toLocaleString()+'</span></div></div><button onclick="deleteNote('+n.id+')" class="text-red-400 hover:text-red-300 ml-4">删除</button></div></div>';
  }
  document.getElementById('notes-list').innerHTML=html||'<p class="text-gray-500 text-center py-8">暂无备忘</p>';
}

async function addNote(){
  const title=document.getElementById('note-title').value.trim();
  const content=document.getElementById('note-content').value;
  const tags=document.getElementById('note-tags').value;
  if(!title)return alert('请输入标题');
  const tempId=Date.now();
  const newNote={id:tempId,title,content,tags,created_at:new Date().toISOString()};
  notesData.unshift(newNote);
  renderNotes();
  document.getElementById('note-title').value='';
  document.getElementById('note-content').value='';
  document.getElementById('note-tags').value='';
  try{
    await api('/notes','POST',{title,content,tags});
    loadNotes();
  }catch(e){
    alert('同步失败：'+e.message);
    notesData=notesData.filter(n=>n.id!==tempId);
    renderNotes();
  }
}

async function loadNotes(){
  try{notesData=await api('/notes');renderNotes();}
  catch(e){document.getElementById('notes-list').innerHTML='<p class="text-red-400 text-center py-8">加载失败：'+e.message+'</p>';}
}

async function deleteNote(id){
  if(!confirm('确定删除？'))return;
  notesData=notesData.filter(n=>n.id!==id);
  renderNotes();
  try{await api('/notes/'+id,'DELETE');}
  catch(e){alert('删除失败：'+e.message);loadNotes();}
}

function renderBookmarks(){
  let html='';
  for(const b of bookmarksData){
    html+='<div class="bg-gray-800 rounded-lg p-4 flex justify-between items-center"><div><a href="'+escapeHtml(b.url)+'" target="_blank" class="text-blue-400 hover:text-blue-300 font-medium text-lg">'+escapeHtml(b.title)+'</a><div class="flex gap-2 mt-1 flex-wrap">';
    if(b.tags){for(const t of b.tags.split(' ')){if(t)html+='<span class="text-xs bg-gray-700 px-2 py-1 rounded">'+escapeHtml(t)+'</span>';}}
    html+='<span class="text-xs text-gray-500">'+new Date(b.created_at).toLocaleString()+'</span></div></div><button onclick="deleteBookmark('+b.id+')" class="text-red-400 hover:text-red-300">删除</button></div>';
  }
  document.getElementById('bookmarks-list').innerHTML=html||'<p class="text-gray-500 text-center py-8">暂无收藏</p>';
}

async function addBookmark(){
  const title=document.getElementById('bm-title').value.trim();
  const url=document.getElementById('bm-url').value.trim();
  const tags=document.getElementById('bm-tags').value;
  if(!title||!url)return alert('请填写名称和链接');
  const tempId=Date.now();
  const newBm={id:tempId,title,url,tags,created_at:new Date().toISOString()};
  bookmarksData.unshift(newBm);
  renderBookmarks();
  document.getElementById('bm-title').value='';
  document.getElementById('bm-url').value='';
  document.getElementById('bm-tags').value='';
  try{
    await api('/bookmarks','POST',{title,url,tags});
    loadBookmarks();
  }catch(e){
    alert('同步失败：'+e.message);
    bookmarksData=bookmarksData.filter(b=>b.id!==tempId);
    renderBookmarks();
  }
}

async function loadBookmarks(){
  try{bookmarksData=await api('/bookmarks');renderBookmarks();}
  catch(e){document.getElementById('bookmarks-list').innerHTML='<p class="text-red-400 text-center py-8">加载失败：'+e.message+'</p>';}
}

async function deleteBookmark(id){
  if(!confirm('确定删除？'))return;
  bookmarksData=bookmarksData.filter(b=>b.id!==id);
  renderBookmarks();
  try{await api('/bookmarks/'+id,'DELETE');}
  catch(e){alert('删除失败：'+e.message);loadBookmarks();}
}

function renderFiles(){
  let html='';
  for(const f of filesData){
    html+='<div class="bg-gray-800 rounded-lg p-3 flex justify-between items-center"><div class="flex items-center gap-3"><span class="text-2xl">📄</span><div><p class="font-medium">'+escapeHtml(f.name)+'</p><p class="text-xs text-gray-500">'+(f.size/1024).toFixed(1)+' KB · '+new Date(f.date).toLocaleString()+'</p></div></div><button onclick="deleteFile('+f.id+')" class="text-red-400 hover:text-red-300">删除记录</button></div>';
  }
  document.getElementById('files-list').innerHTML=html||'<p class="text-gray-500 text-center py-8">暂无备份记录</p>';
}

async function backupFile(){
  const input=document.getElementById('file-input');
  if(!input.files[0])return alert('请选择文件');
  const file=input.files[0];
  const url=URL.createObjectURL(file);
  const a=document.createElement('a');
  a.href=url;a.download=file.name;a.click();
  URL.revokeObjectURL(url);
  const tempId=Date.now();
  filesData.unshift({id:tempId,name:file.name,size:file.size,date:new Date().toISOString()});
  renderFiles();
  input.value='';
  try{
    await api('/files','POST',{name:file.name,size:file.size});
    loadFiles();
  }catch(e){
    alert('同步失败：'+e.message);
    filesData=filesData.filter(f=>f.id!==tempId);
    renderFiles();
  }
}

async function loadFiles(){
  try{filesData=await api('/files');renderFiles();}
  catch(e){document.getElementById('files-list').innerHTML='<p class="text-red-400 text-center py-8">加载失败：'+e.message+'</p>';}
}

async function deleteFile(id){
  if(!confirm('确定删除记录？'))return;
  filesData=filesData.filter(f=>f.id!==id);
  renderFiles();
  try{await api('/files/'+id,'DELETE');}
  catch(e){alert('删除失败：'+e.message);loadFiles();}
}

async function init(){
  try{
    await api('/notes');
    setStatus('✅ 已连接 Supabase，数据云端存储','ok');
    loadNotes();
  }catch(e){
    setStatus('❌ 连接失败：'+e.message+'<<br><br>请检查 Worker 环境变量 SUPABASE_URL 和 SUPABASE_KEY 是否配置正确','error');
  }
}

init();
switchTab('notes');
