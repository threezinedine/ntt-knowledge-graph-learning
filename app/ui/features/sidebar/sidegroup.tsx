import React, { useEffect, useState } from 'react';
import * as styles from './styles.module.scss';
import clsx from 'clsx';
import { UIConfig } from '@/configs';
import useSidebarGroup from './sidebargroup';

export interface SideGroupProps {
	title: string;
	children: React.ReactNode;
	sideGroupIndex?: number;
}

const uiConfig = UIConfig.getInstance();

export default function SideGroup({ title, children, sideGroupIndex = 0 }: SideGroupProps) {
	const { groupHeightsInPercent, toggleGroup } = useSidebarGroup();
	const [contentHeight, setContentHeight] = useState(0);

	useEffect(() => {
		calculateContentHeight();
	}, [groupHeightsInPercent]);

	function calculateContentHeight() {
		const contents = document.querySelectorAll(`.${styles['sidegroup-header']}`);
		if (!contents) return;

		const culHeaderHeight = Array.from(contents).reduce((acc, curr) => acc + curr.clientHeight, 0);

		const sidebar = document.querySelector(`.${styles['sidebar']}`);
		if (!sidebar) return;

		const sidebarHeight = sidebar.clientHeight;

		setContentHeight(sidebarHeight - culHeaderHeight);
	}

	function handleToggleGroup(e: React.MouseEvent<HTMLDivElement>) {
		calculateContentHeight();
		toggleGroup(sideGroupIndex);
	}

	return (
		<div
			className={clsx(styles['sidegroup'])}
			style={
				{
					'--text-color': uiConfig.TextColor,
					'--content-height': `${contentHeight}px`,
					'--height-in-percent': groupHeightsInPercent[sideGroupIndex],
				} as React.CSSProperties
			}
		>
			<div className={clsx(styles['sidegroup-header'])} onClick={handleToggleGroup}>
				<i
					className={clsx(
						'fa-solid',
						groupHeightsInPercent[sideGroupIndex] !== 0 ? 'fa-chevron-down' : 'fa-chevron-right',
						styles['sidegroup-header__icon'],
					)}
				></i>
				<span>{title}</span>
			</div>
			<div
				className={clsx(
					styles['sidegroup-content'],
					groupHeightsInPercent[sideGroupIndex] === 0 && styles['display-none'],
				)}
			>
				{children}
			</div>
		</div>
	);
}
