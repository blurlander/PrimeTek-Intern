import { getAllToDos } from "./api"
import ToDoList from "./components/ToDoList"
import AddToDo from "./components/AddToDo";


export default async function Home() {
  var tasks = await getAllToDos();
  

  

  return (
    <main className="flex justify-content-center">

      <div className="col-8 relative">
        <div className="flex justify-content-center">
          <h1>To-Do App List</h1>
        </div>
        <br></br>
        <AddToDo tasks={tasks}></AddToDo>
        <br></br>
        <ToDoList tasks={tasks}></ToDoList>
      </div>
    </main>

  )
}
