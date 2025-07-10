declare global {
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
		};
	}
}

export {};
