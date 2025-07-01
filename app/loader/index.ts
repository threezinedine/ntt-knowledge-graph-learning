import path from 'path';
import { app, BrowserWindow } from 'electron';
import registerAllHandlers from './ipcHandlers';
import { EVENT_WINDOW_IS_MAXIMIZED, EVENT_WINDOW_IS_UNMAXIMIZED } from './events';

function createWindow() {
	if (process.env.NODE_ENV.trim() === 'development') {
		console.log('Development mode');
		require('electron-reloader')(module, {
			watch: ['dist-ui/**/*.{js,jsx,ts,tsx}', 'assets/**/*', 'index.html', 'loader/**/*'],
		});
	} else {
		console.log('Production mode');
	}

	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		autoHideMenuBar: true,
		frame: false,
		webPreferences: {
			nodeIntegration: true,
			preload: path.join(__dirname, 'preload.js'),
		},
	});

	mainWindow.loadFile('index.html');

	registerAllHandlers(mainWindow);

	mainWindow.on('maximize', () => {
		mainWindow.webContents.send(EVENT_WINDOW_IS_MAXIMIZED);
	});

	mainWindow.on('unmaximize', () => {
		mainWindow.webContents.send(EVENT_WINDOW_IS_UNMAXIMIZED);
	});
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});
