import { DEFAULT_DURATION } from './constants';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
	type: ToastType;
	message: string;
	duration?: number;
}
