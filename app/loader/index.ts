import { app, BrowserWindow } from 'electron';

function createWindow() {
	if (process.env.NODE_ENV === 'development') {
		console.log('Development mode');
		require('electron-reloader')(module, {
			watch: ['dist-ui/**/*.{js,jsx,ts,tsx}'],
		});
	} else {
		console.log('Production mode');
	}

	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
		},
	});

	mainWindow.loadFile('index.html');
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
