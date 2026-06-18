// ======================
// Imports
// ======================

import React, { useEffect, useState } from "react";

import { API_KEY, BASE_URL } from "../Services/MovieService";

import "./Carousel2.css";


// ======================
// Carousel Component
// ======================

const Carousel = () => {

  // ======================
  // State Management
  // ======================

  const [slides, setSlides] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // ======================
  // Fetch Trending Movies
  // ======================

  useEffect(() => {

    const fetchSlides = async () => {

      try {

        const response = await fetch(
          `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
        );

        const data = await response.json();

        setSlides(data.results.slice(0, 5));

      } catch (error) {
        console.log(error);
      }
    };

    fetchSlides();

  }, []);

  // ======================
  // Auto Slide Every 5 Seconds
  // ======================

  useEffect(() => {

    const interval = setInterval(() => {

      setActiveIndex((prev) =>
        slides.length
          ? (prev + 1) % slides.length
          : 0
      );

    }, 5000);

    return () => clearInterval(interval);

  }, [slides]);

  // ======================
  // Loading State
  // ======================

  if (!slides.length) return null;

  // ======================
  // Render UI
  // ======================

  return (
    <div
      className="position-relative"
      style={{
        height: "80vh",
        overflow: "hidden",
      }}
    >

      {/* ======================
          Background Image
      ====================== */}

      <img
        key={slides[activeIndex].id}
        src={`https://image.tmdb.org/t/p/original${slides[activeIndex].backdrop_path}`}
        alt={slides[activeIndex].title}
        className="carousel-image"
      />

      {/* ======================
          Dark Overlay
      ====================== */}

      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,.95), rgba(0,0,0,.2))",
        }}
      >

        <div className="container h-100 d-flex align-items-end pb-5">

          <div className="text-white">

            {/* Movie Title */}

            <h1
              key={`title-${slides[activeIndex].id}`}
              className="display-3 fw-bold hero-title"
            >
              {slides[activeIndex].title}
            </h1>

            {/* Movie Overview */}

            <p
              key={`overview-${slides[activeIndex].id}`}
              className="hero-overview"
            >
              {slides[activeIndex].overview}
            </p>

            {/* Action Buttons */}

            <div
              key={`buttons-${slides[activeIndex].id}`}
              className="hero-buttons"
            >

              <button className="btn btn-light btn-lg me-3">
                ▶ Play
              </button>

              <button className="btn btn-outline-light btn-lg">
                More Info
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* ======================
          Previous Button
      ====================== */}

      <button
        className="carousel-nav left"
        onClick={() =>
          setActiveIndex(
            activeIndex === 0
              ? slides.length - 1
              : activeIndex - 1
          )
        }
      >
        ❮
      </button>

      {/* ======================
          Next Button
      ====================== */}

      <button
        className="carousel-nav right"
        onClick={() =>
          setActiveIndex(
            activeIndex === slides.length - 1
              ? 0
              : activeIndex + 1
          )
        }
      >
        ❯
      </button>

      {/* ======================
          Slide Indicators
      ====================== */}

      <div className="carousel-dots">

        {slides.map((_, index) => (

          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={
              activeIndex === index
                ? "dot active-dot"
                : "dot"
            }
          />

        ))}

      </div>

    </div>
  );
};

export default Carousel;