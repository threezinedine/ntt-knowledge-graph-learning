import { Field, FormValues, Validator } from './validator';

export const HasNoFile = (fileName: string): Validator => {
	return async (field: Field, formValues: FormValues) => {
		console.log(field);
		const filePath = await window.electron.pathJoin([field.value as string, fileName]);
		const exists = await window.electron.checkFileExists(filePath);
		console.log(filePath, exists);
		return exists ? `File ${fileName} already exists` : null;
	};
};
