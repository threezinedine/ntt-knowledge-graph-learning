import fs from 'fs';
import { BrowserWindow, ipcMain } from 'electron';
import {
	EVENT_IS_WINDOW_MAXIMIZED,
	EVENT_CLOSE_WINDOW,
	EVENT_MINIMIZE_WINDOW,
	EVENT_MAXIMIZE_WINDOW,
	EVENT_RESTORE_WINDOW,
	EVENT_LOAD_JSON_FILE,
	EVENT_CREATE_NEW_PROJECT_WINDOW,
	EVENT_CLOSE_NEW_PROJECT_WINDOW,
} from './events';
import { createNewProjectWindow, closeNewProjectWindow } from './projectwindow';

export default function registerAllHandlers(mainWindow: BrowserWindow) {
	ipcMain.handle(EVENT_IS_WINDOW_MAXIMIZED, () => mainWindow.isMaximized());
	ipcMain.handle(EVENT_CLOSE_WINDOW, () => mainWindow.close());
	ipcMain.handle(EVENT_MINIMIZE_WINDOW, () => mainWindow.minimize());
	ipcMain.handle(EVENT_MAXIMIZE_WINDOW, () => mainWindow.maximize());
	ipcMain.handle(EVENT_RESTORE_WINDOW, () => mainWindow.unmaximize());

	ipcMain.handle(EVENT_LOAD_JSON_FILE, (event, filePath: string): Promise<string | null> => {
		try {
			const fileContent = fs.readFileSync(filePath, 'utf8');
			return Promise.resolve(fileContent);
		} catch (error) {
			console.error(error);
			return Promise.resolve(null);
		}
	});

	ipcMain.handle(EVENT_CREATE_NEW_PROJECT_WINDOW, createNewProjectWindow);
	ipcMain.handle(EVENT_CLOSE_NEW_PROJECT_WINDOW, closeNewProjectWindow);
}
