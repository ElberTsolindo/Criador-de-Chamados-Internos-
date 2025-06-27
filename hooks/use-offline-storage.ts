"use client"

import { useState, useEffect } from "react"

interface ChamadoData {
  id: string
  numeroOrdem: string
  anoVigencia: string
  de: string
  para: string
  att: string
  assunto: string
  descricao: string
  data: string
  timestamp: number
  sincronizado: boolean
}

export function useOfflineStorage() {
  const [chamados, setChamados] = useState<ChamadoData[]>([])
  const [isOnline, setIsOnline] = useState(true)
  const [isInstallable, setIsInstallable] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)

  useEffect(() => {
    // Carregar chamados salvos
    const savedChamados = localStorage.getItem("chamados-internos")
    if (savedChamados) {
      setChamados(JSON.parse(savedChamados))
    }

    // Monitorar status de conexão
    const handleOnline = () => {
      setIsOnline(true)
      syncPendingChamados()
    }
    const handleOffline = () => setIsOnline(false)

    // Detectar se PWA pode ser instalado
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setIsInstallable(true)
    }

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    setIsOnline(navigator.onLine)

    // Registrar para sincronização em background
    if ("serviceWorker" in navigator && "sync" in window.ServiceWorkerRegistration.prototype) {
      navigator.serviceWorker.ready.then((registration) => {
        // Registrar sync quando voltar online
        if (!navigator.onLine) {
          registration.sync.register("sync-chamados")
        }
      })
    }

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    }
  }, [])

  const syncPendingChamados = async () => {
    const pendingChamados = chamados.filter((c) => !c.sincronizado)

    for (const chamado of pendingChamados) {
      try {
        // Aqui você implementaria o envio para o servidor
        // Por enquanto, apenas marca como sincronizado
        chamado.sincronizado = true
      } catch (error) {
        console.error("Erro ao sincronizar chamado:", error)
      }
    }

    if (pendingChamados.length > 0) {
      const updatedChamados = [...chamados]
      setChamados(updatedChamados)
      localStorage.setItem("chamados-internos", JSON.stringify(updatedChamados))
    }
  }

  const salvarChamado = (dadosChamado: Omit<ChamadoData, "id" | "timestamp" | "sincronizado">) => {
    const novoChamado: ChamadoData = {
      ...dadosChamado,
      id: Date.now().toString(),
      timestamp: Date.now(),
      sincronizado: isOnline, // Se está online, marca como sincronizado
    }

    const novosChamados = [...chamados, novoChamado]
    setChamados(novosChamados)
    localStorage.setItem("chamados-internos", JSON.stringify(novosChamados))

    // Se offline, adiciona à lista de pendentes para sincronização
    if (!isOnline) {
      const pendentes = JSON.parse(localStorage.getItem("chamados-pendentes") || "[]")
      pendentes.push(novoChamado)
      localStorage.setItem("chamados-pendentes", JSON.stringify(pendentes))
    }

    return novoChamado.id
  }

  const excluirChamado = (id: string) => {
    const chamadosAtualizados = chamados.filter((c) => c.id !== id)
    setChamados(chamadosAtualizados)
    localStorage.setItem("chamados-internos", JSON.stringify(chamadosAtualizados))
  }

  const exportarDados = () => {
    const dados = JSON.stringify(chamados, null, 2)
    const blob = new Blob([dados], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `chamados-internos-${new Date().toISOString().split("T")[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const instalarPWA = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice

      if (outcome === "accepted") {
        setIsInstallable(false)
        setDeferredPrompt(null)
      }
    }
  }

  const compartilharChamado = async (chamado: ChamadoData) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Chamado ${chamado.numeroOrdem}/${chamado.anoVigencia}`,
          text: `${chamado.assunto}\n\n${chamado.descricao}`,
          url: window.location.href,
        })
      } catch (error) {
        console.error("Erro ao compartilhar:", error)
      }
    }
  }

  return {
    chamados,
    isOnline,
    isInstallable,
    salvarChamado,
    excluirChamado,
    exportarDados,
    instalarPWA,
    compartilharChamado,
    chamadosPendentes: chamados.filter((c) => !c.sincronizado).length,
  }
}
