import { create } from 'zustand';

interface Project {
	projectName: string;
	projectPath: string;
}

interface ProjectState {
	dirty: boolean;
	project: Project;
	makeDirty: () => void;
	loadProject: (filePath: string) => void;
	saveProject: (filePath: string, project: Project) => void;
}

const useProject = create<ProjectState>((set) => ({
	dirty: true,
	project: {
		projectName: '',
		projectPath: '',
	},
	makeDirty: () => {
		set((state) => {
			return {
				...state,
				dirty: true,
			};
		});
	},
	loadProject: async (filePath: string) => {
		const jsonContent = await window.electron.loadJsonFile(filePath);
		set((state) => {
			const project = JSON.parse(jsonContent);
			const newState = JSON.parse(JSON.stringify(state));
			newState.project = project;
			return newState;
		});
	},
	saveProject: async (filePath: string, project: Project) => {
		const jsonContent = JSON.stringify(project);
		await window.electron.saveJsonFile(filePath, jsonContent);
		set((state) => {
			const newState = JSON.parse(JSON.stringify(state));
			newState.dirty = false;
			newState.project = project;
			return newState;
		});
	},
}));

export type { Project };
export default useProject;
