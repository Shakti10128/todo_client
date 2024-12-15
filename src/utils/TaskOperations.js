import toast from "react-hot-toast";

const server = process.env.REACT_APP_BACKEND_SERVER;
export const deteleTask = async(task)=>{
    await fetch(`${server}/tasks/${task._id}`,{
        method:"DELETE"
      }).then(()=>{
        toast.success("Task Deleted");
      })
}

export const updateTask = async(task,status)=>{
    try {
        const response = await fetch(`${server}/tasks/${task._id}`, {
          method: "PUT",
          body: JSON.stringify({ status }), // Wrap status in an object
          headers: {
            "Content-Type": "application/json",
          },
        });
    
        if (response.ok) {
          toast.success("Task Updated");
        } else {
          toast.error("Failed to update task");
        }
      } catch (error) {
        toast.error("An error occurred while updating the task");
      }
}