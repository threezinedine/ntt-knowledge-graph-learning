import React from 'react';
import * as styles from './styles.module.scss';
import clsx from 'clsx';
import { Button } from '@/components';
import { UIConfig } from '@/configs';

export interface TabItem {
	name: string;
}

interface TabContainerProps {
	tabs: TabItem[];
	activeTab: string;
	onTabClick?: (tab: TabItem) => Promise<void>;
	onTabClose?: (tab: TabItem) => Promise<void>;
}

const uiConfig = UIConfig.getInstance();

export default function TabContainer({ tabs, activeTab, onTabClick, onTabClose }: TabContainerProps) {
	function handleTabClose(e: React.MouseEvent<HTMLDivElement>, tab: TabItem) {
		e.stopPropagation();
		e.preventDefault();
		onTabClose?.(tab);
	}

	return (
		<div className={clsx(styles['tab-container'])}>
			{tabs.map((tab, index) => (
				<div
					key={index}
					className={clsx(styles['tab-container-item'], activeTab === tab.name && styles['active'])}
					onClick={() => onTabClick?.(tab)}
				>
					<div className={clsx(styles['tab-container-item__content'])}>{tab.name}</div>
					<Button
						className={clsx(styles['tab-container-item__close'])}
						textColor={uiConfig.TextColor}
						buttonColor={'transparent'}
						buttonColorHover={uiConfig.NormalButtonHoverColor}
						onClick={(e) => handleTabClose(e, tab)}
					>
						<i className={clsx('fa-solid fa-xmark')}></i>
					</Button>
				</div>
			))}
		</div>
	);
}
