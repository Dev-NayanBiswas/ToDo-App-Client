import { Draggable, Droppable } from "@hello-pangea/dnd"
import ToDoList from "./ToDoList"
import Task from "./Task"

const Column = ({title, tasks}) => {
  return (
    <>
        <article className="border-[1px] rounded-lg border- py-5">
            <h1 className="text-center text-2xl font-bold italic">{title}</h1>
        </article>
        <Droppable droppableId={title}>
            {
                (provided, snapshot)=>{
                    <ToDoList
                    ref={provided.innerRef} 
                    {...provided.droppableProps}
                    isDraggingOver = {snapshot.isDraggingOver}
                    className="min-h-[40vh] flex flex-row my-4">
                        {
                            tasks.map((task, index)=>
                                <Draggable key={task._id} draggableId={task._id} index={index}>
                                        {
                                            (provided)=>(
                                                        <Task
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps} 
                                                        >

                                                        </Task>
                                            )
                                        }
                                </Draggable>
                            )
                        }
                    </ToDoList>
                }
            }
        </Droppable>
    </>
  )
}

export default Column