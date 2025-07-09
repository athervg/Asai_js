import { app, BrowserWindow, ipcMain, protocol } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';

// custom ASAI setup
import fs from 'fs/promises'; // async file access
import mime from 'mime'; // for correct MIME types
import { setupIpcHandlers } from './main/fileManager'

protocol.registerSchemesAsPrivileged([
  {
    scheme: 'asai',
    privileges: {
      secure: true,
      standard: true,
      stream: true,
      supportFetchAPI: true,
    },
  },
]);
// 

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 600,
    minHeight: 400,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      autoplayPolicy: 'no-user-gesture-required',
    },
    vibrancy: 'fullscreen-ui',
    titleBarStyle: 'hidden',
    trafficLightPosition: {
      x: 18,
      y: 18
    },
    ...(process.platform !== 'darwin' ? { titleBarOverlay: true } : {}),
    frame: false
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  //custom ASAI file protocol
  protocol.handle('asai', async (request) => {
    const filePath = decodeURIComponent(request.url.replace('asai://', ''));
    console.log('Decoded file path:', filePath);
    try {
      const data = await fs.readFile(filePath);
      const mimeType = mime.getType(filePath) || 'application/octet-stream';

      return new Response(data, {
        headers: { 'Content-Type': mimeType },
      });
    } catch (err) {
      console.error('Failed to load file:', filePath, err);
      return new Response('File not found', { status: 404 });
    }
  });
  //

  // custom ASAI IPC Handler for file handling
  setupIpcHandlers(); 
  //
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
