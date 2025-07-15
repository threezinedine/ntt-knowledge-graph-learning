import React, { useEffect, useState } from 'react';
import { MainLayout, Title, Sidebar, FileTree, Community, ContentSystem, TabItem } from '@/features';
import { useNavigate } from 'react-router';
import { AppDataConfig } from '@/configs';
import { useProject } from '@/contexts';

function Application(): React.ReactElement {
	const [activeTab, setActiveTab] = useState<string>('Tab 1');
	const [tabs, setTabs] = useState<TabItem[]>([
		{ name: 'Tab 1' },
		{ name: 'Tab 2' },
		{ name: 'Super Long Tab Name' },
	]);
	const navigate = useNavigate();
	const loadProject = useProject((state) => state.loadProject);

	useEffect(() => {
		setTimeout(() => {
			window.toast.addToast({
				type: 'success',
				message: 'Hello World',
			});
		}, 1000);

		setTimeout(() => {
			window.toast.addToast({
				type: 'error',
				message: 'Hello World',
			});
		}, 2000);

		(async () => {
			window.electron.onShouldCreateNewProjectWindow(async () => {
				navigate('/new-project');
				return Promise.resolve();
			});

			window.electron.onProjectReload(async () => {
				const appDataConfig = await AppDataConfig.getInstance();
				await appDataConfig.loadAppData();

				const lastProjectPath = appDataConfig.getLastProjectPath();
				if (lastProjectPath) {
					await loadProject(lastProjectPath);
				}
			});

			const appDataConfig = await AppDataConfig.getInstance();

			const lastProjectPath = appDataConfig.getLastProjectPath();
			if (lastProjectPath) {
				await loadProject(lastProjectPath);
			}
		})();
	}, []);

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
