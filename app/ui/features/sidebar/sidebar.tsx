import React, { useEffect, useState } from 'react';
import * as styles from './styles.module.scss';
import clsx from 'clsx';
import { useSidebarGroup, SidebarGroupInfo } from './sidebargroup';
import { calculateTotalContentHeight } from './sidebarutil';
import { UIConfig } from '@/configs';
import { useProject } from '@/contexts';

interface SidebarProps {
	groups: {
		title: string;
		children: React.ReactNode;
	}[];
}

let sidebarGroupInfo: SidebarGroupInfo | null = null;

export default function Sidebar({ groups }: SidebarProps) {
	const { modify } = useSidebarGroup();
	const uiConfig = UIConfig.getInstance();
	const project = useProject((state) => state.project);
	const dirty = useProject((state) => state.dirty);

	function calculateContentHeights() {
		const contents = document.querySelectorAll(`.${styles['sidegroup-content']}`) as NodeListOf<HTMLElement>;

		for (let i = 0; i < contents.length; i++) {
			contents[i].style.height = `${sidebarGroupInfo.groupInfos[i]?.height ?? 0}px`;
		}
	}

	function recalculateContentHeights() {
		calculateContentHeights();
		calculateTotalContentHeight(styles, (contentHeight) => {
			sidebarGroupInfo.changeTotalHeight(contentHeight);
		});
	}

	useEffect(() => {
		sidebarGroupInfo = new SidebarGroupInfo(groups.length, 100);
		recalculateContentHeights();

		window.addEventListener('resize', () => {
			recalculateContentHeights();
		});
	}, []);

	function handleToggleGroup(e: React.MouseEvent<HTMLDivElement>, sideGroupIndex: number) {
		sidebarGroupInfo.toggleGroup(sideGroupIndex);
		modify();
		recalculateContentHeights();
	}

	function handleResizeStart(e: React.MouseEvent<HTMLDivElement>, sideGroupIndex: number) {
		e.preventDefault();
		e.stopPropagation();

		const nodes = document.querySelectorAll(`.${styles['sidegroup-content']}`) as NodeListOf<HTMLElement>;

		for (let i = 0; i < nodes.length; i++) {
			if (nodes[i].classList.contains(styles['transition'])) {
				nodes[i].classList.remove(styles['transition']);
			}
		}

		const handleResizeMove = (e: MouseEvent) => {
			sidebarGroupInfo.resizeGroup(sideGroupIndex, e.movementY);
			calculateContentHeights();
		};

		const handleResizeEnd = (e: MouseEvent) => {
			e.preventDefault();
			e.stopPropagation();
			for (let i = 0; i < nodes.length; i++) {
				if (!nodes[i].classList.contains(styles['transition'])) {
					nodes[i].classList.add(styles['transition']);
				}
			}
			document.removeEventListener('mousemove', handleResizeMove);
			document.removeEventListener('mouseup', handleResizeEnd);
		};

		document.addEventListener('mousemove', handleResizeMove);
		document.addEventListener('mouseup', handleResizeEnd);
	}

	function canBeResized(sideGroupIndex: number): boolean {
		if (!sidebarGroupInfo?.groupInfos[sideGroupIndex]?.isOpen) {
			return false;
		}

		return sidebarGroupInfo?.groupInfos.some((info, index) => index < sideGroupIndex && info.isOpen);
	}

	function handleOpenCreateProjectWindow() {
		window.electron.onCreateNewProjectWindow();
	}

	return (
		<div className={clsx(styles['sidebar'])}>
			<div className={styles['sidebar-groups']}>
				{groups.map((group, index) => (
					<div
						key={index}
						className={clsx(styles['sidegroup'])}
						style={
							{
								'--text-color': uiConfig.TextColor,
							} as React.CSSProperties
						}
					>
						<div className={clsx(styles['sidegroup-header'])}>
							{canBeResized(index) && (
								<div
									className={styles['sidegroup-header__resize-handle']}
									onMouseDown={(e) => handleResizeStart(e, index)}
								></div>
							)}
							<div
								className={styles['sidegroup-header__content']}
								onClick={(e) => handleToggleGroup(e, index)}
							>
								<div className={styles['sidegroup-header__content__icon']}>
									<i
										className={clsx(
											'fa-solid',
											sidebarGroupInfo?.groupInfos[index]?.isOpen
												? 'fa-chevron-down'
												: 'fa-chevron-right',
										)}
									></i>
								</div>
								<div className={styles['sidegroup-header__content__content']}>{group.title}</div>
							</div>
						</div>
						<div
							className={clsx(
								styles['sidegroup-content'],
								styles['transition'],
								!sidebarGroupInfo?.groupInfos[index]?.isOpen && styles['display-none'],
							)}
						>
							{group.children}
						</div>
					</div>
				))}
			</div>
			<div
				className={clsx(styles['sidebar-project-info'])}
				style={
					{
						'--text-color': uiConfig.TextColor,
						'--hover-background-color': uiConfig.NormalButtonHoverColor,
					} as React.CSSProperties
				}
				onClick={handleOpenCreateProjectWindow}
			>
				<div className={styles['sidebar-project-info__name']}>
					{project.projectName || 'Untitled'}
					{dirty && <span>*</span>}
				</div>
				<div className={styles['sidebar-project-info__actions']}>
					<i className={clsx('fa-solid', 'fa-up-down')}></i>
				</div>
			</div>
		</div>
	);
}
