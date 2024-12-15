import React from 'react'
import ShowAllTasks from './ShowAllTasks'

const CompletedTasks = () => {
  return (
    <div className='flex flex-col gap-5 justify-center items-center'>
      <h1 className='text-2xl mt-5 bg-violet-300 border-2 border-violet-700 rounded-md md:p-2
      p-1'>
        Completed Tasks
      </h1>
      {/* show all tasks */}
      <ShowAllTasks path={'completed'}/>
    </div>
  )
}

export default CompletedTasks