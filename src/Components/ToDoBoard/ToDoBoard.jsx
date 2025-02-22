import { DragDropContext } from "@hello-pangea/dnd"
import { useEffect, useState } from "react"
import Column from "./Column";
import axios from "axios";


const ToDoBoard = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(()=>{
        axios.get("/tasks")
        .then(res=>setTasks(res.data.result))
        .catch(error=>console.log(error.message))
      },[])

      console.log(tasks)

  return (
    <DragDropContext>
        <h1>Task Board</h1>

        <section className="bg-gray-500 min-h-[90vh] w-3/12 mx-auto flex justify-between">
            <Column title={"To Do"} tasks={tasks}/>
            <Column title={"In Progress"} tasks={tasks}/>
            <Column title={"Done"} tasks={tasks} />
        </section>
    </DragDropContext>
  )
}

export default ToDoBoard