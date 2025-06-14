const CACHE_NAME = 'defesa-base-cache-v1';
const urlsToCache = [
    './',
    './index.html',
    './icon-512.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache aberto');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response; // Retorna do cache se encontrar
                }
                return fetch(event.request); // Busca na rede se não encontrar no cache
            })
    );
});