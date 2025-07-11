import React from 'react';
import * as styles from './styles.module.scss';
import clsx from 'clsx';

interface TextInputProps {
	value?: string | number;
	readOnly?: boolean;
	type: 'text' | 'password' | 'number' | 'date';
	placeholder?: string;
	className?: string;
	borderBeforeColor?: string;
	borderAfterColor?: string;
	inputHoveredColor?: string;
	onChange?: (value: string) => void;
	onBlur?: () => void;
}

export default function TextInput({
	value,
	readOnly = false,
	placeholder,
	type,
	className,
	borderBeforeColor = 'rgba(221, 221, 221, 0.39)',
	borderAfterColor = '#5891ff',
	inputHoveredColor = '#4985e01f',
	onChange,
	onBlur,
}: TextInputProps) {
	return (
		<div
			className={clsx(styles['wrapper'], className)}
			style={
				{
					'--border-before-color': borderBeforeColor,
					'--border-after-color': borderAfterColor,
					'--input-hovered-color': inputHoveredColor,
				} as React.CSSProperties
			}
		>
			<input
				type={type}
				placeholder={placeholder}
				onChange={(e) => onChange?.(e.target.value)}
				onBlur={onBlur}
				readOnly={readOnly}
				value={value || ''}
			/>
			<span></span>
		</div>
	);
}
