// 创建一个cacheName
const cacheName = 'cat-1.0';
// 需要缓存的资源列表
const cacheFiles = [
    './',
    './index.html',
    './js/phaser.min.js',
    './js/catch-the-cat.js',
    './img/bg.jpg',
    './favicon.ico',
    './manifest.json'
];

// 监听install事件, 完成安装时， 进行文件缓存
self.addEventListener('install', function (e) {
    const cacheOpenPromise = caches.open(cacheName).then(function (cache) {
        return cache.addAll(cacheFiles);
    });
    e.waitUntil(cacheOpenPromise);
});

// cache存在则使用cache，无cache则fetch服务器端请求资源
self.addEventListener('fetch', function (e) {
    e.respondWith(
		caches.match(e.request).then(function (cache) {
			return cache || fetch(e.request);
		}).catch(function (err) {
            console.log(err);
            return fetch(e.request);
		})
    );
});
