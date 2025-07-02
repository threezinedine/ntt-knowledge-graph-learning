import { create } from 'zustand';

interface SidebarGroupState {
	groupCount: number;
	groupHeightsInPercent: number[];
	toggleGroup: (groupIndex: number) => void;

	initializeGroupCount: (groupCount: number) => void;
}

const useSidebarGroup = create<SidebarGroupState>((set) => ({
	groupCount: 0,
	groupHeightsInPercent: [],
	toggleGroup: (groupIndex: number) => {
		set((state) => {
			const hasAnyGroupOpen = state.groupHeightsInPercent.some((height) => height !== 0);
			const isGroupOpen = state.groupHeightsInPercent[groupIndex] !== 0;

			if (isGroupOpen) {
				state.groupHeightsInPercent[groupIndex] = 0;
			} else {
				if (hasAnyGroupOpen) {
					state.groupHeightsInPercent[groupIndex] = 0.2;
				} else {
					state.groupHeightsInPercent[groupIndex] = 1;
				}
			}

			return { groupHeightsInPercent: state.groupHeightsInPercent };
		});
	},

	initializeGroupCount: (groupCount: number) => {
		set({ groupCount, groupHeightsInPercent: Array(groupCount).fill(0) });
	},
}));

export default useSidebarGroup;
