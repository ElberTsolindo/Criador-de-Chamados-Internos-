const CACHE_NAME = "chamados-internos-v2.0"
const STATIC_CACHE = "static-v2.0"
const DYNAMIC_CACHE = "dynamic-v2.0"

// Base path para GitHub Pages
const BASE_PATH = "/chamados-internos"

// Recursos essenciais para cache
const STATIC_ASSETS = [
  `${BASE_PATH}/`,
  `${BASE_PATH}/manifest.json`,
  `${BASE_PATH}/icon-72x72.png`,
  `${BASE_PATH}/icon-96x96.png`,
  `${BASE_PATH}/icon-128x128.png`,
  `${BASE_PATH}/icon-144x144.png`,
  `${BASE_PATH}/icon-152x152.png`,
  `${BASE_PATH}/icon-192x192.png`,
  `${BASE_PATH}/icon-384x384.png`,
  `${BASE_PATH}/icon-512x512.png`,
  "https://saofranciscodoconde.ba.gov.br/wp-content/uploads/2021/02/brasao-300x300.jpg",
]

// Instalar Service Worker
self.addEventListener("install", (event) => {
  console.log("🔧 Service Worker: Instalando...")
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      console.log("📦 Service Worker: Cache estático criado")
      return cache.addAll(STATIC_ASSETS).catch((error) => {
        console.error("❌ Erro ao adicionar recursos ao cache:", error)
      })
    }),
  )
  self.skipWaiting()
})

// Ativar Service Worker
self.addEventListener("activate", (event) => {
  console.log("✅ Service Worker: Ativando...")
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log("🗑️ Service Worker: Removendo cache antigo:", cacheName)
            return caches.delete(cacheName)
          }
        }),
      )
    }),
  )
  self.clients.claim()
})

// Interceptar requisições
self.addEventListener("fetch", (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Estratégia Cache First para recursos estáticos
  if (STATIC_ASSETS.some((asset) => request.url.includes(asset.replace(BASE_PATH, "")))) {
    event.respondWith(
      caches
        .match(request)
        .then((response) => {
          return (
            response ||
            fetch(request).then((fetchResponse) => {
              return caches.open(STATIC_CACHE).then((cache) => {
                cache.put(request, fetchResponse.clone())
                return fetchResponse
              })
            })
          )
        })
        .catch(() => {
          // Fallback para recursos essenciais
          if (request.destination === "document") {
            return caches.match(`${BASE_PATH}/`)
          }
        }),
    )
    return
  }

  // Estratégia Network First para dados dinâmicos
  if (request.method === "GET") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Se a resposta for válida, cache ela
          if (response.status === 200) {
            const responseClone = response.clone()
            caches.open(DYNAMIC_CACHE).then((cache) => {
              cache.put(request, responseClone)
            })
          }
          return response
        })
        .catch(() => {
          // Se offline, tenta buscar no cache
          return caches.match(request).then((response) => {
            return response || caches.match(`${BASE_PATH}/`)
          })
        }),
    )
  }
})

// Sincronização em background
self.addEventListener("sync", (event) => {
  console.log("🔄 Service Worker: Sincronização em background")
  if (event.tag === "background-sync") {
    event.waitUntil(console.log("📡 Sincronizando dados..."))
  }
})

// Notificações push
self.addEventListener("push", (event) => {
  console.log("📬 Service Worker: Notificação push recebida")
  const options = {
    body: event.data ? event.data.text() : "Nova atualização disponível",
    icon: `${BASE_PATH}/icon-192x192.png`,
    badge: `${BASE_PATH}/icon-72x72.png`,
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
    actions: [
      {
        action: "explore",
        title: "Abrir App",
        icon: `${BASE_PATH}/icon-192x192.png`,
      },
      {
        action: "close",
        title: "Fechar",
        icon: `${BASE_PATH}/icon-192x192.png`,
      },
    ],
  }

  event.waitUntil(self.registration.showNotification("Chamados Internos", options))
})

// Clique em notificação
self.addEventListener("notificationclick", (event) => {
  console.log("🔔 Service Worker: Notificação clicada")
  event.notification.close()

  if (event.action === "explore") {
    event.waitUntil(clients.openWindow(`${BASE_PATH}/`))
  }
})
