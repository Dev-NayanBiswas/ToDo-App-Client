import { FaPencil, FaTrashCan } from "react-icons/fa6"

const TaskCard =()=>{

  const handleDelete = ()=>{
    console.log("Hello Handle Delete")
  }

  const handleEdit = ()=>{
    console.log("Hello Edit")
  }
  return (
    <>
    <section draggable className="h-fit w-full rounded-lg border-2 border-error p-3 active:cursor-grabbing ">
            <section className="flex flex-col justify-between">
                    <h1 className="text-lg font-semibold">Task Name</h1>
                    <p>Descriptions Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam, vel.</p>
                    <div className="flex justify-end items-center gap-3 text-sm font-semibold">
                        <button onClick={handleEdit} className="p-2 border-[1px] text-lg rounded-full border-success text-success cursor-pointer"><FaPencil /></button>
                        <button onClick={handleDelete} className="p-2 border-[1px] text-lg rounded-full border-error text-error cursor-pointer"><FaTrashCan /></button>
                    </div>
            </section>
    </section>
    </>
  )
}

export default TaskCard