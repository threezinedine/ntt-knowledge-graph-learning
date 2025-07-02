import React from 'react';
import * as styles from './styles.module.scss';
import clsx from 'clsx';

interface FileTreeProps {}

export default function FileTree({}: FileTreeProps) {
	return <div className={clsx(styles['filetree'])}>FileTree</div>;
}
