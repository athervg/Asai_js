import { ipcMain } from 'electron';
import path from 'path';

const audioExtensions = ['.wav', '.mp3', '.flac'];

export function setupIpcHandlers() {
  ipcMain.handle('get-audio-files', async (_, { paths, search }) => {
    console.log('[IPC] get-audio-files triggered');
    return paths
      .filter(p => audioExtensions.includes(path.extname(p).toLowerCase()))
      .filter(p => !search || path.basename(p).toLowerCase().includes(search.toLowerCase()))
      .map(p => ({
        path: p,
        name: path.basename(p),
      }));
  });
}
