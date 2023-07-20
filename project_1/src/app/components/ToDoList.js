'use client'

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const ToDoList = (props) => {
    return (
        <div className="card">
            <DataTable value={props.tasks} header="To-Do List" stripedRows tableStyle={{ minWidth: '50rem' }}>
                <Column field="id" sortable header="Id"></Column>
                <Column field="text" sortable header="Name"></Column>
            </DataTable>
        </div>

    );
};

export default ToDoList;