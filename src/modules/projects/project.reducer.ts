// modules/projects/projectReducer.ts
export interface ProjectState {
  projects: string[];
}

const initialState: ProjectState = {
  projects: [],
};

export default function projectReducer(
  state = initialState,
  action: { type: string; payload?: any }
): ProjectState {
  switch (action.type) {
    case "ADD_PROJECT":
      return { ...state, projects: [...state.projects, action.payload] };
    default:
      return state;
  }
}
