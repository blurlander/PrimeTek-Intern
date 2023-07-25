'use client'

import React, { useState, useRef, useEffect } from "react";
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from "primereact/inputtextarea";
import { Toolbar } from 'primereact/toolbar';
import { v4 as uuid } from 'uuid';








const ToDoList = (props) => {

    const toast = useRef(null);

    // Boolean flag for Dialogs
    const [editVisible, setEditVisible] = useState(false); 
    const [delVisible, setDelVisible] = useState(false);
    const [visible, setVisible] = useState(false);

    // Variables for storing edit data for editing and deleting
    const [editValue, setEditValue] = useState('');
    const [editTitle, setEditTitle] = useState('');
    const [editId, setEditId] = useState('');
    
    //Variables for creating new "to do"
    const [value, setValue] = useState('');
    const [newTitle, setTitle] = useState('');
    
    //To do list
    const [toDos, setToDos] = useState([]);



    // Get data from local storage in first render
    useEffect(() => {
      let arr;
      arr = JSON.parse(localStorage.getItem("toDos") || "");
      setToDos(arr); //Get data from localStorage to "toDos"
    }, [])
  
    // Button content for toolbar
    const content = (
        <React.Fragment>
            <Button label="Add New Task" icon="pi pi-plus" className="mr-2" onClick={() => setVisible(true)} />
        </React.Fragment>
    );


    // Function that add new "to do" to local storage 
    const addNewToDo = (e) => {
        e.preventDefault();

        let id = uuid(); //Creating uniqe id for each "to do"
        const toDo = {
            id: id.slice(0, 6).toString(), // just use first 6 digit of id
            title: newTitle,
            text: value
        };

        toDos.push(toDo); // Push new "to do"
        
        //Set variables to default
        setTitle("");
        setValue("");
        setVisible(false);


        // Update localStorage
        window.localStorage.setItem('toDos', JSON.stringify(toDos));
    };




    // Function that allow us to edit an existing "to do"
    const editToDo = (e) => {
        e.preventDefault();

        // Find selected "to do"
        var indexOfObject = toDos.findIndex(toDo => {
            return toDo.id === editId;
        });


        // Update selected "to do" with inputs
        toDos[indexOfObject].title = editTitle;
        toDos[indexOfObject].text = editValue;

        //Set variables to default
        setEditId("");
        setEditTitle("");
        setEditTitle("");
        setEditVisible(false);

        //Update localStorage
        if (typeof window !== "undefined") {
            // Client-side-only code
            window.localStorage.setItem('toDos', JSON.stringify(toDos));
          }
        
    };

    // Function for deleting "to do"
    const removeToDo = (e) => {
        e.preventDefault();

        // Find selected "to do"
        const indexOfObject = toDos.findIndex(toDo => {
            return toDo.id === editId;
        });

        //Remove selected "to do"
        toDos.splice(indexOfObject, 1);

        //Set variables to default
        setEditId("");
        setDelVisible(false);

        //Update localStorage
        if (typeof window !== "undefined") {
            // Client-side-only code
            window.localStorage.setItem('toDos', JSON.stringify(toDos));
          }
        
    };





    // Item template of "to do" for displaying
    const itemTemplate = (task) => {
        return (
            <div className='col-12'>
                <div className="flex flex-wrap gap-3 justify-content-between" key={task.id}>
                    <div className='relative  w-12rem h-9rem mx-3 my-3 md:my-0'>
                        <div className='absolute  top-0 left-0 flex w-12rem h-4rem'>
                            <h3>{task.title}</h3>
                        </div>
                        <div className="absolute bottom-0 left-0 flex w-12rem h-4rem">
                            {task.text}
                        </div>
                    </div>
                    <div className="relative w-9rem h-9rem mx-3 my-3 md:my-0 border-round">
                        <div className="absolute right-50 flex align-items-center justify-content-center w-4rem h-4rem">
                            <Button icon="pi pi-pencil" onClick={() => { setEditVisible(true), setEditValue(task.text), setEditTitle(task.title), setEditId(task.id) }} rounded severity="secondary" aria-label="Edit" />
                        </div>
                        <div className="absolute right-0 flex align-items-center justify-content-center w-4rem h-4rem">
                            <Button icon="pi pi-times" onClick={() => { setEditId(task.id), setDelVisible(true) }} rounded severity="danger" aria-label="Remove" />
                        </div>
                    </div>
                </div>

            </div>
        );
    };







    return (
        
        <div>
            <div className="card">
                <Toolbar
                    pt={{
                        root: { style: { borderRadius: '24px' }, className: "surface-card" }
                    }}
                    center={content}
                ></Toolbar>
                <Dialog header="Add New Task" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                    <form onSubmit={(e) => addNewToDo(e)} method="POST">
                        <div className="p-inputgroup flex-1">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-star"></i>
                            </span>
                            <InputText placeholder="Title" value={newTitle} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <br></br>
                        <InputTextarea autoResize value={value} onChange={(e) => setValue(e.target.value)} rows={10} cols={91} />
                        <Button type="submit" label="Submit" icon="pi pi-check" />
                    </form>
                </Dialog>
            </div>

            <br></br>


            <div className="flex justify-content-center align-items-start">
                <DataView value={toDos} itemTemplate={itemTemplate} />

                <Dialog header="Edit Task" visible={editVisible} style={{ width: '50vw' }} onHide={() => setEditVisible(false)}>
                    <form onSubmit={(e) => editToDo(e)} method="POST">
                        <div className="p-inputgroup flex-1">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-star"></i>
                            </span>
                            <InputText placeholder={editTitle} value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                        </div>
                        <br></br>
                        <InputTextarea autoResize placeholder={editValue} value={editValue} onChange={(e) => setEditValue(e.target.value)} rows={10} cols={91} />
                        <Button type="submit" label="Submit" icon="pi pi-check" />
                    </form>
                </Dialog>

                <Dialog header="Remove Task" visible={delVisible} style={{ width: '25vw' }} onHide={() => setDelVisible(false)}>
                    <form onSubmit={(e) => removeToDo(e)} method="POST">
                        <h3>Do you want to delete this task?</h3>
                        <br></br>
                        <div className="flex justify-content-between">
                            <Button type="submit" label="Yes" icon="pi pi-check" />
                            <Button type="button" onClick={() => setDelVisible(false)} severity="danger" label="No" icon="pi pi-times" />
                        </div>

                    </form>
                </Dialog>

            </div>
        </div>

    );
};

export default ToDoList;