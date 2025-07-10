import path from 'path';
import { BrowserWindow } from 'electron';
import { EVENT_SHOULD_CREATE_NEW_PROJECT_WINDOW } from './events';

let numberOfNewProjectWindow = 0;
let newProjectWindow: BrowserWindow | null = null;

function createNewProjectWindow() {
	if (numberOfNewProjectWindow > 0) {
		return;
	}

	newProjectWindow = new BrowserWindow({
		width: 680,
		height: 400,
		autoHideMenuBar: true,
		resizable: false,
		frame: false,
		alwaysOnTop: true,
		parent: BrowserWindow.getFocusedWindow(),
		webPreferences: {
			nodeIntegration: true,
			preload: path.join(__dirname, 'preload.js'),
		},
	});

	newProjectWindow.loadFile('index.html');

	newProjectWindow.on('ready-to-show', () => {
		newProjectWindow.webContents.send(EVENT_SHOULD_CREATE_NEW_PROJECT_WINDOW);
	});

	newProjectWindow.on('maximize', () => {
		newProjectWindow.unmaximize();
	});

	numberOfNewProjectWindow++;
}

function closeNewProjectWindow() {
	numberOfNewProjectWindow--;
	newProjectWindow?.close();
	newProjectWindow = null;
}

export { createNewProjectWindow, closeNewProjectWindow };
