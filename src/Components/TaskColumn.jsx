import { Fragment } from "react";
import useFetchToDos from "../Hooks/useFetchToDos"
import DropArea from "./DropArea";
import TaskCard from "./TaskCard";

const TaskColumn = ({title, category, activeSetter, onDrop}) => {

    // console.log(category)
    const {data, isError, error} = useFetchToDos(category);

    if(isError){
        return <p>{error.message}</p>
    }

    // console.log(data)

  return (
    <>
        <section className="my-4">
        <article className="border-[1px] rounded-lg border- py-5">
            <h1 className="text-center text-2xl font-bold italic">{title}</h1>
        </article>
        <section className="min-h-[40vh] flex flex-col my-4">
            <DropArea onDrop={()=>onDrop(category, 0)}/>
            {
                data?.result?.map((item, index)=><Fragment key={item._id}>
                    <TaskCard activeSetter={activeSetter} taskData={item} index={index}/>
                    <DropArea onDrop={() => onDrop(category, index + 1)}/>
                </Fragment>
                )
            }
        </section>
        
        </section>
    </>
  )
}

export default TaskColumn