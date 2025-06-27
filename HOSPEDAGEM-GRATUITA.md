# 🚀 Hospedagem Gratuita para PWA

## Opções Recomendadas (100% Gratuitas)

### 1. **Vercel** (Recomendado)
- ✅ Deploy automático via GitHub
- ✅ HTTPS gratuito
- ✅ CDN global
- ✅ Domínio personalizado gratuito

**Como fazer:**
1. Crie conta no [Vercel](https://vercel.com)
2. Conecte seu repositório GitHub
3. Deploy automático a cada commit
4. URL: `https://seu-projeto.vercel.app`

### 2. **Netlify**
- ✅ 100GB bandwidth/mês
- ✅ Deploy contínuo
- ✅ Formulários gratuitos

**Como fazer:**
1. Crie conta no [Netlify](https://netlify.com)
2. Conecte repositório
3. Configure build: `npm run build && npm run export`
4. Pasta de publicação: `out`

### 3. **GitHub Pages**
- ✅ Hospedagem direta do GitHub
- ✅ Domínio personalizado

**Como fazer:**
1. No repositório, vá em Settings > Pages
2. Source: GitHub Actions
3. Configure workflow de build

### 4. **Firebase Hosting**
- ✅ 10GB storage gratuito
- ✅ CDN global do Google

## 📱 Configuração PWA

### Comandos para Build:
\`\`\`bash
npm run build
npm run export
\`\`\`

### Estrutura de arquivos necessária:
\`\`\`
out/
├── index.html
├── manifest.json
├── sw.js
├── icon-*.png
└── _next/
\`\`\`

## 🔧 Configuração Next.js para PWA

Seu `next.config.mjs` já está configurado:
\`\`\`javascript
output: 'export',
trailingSlash: true,
distDir: 'out',
images: { unoptimized: true }
\`\`\`

## 📋 Checklist de Deploy

- [ ] Build sem erros
- [ ] Manifest.json válido
- [ ] Service Worker funcionando
- [ ] Ícones em todos os tamanhos
- [ ] HTTPS habilitado
- [ ] Teste de instalação PWA

## 🌐 Domínio Personalizado (Opcional)

### Gratuitos:
- `.tk`, `.ml`, `.ga` (Freenom)
- Subdomínio da prefeitura

### Configuração:
1. Adicione CNAME no DNS
2. Configure no painel da hospedagem
3. Aguarde propagação (até 24h)

## 📊 Monitoramento

### Ferramentas gratuitas:
- Google Analytics
- Google Search Console
- Lighthouse (auditoria PWA)

## 🔒 Segurança

- ✅ HTTPS obrigatório para PWA
- ✅ Service Worker em HTTPS
- ✅ Dados locais criptografados

## 📱 Teste de Instalação

1. Abra no Chrome/Edge
2. Procure ícone "Instalar"
3. Teste funcionalidade offline
4. Verifique notificações

## 🆘 Suporte

- Documentação: [web.dev/pwa](https://web.dev/pwa)
- Teste PWA: [pwa-test.com](https://pwa-test.com)
- Validador: [manifest-validator.appspot.com](https://manifest-validator.appspot.com)
