import React,{useState} from 'react'
import toast from 'react-hot-toast';
import ShowAllTasks from '../components/ShowAllTasks'

import {useDispatch} from 'react-redux'
import {toggleRefresh} from '../slices/TasksSlice'

const server = process.env.REACT_APP_BACKEND_SERVER;


const HomePage = () => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    
    if(!title || !description) {
      toast.error("All fields required");
      return;
    }
    else{
      // let's make and API call
      const task = {
        title,
        description
      }
      
      try {
        await fetch(`${server}/tasks`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(task)  // Make sure to stringify the task object
        }).then(()=>{
          toast.success("Task Added");
          setTitle("");
          setDescription("");
          dispatch(toggleRefresh());
        })
      } catch (error) {
        toast.error("Internal Issue");
        throw error;
      }
    }
  };

  return (
    <div>
      <div className='w-full flex flex-col md:items-center gap-5'>
        {/* taks input */}
        <div className='mt-5 mx-1 rounded-md h-36 md:w-[50%]'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-y-1'>
              <input 
                type="text" 
                placeholder="Title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                className='border-2 border-violet-500 rounded-md h-10 pl-2'
              />
              <input 
                type="text" 
                placeholder="Description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                className='border-2 border-violet-500 focus:border-violet-500 rounded-md h-12 pl-2'
              />
              <button type="submit" className='border-2 border-white font-semibold rounded-md h-10
              text-white bg-violet-500'>
                Add Task
              </button>
            </form>
        </div>

        {/* show all tasks */}
        <ShowAllTasks path={'all'}/>

      </div>
    </div>
  )
}

export default HomePage