import React, { useEffect, useState } from 'react';
import * as styles from './styles.module.scss';
import clsx from 'clsx';
import { Button } from '@/components';

export default function Title() {
	const [isMaximized, setIsMaximized] = useState(false);

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
			<div className={clsx(styles['title__left'])}></div>
			<div className={clsx(styles['title__center'])}></div>
			<div className={clsx(styles['title__right'])}>
				<Button
					className={clsx(styles['title__right-button'])}
					textColor="rgb(200, 200, 200)"
					buttonColorHover="rgb(150, 150, 150)"
					onClick={() => {
						window.electron.minimizeWindow();
					}}
				>
					<i className={clsx('fa-solid', 'fa-minus')} />
				</Button>
				<Button
					className={clsx(styles['title__right-button'])}
					textColor="rgb(200, 200, 200)"
					buttonColorHover="rgb(150, 150, 150)"
					onClick={() => {
						if (isMaximized) {
							window.electron.restoreWindow();
						} else {
							window.electron.maximizeWindow();
						}
					}}
				>
					<i className={clsx('fa-solid', isMaximized ? 'fa-window-maximize' : 'fa-window-restore')} />
				</Button>
				<Button
					className={clsx(styles['title__right-button'])}
					textColor="rgb(200, 200, 200)"
					buttonColorHover="rgb(200, 10, 10)"
					onClick={() => {
						window.electron.closeWindow();
					}}
				>
					<i className={clsx('fa-solid', 'fa-xmark')} />
				</Button>
			</div>
		</div>
	);
}
