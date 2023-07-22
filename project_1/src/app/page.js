import { getAllToDos } from "./api"
import ToDoList from "./components/ToDoList"
import AddToDo from "./components/AddToDo";


export default async function Home() {
  var tasks = await getAllToDos();
  console.log(tasks)

  return (
    <main className="flex justify-content-center">

      <div className="col-8">
        <h3>To-Do App List</h3>
        <br></br>
        <AddToDo tasks = {tasks}></AddToDo>
        <br></br>
        <ToDoList tasks={tasks}></ToDoList>
      </div>
    </main>

  )
}
