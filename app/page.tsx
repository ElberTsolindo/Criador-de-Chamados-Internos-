"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Printer } from "lucide-react"
import { PWAInstaller } from "@/components/pwa-installer"
import { useOfflineStorage } from "@/hooks/use-offline-storage"
import { Save, Wifi, WifiOff } from "lucide-react"

const secretarias = [
  "Gabinete do Prefeito (GAPRE)",
  "Gabinete do Vice-Prefeito (GAVIPRE)",
  "Secretaria de Governo (SEGOV)",
  "Secretaria de Administração (SEAD)",
  "Secretaria de Desenvolvimento Social (SEDES)",
  "Secretaria da Educação (SEDUC)",
  "Secretaria de Infraestrutura e Meio Ambiente (SEINFMA)",
  "Secretaria de Serviços, Conservação e Ordem Pública (SESCOP)",
  "Secretaria de Planejamento e Desenvolvimento Econômico (SEPLANDEC)",
  "Secretaria de Agricultura e Pesca (SEAP)",
  "Secretaria da Saúde (SESAU)",
  "Secretaria da Fazenda e Orçamento (SEFAZ)",
  "Secretaria de Cultura (SECULT)",
  "Secretaria de Comunicação (SECOM)",
  "Secretaria de Direitos Humanos, Cidadania e Juventude",
  "Secretaria de Projetos Estratégicos",
  "Secretaria de Turismo",
]

export default function ChamadosInternos() {
  const [numeroOrdem, setNumeroOrdem] = useState("")
  const [anoVigencia, setAnoVigencia] = useState(new Date().getFullYear().toString())
  const [de, setDe] = useState("")
  const [para, setPara] = useState("")
  const [att, setAtt] = useState("")
  const [assunto, setAssunto] = useState("")
  const [descricao, setDescricao] = useState("")

  const dataAtual = new Date().toLocaleDateString("pt-BR")

  const { salvarChamado, isOnline } = useOfflineStorage()

  const handlePrint = () => {
    window.print()
  }

  const handleSalvar = () => {
    const dadosChamado = {
      numeroOrdem,
      anoVigencia,
      de,
      para,
      att,
      assunto,
      descricao,
      data: dataAtual,
    }

    const id = salvarChamado(dadosChamado)
    alert(`Chamado ${numeroOrdem}/${anoVigencia} salvo com sucesso!`)
  }

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("SW registrado com sucesso:", registration)
        })
        .catch((error) => {
          console.log("Falha ao registrar SW:", error)
        })
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white print:bg-white">
      {/* Botão de impressão - oculto na impressão */}
      <div className="print:hidden fixed top-4 right-4 z-10 flex gap-2">
        <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-sm">
          {isOnline ? <Wifi className="h-4 w-4 text-green-600" /> : <WifiOff className="h-4 w-4 text-red-600" />}
          <span className="text-xs font-medium">{isOnline ? "Online" : "Offline"}</span>
        </div>
        <Button onClick={handleSalvar} className="flex items-center gap-2 bg-green-600 hover:bg-green-700">
          <Save className="h-4 w-4" />
          Salvar
        </Button>
        <Button onClick={handlePrint} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
          <Printer className="h-4 w-4" />
          Imprimir
        </Button>
      </div>

      <div className="max-w-4xl mx-auto p-4 print:p-4">
        {/* Cabeçalho Moderno */}
        <div className="relative mb-4 print:mb-3 bg-white print:bg-transparent rounded-lg print:rounded-none shadow-sm print:shadow-none p-4 print:p-0">
          <div className="flex items-center gap-6">
            <img
              src="https://saofranciscodoconde.ba.gov.br/wp-content/uploads/2021/02/brasao-300x300.jpg"
              alt="Brasão da Prefeitura"
              className="w-[120px] h-[120px] print:w-[100px] print:h-[100px] object-contain flex-shrink-0"
            />
            <div className="flex-1">
              <h1 className="text-xl print:text-lg font-bold text-gray-800 leading-tight">PREFEITURA MUNICIPAL DE</h1>
              <h1 className="text-xl print:text-lg font-bold text-gray-800 leading-tight mb-1">
                SÃO FRANCISCO DO CONDE
              </h1>
              <div className="h-0.5 bg-gradient-to-r from-blue-600 to-blue-400 w-full mb-2"></div>
              {de && <p className="text-sm print:text-xs text-blue-600 font-semibold">{de}</p>}
            </div>
          </div>
        </div>

        {/* Título do documento */}
        <div className="text-center mb-4 print:mb-3">
          <h2 className="text-xl font-bold text-gray-800">CHAMADO INTERNO</h2>
        </div>

        {/* Formulário Compacto */}
        <div className="bg-white print:bg-transparent rounded-lg print:rounded-none shadow-sm print:shadow-none p-4 print:p-0 space-y-3 print:space-y-2">
          {/* Linha 1: Número da Ordem e Data */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 print:gap-6">
            <div className="flex items-center gap-3">
              <Label className="font-semibold text-gray-700 min-w-[100px]">Nº Ordem:</Label>
              <div className="flex items-center gap-2">
                <Input
                  value={numeroOrdem}
                  onChange={(e) => setNumeroOrdem(e.target.value)}
                  placeholder="000"
                  className="w-20 text-center border-2 border-gray-300 focus:border-blue-500"
                />
                <span className="font-bold text-gray-600">/</span>
                <Input
                  value={anoVigencia}
                  onChange={(e) => setAnoVigencia(e.target.value)}
                  className="w-20 text-center border-2 border-gray-300 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Label className="font-semibold text-gray-700 min-w-[60px]">Data:</Label>
              <span className="text-gray-800 font-medium bg-gray-100 print:bg-transparent px-3 py-1 rounded">
                {dataAtual}
              </span>
            </div>
          </div>

          {/* Linha 2: DE e PARA */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="font-semibold text-gray-700">DE:</Label>
              <Select value={de} onValueChange={setDe}>
                <SelectTrigger className="border-2 border-gray-300 focus:border-blue-500">
                  <SelectValue placeholder="Selecione a secretaria" />
                </SelectTrigger>
                <SelectContent>
                  {secretarias.map((secretaria) => (
                    <SelectItem key={secretaria} value={secretaria}>
                      {secretaria}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label className="font-semibold text-gray-700">PARA:</Label>
              <Select value={para} onValueChange={setPara}>
                <SelectTrigger className="border-2 border-gray-300 focus:border-blue-500">
                  <SelectValue placeholder="Selecione a secretaria" />
                </SelectTrigger>
                <SelectContent>
                  {secretarias.map((secretaria) => (
                    <SelectItem key={secretaria} value={secretaria}>
                      {secretaria}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Linha 3: ATT e Assunto */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="font-semibold text-gray-700">ATT:</Label>
              <Input
                value={att}
                onChange={(e) => setAtt(e.target.value)}
                placeholder="Nome do responsável"
                className="border-2 border-gray-300 focus:border-blue-500"
              />
            </div>
            <div className="space-y-1">
              <Label className="font-semibold text-gray-700">Assunto:</Label>
              <Input
                value={assunto}
                onChange={(e) => setAssunto(e.target.value)}
                placeholder="Descreva o assunto"
                className="border-2 border-gray-300 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Descrição do Problema */}
          <div className="space-y-1">
            <Label className="font-semibold text-gray-700 text-sm">Descrição do Problema:</Label>
            <Textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Descreva detalhadamente o problema ou solicitação..."
              className="min-h-[80px] print:min-h-[60px] border-2 border-gray-300 focus:border-blue-500 resize-none overflow-hidden"
              style={{ height: "auto", minHeight: "80px" }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement
                target.style.height = "auto"
                target.style.height = target.scrollHeight + "px"
              }}
            />
          </div>
        </div>

        {/* Área de Assinaturas Compacta */}
        <div className="mt-8 print:mt-6">
          <div className="grid grid-cols-2 gap-8 print:gap-6">
            {/* Assinatura do Remetente */}
            <div className="text-center">
              <div className="border-b-2 border-gray-400 mb-2 h-16 print:h-12"></div>
              <p className="font-semibold text-gray-700 text-sm">Assinatura do Remetente</p>
            </div>

            {/* Assinatura do Destinatário */}
            <div className="text-center">
              <div className="border-b-2 border-gray-400 mb-2 h-16 print:h-12"></div>
              <p className="font-semibold text-gray-700 text-sm mb-3">Assinatura do Destinatário</p>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 text-xs">
                  <span className="font-medium">Data:</span>
                  <div className="border-b border-gray-400 w-20 h-4"></div>
                  <span className="font-medium">Hora:</span>
                  <div className="border-b border-gray-400 w-16 h-4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PWAInstaller />

      {/* Estilos para impressão otimizados */}
      <style jsx global>{`
        @media print {
          @page {
            margin: 0.5in;
            size: A4;
          }
          
          body {
            -webkit-print-color-adjust: exact;
            color-adjust: exact;
            font-size: 12px;
          }
          
          .print\\:hidden {
            display: none !important;
          }
          
          .print\\:bg-white {
            background: white !important;
          }
          
          .print\\:bg-transparent {
            background: transparent !important;
          }
          
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          
          .print\\:rounded-none {
            border-radius: 0 !important;
          }
          
          .print\\:p-4 {
            padding: 1rem !important;
          }
          
          .print\\:p-0 {
            padding: 0 !important;
          }
          
          .print\\:mb-4 {
            margin-bottom: 1rem !important;
          }
          
          .print\\:space-y-3 > * + * {
            margin-top: 0.75rem !important;
          }
          
          .print\\:mt-6 {
            margin-top: 1.5rem !important;
          }
          
          .print\\:gap-6 {
            gap: 1.5rem !important;
          }
          
          .print\\:min-h-\\[100px\\] {
            min-height: 100px !important;
          }
          
          .print\\:h-12 {
            height: 3rem !important;
          }
          
          .print\\:w-\\[100px\\] {
            width: 100px !important;
          }
          
          .print\\:h-\\[100px\\] {
            height: 100px !important;
          }
          
          .print\\:text-xl {
            font-size: 1.25rem !important;
          }
          
          .print\\:text-sm {
            font-size: 0.875rem !important;
          }
          
          .print\\:px-4 {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }
          
          .print\\:bg-gray-800 {
            background-color: #1f2937 !important;
          }
        }
      `}</style>
    </div>
  )
}
