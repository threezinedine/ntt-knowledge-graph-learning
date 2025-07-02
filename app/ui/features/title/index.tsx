import React, { useEffect, useState } from 'react';
import * as styles from './styles.module.scss';
import { ReactComponent as Logo } from '@/assets/images/b-logo.svg';
import clsx from 'clsx';
import { Button } from '@/components';
import UIConfig from '@/configs/ui';
import { useSidebarStore } from '@/contexts';

const uiConfig = UIConfig.getInstance();

export default function Title() {
	const [isMaximized, setIsMaximized] = useState(false);
	const { toggleLeftSidebar, toggleRightSidebar } = useSidebarStore();

	useEffect(() => {
		window.electron.isWindowMaximized().then((isMaximized) => {
			setIsMaximized(isMaximized);
		});

		window.electron.onWindowIsMaximized(async () => {
			setIsMaximized(true);
		});

		window.electron.onWindowIsUnmaximized(async () => {
			setIsMaximized(false);
		});
	}, []);

	return (
		<div className={clsx(styles['title'])}>
			<div className={clsx(styles['title__left'])}>
				<div
					className={clsx(styles['title__left-logo'])}
					style={{ '--logo-color': uiConfig.LogoColor } as React.CSSProperties}
				>
					<Logo />
				</div>
			</div>
			<div className={clsx(styles['title__center'])}></div>
			<div className={clsx(styles['title__right'])}>
				<div className={clsx(styles['title__right-buttons'])}>
					<Button
						className={clsx(styles['title__right-button'])}
						textColor={uiConfig.TextColor}
						buttonColorHover={uiConfig.NormalButtonHoverColor}
						onClick={toggleLeftSidebar}
					>
						<i className={clsx('fa-regular', 'fa-square-caret-left')} />
					</Button>
					<Button
						className={clsx(styles['title__right-button'])}
						textColor={uiConfig.TextColor}
						buttonColorHover={uiConfig.NormalButtonHoverColor}
						onClick={toggleRightSidebar}
					>
						<i className={clsx('fa-regular', 'fa-square-caret-right')} />
					</Button>
					<Button
						className={clsx(styles['title__right-button'])}
						textColor={uiConfig.TextColor}
						buttonColorHover={uiConfig.NormalButtonHoverColor}
					>
						<i className={clsx('fa-solid', 'fa-gear')} />
					</Button>
				</div>
				<div className={clsx(styles['title__right-windows-buttons'])}>
					<Button
						className={clsx(styles['title__right-windows-button'])}
						textColor={uiConfig.TextColor}
						buttonColorHover={uiConfig.NormalButtonHoverColor}
						onClick={() => {
							window.electron.minimizeWindow();
						}}
					>
						<i className={clsx('fa-solid', 'fa-minus')} />
					</Button>
					<Button
						className={clsx(styles['title__right-windows-button'])}
						textColor={uiConfig.TextColor}
						buttonColorHover={uiConfig.NormalButtonHoverColor}
						onClick={() => {
							if (isMaximized) {
								window.electron.restoreWindow();
							} else {
								window.electron.maximizeWindow();
							}
						}}
					>
						<i className={clsx('fa-solid', isMaximized ? 'fa-window-restore' : 'fa-window-maximize')} />
					</Button>
					<Button
						className={clsx(styles['title__right-windows-button'])}
						textColor={uiConfig.TextColor}
						buttonColorHover={uiConfig.CloseButtonHoverColor}
						onClick={() => {
							window.electron.closeWindow();
						}}
					>
						<i className={clsx('fa-solid', 'fa-xmark')} />
					</Button>
				</div>
			</div>
		</div>
	);
}
