'use client'

import ToDoList from "../../components/ToDoList"
import React from "react";


export default function Home() {


  
  return (
    <main className="flex justify-content-center">

      <div className="col-8 relative">
        <div className="flex justify-content-center">
          <h1>To-Do App</h1>
        </div>
        <br></br>
        <ToDoList></ToDoList>
      </div>
    </main>

  )
}
