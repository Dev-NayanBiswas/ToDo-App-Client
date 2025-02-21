import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { FaPencil, FaTrashCan } from "react-icons/fa6"

const TaskCard =({taskData, index, activeSetter})=>{

  const queryClient = useQueryClient();
  // console.log(taskData, index)
  const {title, description, category, position, _id} = taskData || {};

  const handleDelete = (id)=>{
    axios.delete(`/tasks/${id}`)
    .then(res=>{

queryClient.invalidateQueries(["ToDos"]);      
console.log(res.data)})
    .catch(error=>console.log(error.response?.data || error.message))
  }

  const handleEdit = ()=>{
    console.log("Hello Edit")
  }
  return (
    <>
    <section
    onDragStart={()=>activeSetter(_id)}
    onDragEnd={()=>activeSetter(null)} 
    draggable 
    className="h-fit w-full rounded-lg border-2 border-error p-3 active:cursor-grabbing active:opacity-10">
            <section className="flex flex-col justify-between">
                    <h1 className="text-lg font-semibold">{title}</h1>
                    <p>{description}</p>
                    <div className="flex justify-end items-center gap-3 text-sm font-semibold">
                        <button onClick={()=>handleEdit(_id)} className="p-2 border-[1px] text-lg rounded-full border-success text-success cursor-pointer"><FaPencil /></button>
                        <button onClick={()=>handleDelete(_id)} className="p-2 border-[1px] text-lg rounded-full border-error text-error cursor-pointer"><FaTrashCan /></button>
                    </div>
            </section>
    </section>
    </>
  )
}

export default TaskCard