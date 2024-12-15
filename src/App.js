import {BrowserRouter,Route,Routes} from "react-router-dom"
import Header from "./common/Header";
import HomePage from "./pages/HomePage";
import InProgressTasks  from './components/InProgressTasks'
import CompletedTasks from './components/CompletedTasks'
import PendingTasks from './components/PendingTasks'
import { useEffect} from "react";
import {Toaster} from 'react-hot-toast'

import {useDispatch, useSelector} from 'react-redux'
import { setTasks } from "./slices/TasksSlice";


const server = process.env.REACT_APP_BACKEND_SERVER;



function App() {
  // dispatch is a method via we can communicate with slice
  const dispatch = useDispatch();
  const isRefresh = useSelector((state)=>state?.tasks?.isRefresh);

  // fetch all the tasks one's while load the app and add into task slice to prevent repeatation of API
  useEffect(() => {
    getAllTasks();
  }, [isRefresh]);

  const getAllTasks = async () => {
    const res = await fetch(`${server}/tasks`);
    const data = await res.json();

    // Dispatch updated data to the task slice
    dispatch(setTasks(data));
  };
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/pending-tasks" element={<PendingTasks/>}/>
          <Route path="/in-progress-tasks" element={<InProgressTasks/>}/>
          <Route path="/completed-tasks" element={<CompletedTasks/>}/>
        </Routes>
      </BrowserRouter>
      <Toaster/>
    </div>
  );
}

export default App;
