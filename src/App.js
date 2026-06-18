// ======================
// Imports
// ======================

import './App.css';

import { useState, useEffect, lazy, Suspense } from 'react'; // Added lazy and Suspense

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Caroulsel2 from './components/Carousel2';
import MovieApi from './Services/MovieService';

// ======================
// Lazy Loaded Components
// ======================
// This will split the Details page into a separate bundle file downloaded only when clicked
const Details = lazy(() => import('./components/Details'));


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

  });

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

        {/* Wrap your Routes inside Suspense to provide a fallback UI while lazy components load */}
        <Suspense fallback={<div className="loading-fallback">Loading page...</div>}>
          
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

        </Suspense>

      </BrowserRouter>

    </div>
  );
}

export default App;