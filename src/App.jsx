import { Fragment, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import Navbar from "./Components/Navbar";
import { BsClipboard2Plus } from "react-icons/bs";
import TaskColumn from "./Components/TaskColumn";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import LandingPage from "./Components/LandingPage";

function App() {
  const queryClient = useQueryClient();
  const { userData, loading, googleLogin } = useAuth();
  const [activeAdd, setActiveAdd] = useState(false);
  const [active, setActive] = useState(null);
  const [tasks, setTasks] = useState([]);

  const initialState = {
    title: "",
    description: "",
    stamp: Date.now(),
    category: "ToDo",
    position: 0,
    email: userData?.email,
  };


  useEffect(()=>{
    axios.get("/tasks")
    .then(res=>setTasks(res.data.result))
    .catch(error=>console.log(error.message))
  },[])

  const [toDo, setToDo] = useState(initialState);



  if (!userData && loading) {
    return <Loader />;
  }




  const onDrop = (category, position) => {
    console.log(`${active} is going to place into ${category} and at the position ${position}`);
    // console.log(category)

    const taskToMoveIndex = tasks.findIndex(task => task._id === active);
    if(taskToMoveIndex === -1) return ;

    if(active === null || active === undefined) return ;

    console.log(taskToMoveIndex);

    const taskToMove = tasks[taskToMoveIndex];

    let updatedTasks = tasks.filter((item)=> item._id !== active);
    updatedTasks.splice(position,0, {
      ...taskToMove,
      category :category
    })

    console.log(taskToMove)
    
    updatedTasks = updatedTasks.map((task, index) => ({
      ...task,
      position: index + 1,
    }));
    console.log(updatedTasks)


  axios.put("/tasks", {tasks:updatedTasks})
  .then(res=>{
    console.log(res.data)
    queryClient.invalidateQueries(["ToDos"],{ refetchType: "active" })
  })
  .catch(error=>console.log( error.response?.data || error.message))
  }

  const addTask = (e)=>{
    e.preventDefault();
    console.log(toDo);
    if(toDo.title?.length && toDo.description?.length){
      axios.post("/task", toDo)
      .then(res=>queryClient.invalidateQueries(["ToDos"],{ refetchType: "active" }))
      .catch(error=> console.log(error.response || error.message))
    }
    setToDo(initialState);
  }

  return (
    <>
    {
      !userData?.email ? <LandingPage login={()=>googleLogin()}/> :
      <section className='flex justify-between flex-col'>
        <header className='flex justify-center items-center bg-base-300'>
          <Navbar />
        </header>
        <main className='min-h-dvh'>
          <section className='flex justify-center items-center gap-4 my-4 min-h-[10vh] w-full'>
            {!activeAdd ? (
              <button
                onClick={() => setActiveAdd(true)}
                className='text-success'>
                <BsClipboard2Plus className='text-4xl' />
              </button>
            ) : (
              <form
              onSubmit={addTask}
                className='flex justify-center items-center md:flex-row flex-col gap-2 w-11/12'
                action=''>
                <input
                  onChange={e=>setToDo({...toDo, title:e.target.value})}
                  defaultValue={toDo.title}
                  className='p-[6px] w-full border-success'
                  type='text'
                  placeholder='Title . . .'
                />
                <input
                defaultValue={toDo.description}
                onChange={e=>setToDo({...toDo, description:e.target.value})}
                  className='p-[6px] w-full border-success'
                  type='text'
                  placeholder='Description . . .'
                />
                <button
                  type='submit'
                  className='btn btn-outline whitespace-nowrap !p-2 btn-success lg:!w-3/12 text-lg font-semibold'>
                  Add ToDo
                </button>
              </form>
            )}
          </section>

          <section className='grid lg:grid-cols-3 grid-cols-1 gap-3 w-11/12 mx-auto'>
            <TaskColumn
              activeSetter={setActive}
              title={"ToDo"}
              category={"ToDo"}
              onDrop={onDrop}
            />
            <TaskColumn
              activeSetter={setActive}
              title={"In Progress"}
              category={"InProgress"}
              onDrop={onDrop}
            />
            <TaskColumn
              activeSetter={setActive}
              title={"Done"}
              category={"Done"}
              onDrop={onDrop}
            />
          </section>
        </main>
        <footer className='flex justify-center items-center bg-base-300 h-[10vh]'></footer>
      </section>
    }
    </>
  );
}

export default App;

const Loader = () => {
  return (
    <Fragment>
      <section className='fixed top-0 left-0 right-0 bottom-0 w-full h-full flex justify-center items-center'>
        <span className='loading loading-spinner text-primary w-[200px]'></span>
        <span className='italic text-3xl font-black text-primary absolute'>
          Loading
        </span>
      </section>
    </Fragment>
  );
};
