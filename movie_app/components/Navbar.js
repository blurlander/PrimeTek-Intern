'use client'

import React from 'react'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useRouter } from 'next/navigation'


export const Navbar = () => {
    const router = useRouter(); 


    return (
        <div className='flex w-full justify-content-center align-items-center gap-3'>
            <Button icon="pi pi-home" severity="secondary" aria-label="Home Page" onClick={() => router.push('/')} />
            <form onSubmit={(e) => handleSearch(e)}>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText placeholder="Search" className='sm:w-15rem  md:w-20rem lg:w-30rem' />
                </span>
                <Button label="Search" rounded className='ml-2'  
                style={{backgroundImage: "linear-gradient(to right, #4880EC, #019CAD)" }}
                type="submit"/>
            </form>
        </div>
    )
}
