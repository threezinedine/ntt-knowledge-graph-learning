import React from 'react';
import { MainLayout, Title } from '@/shared';

function Application(): React.ReactElement {
	return (
		<MainLayout title={<Title />}>
			<h1>Hello World</h1>
		</MainLayout>
	);
}

export default Application;
