export type FieldType = 'text' | 'number' | 'boolean' | 'file' | 'email' | 'password' | 'url' | 'date';

export interface Field {
	name: string;
	type: FieldType;
	value: string | number | boolean | File | Date;
}

export type FormValues = {
	[key: string]: Field;
};

export type Validator = (value: string, formValues: FormValues) => string | null;
