import { Fragment, useState } from "react";
import { useAuth } from "./AuthProvider"
import Navbar from "./Components/Navbar";
import { BsClipboard2Plus } from "react-icons/bs";
import TaskColumn from "./Components/TaskColumn";

function App(){
  const {userData, loading} = useAuth();
  const [activeAdd, setActiveAdd] = useState(false);
  const [ active, setActive] = useState(null);

  const [toDo, setToDo] = useState({
    todoTitle:"",
    desc:"",
    stamp:Date.now(),
    category:"ToDo",
    position:123,
    email:userData?.email
})




  if(!userData && loading){
    return <Loader/>
  }


  
  return (
    <>
      <section className="flex justify-between flex-col">
        <header className="flex justify-center items-center bg-base-300">
          <Navbar/>
        </header>
        <main className="min-h-dvh">



        <section className="flex justify-center items-center gap-4 my-4 min-h-[10vh] w-full">
            {
              !activeAdd ? <button onClick={()=>setActiveAdd(true)} className="text-success">
              <BsClipboard2Plus className="text-4xl" />
              </button> : <form className="flex justify-center items-center md:flex-row flex-col gap-2 w-11/12" action="">
            <input className="p-[6px] w-full border-success" type="text" placeholder="Title . . ." />
            <input className="p-[6px] w-full border-success" type="text" placeholder="Description . . ." />
            <button type="submit" className="btn btn-outline whitespace-nowrap !p-2 btn-success lg:!w-3/12 text-lg font-semibold">Add ToDo</button>
        </form>
            }
        
        </section>



          <section className="grid lg:grid-cols-3 grid-cols-1 gap-3">
          <TaskColumn title={"ToDo"} status={"ToDo"}/>
          <TaskColumn title={"In Progress"} status={"InProgress"}/>
          <TaskColumn title={"Done"} status={"Done"}/>
          </section>
        </main>
        <footer className="flex justify-center items-center bg-base-300 h-[10vh]"></footer>
      </section>
    </>
  )
}



export default App


const Loader = () => {
  return <Fragment>
    <section className="fixed top-0 left-0 right-0 bottom-0 w-full h-full flex justify-center items-center">
      <span className="loading loading-spinner text-primary w-[200px]"></span>
      <span className="italic text-3xl font-black text-primary absolute">Loading</span>
    </section>
  </Fragment>
}