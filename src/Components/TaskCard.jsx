import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { FaPencil, FaTrashCan } from "react-icons/fa6"

const TaskCard =({taskData, index, activeSetter})=>{
  const [editMode, setEditMode] = useState(false);
  const [toDo, setToDo] = useState({});

  const queryClient = useQueryClient();

  const {title, description, category, position, _id} = taskData || {};

  const handleDelete = (id)=>{
    axios.delete(`/tasks/${id}`)
    .then(res=>{

queryClient.invalidateQueries(["ToDos"]);      
console.log(res.data)})
    .catch(error=>console.log(error.response?.data || error.message))
  }

  const handleEdit = (e,data, id)=>{
    e.preventDefault();
    console.log("Hello Edit", data, id);
    setEditMode(false);
    axios.patch(`/task/${id}`,data)
    .then(res=>{
      queryClient.invalidateQueries(["ToDos"]); 
      console.log(res.data)})
    .catch(error=>console.log(error.response || error.message))
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
                        <button onClick={()=>setEditMode(true)} className="p-2 border-[1px] text-lg rounded-full border-success text-success cursor-pointer"><FaPencil /></button>
                        <button onClick={()=>handleDelete(_id)} className="p-2 border-[1px] text-lg rounded-full border-error text-error cursor-pointer"><FaTrashCan /></button>
                    </div>
            </section>
    </section>
    {
      editMode ? <section>
      <form
                  className='flex justify-center items-center md:flex-row flex-col gap-2 w-11/12'
                  action=''>
                  <input
                    onChange={e=>setToDo({...toDo, title:e.target.value})}
                    defaultValue={title}
                    className='p-[6px] w-full border-success'
                    type='text'
                    placeholder='Title . . .'
                  />
                  <input
                  defaultValue={description}
                  onChange={e=>setToDo({...toDo, description:e.target.value})}
                    className='p-[6px] w-full border-success'
                    type='text'
                    placeholder='Description . . .'
                  />
                  <button
                    type='submit'
                    onClick={(e)=>handleEdit(e,toDo, _id)}
                    className='btn btn-outline whitespace-nowrap !p-2 btn-success lg:!w-3/12 text-lg font-semibold'>
                    Update ToDo
                  </button>
                </form>
      </section> : ""
    }
    </>
  )
}

export default TaskCard