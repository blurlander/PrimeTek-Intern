'use client'


import React, { useState, useRef } from "react";
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { DataView } from 'primereact/dataview';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from "primereact/inputtextarea";
import { useRouter } from "next/navigation";
import { editTask, removeTask } from "../api";







const ToDoList = (props) => {

    const toast = useRef(null);
    const [editVisible, setEditVisible] = useState(false);
    const [delVisible, setDelVisible] = useState(false);
    const [editValue, setEditValue] = useState('');
    const [editTitle, setEditTitle] = useState('');
    const [editId, setEditId] = useState('');
    const router = useRouter();



    const editToDo = async (e) => {
        e.preventDefault;

        await editTask({
            id: editId,
            title: editTitle,
            text: editValue

        })
        setEditTitle("");
        setEditValue("");
        setEditId("");
        setEditVisible(false);
        router.refresh();
    };

    const removeToDo = async (e) => {
        await removeTask(editId)
        setEditId("");
        setDelVisible(false);
        router.refresh();
    };


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
                            <Button icon="pi pi-pencil" onClick={() => { setEditVisible(true), setEditValue(task.text), setEditTitle(task.title), setEditId(task.id)}} rounded severity="secondary" aria-label="Edit" />
                        </div>
                        <div className="absolute right-0 flex align-items-center justify-content-center w-4rem h-4rem">
                            <Button icon="pi pi-times" onClick={() => { setEditId(task.id),setDelVisible(true)}} rounded severity="danger" aria-label="Remove" />
                        </div>
                    </div>
                </div>

            </div>
        );
    };







    return (
        <div className="flex justify-content-center align-items-start">
            <DataView value={props.tasks} itemTemplate={itemTemplate} />

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

    );
};

export default ToDoList;