import React from 'react';
import * as styles from './styles.module.scss';
import clsx from 'clsx';
import { UIConfig } from '@/configs';
import { Button } from '@/components';

const uiConfig = UIConfig.getInstance();

/**
 * This page is used to open a project. Can be have multiple options to open a project.
 * 1. Open a project from a file (currently only support this feature)
 */
function OpenProject() {
	return (
		<div
			className={clsx(styles['container'])}
			style={
				{
					'--background-color': uiConfig.EditorBackgroundColor,
					'--text-color': uiConfig.TextColor,
					'--separator-color': uiConfig.SeparatorColor,
				} as React.CSSProperties
			}
		>
			<div className={clsx(styles['header'])}>
				<h1>Open a new Project</h1>
			</div>
			<div className={clsx(styles['content'])}>
				<div className={clsx(styles['open-project-content'])}></div>
				<div className={clsx(styles['cancel-button'])}>
					<Button
						className={clsx(styles['cancel-button-btn'])}
						textColor={uiConfig.TextColor}
						buttonColorHover={uiConfig.NormalButtonHoverColor}
						onClick={() => {
							window.electron.closeNewProjectWindow();
						}}
					>
						Cancel
					</Button>
				</div>
			</div>
		</div>
	);
}

export default OpenProject;
