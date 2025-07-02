import { create } from 'zustand';

interface SidebarState {
	isLeftSidebarOpen: boolean;
	isRightSidebarOpen: boolean;

	toggleLeftSidebar: () => void;
	toggleRightSidebar: () => void;
}

const useSidebarStore = create<SidebarState>((set) => ({
	isLeftSidebarOpen: true,
	isRightSidebarOpen: false,

	toggleLeftSidebar: () => set((state) => ({ isLeftSidebarOpen: !state.isLeftSidebarOpen })),
	toggleRightSidebar: () => set((state) => ({ isRightSidebarOpen: !state.isRightSidebarOpen })),
}));

export default useSidebarStore;
