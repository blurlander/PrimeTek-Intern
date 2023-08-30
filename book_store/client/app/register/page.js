'use client'

import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { useRouter } from 'next/navigation'
import { Password } from 'primereact/password';
import { InputText } from "primereact/inputtext";
import { Card } from 'primereact/card';

export default function Register() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submit = async (e) => {
        e.preventDefault();

        await fetch('http://localhost:8000/api/register', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name,
                email,
                password
            })
        });

        await router.push('/login');

    }



    return (
        <main className='flex justify-content-center align-items-center '>
            <Card title="Login"  className="md:w-25rem sm:w-10rem mt-8">
                <form onSubmit={submit}>
                    <div className="p-inputgroup mb-3">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-user"></i>
                        </span>
                        <InputText placeholder="Username" onChange={(e) => setName(e.target.value)} required/>
                    </div>
                    <div className="p-inputgroup mb-3">
                        <InputText placeholder="Email" onChange={(e) => setEmail(e.target.value)} required/>
                    </div>
                    <div className="mb-3">
                        <Password placeholder='Password' onChange={(e) => setPassword(e.target.value)} toggleMask feedback={false} required/>
                    </div>


                    <Button label="Register" severity="success" type='submit'/>
                </form>
                <h5>Already have an account?</h5>
                    <Button label="Go to Login Page" severity="secondary" onClick={() => router.push('/login')} />
            </Card>

        </main>
    )
}
