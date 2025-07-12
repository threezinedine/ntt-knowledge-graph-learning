import { create } from 'zustand';
import { PROJECT_FILE_NAME } from '@/data';

interface Project {
	projectName: string;
	projectDir: string;
}

interface ProjectState {
	dirty: boolean;
	project: Project;
	makeDirty: () => void;
	loadProject: (filePath: string) => void;
	saveProject: (project: Project) => void;
}

const useProject = create<ProjectState>((set) => ({
	dirty: true,
	project: {
		projectName: '',
		projectDir: '',
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
		const jsonContent = await window.electron.loadFile(filePath);
		set((state) => {
			const project = JSON.parse(jsonContent);
			const newState = JSON.parse(JSON.stringify(state));
			newState.project = project;
			return newState;
		});
	},
	saveProject: async (project: Project) => {
		const jsonContent = JSON.stringify(project);

		const projectDir = project.projectDir;

		if (!(await window.electron.checkDirExist(projectDir))) {
			await window.electron.createDir(projectDir);
		}

		const projectFilePath = await window.electron.pathJoin([projectDir, PROJECT_FILE_NAME]);

		await window.electron.saveFile(projectFilePath, jsonContent);

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
