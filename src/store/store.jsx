import { createContext, useState } from 'react';

export const ProjectContext = createContext({
  selectedProjectId: undefined,
  projects: [],
  tasks: [],
  addTask: () => {},
  deleteTask: () => {},
  selectProject: () => {},
  startAddProject: () => {},
  cancelAddProject: () => {},
  addProject: () => {},
  deleteProject: () => {}
})

export default function ProjectContextProvider( {children} ) {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  const handleAddTask = text => {
    setProjectsState((prevState) => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId,
      };

      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks],
      };
    });
  };

  const handleDeleteTask = id => {
    setProjectsState(prevState => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter(task => task.id !== id),
      };
    });
  }

  const handleSelectProject = id => {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  }

  const handleStartAddProject = () => {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  }

  const handleCancelAddProject = () => {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  }

  const handleAddProject = projectData => {
    setProjectsState(prevState => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId,
      };

      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  }

  const handleDeleteProject = () => {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          project => project.id !== prevState.selectedProjectId
        ),
      };
    });
  }

  const contexValue = {
    selectedProjectId: projectsState.selectedProjectId,
    projects: projectsState.projects,
    tasks: projectsState.tasks,
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