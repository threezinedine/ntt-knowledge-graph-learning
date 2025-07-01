import React from 'react';
import clsx from 'clsx';
import * as styles from './styles.module.scss';

interface MainLayoutProps {
	children: React.ReactNode;
	footer?: React.ReactNode;
}

export default function MainLayout({ children, footer }: MainLayoutProps) {
	return (
		<div className={clsx(styles['main-layout'])}>
			<div className={clsx(styles['main-layout__main'])}>{children}</div>
			<div className={clsx(styles['main-layout__footer'])}>{footer}</div>
		</div>
	);
}
