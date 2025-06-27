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
}

export function useOfflineStorage() {
  const [chamados, setChamados] = useState<ChamadoData[]>([])
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    // Carregar chamados salvos
    const savedChamados = localStorage.getItem("chamados-internos")
    if (savedChamados) {
      setChamados(JSON.parse(savedChamados))
    }

    // Monitorar status de conexão
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    setIsOnline(navigator.onLine)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const salvarChamado = (dadosChamado: Omit<ChamadoData, "id" | "timestamp">) => {
    const novoChamado: ChamadoData = {
      ...dadosChamado,
      id: Date.now().toString(),
      timestamp: Date.now(),
    }

    const novosChamados = [...chamados, novoChamado]
    setChamados(novosChamados)
    localStorage.setItem("chamados-internos", JSON.stringify(novosChamados))

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

  return {
    chamados,
    isOnline,
    salvarChamado,
    excluirChamado,
    exportarDados,
  }
}
