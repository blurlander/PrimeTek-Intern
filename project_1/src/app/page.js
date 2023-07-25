'use client'

import ToDoList from "../../components/ToDoList"
import AddToDo from "../../components/AddToDo";
import React, { useState, useEffect } from "react";


export default function Home() {
  const [toDos, setToDos] = useState([]);

  useEffect(() => {
    let arr;
    arr = JSON.parse(localStorage.getItem("toDos") || "");
    setToDos(arr);
    localStorage.setItem('toDos', JSON.stringify(toDos));
  }, [])

  
  return (
    <main className="flex justify-content-center">

      <div className="col-8 relative">
        <div className="flex justify-content-center">
          <h1>To-Do App List</h1>
        </div>
        <br></br>
        <AddToDo toDos = {toDos}></AddToDo>
        <br></br>
        <ToDoList toDos = {toDos}></ToDoList>
      </div>
    </main>

  )
}
