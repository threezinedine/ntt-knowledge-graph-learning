import React, { useState } from 'react';
import * as styles from './styles.module.scss';
import clsx from 'clsx';
import { UIConfig } from '@/configs';
import { Validator, FieldType, FormValues } from './validators';

export interface FormItem {
	id: string;
	label?: string;
	className?: string;
	placeholder?: string;
	validators?: Validator[];
	type?: FieldType;
}

interface FormProps {
	items: FormItem[];
	className?: string;
}

const uiConfig = UIConfig.getInstance();

function Form({ items, className }: FormProps) {
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

	return (
		<div
			className={clsx(styles['form'], className)}
			style={
				{
					'--background-color': uiConfig.EditorBackgroundColor,
				} as React.CSSProperties
			}
		>
			{items.map((item) => {
				const inputField = formValues[item.id];
				let inputTag: React.ReactNode | null = null;

				if (inputField.type === 'text') {
					inputTag = <input type="text" id={item.id} placeholder={item.placeholder || 'Enter this field'} />;
				} else if (inputField.type === 'number') {
					inputTag = (
						<input type="number" id={item.id} placeholder={item.placeholder || 'Enter this field'} />
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
						{inputTag}
					</div>
				);
			})}
		</div>
	);
}

export default Form;
