import React from 'react';
import * as styles from './styles.module.scss';
import clsx from 'clsx';
import { Button } from '@/components';
import { UIConfig } from '@/configs';

export interface TabItem {
	name: string;
}

interface TabContainerProps {
	tabs: TabItem[];
	activeTab: string;
	onTabClick?: (tab: TabItem) => Promise<void>;
	onTabClose?: (tab: TabItem) => Promise<void>;
	onTabReorder?: (tabNames: string[]) => Promise<void>;
}

const uiConfig = UIConfig.getInstance();

export default function TabContainer({ tabs, activeTab, onTabClick, onTabClose, onTabReorder }: TabContainerProps) {
	function handleTabDragStart(e: React.DragEvent<HTMLDivElement>, tab: TabItem) {
		const target = e.target as HTMLElement;

		if (!target.classList.contains(styles['dragging'])) {
			target.classList.add(styles['dragging']);
		}
	}

	function clearDraggingOverClasses(draggingIndex: string | null = null, keepType: 'left' | 'right' | null = null) {
		const items = document.querySelectorAll(`.${styles['tab-container-item']}`) as NodeListOf<HTMLDivElement>;

		const selectedItem = Array.from(items).filter((item) => item.classList.contains(styles['active']))[0];
		let selectedItemIndex = Number(selectedItem?.dataset.tabIndex);
		const outputItemIndexes = Array.from(items).map((item) => Number(item.dataset.tabIndex));

		items.forEach((item, itemIndex) => {
			const shouldLeftBeDeleted = !(
				draggingIndex !== null &&
				item.dataset.tabIndex === draggingIndex &&
				keepType !== 'left'
			);
			const shouldRightBeDeleted = !(
				draggingIndex !== null &&
				item.dataset.tabIndex === draggingIndex &&
				keepType !== 'right'
			);

			if (shouldLeftBeDeleted) {
				if (item.classList.contains(styles['dragging-over-left'])) {
					item.classList.remove(styles['dragging-over-left']);
					outputItemIndexes.splice(itemIndex, 0, selectedItemIndex);
					if (selectedItemIndex > itemIndex) {
						selectedItemIndex++;
					}
				}
			}
			if (shouldRightBeDeleted) {
				if (item.classList.contains(styles['dragging-over-right'])) {
					item.classList.remove(styles['dragging-over-right']);
					outputItemIndexes.splice(itemIndex + 1, 0, selectedItemIndex);

					if (selectedItemIndex > itemIndex) {
						selectedItemIndex++;
					}
				}
			}
		});
		outputItemIndexes.splice(selectedItemIndex, 1);
		return outputItemIndexes;
	}

	function handleTabDragEnd(e: React.DragEvent<HTMLDivElement>, tab: TabItem) {
		const target = e.target as HTMLElement;
		if (target.classList.contains(styles['dragging'])) {
			target.classList.remove(styles['dragging']);
		}
		const outputItemIndexes = clearDraggingOverClasses();
		const outputItems = outputItemIndexes.map((tabIndex) => tabs[tabIndex].name);
		onTabReorder?.(outputItems);
	}

	function handleTabDragOver(e: React.DragEvent<HTMLDivElement>, tab: TabItem) {
		const clientX = e.clientX;
		const target = e.target as HTMLElement;
		const parent = target.parentElement as HTMLElement;

		let actualTarget = parent.classList.contains(styles['tab-container-item']) ? parent : target;

		let isLeftInsert = false;
		const actualTargetRect = actualTarget.getClientRects()[0];
		const actualTargetCenter = (actualTargetRect.left + actualTargetRect.right) / 2;
		if (clientX < actualTargetCenter) {
			isLeftInsert = true;
		} else {
		}

		if (!actualTarget.classList.contains(styles[`dragging-over-${isLeftInsert ? 'left' : 'right'}`])) {
			actualTarget.classList.add(styles[`dragging-over-${isLeftInsert ? 'left' : 'right'}`]);
		}
		clearDraggingOverClasses(actualTarget.dataset.tabIndex, !isLeftInsert ? 'left' : 'right');
	}

	function handleTabClose(e: React.MouseEvent<HTMLDivElement>, tab: TabItem) {
		e.stopPropagation();
		e.preventDefault();
		onTabClose?.(tab);
	}

	return (
		<div className={clsx(styles['tab-container'])}>
			{tabs.map((tab, index) => (
				<div
					key={index}
					className={clsx(styles['tab-container-item'], activeTab === tab.name && styles['active'])}
					onMouseDown={(e) => onTabClick?.(tab)}
					draggable
					data-tab-index={index}
					onDragStart={(e) => handleTabDragStart(e, tab)}
					onDragEnd={(e) => handleTabDragEnd(e, tab)}
					onDragOver={(e) => handleTabDragOver(e, tab)}
				>
					<div className={clsx(styles['tab-container-item__content'])}>{tab.name}</div>
					<Button
						className={clsx(styles['tab-container-item__close'])}
						textColor={uiConfig.TextColor}
						buttonColor={'transparent'}
						buttonColorHover={uiConfig.NormalButtonHoverColor}
						onClick={(e) => handleTabClose(e, tab)}
					>
						<i className={clsx('fa-solid fa-xmark')}></i>
					</Button>
				</div>
			))}
		</div>
	);
}
