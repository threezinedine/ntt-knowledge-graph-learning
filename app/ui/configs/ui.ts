export default class UIConfig {
	public LeftSidebarWidthInPixels: number = 200;
	public RightSidebarWidthInPixels: number = 200;

	private static _instance: UIConfig;

	private constructor() {}

	public static getInstance(): UIConfig {
		if (!UIConfig._instance) {
			UIConfig._instance = new UIConfig();
		}

		return UIConfig._instance;
	}
}
