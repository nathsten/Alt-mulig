const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(app.getAppPath(), './render.js')
    }
})