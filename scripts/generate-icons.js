const sharp = require("sharp")
const fs = require("fs")
const path = require("path")

const sizes = [72, 96, 128, 144, 152, 192, 384, 512]
const inputIcon = path.join(__dirname, "../public/icon-512x512.png")
const outputDir = path.join(__dirname, "../public")

async function generateIcons() {
  console.log("🎨 Gerando ícones PWA...")

  // Verificar se o ícone base existe
  if (!fs.existsSync(inputIcon)) {
    console.error("❌ Ícone base não encontrado:", inputIcon)
    console.log("📝 Crie um ícone 512x512px em public/icon-512x512.png")
    return
  }

  try {
    for (const size of sizes) {
      const outputPath = path.join(outputDir, `icon-${size}x${size}.png`)

      await sharp(inputIcon)
        .resize(size, size, {
          kernel: sharp.kernel.lanczos3,
          fit: "cover",
          position: "center",
          background: { r: 255, g: 255, b: 255, alpha: 0 },
        })
        .png({
          quality: 90,
          compressionLevel: 9,
        })
        .toFile(outputPath)

      console.log(`✅ Gerado: icon-${size}x${size}.png`)
    }

    // Gerar favicon
    await sharp(inputIcon).resize(32, 32).png().toFile(path.join(outputDir, "favicon-32x32.png"))

    await sharp(inputIcon).resize(16, 16).png().toFile(path.join(outputDir, "favicon-16x16.png"))

    console.log("🎉 Todos os ícones foram gerados com sucesso!")
  } catch (error) {
    console.error("❌ Erro ao gerar ícones:", error)
  }
}

generateIcons()
