"use client"

import React, { useState } from "react";
//import { useRouter } from 'next/router';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from "primereact/inputtextarea";
import { addNewTask } from "../api";
import { useRouter } from "next/navigation";
import { v4 as uuid } from 'uuid';

export default function AddToDo(tasks) {
    //const router = useRouter();
    const [visible, setVisible] = useState(false);
    const [value, setValue] = useState('');
    const [newTitle, setTitle] = useState('');
    const router = useRouter();
    const items = [
        {
            label: 'Add',
            icon: 'pi pi-upload',
            command: () => {
                //router.push('/fileupload');
            }
        }
    ];

    const content = (
        <React.Fragment>
            <Button label="Add New Task" icon="pi pi-plus" className="mr-2" onClick={() => setVisible(true)} />
        </React.Fragment>
    );

    const  addNewToDo =  async (e) => {
        e.preventDefault;

        console.log(newTitle);
        console.log(value);
        let id = uuid();
        console.log(id);

        await addNewTask({
            id: id.slice(0,6).toString(),
            title: newTitle ,
            text: value
        })
        setTitle("");
        setValue("");
        setVisible(false);
        router.refresh();
    

    }


    return (
        <div className="card">
            <Toolbar
                pt={{
                    root: { style: {borderRadius: '24px' }, className: "surface-card" }
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
    );
}