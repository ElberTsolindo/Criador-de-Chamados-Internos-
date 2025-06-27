const fs = require("fs")
const path = require("path")
const archiver = require("archiver")

async function createInstaller() {
  console.log("📦 Criando pacote de instalação...")

  const output = fs.createWriteStream("chamados-internos-installer.zip")
  const archive = archiver("zip", { zlib: { level: 9 } })

  output.on("close", () => {
    console.log(`✅ Pacote criado: ${archive.pointer()} bytes`)
    console.log("📁 Arquivo: chamados-internos-installer.zip")
  })

  archive.on("error", (err) => {
    throw err
  })

  archive.pipe(output)

  // Adicionar arquivos do build
  archive.directory("out/", false)

  // Adicionar instruções
  archive.append(
    `
# Chamados Internos - Prefeitura de São Francisco do Conde

## Como Instalar:

### Opção 1 - Servidor Local:
1. Instale o Node.js (https://nodejs.org)
2. Extraia este arquivo
3. Abra o terminal na pasta extraída
4. Execute: npx serve . -s -p 3000
5. Abra: http://localhost:3000
6. Instale como PWA pelo navegador

### Opção 2 - Arquivo Local:
1. Extraia este arquivo
2. Abra o arquivo index.html no navegador
3. Adicione aos favoritos para acesso rápido

### Suporte:
- Email: suporte@saofranciscodoconde.ba.gov.br
- Site: https://saofranciscodoconde.ba.gov.br
  `,
    "LEIA-ME.txt",
  )

  await archive.finalize()
}

createInstaller()
