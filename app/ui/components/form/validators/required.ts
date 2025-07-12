import { Field, Validator } from './validator';

export const Required: Validator = async (value: Field) => {
	if (value.type === 'text' || value.type === 'password' || value.type === 'folder') {
		return (value.value as string).length === 0 ? 'This field is required' : null;
	} else if (value.type === 'file') {
		return (value.value as File).size === 0 ? 'This field is required' : null;
	}

	return null;
};
