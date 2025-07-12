import React, { useRef } from 'react';
import * as styles from './styles.module.scss';
import clsx from 'clsx';
import { AppDataConfig, UIConfig } from '@/configs';
import { Button } from '@/components';
import { Project, useProject } from '@/contexts';
import { Form, FormItem, Required, FormRef, FormValues, ProjectFileValidate } from '@/components/form';
import { PROJECT_FILE_NAME } from '@/data';

const uiConfig = UIConfig.getInstance();

function NewProject() {
	const project = useProject((state) => state.project);
	const saveProject = useProject((state) => state.saveProject);
	const formRef = useRef<FormRef>(null);

	function handleCancel() {
		window.electron.closeNewProjectWindow();
	}

	async function handleSubmit(values: FormValues) {
		const projectClone: Project = JSON.parse(JSON.stringify(project));
		const projectDir = await window.electron.pathJoin([
			values['project-path'].value as string,
			values['project-name'].value as string,
		]);
		const projectFilePath = await window.electron.pathJoin([projectDir, PROJECT_FILE_NAME]);
		projectClone.projectName = values['project-name'].value as string;
		projectClone.projectDir = projectDir;
		(await AppDataConfig.getInstance()).setLastProjectPath(projectFilePath);
		await saveProject(projectClone);
	}

	async function handleCreate() {
		if (!formRef.current) {
			return;
		}

		if (await formRef.current.submit()) {
			await formRef.current.clean();
			await window.electron.closeNewProjectWindow();
		}
	}

	const formItems: FormItem[] = [
		{
			id: 'project-name',
			label: 'Project',
			type: 'text',
			className: clsx(styles['form-item']),
			validators: [Required],
			impacts: ['project-path'],
		},
		{
			id: 'project-path',
			label: 'Path',
			type: 'folder',
			className: clsx(styles['form-item']),
			validators: [Required, ProjectFileValidate('project-name', PROJECT_FILE_NAME)],
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
				<Form items={formItems} ref={formRef} onSubmit={handleSubmit} />
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
