export default class UIConfig {
	public LeftSidebarWidthInPixels: number = 200;
	public RightSidebarWidthInPixels: number = 200;

	public TextColor: string = 'rgb(150, 150, 150)';
	public NormalButtonHoverColor: string = 'rgb(100, 100, 100)';
	public CloseButtonHoverColor: string = 'rgb(200, 10, 10)';
	public LogoColor: string = 'rgb(200, 200, 200)';

	public CreateButtonColor: string = 'rgb(100, 100, 200)';
	public CreateButtonHoverColor: string = 'rgb(114, 114, 255)';

	public ApplicationBackgroundColor: string = 'rgb(15, 15, 15)';
	public EditorBackgroundColor: string = 'rgb(24, 24, 24)';

	public SeparatorColor: string = 'rgb(50, 50, 50)';

	private static _instance: UIConfig;

	private constructor() {}

	public static getInstance(): UIConfig {
		if (!UIConfig._instance) {
			UIConfig._instance = new UIConfig();
		}

		return UIConfig._instance;
	}
}
