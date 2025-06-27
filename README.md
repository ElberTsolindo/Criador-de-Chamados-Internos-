# 🏛️ Chamados Internos - Prefeitura de São Francisco do Conde

> Sistema PWA para gerenciamento de chamados internos da Prefeitura de São Francisco do Conde - A joia do recôncavo baiano.

## 🌐 **Acesso Online**

### 🔗 **URL Principal:**
**https://seu-usuario.github.io/chamados-internos/**

### 📱 **Como Instalar o App:**

#### **🖥️ Desktop (Chrome/Edge):**
1. Acesse a URL acima
2. Clique nos **3 pontos** (⋮) no canto superior direito
3. Selecione **"Instalar Chamados Internos..."**
4. Clique em **"Instalar"**
5. ✅ **App instalado!** Aparecerá na área de trabalho

#### **📱 Android:**
1. Acesse a URL no Chrome
2. Toque nos **3 pontos** (⋮)
3. Selecione **"Adicionar à tela inicial"**
4. Toque em **"Adicionar"**
5. ✅ **App instalado!** Aparecerá na tela inicial

#### **🍎 iPhone/iPad:**
1. Acesse a URL no Safari
2. Toque no botão **Compartilhar** (□↗)
3. Role para baixo e toque em **"Adicionar à Tela de Início"**
4. Toque em **"Adicionar"**
5. ✅ **App instalado!** Aparecerá na tela inicial

## ✨ **Recursos**

- 📱 **PWA Nativo** - Funciona como app instalado
- 📶 **Offline First** - Funciona sem internet
- 💾 **Armazenamento Local** - Dados salvos no dispositivo
- 🖨️ **Impressão Otimizada** - Layout específico para impressão
- 🔄 **Sincronização** - Dados sincronizam quando online
- 🎨 **Interface Moderna** - Design responsivo e intuitivo

## 🏗️ **Para Desenvolvedores**

### **Pré-requisitos:**
- Node.js 18+
- Git

### **Instalação:**
\`\`\`bash
# 1. Clonar repositório
git clone https://github.com/seu-usuario/chamados-internos.git
cd chamados-internos

# 2. Instalar dependências
npm install

# 3. Gerar ícones
npm run generate-icons

# 4. Executar em desenvolvimento
npm run dev
\`\`\`

### **Deploy:**
\`\`\`bash
# Build para produção
npm run build

# O deploy é automático via GitHub Actions
# Toda vez que você fizer push para main
\`\`\`

## 📦 **Estrutura do Projeto**

\`\`\`
chamados-internos/
├── 📁 app/                 # Páginas Next.js
├── 📁 components/          # Componentes React
├── 📁 hooks/              # Hooks customizados
├── 📁 public/             # Arquivos estáticos
│   ├── 📄 manifest.json   # Configuração PWA
│   ├── 🔧 sw.js          # Service Worker
│   └── 🎨 icon-*.png     # Ícones PWA
├── 📁 scripts/            # Scripts utilitários
└── 📁 .github/workflows/  # CI/CD GitHub Actions
\`\`\`

## 🔧 **Configuração**

### **Personalizar para sua prefeitura:**

1. **Editar informações:**
   \`\`\`javascript
   // public/manifest.json
   {
     "name": "Sua Prefeitura - Chamados",
     "short_name": "Chamados",
     // ...
   }
   \`\`\`

2. **Trocar logo:**
   - Substitua `public/icon-512x512.png`
   - Execute `npm run generate-icons`

3. **Atualizar secretarias:**
   \`\`\`javascript
   // app/page.tsx
   const secretarias = [
     "Sua Secretaria 1",
     "Sua Secretaria 2",
     // ...
   ]
   \`\`\`

## 🚀 **Deploy Gratuito**

### **GitHub Pages (Recomendado):**
1. Fork este repositório
2. Vá em **Settings** > **Pages**
3. Source: **GitHub Actions**
4. ✅ **Pronto!** URL: `https://seu-usuario.github.io/chamados-internos/`

### **Outras opções gratuitas:**
- **Vercel:** Conecte o GitHub e deploy automático
- **Netlify:** Arraste a pasta `out/` após `npm run build`
- **Firebase Hosting:** `firebase deploy` após configurar

## 📊 **Analytics (Opcional)**

Para monitorar uso, adicione Google Analytics:

\`\`\`javascript
// app/layout.tsx
<Script src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID" />
<Script id="google-analytics">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
  `}
</Script>
\`\`\`

## 🔒 **Segurança**

- ✅ **HTTPS obrigatório** (GitHub Pages fornece)
- ✅ **CSP headers** configurados
- ✅ **Dados locais** criptografados
- ✅ **Sem backend** = sem vulnerabilidades de servidor

## 📞 **Suporte**

- 📧 **Email:** suporte@saofranciscodoconde.ba.gov.br
- 🌐 **Site:** https://saofranciscodoconde.ba.gov.br
- 📱 **WhatsApp:** (75) 9999-9999

## 📄 **Licença**

MIT License - Livre para uso em qualquer prefeitura brasileira.

---

**Desenvolvido com ❤️ para a Prefeitura de São Francisco do Conde**
*A joia do recôncavo baiano* 💎

*Automatically synced with your [v0.dev](https://v0.dev) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/supacold10-6558s-projects/v0-prefeitura-de-sao-francisco-do-conde)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/F19EKt08Dc5)

## Overview

This repository will stay in sync with your deployed chats on [v0.dev](https://v0.dev).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.dev](https://v0.dev).

## Deployment

Your project is live at:

**[https://vercel.com/supacold10-6558s-projects/v0-prefeitura-de-sao-francisco-do-conde](https://vercel.com/supacold10-6558s-projects/v0-prefeitura-de-sao-francisco-do-conde)**

## Build your app

Continue building your app on:

**[https://v0.dev/chat/projects/F19EKt08Dc5](https://v0.dev/chat/projects/F19EKt08Dc5)**

## How It Works

1. Create and modify your project using [v0.dev](https://v0.dev)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository
