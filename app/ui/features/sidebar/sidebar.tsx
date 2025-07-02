import React, { useEffect } from 'react';
import * as styles from './styles.module.scss';
import clsx from 'clsx';
import SideGroup, { SideGroupProps } from './sidegroup';
import useSidebarGroup from './sidebargroup';

interface SidebarProps {
	groups: SideGroupProps[];
}

export default function Sidebar({ groups }: SidebarProps) {
	const initializeGroupCount = useSidebarGroup((state) => state.initializeGroupCount);

	useEffect(() => {
		initializeGroupCount(groups.length);
	}, []);

	return (
		<div className={clsx(styles['sidebar'])}>
			{groups.map((group, index) => (
				<SideGroup key={index} {...{ ...group, sideGroupIndex: index }} />
			))}
		</div>
	);
}
