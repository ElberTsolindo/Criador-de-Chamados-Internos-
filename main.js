const { app, BrowserWindow, Menu, shell } = require("electron")
const path = require("path")
const isDev = process.env.NODE_ENV === "development"

let mainWindow

function createWindow() {
  // Criar janela principal
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      webSecurity: true,
    },
    icon: path.join(__dirname, "public/icon-192x192.png"),
    title: "Chamados Internos - Prefeitura de São Francisco do Conde",
    show: false, // Não mostrar até estar pronto
    autoHideMenuBar: false, // Manter menu visível
  })

  // Menu personalizado
  const template = [
    {
      label: "Arquivo",
      submenu: [
        {
          label: "Novo Chamado",
          accelerator: "CmdOrCtrl+N",
          click: () => {
            mainWindow.reload()
          },
        },
        {
          label: "Imprimir",
          accelerator: "CmdOrCtrl+P",
          click: () => {
            mainWindow.webContents.print()
          },
        },
        { type: "separator" },
        {
          label: "Recarregar",
          accelerator: "CmdOrCtrl+R",
          click: () => {
            mainWindow.reload()
          },
        },
        { type: "separator" },
        {
          label: "Sair",
          accelerator: process.platform === "darwin" ? "Cmd+Q" : "Ctrl+Q",
          click: () => {
            app.quit()
          },
        },
      ],
    },
    {
      label: "Editar",
      submenu: [
        { label: "Desfazer", accelerator: "CmdOrCtrl+Z", role: "undo" },
        { label: "Refazer", accelerator: "Shift+CmdOrCtrl+Z", role: "redo" },
        { type: "separator" },
        { label: "Recortar", accelerator: "CmdOrCtrl+X", role: "cut" },
        { label: "Copiar", accelerator: "CmdOrCtrl+C", role: "copy" },
        { label: "Colar", accelerator: "CmdOrCtrl+V", role: "paste" },
      ],
    },
    {
      label: "Visualizar",
      submenu: [
        { label: "Tela Cheia", accelerator: "F11", role: "togglefullscreen" },
        { type: "separator" },
        { label: "Zoom In", accelerator: "CmdOrCtrl+Plus", role: "zoomin" },
        { label: "Zoom Out", accelerator: "CmdOrCtrl+-", role: "zoomout" },
        { label: "Zoom Reset", accelerator: "CmdOrCtrl+0", role: "resetzoom" },
      ],
    },
    {
      label: "Ajuda",
      submenu: [
        {
          label: "Sobre",
          click: () => {
            shell.openExternal("https://saofranciscodoconde.ba.gov.br")
          },
        },
        {
          label: "Suporte",
          click: () => {
            // Aqui você pode adicionar um link de suporte
            console.log("Suporte técnico")
          },
        },
      ],
    },
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)

  // Carregar aplicação
  if (isDev) {
    mainWindow.loadURL("http://localhost:3000")
    // Abrir DevTools em desenvolvimento
    mainWindow.webContents.openDevTools()
  } else {
    // Em produção, carregar arquivo local
    mainWindow.loadFile(path.join(__dirname, "out/index.html"))
  }

  // Mostrar janela quando estiver pronta
  mainWindow.once("ready-to-show", () => {
    mainWindow.show()
  })

  // Interceptar links externos
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url)
    return { action: "deny" }
  })
}

// Quando o app estiver pronto
app.whenReady().then(() => {
  createWindow()

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// Fechar app quando todas as janelas forem fechadas
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

// Configurações de segurança
app.on("web-contents-created", (event, contents) => {
  contents.on("new-window", (navigationEvent, navigationURL) => {
    navigationEvent.preventDefault()
    shell.openExternal(navigationURL)
  })
})
