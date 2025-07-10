import { Validator } from './validator';

export const Required: Validator = (value: string) => {
	return value.length === 0 ? 'This field is required' : null;
};
