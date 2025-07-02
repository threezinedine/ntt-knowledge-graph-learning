import React from 'react';
import clsx from 'clsx';
import * as styles from './styles.module.scss';
import { UIConfig } from '@/configs';
import { useSidebarStore } from '@/contexts';

interface MainLayoutProps {
	children: React.ReactNode;
	title?: React.ReactNode;
	footer?: React.ReactNode;
	leftSidebar?: React.ReactNode;
	rightSidebar?: React.ReactNode;
}

const uiConfig = UIConfig.getInstance();

export default function MainLayout({ children, title, footer, leftSidebar, rightSidebar }: MainLayoutProps) {
	const { isLeftSidebarOpen, isRightSidebarOpen } = useSidebarStore();

	function startResize(direction: 'left' | 'right' = 'left') {
		return (e: React.MouseEvent<HTMLDivElement>) => {
			const sidebarName = `main-layout__main-sidebar-${direction}`;
			const sideBar = document.querySelector(`.${styles[sidebarName]}`) as HTMLElement;

			const onResizing = (e: MouseEvent) => {
				if (direction === 'left') {
					uiConfig.LeftSidebarWidthInPixels += e.movementX;
					sideBar.style.width = `${uiConfig.LeftSidebarWidthInPixels}px`;
				} else {
					uiConfig.RightSidebarWidthInPixels -= e.movementX;
					sideBar.style.width = `${uiConfig.RightSidebarWidthInPixels}px`;
				}
			};

			document.addEventListener('mousemove', onResizing);
			document.addEventListener('mouseup', () => document.removeEventListener('mousemove', onResizing));
		};
	}

	return (
		<div className={clsx(styles['main-layout'])}>
			<div className={clsx(styles['main-layout__title'])}>{title}</div>
			<div className={clsx(styles['main-layout__main'])}>
				<div
					className={clsx(styles['main-layout__main-sidebar-left'], !isLeftSidebarOpen && styles['closed'])}
					style={{ '--left-sidebar-width': `${uiConfig.LeftSidebarWidthInPixels}px` } as React.CSSProperties}
				>
					{leftSidebar}
					<div
						className={clsx(styles['main-layout__main-col-resize'])}
						style={{ right: '-1px', top: '0' }}
						onMouseDown={startResize('left')}
					/>
				</div>
				<div className={clsx(styles['main-layout__main-content'])}>{children}</div>
				<div
					className={clsx(styles['main-layout__main-sidebar-right'], !isRightSidebarOpen && styles['closed'])}
					style={
						{ '--right-sidebar-width': `${uiConfig.RightSidebarWidthInPixels}px` } as React.CSSProperties
					}
				>
					{rightSidebar}
					<div
						className={clsx(styles['main-layout__main-col-resize'])}
						style={{ left: '-1px', top: '0' }}
						onMouseDown={startResize('right')}
					/>
				</div>
			</div>
			<div className={clsx(styles['main-layout__footer'])}>{footer}</div>
		</div>
	);
}
