import { create } from 'zustand';
import { realignSidebarGroupHeights } from './sidebarutil';

const MIN_HEIGHT_RATIO = 0.4;

interface GroupInfo {
	height: number;
	isOpen: boolean;
	previousHeight: number;
}

interface SidebarGroupState {
	isModified: boolean;

	modify: () => void;
}

export class SidebarGroupInfo {
	private groupCount: number;
	private minHeight: number;
	private totalHeight: number;
	public groupInfos: GroupInfo[];

	constructor(groupCount: number, totalHeight: number) {
		this.groupCount = groupCount;
		this.minHeight = (totalHeight / groupCount) * MIN_HEIGHT_RATIO;
		this.totalHeight = totalHeight;
		this.groupInfos = [];

		for (let i = 0; i < groupCount; i++) {
			this.groupInfos[i] = {
				height: 0,
				isOpen: false,
				previousHeight: 0,
			};
		}
	}

	toggleGroup(groupIndex: number) {
		const hasAnyGroupOpen = this.groupInfos.some((info) => info.isOpen);

		if (!hasAnyGroupOpen) {
			this.groupInfos[groupIndex].isOpen = true;
			this.groupInfos[groupIndex].height = this.totalHeight;
			return { groupInfos: JSON.parse(JSON.stringify(this.groupInfos)) };
		}

		const isGroupOpen = this.groupInfos[groupIndex].isOpen;
		const minHeight = this.minHeight;
		const groupInfos = this.groupInfos;

		const groupHeights = groupInfos.map((info) => info.height);
		if (isGroupOpen) {
			groupInfos[groupIndex].previousHeight = groupInfos[groupIndex].height;
			groupHeights[groupIndex] = 0;
		} else {
			if (groupInfos[groupIndex].previousHeight === 0) {
				groupInfos[groupIndex].previousHeight = minHeight;
			}
			groupHeights[groupIndex] = groupInfos[groupIndex].previousHeight;
		}

		groupInfos[groupIndex].isOpen = !isGroupOpen;

		const newGroupHeights = realignSidebarGroupHeights(groupHeights, minHeight, this.totalHeight, groupIndex);

		groupInfos.forEach((info, index) => {
			info.height = newGroupHeights[index];
		});
	}

	resizeGroup(groupIndex: number, movementY: number) {
		const groupInfos = this.groupInfos;
		const groupHeights = groupInfos.map((info) => info.height);

		groupHeights[groupIndex] -= movementY;

		const newGroupHeights = realignSidebarGroupHeights(groupHeights, this.minHeight, this.totalHeight, groupIndex);

		groupInfos.forEach((info, index) => {
			info.height = newGroupHeights[index];
		});
	}

	changeTotalHeight(totalHeight: number) {
		const ratio = totalHeight / this.totalHeight;
		this.totalHeight = totalHeight;
		this.minHeight = (totalHeight / this.groupCount) * MIN_HEIGHT_RATIO;

		this.groupInfos.forEach((info) => {
			info.height *= ratio;
		});
	}
}

export const useSidebarGroup = create<SidebarGroupState>((set) => ({
	isModified: false,

	modify: () => {
		set((state) => ({ isModified: !state.isModified }));
	},
}));
