import { getAllToDos } from "./api"
import ToDoList from "./components/ToDoList"


export default async function Home() {
  const tasks = await getAllToDos();
  console.log(tasks)
  return (
    <main className="flex">
      <div >
        <ToDoList tasks={tasks}></ToDoList>
      </div>


    </main>

  )
}
