export default class UIConfig {
	public LeftSidebarWidthInPixels: number = 200;
	public RightSidebarWidthInPixels: number = 200;

	public TextColor: string = 'rgb(150, 150, 150)';
	public NormalButtonHoverColor: string = 'rgb(100, 100, 100)';
	public CloseButtonHoverColor: string = 'rgb(200, 10, 10)';
	public LogoColor: string = 'rgb(200, 200, 200)';

	public ApplicationBackgroundColor: string = 'rgb(15, 15, 15)';
	public EditorBackgroundColor: string = 'rgb(24, 24, 24)';

	private static _instance: UIConfig;

	private constructor() {}

	public static getInstance(): UIConfig {
		if (!UIConfig._instance) {
			UIConfig._instance = new UIConfig();
		}

		return UIConfig._instance;
	}
}
