'use client'

import React, { useState, useEffect, Component } from 'react';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import Link from "next/link";
import { Tooltip } from 'primereact/tooltip';
import { Navbar } from "../../components/Navbar";
import './background.css';
import { Button } from 'primereact/button';

export default function Home() {

  const [movies, setMovies] = useState([]);

  const getAllMovies = (pageNumber) => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNWQ1YTRjM2Y2ZGZmNzE1YjlmZGJhODMwOWE0MTZkNSIsInN1YiI6IjY0YzRkYWFkOWI2ZTQ3MDBhZDJhMjBjZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sIBvlru7khkMdfArYG_8oGEZ5eh4T-im7A85KeJcHyw'
      }
    };

      let url = 'https://api.themoviedb.org/3/movie/popular'.concat('?page=').concat(pageNumber);
      fetch(url, options)
        .then(response => response.json())
        .then(response => setMovies(response.results));
  }






  useEffect(() => {
    getAllMovies(1);
  }, []);


  return (
    <main className="z-1 flex justify-content-center gap-3">
        <div className="flex w-screen fixed top-0 h-5rem navi" style={{zIndex: "999 !important" }}>
          <Navbar></Navbar>
        </div>
      <br></br>
      <div className='w-screen grid flex justify-content-center mt-8 ' style={{zIndex: "1 !important" }}>
        {movies.map(function(movie){
          return(
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
                    <Rating value={Math.round(movie.vote_average/2)} tooltip={movie.vote_average} readOnly cancel={false}></Rating>
                    <span >
                      <Button label="Details" severity="info" rounded />
                    </span>

                  </div>
                  
                </div>
              </div>
          )
        })
        }
      </div>
    </main>

  )
}
