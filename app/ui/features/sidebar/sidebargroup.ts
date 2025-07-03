import { create } from 'zustand';
import { realignSidebarGroupHeights } from './sidebarutil';

const MIN_HEIGHT_RATIO = 0.4;

interface GroupInfo {
	height: number;
	isOpen: boolean;
	previousHeight: number;
}

interface SidebarGroupState {
	groupCount: number;
	groupInfos: GroupInfo[];
	minHeight: number;
	totalHeight: number;
	toggleGroup: (groupIndex: number) => void;
	resizeGroup: (groupIndex: number, movementY: number) => void;
	changeTotalHeight: (totalHeight: number) => void;

	initializeGroupCount: (groupCount: number, totalHeight: number) => void;
}

const useSidebarGroup = create<SidebarGroupState>((set) => ({
	groupCount: 0,
	minHeight: 100,
	groupInfos: [],
	totalHeight: 0,
	toggleGroup: (groupIndex: number) => {
		set((state) => {
			const hasAnyGroupOpen = state.groupInfos.some((info) => info.isOpen);

			if (!hasAnyGroupOpen) {
				state.groupInfos[groupIndex].isOpen = true;
				state.groupInfos[groupIndex].height = state.totalHeight;
				return { groupInfos: JSON.parse(JSON.stringify(state.groupInfos)) };
			}

			const isGroupOpen = state.groupInfos[groupIndex].isOpen;
			const minHeight = state.minHeight;
			const groupInfos = state.groupInfos;

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

			const newGroupHeights = realignSidebarGroupHeights(groupHeights, minHeight, state.totalHeight, groupIndex);

			groupInfos.forEach((info, index) => {
				info.height = newGroupHeights[index];
			});

			return { ...state, groupInfos: JSON.parse(JSON.stringify(groupInfos)) };
		});
	},

	resizeGroup: (groupIndex: number, movementY: number) => {
		set((state) => {
			const groupInfos = state.groupInfos;
			const groupHeights = groupInfos.map((info) => info.height);

			groupHeights[groupIndex] -= movementY;

			const newGroupHeights = realignSidebarGroupHeights(
				groupHeights,
				state.minHeight,
				state.totalHeight,
				groupIndex,
			);

			groupInfos.forEach((info, index) => {
				info.height = newGroupHeights[index];
			});

			return { ...state, groupInfos: JSON.parse(JSON.stringify(groupInfos)) };
		});
	},
	changeTotalHeight: (totalHeight: number) => {
		set((state) => {
			const previousTotalHeight = state.totalHeight;
			const ratio = totalHeight / previousTotalHeight;

			const newGroupInfos = state.groupInfos.map((info) => {
				return {
					...info,
					height: info.height * ratio,
				};
			});

			const minHeight = (totalHeight / state.groupCount) * MIN_HEIGHT_RATIO;

			return { ...state, groupInfos: newGroupInfos, totalHeight, minHeight };
		});
	},

	initializeGroupCount: (groupCount: number, totalHeight: number) => {
		set((state) => {
			const newGroupInfos: GroupInfo[] = Array(groupCount);

			for (let i = 0; i < groupCount; i++) {
				newGroupInfos[i] = {
					height: 0,
					isOpen: false,
					previousHeight: 0,
				};
			}

			const minHeight = (totalHeight / groupCount) * MIN_HEIGHT_RATIO;

			return { ...state, groupCount, minHeight, groupInfos: newGroupInfos, totalHeight };
		});
	},
}));

export default useSidebarGroup;
