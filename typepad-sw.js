const preFix = 'typepad'
const version = '254';

self.addEventListener('install', event => {
   self.skipWaiting();
   event.waitUntil(
      caches.open(preFix + version).then(cache => {
         return cache.addAll([
            '/',
            '/index.html',
            '/scss/typepad.css?v=2.54',
            '/js/class/Database.js',
            '/js/class/Utility.js',
            '/js/class/KeyCount.js',
            '/js/class/Config.js',
            '/js/class/Editor.js',
            '/js/class/Article.js',
            '/js/class/ArticleType.js',
            '/js/class/Reg.js',
            '/js/class/Engine.js',
            '/js/class/Record.js',
            '/js/class/CETWord.js',
            '/js/require_v2.3.6.js',
            '/js/typepad.js?v=2.54',
            '/img/logo.png',
            '/scss/font/RobotoMono.ttf',
            '/scss/font/DSDigital.ttf',
            '/scss/font/Galvji.ttc',
            '/scss/font/ImpactPureNumber.ttf',
         ])
      })
   )
})

// 清除之前版本的数据
self.addEventListener('activate', event => {
   console.log('sw: activate')
   event.waitUntil(
      caches.keys().then( keyList => {
         return Promise.all(keyList.map(item => {
            if (/typepad/i.test(item)){ // 如果包含 typepad 字符串
               if (item !== preFix + version){
                  return caches.delete(item);
               }
            }
         }));
      })
   )
})

// 处理页面请求
self.addEventListener('fetch', event => {
   event.respondWith(
      caches.match(event.request).then(res => {
         return res || fetch(event.request);
      })
   )
})
