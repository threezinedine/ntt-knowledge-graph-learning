import React from 'react';
import * as styles from './styles.module.scss';
import clsx from 'clsx';
import { UIConfig } from '@/configs';
import { Button } from '@/components';
import { useProject } from '@/contexts';
import { Form, FormItem } from '@/components';

const uiConfig = UIConfig.getInstance();

function NewProject() {
	const project = useProject((state) => state.project);

	function handleCancel() {
		window.electron.closeNewProjectWindow();
	}

	function handleCreate() {
		window.electron.closeNewProjectWindow();
	}

	const formItems: FormItem[] = [
		{
			id: 'project-name',
			label: 'Name',
			className: clsx(styles['form-item']),
		},
		{
			id: 'test-number',
			label: 'Test Number',
			type: 'number',
			className: clsx(styles['form-item']),
		},
		{
			id: 'test-date',
			label: 'Test Date',
			type: 'date',
			className: clsx(styles['form-item']),
		},
		{
			id: 'test-boolean',
			label: 'Test Boolean',
			type: 'boolean',
			className: clsx(styles['form-item']),
		},
	];

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
			<div className={clsx(styles['new-project-content'])}>
				<Form items={formItems} />
			</div>
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
