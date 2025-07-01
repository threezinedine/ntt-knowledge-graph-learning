import { BrowserWindow, ipcMain } from 'electron';

export default function registerAllHandlers(mainWindow: BrowserWindow) {
	ipcMain.handle('is-window-maximized', () => mainWindow.isMaximized());
	ipcMain.handle('close-window', () => mainWindow.close());
	ipcMain.handle('minimize-window', () => mainWindow.minimize());
	ipcMain.handle('maximize-window', () => mainWindow.maximize());
	ipcMain.handle('restore-window', () => mainWindow.unmaximize());
}
