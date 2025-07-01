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
		};
	}
}

export {};
