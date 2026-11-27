const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('sp801', {
  loadProgress: () => ipcRenderer.invoke('progress:load'),
  saveProgress: (data) => ipcRenderer.invoke('progress:save', data),
  exportProgress: (data) => ipcRenderer.invoke('progress:export', data),
  importProgress: () => ipcRenderer.invoke('progress:import'),
  appInfo: () => ipcRenderer.invoke('app:info'),
  onMenuExport: (cb) => ipcRenderer.on('menu:export', () => cb()),
  onMenuImport: (cb) => ipcRenderer.on('menu:import', () => cb()),
})
