import { useContext } from 'react';

import NewProject from './components/NewProject.jsx';
import NoProjectSelected from './components/NoProjectSelected.jsx';
import ProjectsSidebar from './components/ProjectsSidebar.jsx';
import SelectedProject from './components/SelectedProject.jsx';

import { ProjectContext } from './store/store.jsx';

function App() {
  const { selectedProjectId } = useContext(ProjectContext)

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar />
      {selectedProjectId === null 
        ? <NewProject /> 
        : selectedProjectId === undefined 
          ? <NoProjectSelected /> 
          : <SelectedProject />
      }
    </main>
  );
}

export default App;