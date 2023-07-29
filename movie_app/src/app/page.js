'use client'

import React, { useState, useEffect } from 'react';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import Link from "next/link";
import { Navbar } from "../../components/Navbar";
import './background.css';

export default function Home() {

  const [movies, setMovies] = useState([]);

  const getAllMovies = () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNWQ1YTRjM2Y2ZGZmNzE1YjlmZGJhODMwOWE0MTZkNSIsInN1YiI6IjY0YzRkYWFkOWI2ZTQ3MDBhZDJhMjBjZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sIBvlru7khkMdfArYG_8oGEZ5eh4T-im7A85KeJcHyw'
      }
    };
    
    fetch('https://api.themoviedb.org/3/movie/popular', options)
      .then(response => response.json())
      .then(response => setMovies(response.results));
  };



  useEffect(() => {
    getAllMovies();
    console.log(movies);

  }, []);


  const gridItem = (movie) => {
    return (
      <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
        <div className="p-4 border-1 surface-border surface-card border-round">
          <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <div className="flex align-items-center gap-2">
              <i className="pi pi-tag"></i>
              <span className="font-semibold">{movie.category}</span>
            </div>
            <Tag value={movie.original_title}></Tag>
          </div>
          <div className="flex flex-column align-items-center gap-3 py-5">
            <img className="w-9 shadow-2 border-round" src={'https://image.tmdb.org/t/p/w500'.concat(movie.poster_path)} alt={movie.name} />
            <div className="text-2xl font-bold">{movie.title}</div>
            <Rating value={movie.vote_average} readOnly cancel={false}></Rating>
          </div>
        </div>
      </div>
    );
  };




  return (
    <main className="flex justify-content-center gap-3">


      <div className="flex-auto relative">
        <div className="flex w-screen absolute top-0 h-9rem navi">
          <Navbar></Navbar>
        </div>
        <div>
          <div className="card">
            <DataView value={movies} itemTemplate={gridItem} layout={"grid"} />
          </div>
        </div>
      </div>

    </main>

  )
}
