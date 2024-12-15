import React from 'react'
import ShowAllTasks from './ShowAllTasks'

const pendingTasks = () => {
  return (
    <div className='flex flex-col gap-5 justify-center items-center'>
      <h1 className='text-2xl mt-5 bg-violet-300 border-2 border-violet-700 rounded-md md:p-2
      p-1'>
        Pending Tasks
      </h1>
      {/* show all tasks */}
      <ShowAllTasks path={'pending'}/>
    </div>
  )
}

export default pendingTasks