import React, { useEffect } from 'react';
import * as styles from './styles.module.scss';
import clsx from 'clsx';
import { UIConfig } from '@/configs';
import { Button } from '@/components';
import { useProject } from '@/contexts';

const uiConfig = UIConfig.getInstance();

function NewProject() {
	const project = useProject((state) => state.project);

	function handleCancel() {
		window.electron.closeNewProjectWindow();
	}

	function handleCreate() {
		window.electron.closeNewProjectWindow();
	}

	return (
		<div
			className={clsx(styles['new-project'])}
			style={
				{
					'--background-color': uiConfig.EditorBackgroundColor,
					'--text-color': uiConfig.TextColor,
					'--separator-color': uiConfig.SeparatorColor,
				} as React.CSSProperties
			}
		>
			<div className={clsx(styles['new-project-header'])}>
				<h1>New Project - {project.projectName || 'Untitled'}</h1>
			</div>
			<div className={clsx(styles['new-project-content'])}></div>
			<div className={clsx(styles['new-project-footer'])}>
				<Button
					onClick={handleCancel}
					className={clsx(styles['button'])}
					textColor={uiConfig.TextColor}
					buttonColorHover={uiConfig.NormalButtonHoverColor}
				>
					Cancel
				</Button>
				<Button
					onClick={handleCreate}
					className={clsx(styles['button'])}
					textColor={uiConfig.TextColor}
					buttonColor={uiConfig.CreateButtonColor}
					buttonColorHover={uiConfig.CreateButtonHoverColor}
				>
					Create
				</Button>
			</div>
		</div>
	);
}

export default NewProject;
