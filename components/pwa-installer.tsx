"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Download, X, Smartphone, Monitor, RefreshCw } from "lucide-react"

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

export function PWAInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showInstallBanner, setShowInstallBanner] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)
  const [installInstructions, setInstallInstructions] = useState(false)

  useEffect(() => {
    // Verificar se já está instalado
    const checkInstalled = () => {
      const standalone = window.matchMedia("(display-mode: standalone)").matches
      const webkitStandalone = (window.navigator as any).standalone === true
      setIsStandalone(standalone || webkitStandalone)
      setIsInstalled(standalone || webkitStandalone)
    }

    checkInstalled()

    // Listener para prompt de instalação
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      if (!isInstalled) {
        setShowInstallBanner(true)
      }
    }

    // Listener para app instalado
    const handleAppInstalled = () => {
      console.log("🎉 PWA foi instalado!")
      setIsInstalled(true)
      setShowInstallBanner(false)
      setDeferredPrompt(null)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    window.addEventListener("appinstalled", handleAppInstalled)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
      window.removeEventListener("appinstalled", handleAppInstalled)
    }
  }, [isInstalled])

  const handleInstall = async () => {
    if (!deferredPrompt) {
      setInstallInstructions(true)
      return
    }

    try {
      await deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice

      if (outcome === "accepted") {
        console.log("✅ Usuário aceitou a instalação")
        setShowInstallBanner(false)
      } else {
        console.log("❌ Usuário recusou a instalação")
      }

      setDeferredPrompt(null)
    } catch (error) {
      console.error("Erro na instalação:", error)
      setInstallInstructions(true)
    }
  }

  const handleDismiss = () => {
    setShowInstallBanner(false)
    // Mostrar novamente em 24 horas
    localStorage.setItem("pwa-dismissed", Date.now().toString())
  }

  const getDeviceInstructions = () => {
    const userAgent = navigator.userAgent.toLowerCase()

    if (userAgent.includes("chrome") && !userAgent.includes("edg")) {
      return {
        icon: <Monitor className="h-5 w-5" />,
        title: "Chrome Desktop",
        steps: [
          "1. Clique nos 3 pontos (⋮) no canto superior direito",
          "2. Selecione 'Instalar Chamados Internos...'",
          "3. Clique em 'Instalar' na janela que aparecer",
        ],
      }
    } else if (userAgent.includes("safari") && userAgent.includes("mobile")) {
      return {
        icon: <Smartphone className="h-5 w-5" />,
        title: "Safari iOS",
        steps: [
          "1. Toque no botão de compartilhar (□↗)",
          "2. Role para baixo e toque em 'Adicionar à Tela de Início'",
          "3. Toque em 'Adicionar' no canto superior direito",
        ],
      }
    } else if (userAgent.includes("android")) {
      return {
        icon: <Smartphone className="h-5 w-5" />,
        title: "Android",
        steps: [
          "1. Toque nos 3 pontos (⋮) no menu do navegador",
          "2. Selecione 'Adicionar à tela inicial'",
          "3. Toque em 'Adicionar' para confirmar",
        ],
      }
    } else {
      return {
        icon: <Monitor className="h-5 w-5" />,
        title: "Navegador",
        steps: [
          "1. Procure pela opção 'Instalar app' no menu",
          "2. Ou adicione aos favoritos para acesso rápido",
          "3. Use o navegador em modo tela cheia",
        ],
      }
    }
  }

  // Se já está instalado, mostrar status
  if (isInstalled) {
    return (
      <div className="fixed bottom-4 right-4 bg-green-600 text-white p-3 rounded-lg shadow-lg z-50 print:hidden">
        <div className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          <span className="text-sm font-medium">App Instalado!</span>
        </div>
      </div>
    )
  }

  // Modal de instruções manuais
  if (installInstructions) {
    const instructions = getDeviceInstructions()

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 print:hidden">
        <div className="bg-white rounded-lg p-6 max-w-md w-full">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {instructions.icon}
              <h3 className="font-semibold text-lg">Como Instalar</h3>
            </div>
            <Button onClick={() => setInstallInstructions(false)} size="sm" variant="ghost">
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-3 mb-6">
            <p className="text-sm text-gray-600 mb-3">
              Para usar como aplicativo no seu <strong>{instructions.title}</strong>:
            </p>
            {instructions.steps.map((step, index) => (
              <div key={index} className="text-sm text-gray-700">
                {step}
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Button onClick={() => setInstallInstructions(false)} className="flex-1">
              Entendi
            </Button>
            <Button onClick={() => window.location.reload()} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Banner de instalação
  if (!showInstallBanner) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg z-50 print:hidden max-w-md mx-auto">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Download className="h-4 w-4" />
            <h3 className="font-semibold text-sm">Instalar Aplicativo</h3>
          </div>
          <p className="text-xs opacity-90 mb-3">Use offline, acesso rápido e experiência nativa</p>
          <div className="flex gap-2">
            <Button onClick={handleInstall} size="sm" variant="secondary" className="text-blue-600 hover:text-blue-700">
              <Download className="h-3 w-3 mr-1" />
              Instalar
            </Button>
            <Button onClick={handleDismiss} size="sm" variant="ghost" className="text-white hover:bg-blue-700">
              Depois
            </Button>
          </div>
        </div>
        <Button onClick={handleDismiss} size="sm" variant="ghost" className="text-white hover:bg-blue-700 p-1">
          <X className="h-3 w-3" />
        </Button>
      </div>
    </div>
  )
}
