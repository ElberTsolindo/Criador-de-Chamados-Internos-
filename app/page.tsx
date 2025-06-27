"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Printer, FileText } from "lucide-react"

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

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-gray-50 print:bg-white relative">
      {/* Header simples */}
      <div className="print:hidden bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            <div>
              <h1 className="text-base font-semibold text-gray-800">Sistema de Chamados Internos</h1>
              <p className="text-xs text-gray-500">Prefeitura de São Francisco do Conde</p>
            </div>
          </div>
          <Button onClick={handlePrint} size="sm" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
            <Printer className="h-3 w-3" />
            Imprimir
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 print:p-3 print:pb-20">
        {/* Cabeçalho do documento - mais compacto */}
        <Card className="mb-4 print:mb-2 print:shadow-none print:border-0 border-0">
          <CardContent className="p-4 print:p-2">
            <div className="flex items-center gap-4">
              <img
                src="https://saofranciscodoconde.ba.gov.br/wp-content/uploads/2021/02/brasao-300x300.jpg"
                alt="Brasão da Prefeitura"
                className="w-[70px] h-[70px] print:w-[60px] print:h-[60px] object-contain"
                crossOrigin="anonymous"
              />
              <div className="flex-1">
                <h1 className="text-lg print:text-base font-bold text-gray-800 leading-tight">
                  PREFEITURA MUNICIPAL DE SÃO FRANCISCO DO CONDE
                </h1>
                <div className="h-0.5 bg-blue-600 w-full mt-1 mb-2"></div>
                {de && <p className="text-xs text-blue-600 font-medium">{de}</p>}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Título do documento - mais compacto */}
        <div className="text-center mb-4 print:mb-2">
          <h2 className="text-lg print:text-base font-bold text-gray-800">CHAMADO INTERNO</h2>
        </div>

        {/* Formulário - layout mais compacto */}
        <Card className="print:shadow-none print:border-0 border-0">
          <CardContent className="p-4 print:p-2">
            <div className="space-y-4 print:space-y-2">
              {/* Linha 1: Número, Data e ATT em uma linha */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 print:gap-2">
                <div className="space-y-1">
                  <Label className="text-xs font-medium text-gray-700">Nº Ordem</Label>
                  <div className="flex items-center gap-1">
                    <Input
                      value={numeroOrdem}
                      onChange={(e) => setNumeroOrdem(e.target.value)}
                      placeholder="000"
                      className="w-16 text-center text-sm font-semibold border-0 bg-gray-100 h-8"
                    />
                    <span className="text-sm font-bold text-gray-400">/</span>
                    <Input
                      value={anoVigencia}
                      onChange={(e) => setAnoVigencia(e.target.value)}
                      className="w-16 text-center text-sm font-semibold border-0 bg-gray-100 h-8"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label className="text-xs font-medium text-gray-700">Data</Label>
                  <div className="px-2 py-1.5 bg-gray-100 rounded text-sm h-8 flex items-center">
                    <span className="font-medium text-gray-800">{dataAtual}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <Label className="text-xs font-medium text-gray-700">Atenção de</Label>
                  <Input
                    value={att}
                    onChange={(e) => setAtt(e.target.value)}
                    placeholder="Nome do responsável"
                    className="border-0 bg-gray-100 text-sm h-8"
                  />
                </div>
              </div>

              {/* Linha 2: DE e PARA */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:gap-2">
                <div className="space-y-1">
                  <Label className="text-xs font-medium text-gray-700">DE (Remetente)</Label>
                  <Select value={de} onValueChange={setDe}>
                    <SelectTrigger className="border-0 bg-gray-100 text-sm h-8">
                      <SelectValue placeholder="Selecione a secretaria" />
                    </SelectTrigger>
                    <SelectContent className="border-0">
                      {secretarias.map((secretaria) => (
                        <SelectItem key={secretaria} value={secretaria} className="text-sm">
                          {secretaria}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <Label className="text-xs font-medium text-gray-700">PARA (Destinatário)</Label>
                  <Select value={para} onValueChange={setPara}>
                    <SelectTrigger className="border-0 bg-gray-100 text-sm h-8">
                      <SelectValue placeholder="Selecione a secretaria" />
                    </SelectTrigger>
                    <SelectContent className="border-0">
                      {secretarias.map((secretaria) => (
                        <SelectItem key={secretaria} value={secretaria} className="text-sm">
                          {secretaria}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Linha 3: Assunto */}
              <div className="space-y-1">
                <Label className="text-xs font-medium text-gray-700">Assunto</Label>
                <Input
                  value={assunto}
                  onChange={(e) => setAssunto(e.target.value)}
                  placeholder="Descreva o assunto"
                  className="border-0 bg-gray-100 text-sm h-8"
                />
              </div>

              {/* Descrição - mais compacta */}
              <div className="space-y-1">
                <Label className="text-xs font-medium text-gray-700">Descrição do Problema</Label>
                <Textarea
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Descreva detalhadamente o problema ou solicitação..."
                  className="border-0 bg-gray-100 resize-none overflow-hidden text-sm"
                  style={{
                    minHeight: "80px",
                    height: "auto",
                  }}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement
                    target.style.height = "auto"
                    target.style.height = Math.max(80, target.scrollHeight) + "px"
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Área de Assinaturas - Apenas para visualização na tela */}
        <div className="mt-8 print:hidden">
          <div className="grid grid-cols-2 gap-6">
            {/* Assinatura do Remetente */}
            <div className="text-center">
              <div className="border-b-2 border-gray-400 mb-2 h-8"></div>
              <p className="font-medium text-gray-700 text-xs">Assinatura do Remetente</p>
            </div>

            {/* Assinatura do Destinatário */}
            <div className="text-center">
              <div className="border-b-2 border-gray-400 mb-2 h-8"></div>
              <p className="font-medium text-gray-700 text-xs mb-2">Assinatura do Destinatário</p>
              <div className="flex items-center justify-center gap-3 text-xs">
                <div className="flex items-center gap-1">
                  <span>Data:</span>
                  <div className="border-b border-gray-400 w-14 h-3"></div>
                </div>
                <div className="flex items-center gap-1">
                  <span>Hora:</span>
                  <div className="border-b border-gray-400 w-10 h-3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Área de Assinaturas para Impressão - Posição Fixa no Final */}
      <div className="print:block hidden print:fixed print:bottom-4 print:left-0 print:right-0">
        <div className="max-w-4xl mx-auto px-3">
          <div className="grid grid-cols-2 gap-4">
            {/* Assinatura do Remetente */}
            <div className="text-center">
              <div className="border-b-2 border-gray-400 mb-2 h-6"></div>
              <p className="font-medium text-gray-700 text-xs">Assinatura do Remetente</p>
            </div>

            {/* Assinatura do Destinatário */}
            <div className="text-center">
              <div className="border-b-2 border-gray-400 mb-2 h-6"></div>
              <p className="font-medium text-gray-700 text-xs mb-2">Assinatura do Destinatário</p>
              <div className="flex items-center justify-center gap-3 text-xs">
                <div className="flex items-center gap-1">
                  <span>Data:</span>
                  <div className="border-b border-gray-400 w-14 h-3"></div>
                </div>
                <div className="flex items-center gap-1">
                  <span>Hora:</span>
                  <div className="border-b border-gray-400 w-10 h-3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Estilos para impressão super otimizados */}
      <style jsx global>{`
        @media print {
          @page {
            margin: 0.4in;
            size: A4;
          }
          
          body {
            -webkit-print-color-adjust: exact;
            color-adjust: exact;
            font-size: 10px;
            line-height: 1.2;
          }
          
          .print\\:hidden {
            display: none !important;
          }

          .print\\:block {
            display: block !important;
          }

          .print\\:fixed {
            position: fixed !important;
          }

          .print\\:bottom-4 {
            bottom: 1rem !important;
          }

          .print\\:left-0 {
            left: 0 !important;
          }

          .print\\:right-0 {
            right: 0 !important;
          }
          
          .print\\:bg-white {
            background: white !important;
          }
          
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          
          .print\\:border-0 {
            border: none !important;
          }
          
          .print\\:p-3 {
            padding: 0.75rem !important;
          }
          
          .print\\:p-2 {
            padding: 0.5rem !important;
          }

          .print\\:pb-20 {
            padding-bottom: 5rem !important;
          }
          
          .print\\:mb-2 {
            margin-bottom: 0.5rem !important;
          }
          
          .print\\:space-y-2 > * + * {
            margin-top: 0.5rem !important;
          }
          
          .print\\:gap-2 {
            gap: 0.5rem !important;
          }
          
          .print\\:gap-4 {
            gap: 1rem !important;
          }
          
          .print\\:h-6 {
            height: 1.5rem !important;
          }
          
          .print\\:w-\\[60px\\] {
            width: 60px !important;
          }
          
          .print\\:h-\\[60px\\] {
            height: 60px !important;
          }
          
          .print\\:text-base {
            font-size: 0.875rem !important;
          }
        }
      `}</style>
    </div>
  )
}
