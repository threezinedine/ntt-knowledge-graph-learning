import React, { useState } from 'react';
import { MainLayout, Title, Sidebar, FileTree, Community, ContentSystem, TabItem } from '@/features';

function Application(): React.ReactElement {
	const [activeTab, setActiveTab] = useState<string>('Tab 1');
	const [tabs, setTabs] = useState<TabItem[]>([
		{ name: 'Tab 1' },
		{ name: 'Tab 2' },
		{ name: 'Super Long Tab Name' },
	]);

	return (
		<MainLayout
			title={<Title />}
			leftSidebar={
				<Sidebar
					groups={[
						{
							title: 'Project',
							children: <FileTree />,
						},
						{
							title: 'Community',
							children: <Community />,
						},
						{
							title: 'Outline',
							children: <Community />,
						},
					]}
				/>
			}
		>
			<ContentSystem
				tabs={tabs}
				activeTab={activeTab}
				onTabChange={async (tab) => {
					setActiveTab(tab.name);
				}}
				onTabClose={async (tab) => {
					console.log(tab);
				}}
				onTabReorder={async (tabNames) => {
					console.log(tabNames);
					const newTabs = new Array<TabItem>(tabs.length);

					tabNames.forEach((tabName, index) => {
						newTabs[index] = tabs.find((tab) => tab.name === tabName)!;
					});

					setTabs(newTabs);
				}}
			>
				<h1 style={{ height: '100%' }}>Hello World {activeTab}</h1>
			</ContentSystem>
		</MainLayout>
	);
}

export default Application;
