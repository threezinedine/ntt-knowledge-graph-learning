import React from 'react';
import * as styles from './styles.module.scss';
import clsx from 'clsx';
import { Button } from '@/components';

export default function Title() {
	return (
		<div className={clsx(styles['title'])}>
			<div className={clsx(styles['title__left'])}></div>
			<div className={clsx(styles['title__center'])}></div>
			<div className={clsx(styles['title__right'])}>
				<Button
					className={clsx(styles['title__right-button'])}
					textColor="rgb(200, 200, 200)"
					buttonColorHover="rgb(150, 150, 150)"
				>
					<i className={clsx('fa-solid', 'fa-minus')} />
				</Button>
				<Button
					className={clsx(styles['title__right-button'])}
					textColor="rgb(200, 200, 200)"
					buttonColorHover="rgb(150, 150, 150)"
				>
					<i className={clsx('fa-regular', 'fa-window-restore')} />
				</Button>
				<Button
					className={clsx(styles['title__right-button'])}
					textColor="rgb(200, 200, 200)"
					buttonColorHover="rgb(200, 10, 10)"
				>
					<i className={clsx('fa-solid', 'fa-xmark')} />
				</Button>
			</div>
		</div>
	);
}
