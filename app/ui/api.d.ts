declare global {
	interface DialogResult {
		canceled: boolean;
		filePaths: string[];
	}

	interface Window {
		electron: {
			isWindowMaximized: () => Promise<boolean>;
			closeWindow: () => Promise<void>;
			minimizeWindow: () => Promise<void>;
			maximizeWindow: () => Promise<void>;
			restoreWindow: () => Promise<void>;

			onWindowIsMaximized: (callback: () => Promise<void>) => void;
			onWindowIsUnmaximized: (callback: () => Promise<void>) => void;

			onShouldCreateNewProjectWindow: (callback: () => Promise<void>) => void;

			openNewProjectWindow: () => Promise<void>;
			closeNewProjectWindow: () => Promise<void>;

			loadJsonFile: (filePath: string) => Promise<string | null>;
			saveJsonFile: (filePath: string, data: string) => Promise<void>;

			openFolderDialog: (options: RenderDialogOptions) => Promise<DialogResult>;

			checkFileExists: (filePath: string) => Promise<boolean>;
			checkDirExist: (dirPath: string) => Promise<boolean>;

			createDir: (dirPath: string) => Promise<void>;

			pathJoin: (paths: string[]) => Promise<string>;
		};
	}
}

export {};
