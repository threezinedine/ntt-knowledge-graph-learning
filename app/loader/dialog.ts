import { BrowserWindow, dialog, OpenDialogOptions } from 'electron';

export interface RenderDialogOptions {
	folderPath?: string;
	folder?: boolean;
	extensions?: string[];
}

export function openDialog(window: BrowserWindow, options: RenderDialogOptions): string[] | undefined {
	return dialog.showOpenDialog(window, {
		properties: ['openDirectory'],
		defaultPath: options.folderPath,
	});
}
