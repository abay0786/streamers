

// ======================
// Imports
// ======================

import React, { useState, useEffect } from "react";

import Card from "../components/Card";


// ======================
// TMDB API Configuration
// ======================

export const API_KEY =
  "162189a807c34986a737e89ba0957529";

export const BASE_URL =
  "https://api.themoviedb.org/3";


// ======================
// Movie API Component
// ======================

const MovieApi = ({
  category,
  searchQuery,
  darkMode,
}) => {

  // ======================
  // State Management
  // ======================

  const [movies, setMovies] = useState([]);

  // ======================
  // Fetch Movies / TV Shows
  // ======================

  useEffect(() => {

    const fetchMovies = async () => {

      try {

        let url = "";

        // Search Results

        if (searchQuery.trim().length >= 3) {

          url =
            `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${searchQuery}`;

        }

        // Category Results

        else {

          url =
            `${BASE_URL}/${category.endpoint}?api_key=${API_KEY}`;

        }

        const response = await fetch(url);

        const data = await response.json();

        setMovies(data.results || []);

      } catch (error) {

        console.error(
          "Error fetching movies:",
          error
        );

      }

    };

    fetchMovies();

  }, [category, searchQuery]);

  // ======================
  // Determine Media Type
  // ======================

  const mediaType =
    category?.endpoint?.includes("tv")
      ? "tv"
      : "movie";

  // ======================
  // Render UI
  // ======================

  return (
    <div className="container">

      {/* Section Heading */}

      <h2 className="text-center my-4">
        {category?.title}
      </h2>

      {/* Movie Grid */}

      <div className="row">

        {movies.map((card) => (

          <div
            key={card.id}
            className="col-lg-3 col-md-4 col-sm-6 mb-4"
          >

            <Card
              id={card.id}

              mediaType={
                card.media_type || mediaType
              }

              title={
                mediaType === "tv"
                  ? (
                      card.original_name ||
                      card.name
                    )
                  : card.title
              }

              overview={card.overview}

              image={
                card.poster_path
                  ? `https://image.tmdb.org/t/p/w500${card.poster_path}`
                  : "/no-image.png"
              }

              darkMode={darkMode}
            />

          </div>

        ))}

      </div>

    </div>
  );
};

export default MovieApi;

