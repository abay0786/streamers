import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from "./Navbar";


const API_KEY = "162189a807c34986a737e89ba0957529";
const BASE_URL = "https://api.themoviedb.org/3";

const Details =  ({ darkMode, setDarkMode }) => {

  const { id,type } = useParams();

  const [searchQuery, setSearchQuery] = useState("");
const [category, setCategory] = useState("");

 const playerUrl =
  type === "tv"
    ? `https://flickystream.su/player/tv/${id}/1/1`
    : `https://flickystream.su/player/movie/${id}`;


    const handlePlay = () => {
  window.open(playerUrl, "_blank");
};

  console.log(id);

  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);

  useEffect(() => {

    const fetchMovie = async () => {

      try {

        const response = await fetch(
          `${BASE_URL}/${type}/${id}?api_key=${API_KEY}`
        );

        const data = await response.json();

        setMovie(data);

      } catch (error) {
        console.log(error);
      }
    };

    fetchMovie();

  }, [id, type]);

  if (!movie) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border"></div>
      </div>
    );
  }


  return (
    <>
            <Navbar setCategory={setCategory} 
            searchQuery={searchQuery}
  setSearchQuery={setSearchQuery}
  darkMode={darkMode}
                  setDarkMode={setDarkMode}/>

      {/* Hero Banner */}
      <div
        style={{
            minHeight: "60vh",
            // padding: "40px 0",
          backgroundImage: `linear-gradient(
            rgba(0,0,0,.6),
            rgba(0,0,0,.9)
          ),
          url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="container py-5 text-white">

          <button
            className="btn btn-light mb-4"
            onClick={() => navigate(-1)}
          >
            <i className="bi bi-arrow-left"></i> Back
          </button>

          <div className="row align-items-center">

            <div className="col-md-4 text-center">

              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="img-fluid rounded shadow-lg"
                style={{ maxHeight: "388px" }}
              />

            </div>

            <div className="col-md-8">

              <h1 className="display-5 fw-bold">
                {movie.title}
              </h1>

              <div className="my-3">

                <span className="badge bg-success me-2">
                  ⭐ {movie.vote_average}
                </span>

                <span className="badge bg-danger me-2">
                  {movie.release_date}
                </span>

                <span className="badge bg-warning text-dark">
                  {movie.vote_count} Votes
                </span>

              </div>

              <p className="lead">
                {movie.overview}
              </p>

              <div className="my-4">

                {movie.genres?.map((genre) => (
                  <span
                    key={genre.id}
                    className="badge bg-secondary me-2 p-2"
                  >
                    {genre.name}
                  </span>
                ))}

              </div>

              <button className="btn btn-danger btn-lg me-3"   onClick={handlePlay}>
                <i className="bi bi-play-fill"></i>
                Play
              </button>

              <button className="btn btn-outline-light btn-lg">
                <i className="bi bi-plus-lg"></i>
                My List
              </button>

            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Details