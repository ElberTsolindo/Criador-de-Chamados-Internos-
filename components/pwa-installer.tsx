"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, X, Smartphone, Monitor, Wifi, WifiOff, Share, CloudIcon as CloudSync } from "lucide-react"
import { useOfflineStorage } from "@/hooks/use-offline-storage"

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

export function PWAInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showInstallBanner, setShowInstallBanner] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [showFeatures, setShowFeatures] = useState(false)

  const { isOnline, chamadosPendentes } = useOfflineStorage()

  useEffect(() => {
    // Detectar se já está instalado
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches
    const isInWebAppiOS = (window.navigator as any).standalone === true
    setIsInstalled(isStandalone || isInWebAppiOS)

    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)

      // Mostrar banner apenas se não estiver instalado
      if (!isStandalone && !isInWebAppiOS) {
        setShowInstallBanner(true)
      }
    }

    window.addEventListener("beforeinstallprompt", handler)

    return () => {
      window.removeEventListener("beforeinstallprompt", handler)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === "accepted") {
      setDeferredPrompt(null)
      setShowInstallBanner(false)
      setIsInstalled(true)
    }
  }

  const handleDismiss = () => {
    setShowInstallBanner(false)
    // Mostrar novamente em 24 horas
    localStorage.setItem("pwa-dismissed", Date.now().toString())
  }

  // Não mostrar se já estiver instalado
  if (isInstalled) {
    return (
      <div className="fixed bottom-4 right-4 z-50 print:hidden">
        <Card className="w-80 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {isOnline ? <Wifi className="h-4 w-4 text-green-600" /> : <WifiOff className="h-4 w-4 text-red-600" />}
                <span className="text-sm font-medium">{isOnline ? "Online" : "Offline"}</span>
              </div>
              {chamadosPendentes > 0 && (
                <div className="flex items-center gap-1 text-orange-600">
                  <CloudSync className="h-4 w-4" />
                  <span className="text-xs">{chamadosPendentes} pendentes</span>
                </div>
              )}
            </div>
          </CardHeader>
        </Card>
      </div>
    )
  }

  if (!showInstallBanner) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 print:hidden">
      <Card className="shadow-lg border-blue-200 bg-gradient-to-r from-blue-50 to-white">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-blue-600" />
                Instalar Aplicativo
              </CardTitle>
              <CardDescription className="mt-1">Use offline, acesso rápido e notificações</CardDescription>
            </div>
            <Button onClick={handleDismiss} size="sm" variant="ghost" className="text-gray-500 hover:text-gray-700">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          {showFeatures && (
            <div className="mb-4 space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <WifiOff className="h-4 w-4" />
                <span>Funciona completamente offline</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Monitor className="h-4 w-4" />
                <span>Acesso rápido da área de trabalho</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Share className="h-4 w-4" />
                <span>Compartilhamento nativo</span>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Button onClick={handleInstall} className="flex-1 bg-blue-600 hover:bg-blue-700">
              <Download className="h-4 w-4 mr-2" />
              Instalar Agora
            </Button>
            <Button onClick={() => setShowFeatures(!showFeatures)} variant="outline" size="sm">
              {showFeatures ? "Menos" : "Mais"}
            </Button>
          </div>

          <p className="text-xs text-gray-500 mt-2 text-center">Gratuito • Sem anúncios • Dados seguros</p>
        </CardContent>
      </Card>
    </div>
  )
}
