'use client'

import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { useRouter } from 'next/navigation'
import { DataView } from 'primereact/dataview';
import { Toast } from 'primereact/toast';
import axios from 'axios';

export default function Library(props) {
    const router = useRouter();
    const toast = useRef(null);

    const [user, setUser] = useState(null);
    const [library, setLibrary] = useState([]);
    const [isLoading2, setLoading2] = useState(true);


    const userId = props.params.userId;

    //const userId = router.query.userId;

    useEffect(() => {
        async function fetchLibrary() {
            try {
                const response = await axios.get(`http://localhost:8000/api/library?userId=${userId}`, {
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });
                setLibrary(response.data);
                console.log(response.data);
                setLoading2(false);
            } catch (error) {
                console.error('Error fetching library:', error);
            }
        }

        console.log(userId);



        fetchLibrary();

    }, [])





    const showError = () => {
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Invalid password or email', life: 3000 });
    }

    const itemTemplate = (book) => {
        return (
          <div className=" col-12  md:col-4 lg:col-4 xl:col-4 p-2" key={book.id} title={book.title}>
            <div className="p-2 border-1 surface-border surface-card border-round w-full">
              <div className="flex flex-column align-items-center gap-3 py-5">
                <img className="w-3 h-5rem md:h-8rem md:w-4 shadow-2 border-round" src={book.thumbnailUrl} alt={book.title} />
                <div className="text-1xl font-bold h-3rem overflow-x-auto">{book.title}</div>
              </div>
            </div>
          </div>
        )
      }



    // wait for fetching
    if (isLoading2) return <p>Loading...</p>

    return (
        <main className='flex justify-content-center align-items-center '>
            <Toast ref={toast} />
            <div className='w-screen z-1' style={{ marginTop: "3rem" }}>
                <h1>Library</h1>
            <DataView layout="grid" value={library} itemTemplate={itemTemplate} paginator rows={9} />
            </div>


        </main>
    )
}
