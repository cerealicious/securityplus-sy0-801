'use strict'

const { app, BrowserWindow, ipcMain, dialog, shell, Menu } = require('electron')
const path = require('node:path')
const fs = require('node:fs')

const APP_DIR_NAME = 'SecurityPlus-SY0-801'
const isDev = !app.isPackaged && process.env.SP801_DEV === '1'

let mainWindow = null

function progressPath() {
  return path.join(app.getPath('userData'), 'progress.json')
}

function readProgress() {
  const file = progressPath()
  try {
    const raw = fs.readFileSync(file, 'utf8')
    return JSON.parse(raw)
  } catch (err) {
    const bak = file + '.bak'
    try {
      return JSON.parse(fs.readFileSync(bak, 'utf8'))
    } catch {
      return null
    }
  }
}

function writeProgress(data) {
  const file = progressPath()
  const dir = path.dirname(file)
  fs.mkdirSync(dir, { recursive: true })
  const tmp = file + '.tmp'
  const payload = JSON.stringify(data, null, 2)
  fs.writeFileSync(tmp, payload, 'utf8')
  try {
    if (fs.existsSync(file)) fs.copyFileSync(file, file + '.bak')
  } catch {
    /* best effort */
  }
  fs.renameSync(tmp, file)
  return true
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1360,
    height: 880,
    minWidth: 1080,
    minHeight: 720,
    show: false,
    backgroundColor: '#0a1120',
    icon: fs.existsSync(path.join(__dirname, '..', 'build', 'icon.ico'))
      ? path.join(__dirname, '..', 'build', 'icon.ico')
      : undefined,
    title: 'Security+ SY0-801',
    autoHideMenuBar: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      spellcheck: false,
      devTools: true,
    },
  })

  mainWindow.once('ready-to-show', () => mainWindow.show())

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173')
  } else {
    mainWindow.loadFile(path.join(__dirname, '..', 'dist', 'index.html'))
  }

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:\/\//i.test(url)) shell.openExternal(url)
    return { action: 'deny' }
  })

  mainWindow.webContents.on('will-navigate', (event, url) => {
    const current = mainWindow.webContents.getURL()
    if (url !== current) {
      event.preventDefault()
      if (/^https?:\/\//i.test(url)) shell.openExternal(url)
    }
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

function buildMenu() {
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Export Progress…',
          click: () => mainWindow && mainWindow.webContents.send('menu:export'),
        },
        {
          label: 'Import Progress…',
          click: () => mainWindow && mainWindow.webContents.send('menu:import'),
        },
        { type: 'separator' },
        { role: 'quit', label: 'Quit' },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo', label: 'Undo' },
        { role: 'redo', label: 'Redo' },
        { type: 'separator' },
        { role: 'cut', label: 'Cut' },
        { role: 'copy', label: 'Copy' },
        { role: 'paste', label: 'Paste' },
        { role: 'selectAll', label: 'Select All' },
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload', label: 'Reload' },
        { type: 'separator' },
        { role: 'resetZoom', label: 'Actual Size' },
        { role: 'zoomIn', label: 'Zoom In' },
        { role: 'zoomOut', label: 'Zoom Out' },
        { type: 'separator' },
        { role: 'togglefullscreen', label: 'Toggle Fullscreen' },
        ...(isDev ? [{ role: 'toggleDevTools', label: 'Developer Tools' }] : []),
      ],
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'About',
          click: () => {
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'About',
              message: 'Security+ SY0-801 — Learning Platform',
              detail:
                'Version ' +
                app.getVersion() +
                '\n\nContent aligned with CompTIA Security+ SY0-801 (V8).\n100% offline application. Local progress storage.',
              buttons: ['Close'],
            })
          },
        },
      ],
    },
  ]
  Menu.setApplicationMenu(Menu.buildFromTemplate(template))
}

const gotLock = app.requestSingleInstanceLock()
if (!gotLock) {
  app.quit()
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })

  app.whenReady().then(() => {
    app.setAppUserModelId('com.secplus.sy0801')
    buildMenu()
    createWindow()

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  })
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

/* ---------------- IPC ---------------- */

ipcMain.handle('progress:load', () => readProgress())

ipcMain.handle('progress:save', (_event, data) => {
  try {
    writeProgress(data)
    return { ok: true }
  } catch (err) {
    return { ok: false, error: String(err) }
  }
})

ipcMain.handle('progress:export', async (_event, data) => {
  const stamp = new Date().toISOString().slice(0, 10)
  const res = await dialog.showSaveDialog(mainWindow, {
    title: 'Export Progress',
    defaultPath: `securityplus-progress-${stamp}.json`,
    filters: [{ name: 'JSON', extensions: ['json'] }],
  })
  if (res.canceled || !res.filePath) return { ok: false, canceled: true }
  try {
    fs.writeFileSync(res.filePath, JSON.stringify(data, null, 2), 'utf8')
    return { ok: true, path: res.filePath }
  } catch (err) {
    return { ok: false, error: String(err) }
  }
})

ipcMain.handle('progress:import', async () => {
  const res = await dialog.showOpenDialog(mainWindow, {
    title: 'Import Progress',
    properties: ['openFile'],
    filters: [{ name: 'JSON', extensions: ['json'] }],
  })
  if (res.canceled || !res.filePaths.length) return { ok: false, canceled: true }
  try {
    const raw = fs.readFileSync(res.filePaths[0], 'utf8')
    const data = JSON.parse(raw)
    return { ok: true, data }
  } catch (err) {
    return { ok: false, error: String(err) }
  }
})

ipcMain.handle('app:info', () => ({
  version: app.getVersion(),
  platform: process.platform,
  userData: app.getPath('userData'),
  packaged: app.isPackaged,
}))
