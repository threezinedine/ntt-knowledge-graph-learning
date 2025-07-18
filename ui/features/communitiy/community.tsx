import React from 'react';
import * as styles from './styles.module.scss';
import clsx from 'clsx';

interface CommunityProps {}

export default function Community({}: CommunityProps) {
	return <div className={clsx(styles['community'])}>Community</div>;
}
