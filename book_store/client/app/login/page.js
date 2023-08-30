'use client'

import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { useRouter } from 'next/navigation'
import { Password } from 'primereact/password';
import { InputText } from "primereact/inputtext";
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';

export default function Login() {
    const router = useRouter();
    const toast = useRef(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');



    const showError = () => {
        toast.current.show({severity:'error', summary: 'Error', detail:'Invalid password or email', life: 3000});
    }

    const submit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                email,
                password
            })
        });


        if (response.ok) {
            await router.push('/');
          } else {
            // Handle the case where login failed
            console.error('Login failed');
            showError();
            // You can display a warning message to the user
          }
    }


    return (
        <main className='flex justify-content-center align-items-center '>
            <Toast ref={toast} />
            <Card title="Login"  className="md:w-25rem sm:w-10rem mt-8">
                <form onSubmit={submit}>
                    <div className="p-inputgroup mb-3">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-user"></i>
                        </span>
                        <InputText placeholder="Email" onChange={(e) => setEmail(e.target.value)} required/>
                    </div>
                    <div className="mb-3">
                        <Password placeholder='Password' onChange={(e) => setPassword(e.target.value)} toggleMask feedback={false} required/>
                    </div>


                    <Button label="Login" severity="success" type='submit'/>
                </form>
                <h5>Don't have an account?</h5>
                    <Button label="Go to Register Page" severity="secondary" onClick={() => router.push('/register')}/>
            </Card>

        </main>
    )
}
