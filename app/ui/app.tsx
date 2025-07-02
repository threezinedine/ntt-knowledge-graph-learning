import React from 'react';
import { MainLayout, Title, Sidebar, FileTree, Community } from '@/features';

function Application(): React.ReactElement {
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
			<h1>Hello World</h1>
		</MainLayout>
	);
}

export default Application;
