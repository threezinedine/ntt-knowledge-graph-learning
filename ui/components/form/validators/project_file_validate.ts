import { Field, FormValues, Validator } from './validator';

export const ProjectFileValidate = (projectNameField: string, projectFile: string): Validator => {
	return async (value: Field, formValues: FormValues) => {
		const projectName = formValues[projectNameField].value as string;
		const projectPath = value.value as string;

		const newProjectDir = await window.electron.pathJoin([projectPath, projectName]);
		console.log(newProjectDir);
		const newProjectDirExist = await window.electron.checkDirExist(newProjectDir);

		if (!newProjectDirExist) {
			return null;
		}

		const projectFilePath = await window.electron.pathJoin([newProjectDir, projectFile]);
		const exists = await window.electron.checkFileExists(projectFilePath);
		return exists ? `File ${projectFile} already exists` : null;
	};
};
