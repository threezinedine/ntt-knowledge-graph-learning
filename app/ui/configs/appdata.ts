interface AppData {
	lastProjectPath: string | null;
}

export default class AppDataConfig {
	private static instance: AppDataConfig;

	public static async getInstance(): Promise<AppDataConfig> {
		if (!AppDataConfig.instance) {
			AppDataConfig.instance = new AppDataConfig();
			await AppDataConfig.instance.loadAppData();
		}
		return AppDataConfig.instance;
	}

	private appData: AppData = {
		lastProjectPath: null,
	};

	public getLastProjectPath(): string | null {
		return this.appData.lastProjectPath;
	}

	public setLastProjectPath(lastProjectPath: string | null) {
		console.log('setLastProjectDir', lastProjectPath);
		this.appData.lastProjectPath = lastProjectPath;
		this.saveAppData();
	}

	private async saveAppData() {
		await window.electron.saveAppData(JSON.stringify(this.appData));
	}

	private async loadAppData() {
		const appData = JSON.parse(await window.electron.loadAppData()) as AppData;
		if (appData === null) {
			this.appData = {
				lastProjectPath: null,
			};
			return;
		}
		this.appData = appData;
	}
}
