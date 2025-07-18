import { Field, FormValues, Validator } from './validator';

export const HasNoFile = (fileName: string): Validator => {
	return async (field: Field, formValues: FormValues) => {
		const filePath = await window.electron.pathJoin([field.value as string, fileName]);
		const exists = await window.electron.checkFileExists(filePath);
		return exists ? `File ${fileName} already exists` : null;
	};
};
