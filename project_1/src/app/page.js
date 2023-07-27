

import ToDoList from "../../components/ToDoList"
import React from "react";
import Link from "next/link";


export default function Home() {



  return (
    <main className="flex justify-content-center gap-3">


      <div className="col-8 relative">
        <div className="flex">
          <Link href="/test"> Go to another page</Link>
        </div>
        <br></br>
        <div className="flex justify-content-center">
          <h1>To-Do App</h1>
        </div>
        <br></br>
        <ToDoList></ToDoList>
      </div>





    </main>

  )
}
