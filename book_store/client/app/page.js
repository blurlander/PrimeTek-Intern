'use client'

import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { DataScroller } from 'primereact/datascroller';
import { useRouter } from 'next/navigation'
import { Menu } from 'primereact/menu';
import { Avatar } from 'primereact/avatar';
import axios from '../node_modules/axios';
import { Toast } from 'primereact/toast';
import { Badge } from 'primereact/badge';




export default function Home() {
  const router = useRouter();

  const menu = useRef(null);
  const cartMenu = useRef(null);
  const toast = useRef(null);

  const showInfo = (message, severity) => {
    toast.current.show({ severity: severity, summary: 'Info', detail: message, life: 3000 });
  }



  const [data, setData] = useState([]);
  const [cartArr, setCartArr] = useState([]);
  const [flag, setFlag] = useState(true);
  const [cartSize, setCartSize] = useState(0);
  const [user, setUser] = useState(null);

  const [isLoading1, setLoading1] = useState(true);
  const [isLoading2, setLoading2] = useState(true);



  const buy = async () => {
    if (cartSize == 0){
      showInfo("Your cart is empty", "info");
    }else {
      const userId = user._id;
      const books = cartArr;
  
      const response = await fetch('http://localhost:8000/api/addBook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          userId,
          books
        })
      });
  
  
      if (response.ok) {
          // Set a flag in localStorage to show the alert after the page reloads
          //localStorage.setItem('showInfoFlag', 'true');
  
          // Reload the current page
          window.location.reload();
  
      } else {
        showInfo("Error in buy", "error");
  
      }

    }


  }



  const addToCart = (book) => {
    if (!user) {
      showInfo("You must be logged in in order to add book to cart", "info");
    } else {
      let item = cartArr.find(item => item._id == book._id);
      if (!item) {
        cartArr.push(book);
        setFlag(!flag);
      }

    }
  }

  const removeFromCart = (book) => {

    const index = cartArr.findIndex(item => item._id === book._id);

    if (index > -1) {
      cartArr.splice(index, 1);
      setFlag(!flag);
    }
  }



  const logout = async () => {
    try {
      await fetch('http://localhost:8000/api/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      window.location.reload(); // Reload the current page
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }




  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:8000/');
        setData(response.data.data);
        setLoading1(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    async function fetchUser() {
      try {
        const response = await axios.get('http://localhost:8000/api/user', {
          withCredentials: true, // Equivalent to 'credentials: 'include''
        });
        const userData = response.data;
        setUser(userData);
        setLoading2(false);
      } catch (error) {
        console.error('Error fetching user:', error);
        setLoading2(false);
      }
    }

    fetchData();
    fetchUser();



  }, [])

  useEffect(() => {
    setCartSize(cartArr.length);
    console.log(cartSize);

  }, [flag])

  // Log the state in a separate useEffect to capture the updated values
  /*useEffect(() => {
    console.log(data);
    console.log(user);
  }, [data, user]); */


  let items = [

    {
      template: () => {
        return (
          <div className='flex justify-content-center align-items-center'>
            <Avatar icon="pi pi-user" className="mr-2" shape="circle" />
            <div className="flex flex-column align">
              <span className="font-bold">{user.name}</span>
              <span className="text-sm"></span>
            </div>
          </div>
        )
      }
    },
    { separator: true },
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: () => {
        logout();
      }
    },
  ];



  const cartTemplate = (book) => {
    return (
      <div className=" col-12 p-2" key={book.id} title={book.title}>
        <div className="p-2 border-1 surface-border surface-card border-round w-full">
          <div className="flex flex-column align-items-center gap-3 py-5">
            <img className="w-2 h-3rem shadow-2 border-round" src={book.thumbnailUrl} alt={book.title} />
            <div className="h-3rem overflow-x-auto">{book.title}</div>
            <span >
              <Button icon="pi pi-times" rounded severity="danger" aria-label="Cancel"
                onClick={() => removeFromCart(book)}
              />
            </span>
          </div>
        </div>
      </div>
    )
  }



  const itemTemplate = (book) => {
    return (
      <div className=" col-12  md:col-4 lg:col-4 xl:col-4 p-2" key={book.id} title={book.title}>
        <div className="p-2 border-1 surface-border surface-card border-round w-full">
          <div className="flex flex-column align-items-center gap-3 py-5">
            <img className="w-3 h-5rem md:h-8rem md:w-4 shadow-2 border-round" src={book.thumbnailUrl} alt={book.title} />
            <div className="text-1xl font-bold h-3rem overflow-x-auto">{book.title}</div>
            <span >
              <Button label="Add to Cart"
                onClick={() => addToCart(book)}
                severity="primary" rounded className='z-1' />
            </span>
          </div>
        </div>
      </div>
    )
  }

  let cart = [

    {
      template: () => {
        if (cartSize == 0) {
          return (
            <h5>Cart is empty</h5>

          )
        } else {
          return (
            <div className="card">
              <ul className='overflow-auto max-h-24rem'>
                {
                  cartArr.map(book =>
                    <li key={book._id}>
                      <div className=" col-12 p-2" title={book.title}>
                        <div className="p-2 border-1 surface-border surface-card border-round w-full">
                          <div className="flex flex-column align-items-center gap-3 py-5">
                            <img className="w-2 h-3rem shadow-2 border-round" src={book.thumbnailUrl} alt={book.title} />
                            <div className="h-3rem overflow-x-auto">{book.title}</div>
                            <span >
                              <Button icon="pi pi-times" rounded severity="danger" aria-label="Cancel"
                                onClick={() => removeFromCart(book)}
                              />
                            </span>
                          </div>
                        </div>
                      </div>
                    </li>
                  )
                }
              </ul>

            </div>
          )

        }

      }
    },
    { separator: true },
    {
      label: 'Buy',
      icon: 'pi pi-wallet',
      command: () => {
        buy();
      }
    },
  ];


  // wait for fetching
  if (isLoading1 || isLoading2) return <p>Loading...</p>

  return (
    <main className="z-1 flex grid  justify-content-center align-items-center gap-3 surface-300">
      <Toast ref={toast} />
      <div className="flex col-12 grid w-screen top-0 grid mb-8 justify-content-center align-items-center bg-white" >
        <div className='col-4 md:col-2 lg:col-2'>
          <h1 className='brand w-auto ml-3 sm:h-1rem md:h-2rem lg:h-2rem'>PrimE-Books</h1>
        </div>

        <div className='col-1'>
          <Button icon="pi pi-home" severity="secondary" aria-label="Home Page" onClick={() => router.push('/')} />
        </div>
        <div className='col-4'></div>
        <div className='col-2 flex justify-content-center align-items-center'>
          {!user ? (
            <Button icon='pi pi-sign-in' label='Login' severity="primary" rounded onClick={() => router.push('/login')} />
          ) : (
            <div className='card flex justify-content-center align-items-center'>
              <Menu model={items} popup ref={menu} id="popup_menu_profile" popupAlignment="right" />
              <Button icon="pi pi-align-right" className="mr-2 " onClick={(event) => menu.current.toggle(event)} aria-controls="popup_menu" aria-haspopup />

              <i className="pi pi-shopping-cart p-overlay-badge ml-2 cursor-pointer hover:text-orange-700 "
                onClick={(event) => cartMenu.current.toggle(event)} aria-controls="popup_menu" aria-haspopup style={{ fontSize: '2rem' }}>
                <Badge value={cartSize}></Badge>
              </i>
              <Menu model={cart} popup ref={cartMenu} id="popup_menu_cart" />
            </div>

          )}
        </div>
      </div>
      <br></br>
      <div className='col-8'>
        <h1 className='font-bold'>All Books</h1>
        <DataView layout="grid" value={data} itemTemplate={itemTemplate} paginator rows={9} />
      </div>
    </main>
  )
}
