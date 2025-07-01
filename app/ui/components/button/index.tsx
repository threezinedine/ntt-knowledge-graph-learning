import React from 'react';
import clsx from 'clsx';
import * as styles from './styles.module.scss';

interface ButtonProps {
	children?: React.ReactNode;
	onClick?: () => void;
	buttonColor?: string;
	textColor?: string;
	textColorHover?: string;
	buttonColorHover?: string;
	className?: string;
}

export default function Button({
	children,
	onClick,
	buttonColor = 'rgba(0, 0, 0, 0)',
	buttonColorHover = 'rgba(212, 199, 199, 255)',
	className = clsx(styles['auto-size']),
	textColor = 'rgba(0, 0, 0, 0)',
	textColorHover = 'rgba(212, 199, 199, 255)',
}: ButtonProps) {
	return (
		<div
			className={clsx(styles['button'], className)}
			style={
				{
					'--button-color': buttonColor,
					'--button-color-hover': buttonColorHover,
					'--text-color': textColor,
					'--text-color-hover': textColorHover,
				} as React.CSSProperties
			}
			onClick={onClick}
		>
			{children}
		</div>
	);
}
