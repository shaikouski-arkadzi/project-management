import { createContext, useReducer, useEffect } from 'react';

export const ProjectContext = createContext({
  selectedProjectId: undefined,
  projects: [],
  tasks: [],
  selectedProject:{},
  addTask: () => {},
  deleteTask: () => {},
  selectProject: () => {},
  startAddProject: () => {},
  cancelAddProject: () => {},
  addProject: () => {},
  deleteProject: () => {}
})

const projectReducer = (state, action) => {
  switch (action.type){
    case 'ADD_TASK': {
      const newTask = {
        text: action.payload,
        projectId: state.selectedProjectId,
        id:  Math.random(),
      };

      return {
        ...state,
        tasks: [newTask, ...state.tasks],
      };
    }
    case 'DELETE_TASK': {
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };
    }
    case 'SELECT_PROJECT': {
      return {
        ...state,
        selectedProjectId: action.payload,
      };
    }
    case 'START_ADD_PROJECT': {
      return {
        ...state,
        selectedProjectId: null,
      };
    }
    case 'CANCEL_ADD_PROJECT': {
      return {
        ...state,
        selectedProjectId: undefined,
      };
    }
    case 'ADD_PROJECT': {
      const newProject = {
        ...action.payload,
        id: Math.random(),
      };

      return {
        ...state,
        selectedProjectId: undefined,
        projects: [...state.projects, newProject],
      };
    }
    case 'DELETE_PROJECT': {
      return {
        ...state,
        selectedProjectId: undefined,
        projects: state.projects.filter(
          project => project.id !== state.selectedProjectId
        ),
      };
    }
    default:
      return state;
  }
}

export default function ProjectContextProvider( {children} ) {
  const [projectsState, projectDispatch] = useReducer(
    projectReducer,
    {
      selectedProjectId: undefined,
      projects: JSON.parse(localStorage.getItem('projects')) || [],
      tasks: JSON.parse(localStorage.getItem('tasks')) || [],
    }
  );

  useEffect(() => {
    if (projectsState.tasks.length > 0) localStorage.setItem('tasks', JSON.stringify(projectsState.tasks));
       else localStorage.removeItem('tasks')
  }, [projectsState.tasks])

  useEffect(() => {
    if (projectsState.projects.length > 0) localStorage.setItem('projects', JSON.stringify(projectsState.projects));
      else localStorage.removeItem('projects')
  }, [projectsState.projects])

  const handleAddTask = text => {
    projectDispatch({
      type: 'ADD_TASK',
      payload: text,
    });
  };

  const handleDeleteTask = id => {
    projectDispatch({
      type: 'DELETE_TASK',
      payload: id,
    });
  }

  const handleSelectProject = id => {
    projectDispatch({
      type: 'SELECT_PROJECT',
      payload: id,
    });
  }

  const handleStartAddProject = () => {
    projectDispatch({
      type: 'START_ADD_PROJECT'
    });
  }

  const handleCancelAddProject = () => {
    projectDispatch({
      type: 'CANCEL_ADD_PROJECT'
    });
  }

  const handleAddProject = projectData => {
    projectDispatch({
      type: 'ADD_PROJECT',
      payload: projectData,
    });
  }

  const handleDeleteProject = () => {
    projectDispatch({
      type: 'DELETE_PROJECT'
    });
  }

  const selectedProject = projectsState.projects.find(
    project => project.id === projectsState.selectedProjectId
  );

  const contexValue = {
    selectedProjectId: projectsState.selectedProjectId,
    projects: projectsState.projects,
    tasks: projectsState.tasks,
    selectedProject,
    addTask: handleAddTask,
    deleteTask: handleDeleteTask,
    selectProject: handleSelectProject,
    startAddProject: handleStartAddProject,
    cancelAddProject: handleCancelAddProject,
    addProject: handleAddProject,
    deleteProject: handleDeleteProject
  }

  return <ProjectContext.Provider value={contexValue}>
    {children}
  </ProjectContext.Provider>
}