'use client'

import React, { useState, useEffect } from 'react';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { InputText } from 'primereact/inputtext';
import './background.css';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { useRouter } from 'next/navigation'
import axios from '../../node_modules/axios';
import { AutoComplete } from 'primereact/autocomplete';

export default function Home() {

  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const router = useRouter();


  const getAllMovies = () => {

      const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/movie/popular',
        params: {language: 'en-US', page: 1},
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNWQ1YTRjM2Y2ZGZmNzE1YjlmZGJhODMwOWE0MTZkNSIsInN1YiI6IjY0YzRkYWFkOWI2ZTQ3MDBhZDJhMjBjZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sIBvlru7khkMdfArYG_8oGEZ5eh4T-im7A85KeJcHyw'
        }
      };
      
      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          setMovies([].concat(movies,response.data.results));
        })
        .catch(function (error) {
          console.error(error);
        });
  }




  useEffect(() => {
    getAllMovies(); 
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setFilter(search);
  }

  const itemTemplate = (movie) => {
    return (
      <div className="col-9 sm:col-8 lg:col-4 xl:col-4 p-2" key={movie.id} title={movie.title}>
        <div className="p-4 border-1 surface-border surface-card border-round">
          <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <div className="flex align-items-center gap-2">
              <span className="font-semibold">{movie.category}</span>
            </div>
            <Tag value={movie.release_date}></Tag>
          </div>
          <div className="flex flex-column align-items-center gap-3 py-5">
            <img className="w-6 shadow-2 border-round" src={'https://image.tmdb.org/t/p/w500'.concat(movie.poster_path)} alt={movie.name} />
            <div className="text-2xl font-bold">{movie.title}</div>
            <Rating value={Math.round(movie.vote_average / 2)} tooltip={movie.vote_average} readOnly cancel={false}></Rating>
            <span >
              <Button label="Details"
                onClick={() => router.push('/movieDetails/'.concat(movie.id))}
                severity="info" rounded className='z-1' />
            </span>
          </div>
        </div>
      </div>
    )
  }


  return (
    <main className="z-1 flex justify-content-center gap-3">
      <div className="flex w-screen fixed top-0 h-5rem navi" >
        <div className='ml-6'>
          <h1 className='brand'>MoviePrime</h1>
        </div>
        <div className='flex w-full justify-content-center align-items-center gap-3'>
          <Button icon="pi pi-home" severity="secondary" aria-label="Home Page" onClick={() => router.push('/')} />
          <form onSubmit={(e) => handleSearch(e)}>
            <span className="p-input-icon-left">
              <i className="pi pi-search" />
              <InputText placeholder="Search" onChange={(e) => setSearch(e.target.value)} className='sm:w-10rem  md:w-20rem lg:w-30rem' />
            </span>
            <Button label="Search" rounded className='ml-2'
              style={{ backgroundImage: "linear-gradient(to right, #4880EC, #019CAD)" }}
              type="submit" />
          </form>
        </div>
      </div>
      <br></br>
      <div>
        <div className='w-screen grid flex justify-content-center mt-8 z-1'>
          <DataView layout="grid" value={movies.filter(function movieFilter(movie) {
            return movie.title.toLowerCase().includes(filter.toLowerCase());
          })} itemTemplate={itemTemplate} paginator rows={10} />
        </div>
      </div>
    </main>

  )

}
