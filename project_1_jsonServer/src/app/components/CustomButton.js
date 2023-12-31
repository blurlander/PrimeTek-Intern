'use client'

import React, { useRef } from 'react';
import { SpeedDial } from 'primereact/speeddial';
import { Tooltip } from 'primereact/tooltip';
import { Toast } from 'primereact/toast';

export default function CustomButton() {
    const toast = useRef(null);
    const items = [
        {
            label: 'Update',
            icon: 'pi pi-pencil',
            command: () => {
                toast.current.show({ severity: 'success', summary: 'Update', detail: 'Data Updated' });
            }
        },
        {
            label: 'Delete',
            icon: 'pi pi-trash',
            command: () => {
                toast.current.show({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
            }
        }
    ];

    return (
        <div>
            <Toast ref={toast} />
            <SpeedDial model={items} direction="left" transitionDelay={80} showIcon="pi pi-cog" hideIcon="pi pi-times" buttonClassName="p-button-outlined" />
        </div>
    )
}