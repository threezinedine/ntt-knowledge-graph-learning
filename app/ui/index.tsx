import React from 'react';
import { HashRouter, Route, Routes } from 'react-router';
import { createRoot } from 'react-dom/client';

import Application from './app';
import { NewProject } from '@/features';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<HashRouter>
		<Routes>
			<Route path="/" Component={Application} />
			<Route path="/new-project" Component={NewProject} />
		</Routes>
	</HashRouter>,
);
