import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";

import {deteleTask, updateTask} from '../utils/TaskOperations'
import { toggleRefresh } from '../slices/TasksSlice';


const ShowAllTasks = ({path}) => {
  const [allTasks, setAllTasks] = useState([]);
  const [updatedTask,setUpdatedTask] = useState();
  const [status,setStatus] = useState('pending');
  const [isUpdate,setIsUpdate] = useState(false);

  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.tasks.tasksArray.tasks);
  const isRefresh = useSelector((state)=>state?.tasks?.isRefresh);

  useEffect(() => {
    if (tasks?.length > 0) {
      setAllTasks(tasks);
    }
  }, [isRefresh]); // Dependency array ensures this effect runs only when tasks change

  const deleteTaskHandler = async(task)=>{
    await deteleTask(task);
    dispatch(toggleRefresh());
  }

  const updatedTaskStates = (task)=>{
    setUpdatedTask(task);
    setIsUpdate(true);
  }
  const updateTaskHandler = async()=>{
    await updateTask(updatedTask,status);
    setIsUpdate(false);
    dispatch(toggleRefresh())
  }

  // Handle task status update
  const handleTaskStatus = (event) => {
    setStatus(event.target.value);
  };

  // handle tasks based on routing
  const isMatch = (task)=>{
    if(path === 'all') return true;
    else if(path === task.status) return true;
    else return false;
  }

  return (
    <>
      <div className='relative w-full px-1 md:w-[50%]'>
      {
        allTasks && allTasks.map((task)=>{
          return isMatch(task) && <div className='flex w-full justify-between items-center gap-y-2 my-2 p-1 border-2
          border-violet-500 rounded-md bg-violet-100' key={task._id}>
                    <div className='flex flex-col w-[90%]'>
                      <h1 className='font-semibold px-1 text-base uppercase'>
                        {task?.title}
                      </h1>
                      <p className='px-1 text-base'>
                        {task?.description}
                      </p>
                    </div>
                    <div className='flex flex-col justify-center items-center gap-1 w-[10%] h-full md:items-end'>
                      <div className='bg-green-800 p-1 rounded-full text-white cursor-pointer'>
                        <FaRegEdit onClick={()=>updatedTaskStates(task)}/>
                      </div>
                      <div className='bg-red-600 p-1 rounded-full text-white cursor-pointer'>
                        <MdOutlineDelete onClick={()=>deleteTaskHandler(task)}/>
                      </div>
                    </div>
              </div>
        })
      }
    </div>

    {/* udpate task pop-up */}
    {
      isUpdate && <div className='absolute z-10 flex justify-center items-center top-0 h-full w-full p-1
      md:w-[40%]'>
      <div className=' w-[95%] h-40 bg-violet-500'>
        <div  className={`flex justify-center items-center p-1 w-6 m-1 ml-[90%] text-sm rounded-md bg-red-600 text-white transition-all ease-in-out cursor-pointer md:w-6 md:ml-[90%px]`}>
          <AiOutlineClose onClick={()=> setIsUpdate(false)}/>
        </div>

        <div className='flex flex-col items-center gap-2 text-white'>
          <label htmlFor="fruits" >Update Task Status </label>
          <select id="fruits" value={status} onChange={handleTaskStatus} className='w-[70%]
          bg-violet-500  border-2 border-white rounded-md py-1'>
            <option value="pending">pending</option>
            <option value="in-progress">in-progress</option>
            <option value="completed">completed</option>
          </select>
          <button className=' bg-violet-600 border-2 border-white rounded-md p-1 w-[70%]'
          onClick={updateTaskHandler}>
            Update Task
          </button>
        </div>

        <div></div>

      </div>
    </div>
    }
    </>
  )
}

export default ShowAllTasks