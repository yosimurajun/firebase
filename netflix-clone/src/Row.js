import React, { useState, useEffect } from 'react';
import axios from './axios';
import './Row.css';
import Youtube from 'react-youtube';
import movieTrailer from'movie-trailer';

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState('');

    //  fetch
    useEffect(() => {
        // if [], run once when the row loads, and dont run again
        //if [something] something change, run again
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }

        fetchData();

    }, [fetchUrl]);

    
    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,

        }
    }

    const handleClick = (movie) => {
        if(trailerUrl) {
            setTrailerUrl('');
        } else {
            movieTrailer(movie?.name || movie?.original_title || '')
            .then(url => {
                const urlParams = new URLSearchParams(new URL(url).search);
                // console.log(urlParams.get('v'));
                setTrailerUrl(urlParams.get('v'));
                
            }).catch(error => console.log(error));
        }
    }
    return (
        <div className="row">
            {/* row title */}
            <h2>{title}</h2>

            {/* row poster */}
            <div className="row__posters">
                {movies.map(movie => (
                    <img 
                    onClick={() => handleClick(movie)}
                    key={movie.id}
                    className={`row__poster ${isLargeRow && "row__posterLarger"}`}
                    src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} />
                ))}
            </div>
            {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Row;
