import React, { useEffect } from 'react';
import * as styles from './styles.module.scss';
import clsx from 'clsx';
import SideGroup, { SideGroupProps } from './sidegroup';
import useSidebarGroup from './sidebargroup';
import { calculateContentHeight } from './sidebarutil';

interface SidebarProps {
	groups: SideGroupProps[];
}

export default function Sidebar({ groups }: SidebarProps) {
	const initializeGroupCount = useSidebarGroup((state) => state.initializeGroupCount);
	const changeTotalHeight = useSidebarGroup((state) => state.changeTotalHeight);

	useEffect(() => {
		initializeGroupCount(groups.length, 100);
		calculateContentHeight(styles, (contentHeight) => {
			changeTotalHeight(contentHeight);
		});

		window.addEventListener('resize', () => {
			calculateContentHeight(styles, (contentHeight) => {
				changeTotalHeight(contentHeight);
			});
		});
	}, []);

	return (
		<div className={clsx(styles['sidebar'])}>
			{groups.map((group, index) => (
				<SideGroup key={index} {...{ ...group, sideGroupIndex: index }} />
			))}
		</div>
	);
}
