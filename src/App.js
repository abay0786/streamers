// ======================
// Imports
// ======================

import './App.css';

import { useState, useEffect } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Caroulsel2 from './components/Carousel2';
import Details from './components/Details';

import MovieApi from './Services/MovieService';


// ======================
// App Component
// ======================

function App() {

  // ======================
  // Theme State
  // Load saved theme from localStorage
  // ======================

  const [darkMode, setDarkMode] = useState(() => {

    const savedTheme =
      localStorage.getItem("darkMode");

    return savedTheme
      ? JSON.parse(savedTheme)
      : false;

  });

  // ======================
  // Search State
  // Used by Navbar & MovieService
  // ======================

  const [searchQuery, setSearchQuery] = useState("");

  // ======================
  // Category State
  // Default page = Popular Movies
  // ======================

  const [category, setCategory] = useState({
    endpoint: "movie/popular",
    title: "Popular Movies"
  });

  // ======================
  // Save Theme Preference
  // Runs whenever darkMode changes
  // ======================

  useEffect(() => {

    localStorage.setItem(
      "darkMode",
      JSON.stringify(darkMode)
    );

  }, [darkMode]);

  // ======================
  // Render UI
  // ======================

  return (

    <div
      className={
        darkMode
          ? "dark-theme"
          : "light-theme"
      }
    >

      <BrowserRouter>

        <Routes>

          {/* ======================
              Home Page
          ====================== */}

          <Route
            path="/"
            element={
              <>
                {/* Navigation */}

                <Navbar
                  setCategory={setCategory}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  darkMode={darkMode}
                  setDarkMode={setDarkMode}
                />

                {/* Hero Carousel */}

                <Caroulsel2 />

                {/* Movie Grid */}

                {category && (

                  <MovieApi
                    category={category}
                    searchQuery={searchQuery}
                    darkMode={darkMode}
                  />

                )}

              </>
            }
          />

          {/* ======================
              Details Page
          ====================== */}

          <Route
            path="/details/:type/:id"
            element={
              <Details
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            }
          />

        </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;