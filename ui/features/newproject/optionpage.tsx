import React from 'react';
import * as styles from './styles.module.scss';
import clsx from 'clsx';
import Button from '@/components/button';
import { UIConfig } from '@/configs';
import { useNavigate } from 'react-router';

const uiConfig = UIConfig.getInstance();

/**
 * This page is used when the user try to modify or create a new project
 * User has 2 options to choose from:
 * 1. Create a new project
 * 2. Modify an existing project
 */
function OptionPage() {
	const navigator = useNavigate();

	return (
		<div
			className={clsx(styles['container'])}
			style={
				{
					'--background-color': uiConfig.EditorBackgroundColor,
					'--text-color': uiConfig.TextColor,
					'--separator-color': uiConfig.SeparatorColor,
				} as React.CSSProperties
			}
		>
			<div className={clsx(styles['header'])}>
				<h1>Choose your action</h1>
			</div>
			<div className={clsx(styles['content'], styles['option-page-content'])}>
				<div className={clsx(styles['option-page-buttons'])}>
					<Button
						className={clsx(styles['button'], styles['button-create'])}
						onClick={() => {
							navigator('/new-project/create');
						}}
					>
						Create a new project
					</Button>
					<Button
						className={clsx(styles['button'], styles['button-modify'])}
						onClick={() => {
							navigator('/new-project/open');
						}}
					>
						Modify an existing project
					</Button>
				</div>
				<div className={clsx(styles['cancel-button'])}>
					<Button
						textColor={uiConfig.TextColor}
						buttonColorHover={uiConfig.NormalButtonHoverColor}
						className={clsx(styles['cancel-button-btn'])}
						onClick={() => {
							window.electron.closeNewProjectWindow();
						}}
					>
						Cancel
					</Button>
				</div>
			</div>
		</div>
	);
}

export default OptionPage;
