import React, { useEffect, useState } from 'react';
import * as styles from './styles.module.scss';
import clsx from 'clsx';
import { UIConfig } from '@/configs';
import useSidebarGroup from './sidebargroup';
import { calculateContentHeight } from './sidebarutil';

export interface SideGroupProps {
	title: string;
	children: React.ReactNode;
	sideGroupIndex?: number;
}

const uiConfig = UIConfig.getInstance();

export default function SideGroup({ title, children, sideGroupIndex = 0 }: SideGroupProps) {
	const { groupInfos, toggleGroup, resizeGroup } = useSidebarGroup();
	const [contentHeight, setContentHeight] = useState(0);

	useEffect(() => {
		calculateContentHeight(styles, (contentHeight) => {
			setContentHeight(contentHeight);
		});
	}, [groupInfos]);

	function handleToggleGroup(e: React.MouseEvent<HTMLDivElement>) {
		calculateContentHeight(styles, (contentHeight) => {
			setContentHeight(contentHeight);
		});
		toggleGroup(sideGroupIndex);
	}

	function handleResizeStart(e: React.MouseEvent<HTMLDivElement>) {
		e.preventDefault();
		e.stopPropagation();

		function handleResizeMove(e: MouseEvent) {
			resizeGroup(sideGroupIndex, e.movementY);
		}

		function handleResizeEnd(e: MouseEvent) {
			e.preventDefault();
			e.stopPropagation();
			document.removeEventListener('mousemove', handleResizeMove);
			document.removeEventListener('mouseup', handleResizeEnd);
		}

		document.addEventListener('mousemove', handleResizeMove);
		document.addEventListener('mouseup', handleResizeEnd);
	}

	function canBeResized(): boolean {
		if (!groupInfos[sideGroupIndex]?.isOpen) {
			return false;
		}

		return groupInfos.some((info, index) => index < sideGroupIndex && info.isOpen);
	}

	return (
		<div
			className={clsx(styles['sidegroup'])}
			style={
				{
					'--text-color': uiConfig.TextColor,
					'--content-height': `${contentHeight}px`,
					'--height': `${groupInfos[sideGroupIndex]?.height}px`,
				} as React.CSSProperties
			}
		>
			<div className={clsx(styles['sidegroup-header'])}>
				{canBeResized() && (
					<div className={styles['sidegroup-header__resize-handle']} onMouseDown={handleResizeStart}></div>
				)}
				<div className={styles['sidegroup-header__content']} onClick={handleToggleGroup}>
					<div className={styles['sidegroup-header__content__icon']}>
						<i
							className={clsx(
								'fa-solid',
								groupInfos[sideGroupIndex]?.isOpen ? 'fa-chevron-down' : 'fa-chevron-right',
							)}
						></i>
					</div>
					<div className={styles['sidegroup-header__content__content']}>{title}</div>
				</div>
			</div>
			<div
				className={clsx(
					styles['sidegroup-content'],
					!groupInfos[sideGroupIndex]?.isOpen && styles['display-none'],
				)}
			>
				{children}
			</div>
		</div>
	);
}
