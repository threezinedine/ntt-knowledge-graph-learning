import React, { useState } from 'react';
import { MainLayout, Title, Sidebar, FileTree, Community, ContentSystem } from '@/features';

function Application(): React.ReactElement {
	const [activeTab, setActiveTab] = useState<string>('Tab 1');

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
				tabs={[{ name: 'Tab 1' }, { name: 'Tab 2' }, { name: 'Super Long Tab Name' }]}
				activeTab={activeTab}
				onTabChange={async (tab) => {
					setActiveTab(tab.name);
				}}
				onTabClose={async (tab) => {
					console.log(tab);
				}}
			>
				<h1 style={{ height: '100%' }}>Hello World {activeTab}</h1>
			</ContentSystem>
		</MainLayout>
	);
}

export default Application;
