import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import darkMode from '../App';





export const API_KEY = "162189a807c34986a737e89ba0957529";

export const BASE_URL = "https://api.themoviedb.org/3";



// popular card


const MovieApi = ({ category,searchQuery }) => {

  

  // 1

  const [movies, setMovies] = useState([]);


useEffect(() => {

  const fetchMovies = async () => {

    try {

      let url = "";

      if (searchQuery.trim().length >= 3) {

        url =
          `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${searchQuery}`;

      } else {

        url =
           `${BASE_URL}/${category.endpoint}?api_key=${API_KEY}`

      }

      let results = await fetch(url);

      let parsedResults = await results.json();

      setMovies(parsedResults.results);

    } catch (error) {

      console.error("Error fetching movies:", error);

    }

  };

  fetchMovies();

}, [category, searchQuery]);

const mediaType = category?.endpoint?.includes("tv")
  ? "tv"
  : "movie";

 return (
  <>
    <div className="container">

      <h2 className="text-center my-4">{category?.title}</h2>

      <div className="row">

        {movies.map((card) => (
          <div
            className="col-lg-3 col-md-4 col-sm-6 mb-4"
            key={card.id}
          >
            <Card
              id={card.id}
              mediaType={card.media_type || mediaType}
              title={
                mediaType === "tv"
                  ? (card.original_name || card.name)
                  : card.title
              }
              overview={card.overview}
              image={`https://image.tmdb.org/t/p/w500${card.poster_path}`}
              darkMode={darkMode}
            />
          </div>
        ))}

      </div>

    </div>
  </>
);
};
export default MovieApi;

// 1








// const movieApi = () => {
//   return (
//     <div>

// export const getTrendingMovies = () =>
//       fetch(
//       `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
//       );

// export const getPopularMovies = () =>
//       fetch(
//       `${BASE_URL}/movie/popular?api_key=${API_KEY}`
//       );

// export const getNowPlayingMovies = () =>
//       fetch(
//       `${BASE_URL}/movie/now_playing?api_key=${API_KEY}`
//       );

// export const searchMovies = (query) =>
//       fetch(
//       `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
//       );

// export const getMovieDetails = (id) =>
//       fetch(
//       `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
//       );
//     </div>
//   )
// }

// export default movieApi

