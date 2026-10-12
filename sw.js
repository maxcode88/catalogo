// PRD MODA · página propia: siempre busca lo último; sin internet muestra la última copia.
var C='prd-web-2';
self.addEventListener('install',function(){self.skipWaiting();});
self.addEventListener('activate',function(e){e.waitUntil(self.clients.claim());});
self.addEventListener('fetch',function(e){var u=new URL(e.request.url);
  if(e.request.method!=='GET'||u.origin!==location.origin)return;
  var f=e.request.mode==='navigate'?fetch(e.request.url,{cache:'no-cache',credentials:'same-origin'}):fetch(e.request);
  e.respondWith(f.then(function(r){var c=r.clone();caches.open(C).then(function(x){x.put(e.request,c);});return r;})
    .catch(function(){return caches.match(e.request,{ignoreSearch:true});}));});
