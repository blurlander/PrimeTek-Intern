'use client'

import React from 'react'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

export const Navbar = () => {
    return (
        <div className='flex w-full justify-content-center align-items-center gap-3'>
            <form>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText placeholder="Search" className='sm:w-15rem  md:w-20rem lg:w-30rem' />
                </span>
                <Button label="Search" rounded className='ml-2'  style={{backgroundImage: "linear-gradient(to right, #4880EC, #019CAD)" }} />
            </form>
        </div>
    )
}
