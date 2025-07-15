import React, { useEffect } from 'react';
import * as styles from './styles.module.scss';
import clsx from 'clsx';
import { ToastType, ToastMessage } from './context';
import { UIConfig } from '@/configs';
import { DEFAULT_DURATION } from './constants';
import { randomString } from '@/utils';

const uiConfig = UIConfig.getInstance();

function ToastMessageComponent({ message, id }: { message: ToastMessage; id: string }): string {
	const getIconFromType = (type: ToastType) => {
		switch (type) {
			case 'success':
				return '✓';
			case 'error':
				return '✗';
			case 'warning':
				return '⚠';
			case 'info':
				return 'ℹ';
		}
	};

	const getDuration = (message: ToastMessage) => {
		return message.duration || DEFAULT_DURATION;
	};

	return `
        <div class="${styles['icon']}">${getIconFromType(message.type)}</div>
        <div class="${styles['content']}">
            <div class="${styles['title']}">${message.type.charAt(0).toUpperCase() + message.type.slice(1)}</div>
            <div class="${styles['message']}">${message.message}</div>
        </div>
        <button class="${styles['close']}" onclick="window.toast.removeToast('${id}')">
            &times;
        </button>
        <div class="${styles['progress']}" style="--duration: ${getDuration(message)}"></div>
	`;
}

export default function Toast() {
	const removeToast = (id: string) => {
		const toastMessage = document.getElementById(id);

		if (toastMessage) {
			toastMessage.classList.add(styles['removing']);
			setTimeout(() => {
				toastMessage.remove();
			}, 300);
		}
	};

	const addToast = (message: ToastMessage) => {
		const toastContainer = document.querySelector(`.${styles['toast-container']}`) as HTMLDivElement;
		const id = randomString(10);
		const newToastMessage = document.createElement('div');
		newToastMessage.innerHTML = ToastMessageComponent({ message, id });
		newToastMessage.id = id;
		newToastMessage.className = clsx(styles['toast-message'], styles[message.type]);

		toastContainer.appendChild(newToastMessage);

		setTimeout(() => {
			removeToast(id);
		}, message.duration || DEFAULT_DURATION);
	};

	useEffect(() => {
		window.toast = {
			addToast,
			removeToast,
		};
	}, []);

	return (
		<div
			className={clsx(styles['toast-container'])}
			style={
				{
					'--text-color': uiConfig.TextColor,
				} as React.CSSProperties
			}
		></div>
	);
}
