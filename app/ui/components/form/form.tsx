import React, { useState, forwardRef, useImperativeHandle } from 'react';
import * as styles from './styles.module.scss';
import clsx from 'clsx';
import { UIConfig } from '@/configs';
import { Validator, FieldType, FormValues } from './validators';
import { ComboBox, ComboBoxItem } from '../combobox';
import { TextInput } from '../textinput';

export interface FormItem {
	id: string;
	label?: string;
	className?: string;
	placeholder?: string;
	validators?: Validator[];
	type?: FieldType;
	choices?: ComboBoxItem[];
}

interface FormProps {
	items: FormItem[];
	className?: string;
	errorMessageColor?: string;
	onSubmit?: (values: FormValues) => void;
}

type FormError = string | null;

const uiConfig = UIConfig.getInstance();

export interface FormRef {
	submit: () => boolean;
	clean: () => void;
}

const Form = forwardRef<FormRef, FormProps>(
	({ items, className, errorMessageColor = 'rgb(236, 97, 97)', onSubmit }, ref) => {
		useImperativeHandle(ref, () => ({
			submit: () => {
				const newErrors = validateForm();
				if (newErrors.every((error) => error === null)) {
					onSubmit?.(formValues);
					setErrors(newErrors);
					return true;
				} else {
					setErrors(newErrors);
					return false;
				}
			},
			clean: () => {
				const newFormValues: FormValues = JSON.parse(JSON.stringify(formValues));
				Object.keys(newFormValues).forEach((key) => {
					if (newFormValues[key].type === 'file') {
						newFormValues[key].value = null;
					} else if (newFormValues[key].type === 'date') {
						newFormValues[key].value = new Date().toISOString().split('T')[0];
					} else if (newFormValues[key].type === 'boolean') {
						newFormValues[key].value = false;
					} else if (newFormValues[key].type === 'number') {
						newFormValues[key].value = 0;
					} else {
						newFormValues[key].value = '';
					}
				});

				const newErrors: FormError[] = [...errors];
				newErrors.forEach((error, index) => {
					if (error) {
						newErrors[index] = null;
					}
				});

				setFormValues(newFormValues);
				setErrors(newErrors);
			},
		}));

		const [formValues, setFormValues] = useState<FormValues>(() => {
			const values: FormValues = {};
			items.forEach((item) => {
				values[item.id] = {
					name: item.id,
					type: item.type || 'text',
					value: '',
				};
			});
			return values;
		});
		const [errors, setErrors] = useState<FormError[]>(() => {
			const errors: FormError[] = [];
			items.forEach(() => {
				errors.push(null);
			});
			return errors;
		});

		function validateForm(): FormError[] {
			const newErrors = [...errors];

			items.forEach((item, index) => {
				const value = formValues[item.id];

				item.validators?.forEach((validator: Validator) => {
					const error = validator(value, formValues);
					if (error) {
						newErrors[index] = error;
						return;
					}
					newErrors[index] = null;
				});
			});

			return newErrors;
		}

		function onTextInputChange(id: string, value: string) {
			const newFormValues = { ...formValues };
			newFormValues[id].value = value;
			setFormValues(newFormValues);
			setErrors(validateForm());
		}

		return (
			<div
				className={clsx(styles['form'], className)}
				style={
					{
						'--background-color': uiConfig.EditorBackgroundColor,
						'--error-message-color': errorMessageColor,
					} as React.CSSProperties
				}
			>
				{items.map((item, itemIndex) => {
					const inputField = formValues[item.id];
					let inputTag: React.ReactNode | null = null;

					if (inputField.type === 'text') {
						if (item.choices) {
							inputTag = (
								<ComboBox
									selectedItem={null}
									items={item.choices}
									onSelect={() => {}}
									className={clsx(styles['combobox'])}
									lineHeight={30}
								/>
							);
						} else {
							inputTag = (
								<TextInput
									type="text"
									placeholder={item.placeholder || 'Enter this field'}
									className={clsx(styles['text-input'])}
									onChange={(value) => onTextInputChange(item.id, value)}
									onBlur={() => validateForm()}
								/>
							);
						}
					} else if (inputField.type === 'number') {
						inputTag = (
							<TextInput
								type="number"
								placeholder={item.placeholder || 'Enter this field'}
								className={clsx(styles['text-input'])}
								onChange={(value) => onTextInputChange(item.id, value)}
							/>
						);
					} else if (inputField.type === 'password') {
						inputTag = (
							<TextInput
								type="password"
								placeholder={item.placeholder || 'Enter this field'}
								className={clsx(styles['text-input'])}
								onChange={(value) => onTextInputChange(item.id, value)}
							/>
						);
					} else if (inputField.type === 'date') {
						inputTag = (
							<TextInput
								type="date"
								placeholder={item.placeholder || 'Enter this field'}
								className={clsx(styles['text-input'])}
							/>
						);
					} else if (inputField.type === 'boolean') {
						inputTag = (
							<label className={styles['checkbox-container']} htmlFor={item.id}>
								<input type="checkbox" id={item.id} />
								<div className={styles['checkbox-checkmark']}>
									<i className={clsx('fa-solid fa-check')}></i>
								</div>
							</label>
						);
					}

					return (
						<div key={item.id} className={clsx(item.className, styles['form-item'])}>
							<label htmlFor={item.id}>{item.label}</label>
							<div className={styles['input-container']}>
								{inputTag}
								{errors[itemIndex] && (
									<div className={styles['error-message']}>{errors[itemIndex]}</div>
								)}
							</div>
						</div>
					);
				})}
			</div>
		);
	},
);

export default Form;
