export type FieldType = 'text' | 'number' | 'boolean' | 'file' | 'password' | 'date';
export type FieldValue = string | number | boolean | File | Date;

export interface Field {
	name: string;
	type: FieldType;
	value: FieldValue;
}

export type FormValues = {
	[key: string]: Field;
};

export type Validator = (value: Field, formValues: FormValues) => Promise<string | null>;
