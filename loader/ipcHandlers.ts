import fs from 'fs';
import { BrowserWindow, ipcMain, app } from 'electron';
import {
	EVENT_IS_WINDOW_MAXIMIZED,
	EVENT_CLOSE_WINDOW,
	EVENT_MINIMIZE_WINDOW,
	EVENT_MAXIMIZE_WINDOW,
	EVENT_RESTORE_WINDOW,
	EVENT_LOAD_FILE,
	EVENT_SAVE_FILE,
	EVENT_CREATE_NEW_PROJECT_WINDOW,
	EVENT_CLOSE_NEW_PROJECT_WINDOW,
	EVENT_OPEN_FOLDER_DIALOG,
	EVENT_CHECK_FILE_EXISTS,
	EVENT_PATH_JOIN,
	EVENT_CHECK_DIR_EXIST,
	EVENT_CREATE_DIR,
	EVENT_SAVE_APP_DATA,
	EVENT_LOAD_APP_DATA,
	EVENT_ON_PROJECT_RELOAD,
	EVENT_RELOAD_PROJECT,
} from './events';
import { createNewProjectWindow, closeNewProjectWindow } from './projectwindow';
import { openDialog, RenderDialogOptions } from './dialog';
import path from 'path';
import { APP_DATA_FILE_NAME } from './constants';

export function registerMainWindowHandlers(mainWindow: BrowserWindow) {
	ipcMain.handle(EVENT_IS_WINDOW_MAXIMIZED, () => mainWindow.isMaximized());
	ipcMain.handle(EVENT_CLOSE_WINDOW, () => mainWindow.close());
	ipcMain.handle(EVENT_MINIMIZE_WINDOW, () => mainWindow.minimize());
	ipcMain.handle(EVENT_MAXIMIZE_WINDOW, () => mainWindow.maximize());
	ipcMain.handle(EVENT_RESTORE_WINDOW, () => mainWindow.unmaximize());

	ipcMain.handle(EVENT_LOAD_FILE, (event, filePath: string): Promise<string | null> => {
		try {
			const fileContent = fs.readFileSync(filePath, 'utf8');
			return Promise.resolve(fileContent);
		} catch (error) {
			console.error(error);
			return Promise.resolve(null);
		}
	});

	ipcMain.handle(EVENT_SAVE_FILE, (event, filePath: string, data: string): Promise<void> => {
		fs.writeFileSync(filePath, data);
		return Promise.resolve();
	});

	ipcMain.handle(EVENT_SAVE_APP_DATA, (event, data: string): Promise<void> => {
		const appDataDir = app.getPath('userData');
		const appDataFilePath = path.join(appDataDir, APP_DATA_FILE_NAME);
		fs.writeFileSync(appDataFilePath, data);
		return Promise.resolve();
	});

	ipcMain.handle(EVENT_LOAD_APP_DATA, (event): Promise<string> => {
		const appDataDir = app.getPath('userData');
		const appDataFilePath = path.join(appDataDir, APP_DATA_FILE_NAME);
		if (!fs.existsSync(appDataFilePath)) {
			return Promise.resolve(null);
		}
		const data = fs.readFileSync(appDataFilePath, 'utf8');
		return Promise.resolve(data);
	});

	ipcMain.handle(EVENT_CREATE_NEW_PROJECT_WINDOW, createNewProjectWindow);
	ipcMain.handle(EVENT_CLOSE_NEW_PROJECT_WINDOW, closeNewProjectWindow);

	ipcMain.handle(EVENT_OPEN_FOLDER_DIALOG, (_, options: RenderDialogOptions) => openDialog(mainWindow, options));

	ipcMain.handle(EVENT_CHECK_FILE_EXISTS, (_, filePath: string): Promise<boolean> => {
		return Promise.resolve(fs.existsSync(filePath));
	});

	ipcMain.handle(EVENT_CHECK_DIR_EXIST, (_, dirPath: string): Promise<boolean> => {
		try {
			return Promise.resolve(fs.statSync(dirPath).isDirectory());
		} catch (error) {
			return Promise.resolve(false);
		}
	});

	ipcMain.handle(EVENT_CREATE_DIR, (_, dirPath: string): Promise<void> => {
		fs.mkdirSync(dirPath, { recursive: true });
		return Promise.resolve();
	});

	ipcMain.handle(EVENT_PATH_JOIN, (_, paths: string[]): Promise<string> => {
		return Promise.resolve(path.join(...paths));
	});

	ipcMain.handle(EVENT_RELOAD_PROJECT, (_) => {
		mainWindow.webContents.send(EVENT_ON_PROJECT_RELOAD);
		return Promise.resolve();
	});
}
