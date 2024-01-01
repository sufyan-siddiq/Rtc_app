import { useQueryClient } from 'react-query';
import './App.css';
import { Nav } from './Nav';
import { AddForm } from './pages/AddForm/AddForm';

function App() {
  const queryClient = useQueryClient()
  // console.log(AddForm);
  return (
    <div className="App">
      <AddForm />
      {/* <Nav /> */}
    </div>
  );
}

export default App;
