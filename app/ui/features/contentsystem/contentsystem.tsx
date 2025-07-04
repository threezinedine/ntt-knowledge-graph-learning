import React from 'react';
import TabContainer, { TabItem } from './tabcontainer';
import * as styles from './styles.module.scss';
import clsx from 'clsx';
import UIConfig from '@/configs/ui';

interface ContentSystemProps {
	tabs: TabItem[];
	activeTab: string;
	children: React.ReactNode;
	onTabChange?: (tab: TabItem) => Promise<void>;
	onTabClose?: (tab: TabItem) => Promise<void>;
}

const uiConfig = UIConfig.getInstance();

export default function ContentSystem({ tabs, activeTab, children, onTabChange, onTabClose }: ContentSystemProps) {
	return (
		<div
			className={clsx(styles['content-system'])}
			style={
				{
					'--editor-background-color': uiConfig.EditorBackgroundColor,
					'--text-color': uiConfig.TextColor,
				} as React.CSSProperties
			}
		>
			<div className={clsx(styles['content-system-header'])}>
				<TabContainer tabs={tabs} activeTab={activeTab} onTabClick={onTabChange} onTabClose={onTabClose} />
			</div>
			<div className={clsx(styles['content-system-content'])}>{children}</div>
		</div>
	);
}
