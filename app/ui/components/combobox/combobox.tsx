import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import * as styles from './styles.module.scss';

export interface ComboBoxItem {
	value: string;
	icon?: string;
}

interface ComboBoxProps {
	selectedItem: ComboBoxItem | null;
	items: ComboBoxItem[];
	onSelect: (item: ComboBoxItem) => void;
}

function ComboBox({ selectedItem, items, onSelect }: ComboBoxProps) {
	const newSelectRef = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState(false);

	function openSelect() {
		if (!newSelectRef.current) {
			return;
		}

		const heightSelect = newSelectRef.current.clientHeight;
		const options = newSelectRef.current.querySelectorAll(`.${styles['new-option']}`) as NodeListOf<HTMLDivElement>;

		for (let i = 0; i < options.length; i++) {
			const option = options[i];
			option.classList.add(styles['reveal']);
			option.style.boxShadow = '0 1px 1px rgba(0,0,0,0.1)';
			option.style.left = '0';
			option.style.right = '0';
			option.style.top = (i + 1) * (heightSelect + 1) + 'px';
		}
	}

	function closeSelect() {
		if (!newSelectRef.current) {
			return;
		}

		const options = newSelectRef.current.querySelectorAll(`.${styles['new-option']}`) as NodeListOf<HTMLDivElement>;

		for (let i = 0; i < options.length; i++) {
			const option = options[i];
			option.classList.remove(styles['reveal']);

			if (i < items.length - 3) {
				option.style.top = '0px';
				option.style.boxShadow = 'none';
			} else if (i === items.length - 3) {
				option.style.top = '3px';
			} else if (i === items.length - 2) {
				option.style.top = '7px';
				option.style.left = '2px';
				option.style.right = '2px';
			} else if (i === items.length - 1) {
				option.style.top = '11px';
				option.style.left = '4px';
				option.style.right = '4px';
			}
		}
	}

	useEffect(() => {
		if (!selectedItem && items.length > 0) {
			onSelect(items[0]);
		}

		closeSelect();
		setIsOpen(false);
	}, []);

	function handleToggle() {
		setIsOpen(!isOpen);
		if (isOpen) {
			openSelect();
		} else {
			closeSelect();
		}
	}

	function handleSelect(item: ComboBoxItem) {
		onSelect(item);
		handleToggle();
	}

	return (
		<React.Fragment>
			<div className={clsx(styles['new-select'])} ref={newSelectRef}>
				<>
					<div className={clsx(styles['selection'])} onClick={handleToggle}>
						<p>
							<span></span>
							<i></i>
						</p>
						<span></span>
					</div>
					{items.map((item, itemIndex) => (
						<div
							key={itemIndex}
							className={clsx(styles['new-option'])}
							data-value={item.value}
							style={
								{
									zIndex: items.length - itemIndex,
								} as React.CSSProperties
							}
							onClick={() => handleSelect(item)}
						>
							<p>{item.value}</p>
						</div>
					))}
				</>
			</div>
		</React.Fragment>
	);
}

export default ComboBox;
