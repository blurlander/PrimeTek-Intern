'use client'

import React, { useState, useEffect } from 'react';
import { Rating } from 'primereact/rating';
import { Button } from 'primereact/button';
import '../../background.css';
import { useRouter } from 'next/navigation'
import axios from '../../../../node_modules/axios';




export default function movieDetails(props) {
  const [movie, setMovie] = useState(Object);
  const router = useRouter();

// get movie using id
  const getMovie = () => {
    const options = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/movie/'.concat(props.params.movieID),
      params: { language: 'en-US' },
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNWQ1YTRjM2Y2ZGZmNzE1YjlmZGJhODMwOWE0MTZkNSIsInN1YiI6IjY0YzRkYWFkOWI2ZTQ3MDBhZDJhMjBjZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sIBvlru7khkMdfArYG_8oGEZ5eh4T-im7A85KeJcHyw'
      }
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setMovie(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }



  useEffect(() => {
    getMovie();
    console.log(movie);
  }, []);


  return (
    <main className='grid'>
      <div className="flex w-screen  top-0 h-5rem  sm:col-8 md:col-6 lg:col-6" style={{ zIndex: "999 !important" }}>
        <div className='ml-6'>
          <h1 className='brand'>MoviePrime</h1>
        </div>
        <div className='flex w-full justify-content-center align-items-center gap-3'>
          <Button icon="pi pi-home" severity="secondary" aria-label="Home Page" onClick={() => router.push('/')} />
        </div>
      </div>
      <br></br>
      <div className='w-screen grid flex justify-content-center mt-8'>
        <div className='col-9 sm:col-9 lg:col-4 xl:col-4 p-2'>
          <img className="w-8 shadow-2 border-round" src={'https://image.tmdb.org/t/p/w500'.concat(movie.poster_path)}
            alt={movie.name} />
          <div className="w-4 shadow-2 border-round mt-3">
            <Rating value={Math.round(movie.vote_average / 2)} tooltip={movie.vote_average} readOnly cancel={false}></Rating>
          </div>

        </div>
        <div className='col-10 sm:col-8 lg:col-7 xl:col-7 p-2'>
          <h1>{movie.title}</h1>
          <br></br>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
        </div>

      </div>
    </main>
  )
}
