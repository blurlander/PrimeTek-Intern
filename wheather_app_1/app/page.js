'use client'

import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { InputSwitch } from 'primereact/inputswitch';
import axios from '../node_modules/axios';
import { AutoComplete } from "primereact/autocomplete";
import { Card } from 'primereact/card';
import   PrimeReact  from 'primereact/api';

export default function Home() {
  const [search, setSearch] = useState('Ankara');
  const [city, setCity] = useState(Object);
  const [filteredCities, setFilteredCities] = useState([]);
  const [isLoading, setLoading] = useState(true)
  const [checked, setChecked] = useState(true);
  const [theme, setTheme] = useState('dark');


  // fecth city 
  const getCity = async () => {
    console.log(search);
    const options = {
      method: 'GET',
      url: 'https://weatherapi-com.p.rapidapi.com/current.json',
      params: { q: search },
      headers: {
        'X-RapidAPI-Key': '5f4eda26d0mshd26b1ca693e5f76p1e5de6jsnf3bec76ea226',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      setCity(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    getCity();
  }


  // fetch city names for autocomplate
  const suggest = async (e) => {

    const options = {
      method: 'GET',
      url: 'https://weatherapi-com.p.rapidapi.com/search.json',
      params: { q: e.query },
      headers: {
        'X-RapidAPI-Key': '5f4eda26d0mshd26b1ca693e5f76p1e5de6jsnf3bec76ea226',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      setFilteredCities(response.data);
    } catch (error) {
      console.error(error);
    }

  }


// change theme function
  const changeTheme = (e) => {
    setChecked(e.value);
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    PrimeReact.changeTheme(`lara-${theme}-blue`, `lara-${newTheme}-blue`, 'theme-link', () =>
    setTheme(newTheme));  
  }





  useEffect(() => {
    getCity();
  }, [])


  // wait for fetching
  if (isLoading) return <p>Loading...</p>


  return (
    <main className="flex grid justify-content-center align-items-start gap-3 relative">
      <div className="col-12 card flex justify-content-end align-items-center ">
        <InputSwitch checked={checked} onChange={(e) => changeTheme(e)} />
      </div>

      <div className='col-12 flex justify-content-center align-items-center'>
        <h1>Prime Wheather App</h1>
      </div>

      <div className='col-9 flex justify-content-center align-items-start mt-4 mb-4'>
        <form onSubmit={(e) => handleSearch(e)}>
          <span className="p-input-icon-left">
            <AutoComplete placeholder="Search"
              onChange={(e) => {if (typeof e.value === 'string') {
                setSearch(e.value)
              } else{
                setSearch(e.value.name)
              } }}
              suggestions={filteredCities}
              value={search}
              completeMethod={suggest} 
              field="name" pt={{
                input: { root: { className: 'w-8rem sm:w-16rem md:w-18rem lg:w-20rem' } },
              }} />
          </span>
          <Button label="Search" rounded className='ml-2'
            style={{ backgroundImage: "linear-gradient(to right, #4880EC, #019CAD)" }}
            type="submit" />
        </form>
      </div>

      <Card title={city.location.name} subTitle={city.location.country} className='sm:col-4 md:col-6 mt-4'>
        <div className='flex justify-content-between align-items-center'>

          <img className='max-w-6rem' src={city.current.condition.icon}></img>
          <span className='text-4xl'>
            {city.current.temp_c} ℃
          </span>

        </div>



      </Card>

    </main>
  )
}


