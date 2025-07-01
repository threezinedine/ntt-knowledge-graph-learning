import { contextBridge, ipcRenderer } from 'electron';
import {
	EVENT_IS_WINDOW_MAXIMIZED,
	EVENT_CLOSE_WINDOW,
	EVENT_MINIMIZE_WINDOW,
	EVENT_MAXIMIZE_WINDOW,
	EVENT_RESTORE_WINDOW,
	EVENT_WINDOW_IS_MAXIMIZED,
	EVENT_WINDOW_IS_UNMAXIMIZED,
} from './events';

contextBridge.exposeInMainWorld('electron', {
	isWindowMaximized: () => ipcRenderer.invoke(EVENT_IS_WINDOW_MAXIMIZED),
	closeWindow: () => ipcRenderer.invoke(EVENT_CLOSE_WINDOW),
	minimizeWindow: () => ipcRenderer.invoke(EVENT_MINIMIZE_WINDOW),
	maximizeWindow: () => ipcRenderer.invoke(EVENT_MAXIMIZE_WINDOW),
	restoreWindow: () => ipcRenderer.invoke(EVENT_RESTORE_WINDOW),

	onWindowIsMaximized: (callback: () => Promise<void>) => ipcRenderer.on(EVENT_WINDOW_IS_MAXIMIZED, callback),
	onWindowIsUnmaximized: (callback: () => Promise<void>) => ipcRenderer.on(EVENT_WINDOW_IS_UNMAXIMIZED, callback),
});
