import React, { useState, forwardRef, useImperativeHandle } from 'react';
import * as styles from './styles.module.scss';
import clsx from 'clsx';
import { UIConfig } from '@/configs';
import { Validator, FieldType, FormValues } from './validators';
import { ComboBox, ComboBoxItem } from '../combobox';
import { TextInput } from '../textinput';
import Button from '../button';

interface FileOptions {
	extensions?: string[]; // `folder` must be `false` or have no meanings
	folder?: boolean; // if `true` then choose folder else file
	folderPath?: string; // default folder path
}

export interface FormItem {
	id: string;
	label?: string;
	className?: string;
	placeholder?: string;
	validators?: Validator[];
	type?: FieldType;
	choices?: ComboBoxItem[]; // for combobox input (text) only
	fileOptions?: FileOptions; // for file input only
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

		function validateField(id: string, reload: boolean = false): FormError {
			const value = formValues[id];
			const item = items.find((item) => item.id === id);
			let newError: FormError | null = null;

			item.validators?.forEach((validator: Validator) => {
				const error = validator(value, formValues);
				if (error) {
					newError = error;
				}
			});

			if (reload) {
				const newErrors = [...errors];
				newErrors[items.findIndex((item) => item.id === id)] = newError;
				setErrors(newErrors);
			}

			return newError;
		}

		function validateForm(): FormError[] {
			const newErrors = [...errors];

			items.forEach((item, index) => {
				newErrors[index] = validateField(item.id);
			});

			return newErrors;
		}

		function onTextInputChange(id: string, value: string) {
			const newFormValues = JSON.parse(JSON.stringify(formValues));
			newFormValues[id].value = value;
			validateField(id, true);
			setFormValues(newFormValues);
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
									value={inputField.value as string}
									placeholder={item.placeholder || 'Enter this field'}
									className={clsx(styles['text-input'])}
									onChange={(value) => onTextInputChange(item.id, value)}
									onBlur={() => validateField(item.id, true)}
								/>
							);
						}
					} else if (inputField.type === 'number') {
						inputTag = (
							<TextInput
								type="number"
								value={inputField.value as number}
								placeholder={item.placeholder || 'Enter this field'}
								className={clsx(styles['text-input'])}
								onChange={(value) => onTextInputChange(item.id, value)}
							/>
						);
					} else if (inputField.type === 'password') {
						inputTag = (
							<TextInput
								type="password"
								value={inputField.value as string}
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
					} else if (inputField.type === 'file') {
						inputTag = (
							<div className={styles['file-input-container']}>
								<TextInput
									type="text"
									readOnly={true}
									placeholder={item.placeholder || 'Enter this field'}
									onChange={(value) => onTextInputChange(item.id, value)}
									onBlur={() => validateForm()}
									value={inputField.value as string}
									className={styles['file-input-text']}
								/>
								<Button
									onClick={async () => {
										const result = await window.electron.openFolderDialog({
											folder: item.fileOptions?.folder || false,
											extensions: item.fileOptions?.extensions || [],
											folderPath: item.fileOptions?.folderPath || '.',
										});

										if (!result.canceled) {
											console.log(result.filePaths);
											onTextInputChange(item.id, result.filePaths[0]);
										}
									}}
									className={styles['file-input-button']}
									buttonColor={uiConfig.EditorBackgroundColor}
									textColor={uiConfig.TextColor}
									buttonColorHover={uiConfig.NormalButtonHoverColor}
								>
									<i className={clsx('fa-solid fa-folder-open')}></i>
								</Button>
							</div>
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
