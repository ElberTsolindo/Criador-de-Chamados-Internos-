const CACHE_NAME = "chamados-internos-v2"
const STATIC_CACHE = "static-v2"
const DYNAMIC_CACHE = "dynamic-v2"

// Recursos essenciais para cache
const STATIC_ASSETS = [
  "/",
  "/manifest.json",
  "/icon-192x192.png",
  "/icon-512x512.png",
  "https://saofranciscodoconde.ba.gov.br/wp-content/uploads/2021/02/brasao-300x300.jpg",
]

// Instalar Service Worker
self.addEventListener("install", (event) => {
  console.log("SW: Instalando...")
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      console.log("SW: Cache estático criado")
      return cache.addAll(STATIC_ASSETS)
    }),
  )
  self.skipWaiting()
})

// Ativar Service Worker
self.addEventListener("activate", (event) => {
  console.log("SW: Ativando...")
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log("SW: Removendo cache antigo:", cacheName)
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
  // Estratégia: Cache First para recursos estáticos
  if (STATIC_ASSETS.some((asset) => event.request.url.includes(asset))) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request)
      }),
    )
    return
  }

  // Estratégia: Network First para conteúdo dinâmico
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Se a requisição foi bem-sucedida, cache a resposta
        if (response.status === 200) {
          const responseClone = response.clone()
          caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(event.request, responseClone)
          })
        }
        return response
      })
      .catch(() => {
        // Se falhou, tenta buscar no cache
        return caches.match(event.request).then((response) => {
          if (response) {
            return response
          }
          // Se não tem no cache, retorna página offline
          if (event.request.destination === "document") {
            return caches.match("/")
          }
        })
      }),
  )
})

// Sincronização em background
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-chamados") {
    event.waitUntil(syncChamados())
  }
})

// Função para sincronizar chamados quando voltar online
async function syncChamados() {
  try {
    const chamados = JSON.parse(localStorage.getItem("chamados-pendentes") || "[]")

    for (const chamado of chamados) {
      // Aqui você pode implementar envio para servidor quando tiver
      console.log("Sincronizando chamado:", chamado)
    }

    // Limpar chamados pendentes após sincronização
    localStorage.removeItem("chamados-pendentes")
  } catch (error) {
    console.error("Erro na sincronização:", error)
  }
}

// Notificações push (para futuras implementações)
self.addEventListener("push", (event) => {
  if (event.data) {
    const data = event.data.json()
    const options = {
      body: data.body,
      icon: "/icon-192x192.png",
      badge: "/icon-192x192.png",
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: data.primaryKey,
      },
    }

    event.waitUntil(self.registration.showNotification(data.title, options))
  }
})
