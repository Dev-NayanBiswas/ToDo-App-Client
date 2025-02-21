import { useQuery } from "@tanstack/react-query"
import axios from "axios"

function useFetchToDos(category){


    const fetchTasks = async(cat)=>{
        console.log(cat)
        return axios.get(`/tasks?category=${cat}`)
        .then(res=>res.data)
        .catch(error=>console.log(error))
    }
    const categoryTasks = useQuery({
        queryKey:["ToDos", category],
        queryFn:()=>fetchTasks(category),
    })
  return categoryTasks
}

export default useFetchToDos