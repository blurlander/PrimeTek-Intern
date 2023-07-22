'use client'

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { Card } from 'primereact/card';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import CustomButton from './CustomButton';


const header = (
    <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
);
const footer = (
    <div className="flex flex-wrap justify-content-end gap-2">
        <Button label="Save" icon="pi pi-check" />
        <Button label="Cancel" icon="pi pi-times" className="p-button-outlined p-button-secondary" />
    </div>
);


const itemTemplate = (task) => {
    return (
        <div className="col-12">
            <div className="flex flex-column xl:flex-row xl:align-items-center p-4 gap-4">
                <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                    <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                        <div className="text-2xl font-bold text-900">{task.title}</div>
                        <div className="flex align-items-center justify-content-between gap-3">
                            <span className="flex align-items-center gap-2">
                                <i className="pi pi-tag"></i>
                                <span className="font-semibold">{task.text}</span>
                            </span>
                        </div>
                        <CustomButton></CustomButton>
                    </div>
                    

                </div>
            </div>
        </div>
    );
};


const ToDoList = (props) => {
    return (
        <div className="flex justify-content-center align-items-start">
            <DataView value={props.tasks} itemTemplate={itemTemplate} />
        </div>

    );
};

export default ToDoList;