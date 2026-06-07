export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    
    // CORS 头
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    };
    
    if (request.method === 'OPTIONS') {
      return new Response(null, {headers: corsHeaders});
    }
    
    const SUPABASE_URL = env.SUPABASE_URL;
    const SUPABASE_KEY = env.SUPABASE_KEY;
    
    if (!SUPABASE_URL || !SUPABASE_KEY) {
      return json({error: '请配置 SUPABASE_URL 和 SUPABASE_KEY 环境变量'}, 500, corsHeaders);
    }
    
    const headers = {
      'apikey': SUPABASE_KEY,
      'Authorization': 'Bearer ' + SUPABASE_KEY
    };
    
    try {
      // Notes
      if (path === '/api/notes' && request.method === 'GET') {
        const res = await fetch(SUPABASE_URL + '/rest/v1/notes?select=*&order=created_at.desc', {headers});
        return new Response(res.body, {status: res.status, headers: Object.assign({}, corsHeaders, {'Content-Type': 'application/json'})});
      }
      if (path === '/api/notes' && request.method === 'POST') {
        const body = await request.json();
        const res = await fetch(SUPABASE_URL + '/rest/v1/notes', {
          method: 'POST',
          headers: Object.assign({}, headers, {'Content-Type': 'application/json', 'Prefer': 'return=minimal'}),
          body: JSON.stringify(body)
        });
        return new Response(null, {status: res.status, headers: corsHeaders});
      }
      if (path.startsWith('/api/notes/') && request.method === 'DELETE') {
        const id = path.split('/')[3];
        await fetch(SUPABASE_URL + '/rest/v1/notes?id=eq.' + id, {method: 'DELETE', headers});
        return json({success: true}, 200, corsHeaders);
      }
      
      // Bookmarks
      if (path === '/api/bookmarks' && request.method === 'GET') {
        const res = await fetch(SUPABASE_URL + '/rest/v1/bookmarks?select=*&order=created_at.desc', {headers});
        return new Response(res.body, {status: res.status, headers: Object.assign({}, corsHeaders, {'Content-Type': 'application/json'})});
      }
      if (path === '/api/bookmarks' && request.method === 'POST') {
        const body = await request.json();
        const res = await fetch(SUPABASE_URL + '/rest/v1/bookmarks', {
          method: 'POST',
          headers: Object.assign({}, headers, {'Content-Type': 'application/json', 'Prefer': 'return=minimal'}),
          body: JSON.stringify(body)
        });
        return new Response(null, {status: res.status, headers: corsHeaders});
      }
      if (path.startsWith('/api/bookmarks/') && request.method === 'DELETE') {
        const id = path.split('/')[3];
        await fetch(SUPABASE_URL + '/rest/v1/bookmarks?id=eq.' + id, {method: 'DELETE', headers});
        return json({success: true}, 200, corsHeaders);
      }
      
      // Files
      if (path === '/api/files' && request.method === 'GET') {
        const res = await fetch(SUPABASE_URL + '/rest/v1/files?select=*&order=date.desc', {headers});
        return new Response(res.body, {status: res.status, headers: Object.assign({}, corsHeaders, {'Content-Type': 'application/json'})});
      }
      if (path === '/api/files' && request.method === 'POST') {
        const body = await request.json();
        const res = await fetch(SUPABASE_URL + '/rest/v1/files', {
          method: 'POST',
          headers: Object.assign({}, headers, {'Content-Type': 'application/json', 'Prefer': 'return=minimal'}),
          body: JSON.stringify(body)
        });
        return new Response(null, {status: res.status, headers: corsHeaders});
      }
      if (path.startsWith('/api/files/') && request.method === 'DELETE') {
        const id = path.split('/')[3];
        await fetch(SUPABASE_URL + '/rest/v1/files?id=eq.' + id, {method: 'DELETE', headers});
        return json({success: true}, 200, corsHeaders);
      }
      
      return json({error: 'Not found'}, 404, corsHeaders);
    } catch (e) {
      return json({error: e.message}, 500, corsHeaders);
    }
  }
};

function json(data, status, extraHeaders) {
  const h = Object.assign({}, extraHeaders || {}, {'Content-Type': 'application/json; charset=utf-8'});
  return new Response(JSON.stringify(data), {status: status || 200, headers: h});
}
