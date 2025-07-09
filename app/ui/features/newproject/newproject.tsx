import React, { useEffect } from 'react';
import * as styles from './styles.module.scss';
import clsx from 'clsx';
import { UIConfig } from '@/configs';
import { Button } from '@/components';

const uiConfig = UIConfig.getInstance();

function NewProject() {
	const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
		console.log('double click');
		e.preventDefault();
	};

	function handleCancel() {
		window.electron.onCloseNewProjectWindow();
	}

	return (
		<div
			className={clsx(styles['new-project'])}
			style={
				{
					'--background-color': uiConfig.EditorBackgroundColor,
				} as React.CSSProperties
			}
		>
			<div className={clsx(styles['new-project-header'])} onDoubleClick={handleDoubleClick}>
				<h1>New Project</h1>
			</div>
			<Button onClick={handleCancel}>Cancel</Button>
		</div>
	);
}

export default NewProject;
