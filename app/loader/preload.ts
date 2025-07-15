import { contextBridge, ipcRenderer } from 'electron';
import {
	EVENT_IS_WINDOW_MAXIMIZED,
	EVENT_CLOSE_WINDOW,
	EVENT_MINIMIZE_WINDOW,
	EVENT_MAXIMIZE_WINDOW,
	EVENT_RESTORE_WINDOW,
	EVENT_CREATE_NEW_PROJECT_WINDOW,
	EVENT_WINDOW_IS_MAXIMIZED,
	EVENT_WINDOW_IS_UNMAXIMIZED,
	EVENT_SHOULD_CREATE_NEW_PROJECT_WINDOW,
	EVENT_CLOSE_NEW_PROJECT_WINDOW,
	EVENT_OPEN_FOLDER_DIALOG,
	EVENT_CHECK_FILE_EXISTS,
	EVENT_PATH_JOIN,
	EVENT_CHECK_DIR_EXIST,
	EVENT_CREATE_DIR,
	EVENT_LOAD_FILE,
	EVENT_SAVE_FILE,
	EVENT_SAVE_APP_DATA,
	EVENT_LOAD_APP_DATA,
	EVENT_ON_PROJECT_RELOAD,
	EVENT_RELOAD_PROJECT,
} from './events';
import { RenderDialogOptions } from './dialog';

contextBridge.exposeInMainWorld('electron', {
	isWindowMaximized: () => ipcRenderer.invoke(EVENT_IS_WINDOW_MAXIMIZED),
	closeWindow: () => ipcRenderer.invoke(EVENT_CLOSE_WINDOW),
	minimizeWindow: () => ipcRenderer.invoke(EVENT_MINIMIZE_WINDOW),
	maximizeWindow: () => ipcRenderer.invoke(EVENT_MAXIMIZE_WINDOW),
	restoreWindow: () => ipcRenderer.invoke(EVENT_RESTORE_WINDOW),

	onWindowIsMaximized: (callback: () => Promise<void>) => ipcRenderer.on(EVENT_WINDOW_IS_MAXIMIZED, callback),
	onWindowIsUnmaximized: (callback: () => Promise<void>) => ipcRenderer.on(EVENT_WINDOW_IS_UNMAXIMIZED, callback),

	onShouldCreateNewProjectWindow: (callback: () => Promise<void>) =>
		ipcRenderer.on(EVENT_SHOULD_CREATE_NEW_PROJECT_WINDOW, callback),

	openNewProjectWindow: () => ipcRenderer.invoke(EVENT_CREATE_NEW_PROJECT_WINDOW),
	closeNewProjectWindow: () => ipcRenderer.invoke(EVENT_CLOSE_NEW_PROJECT_WINDOW),

	loadFile: (filePath: string) => ipcRenderer.invoke(EVENT_LOAD_FILE, filePath),
	saveFile: (filePath: string, data: string) => ipcRenderer.invoke(EVENT_SAVE_FILE, filePath, data),

	saveAppData: (data: string) => ipcRenderer.invoke(EVENT_SAVE_APP_DATA, data),
	loadAppData: () => ipcRenderer.invoke(EVENT_LOAD_APP_DATA),

	openFolderDialog: (options: RenderDialogOptions) => ipcRenderer.invoke(EVENT_OPEN_FOLDER_DIALOG, options),

	checkFileExists: (filePath: string) => ipcRenderer.invoke(EVENT_CHECK_FILE_EXISTS, filePath),
	checkDirExist: (dirPath: string) => ipcRenderer.invoke(EVENT_CHECK_DIR_EXIST, dirPath),

	createDir: (dirPath: string) => ipcRenderer.invoke(EVENT_CREATE_DIR, dirPath),

	pathJoin: (paths: string[]) => ipcRenderer.invoke(EVENT_PATH_JOIN, paths),

	onProjectReload: (callback: () => Promise<void>) => ipcRenderer.on(EVENT_ON_PROJECT_RELOAD, callback),
	reloadProject: () => ipcRenderer.invoke(EVENT_RELOAD_PROJECT),
});
