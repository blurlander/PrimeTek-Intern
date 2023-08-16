'use client'

import React, { useState, useEffect } from 'react';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import './background.css';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { useRouter } from 'next/navigation'
import axios from '../../node_modules/axios';
import { AutoComplete } from "primereact/autocomplete";
import PrimeReact from 'primereact/api';
import { InputSwitch } from 'primereact/inputswitch';
import { UserAuth } from "./AuthContext";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';


export default function Home() {

  const [filteredMovies, setFilteredMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [suggestData, setSuggestData] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState("");
  const [filter, setFilter] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);
  const [checked, setChecked] = useState(true);
  const [theme, setTheme] = useState('vela');
  const { user, googleSignIn, logOut } = UserAuth();



  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const checkUser = (movie) => {
    console.log(user);

    if (user != null){
      router.push('/movieDetails/'.concat(movie.id));
    }else {
      dialog();
    }
    
  }


  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setUserLoading(false);
    };
    checkAuthentication();
  }, [user]);




  const router = useRouter();

  //get popular movies for home page first render
  const getAllMovies = () => {

    const options = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/movie/popular',
      params: { language: 'en-US' },
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNWQ1YTRjM2Y2ZGZmNzE1YjlmZGJhODMwOWE0MTZkNSIsInN1YiI6IjY0YzRkYWFkOWI2ZTQ3MDBhZDJhMjBjZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sIBvlru7khkMdfArYG_8oGEZ5eh4T-im7A85KeJcHyw'
      }
    };

    axios
      .request(options)
      .then(function (response) {
        setMovies(response.data.results);
        setLoading(false);

      })
      .catch(function (error) {
        console.error(error);
      });
  }

  //get movies using search query for auto complate
  const searchMovies = async (value) => {

    const options = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/search/movie',
      params: { query: value, include_adult: 'false', language: 'en-US' },
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNWQ1YTRjM2Y2ZGZmNzE1YjlmZGJhODMwOWE0MTZkNSIsInN1YiI6IjY0YzRkYWFkOWI2ZTQ3MDBhZDJhMjBjZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sIBvlru7khkMdfArYG_8oGEZ5eh4T-im7A85KeJcHyw'
      }
    };


    const response = await axios.request(options);
    setSuggestData(response.data.results);

  }



  // get populer movies
  useEffect(() => {
    getAllMovies();
  }, []);


  // change theme function
  const changeTheme = (e) => {
    setChecked(e.value);
    const newTheme = theme === 'vela' ? 'saga' : 'vela';
    PrimeReact.changeTheme(`${theme}-blue`, `${newTheme}-blue`, 'theme-link', () =>
      setTheme(newTheme));
  }



  // search button => when clicked display movies acording to search query
  const handleSearch = (e) => {
    e.preventDefault();
    setFilter(selectedMovie);

    setMovies(suggestData);
  }

  // item template for auto complate
  const suggestTemplate = (movie) => {
    return (
      <div className="flex align-items-center" onClick={() => router.push('/movieDetails/'.concat(movie.id))}>
        {movie.title}
      </div>
    );
  }


  // auto complate function
  const suggest = (e) => {
    searchMovies(e.query);

    setTimeout(() => {
      let filteredItems = suggestData.filter(function movieFilter(movie) {
        return movie.title.toLowerCase().includes(e.query.toLowerCase());
      });
      setFilteredMovies(filteredItems);
    }, 500);
  }

  //item template for displaying movies
  const itemTemplate = (movie) => {
    return (
      <div className="col-12 sm:col-8 md:col-4 lg:col-4 xl:col-4 p-2" key={movie.id} title={movie.title}>
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
                onClick={() => checkUser(movie)}
                severity="info" rounded className='z-1' />
            </span>
          </div>
        </div>
      </div>
    )
  }

  const accept = () => {
    handleSignIn();
}

const reject = () => {
    
}


  const dialog = () => {
    confirmDialog({
        message: 'You need to be logged in to go to the details page.',
        header: 'Contuniue',
        icon: 'pi pi-exclamation-triangle',
        accept,
        reject
    });
};


  // wait for fetching
  if (isLoading) return <p>Loading...</p>

  return (
    <main className="z-1 flex justify-content-center align-items-start gap-3">
      <ConfirmDialog />
      <div className="flex grid w-screen fixed top-0 navi grid mb-8" >
        <div className='col-12 sm:col-4 md:col-2 lg:col-2'>
          <h1 className='brand w-auto ml-3 sm:h-2rem md:h-3rem lg:h-3rem'>MoviePrime</h1>
        </div>
        <div className='flex justify-content-center align-items-center gap-3 col-12 sm:col-9  md:col-6 lg:col-6'>
          <div className="card flex justify-content-end align-items-center ">
            <InputSwitch checked={checked} onChange={(e) => changeTheme(e)} />
          </div>
          <Button icon="pi pi-home" severity="secondary" aria-label="Home Page" onClick={() => router.push('/')} />
          <form onSubmit={(e) => handleSearch(e)}>
            <span className="p-input-icon-left">
              <AutoComplete placeholder="Search"
                onChange={(e) => { setSelectedMovie(e.value), console.log(selectedMovie) }}
                suggestions={filteredMovies}
                value={selectedMovie}
                completeMethod={suggest} itemTemplate={suggestTemplate}
                field="name" pt={{
                  input: { root: { className: 'w-8rem sm:w-16rem md:w-18rem lg:w-20rem' } },
                }} />
            </span>
            <Button label="Search" rounded className='ml-2'
              style={{ backgroundImage: "linear-gradient(to right, #4880EC, #019CAD)" }}
              type="submit" />
          </form>
          </div>
          <div className='ml-auto mr-5 col-2 flex justify-content-center align-items-center'>
          {userLoading ? null : !user ? (
            <Button label="Login" severity="primary" rounded onClick={handleSignIn}/>
            ) : (
              <div className='card'>
                <h4 className='text-primary'>Welcome, {user.displayName}</h4>
                <Button label="Sign out" severity="secondary" rounded onClick={handleSignOut}/>
              </div>
            )}
          </div>


      </div>
      <br></br>
      <div>
        <div className='w-screen z-1' style={{ marginTop: "8rem" }}>
          <DataView layout="grid" value={movies.filter(function movieFilter(movie) {
            return movie.title.toLowerCase().includes(filter.toLowerCase());
          })} itemTemplate={itemTemplate} paginator rows={10} />
        </div>
      </div>
    </main>

  )

}
