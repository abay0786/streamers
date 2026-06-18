
// ======================
// Imports
// ======================

import React, { useState } from "react";
import { Link } from "react-router-dom";

import { BASE_URL, API_KEY } from "../Services/MovieService";


// ======================
// Navbar Component
// ======================

const Navbar = ({
  setCategory,
  searchQuery,
  setSearchQuery,
  darkMode,
  setDarkMode,
}) => {

  // ======================
  // Search State
  // ======================

  const [searchResults, setSearchResults] = useState([]);

  // ======================
  // Search Functionality
  // ======================

  const handleSearch = async (e) => {
    const value = e.target.value;

    setSearchQuery(value);

    // Clear results if search query is too short
    if (value.length < 3) {
      setSearchResults([]);
      return;
    }

    const response = await fetch(
      `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${value}`
    );

    const data = await response.json();

    setSearchResults(data.results);
  };

  // ======================
  // Render UI
  // ======================

  return (
    <nav
      className={`navbar navbar-expand-lg ${
        darkMode
          ? "navbar-dark bg-dark"
          : "navbar-light bg-light"
      }`}
    >
      <div className="container-fluid">

        {/* ======================
            Website Logo
        ====================== */}

        <Link className="navbar-brand" to="/">
          <img
            src={
              darkMode
                ? "/logo-dark.png"
                : "/logo-light.png"
            }
            alt="Streamers"
            height="50"
            className="logo"
          />
        </Link>

        {/* ======================
            Mobile Theme Toggle
        ====================== */}

        <button
          className="btn btn-secondary theme-toggle-mobile"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        {/* ======================
            Mobile Navbar Toggler
        ====================== */}

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* ======================
            Collapsible Navbar
        ====================== */}

        <div
          className="collapse navbar-collapse"
          id="navbarScroll"
        >

          {/* ======================
              Navigation Links
          ====================== */}

          <ul
            className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
            style={{
              "--bs-scroll-height": "100px",
            }}
          >
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>

            {/* ======================
                Movies Dropdown
            ====================== */}

            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                Movies
              </Link>

              <ul className="dropdown-menu">

                <li>
                  <Link
                    className="dropdown-item"
                    to="#"
                    onClick={() =>
                      setCategory?.({
                        endpoint: "movie/popular",
                        title: "Popular Movies",
                      })
                    }
                  >
                    Popular
                  </Link>
                </li>

                <li>
                  <Link
                    className="dropdown-item"
                    to="#"
                    onClick={() =>
                      setCategory?.({
                        endpoint: "movie/now_playing",
                        title: "Now Playing",
                      })
                    }
                  >
                    Now Playing
                  </Link>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <Link
                    className="dropdown-item"
                    to="#"
                    onClick={() =>
                      setCategory?.({
                        endpoint: "movie/upcoming",
                        title: "Upcoming",
                      })
                    }
                  >
                    Upcoming
                  </Link>
                </li>

              </ul>
            </li>

            {/* ======================
                Series Dropdown
            ====================== */}

            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                Series
              </Link>

              <ul className="dropdown-menu">

                <li>
                  <Link
                    className="dropdown-item"
                    to="#"
                    onClick={() =>
                      setCategory?.({
                        endpoint: "discover/tv",
                        title: "TV Shows",
                      })
                    }
                  >
                    TV
                  </Link>
                </li>

                <li>
                  <Link
                    className="dropdown-item"
                    to="#"
                    onClick={() =>
                      setCategory?.({
                        endpoint: "tv/airing_today",
                        title: "Airing Today",
                      })
                    }
                  >
                    Airing Today
                  </Link>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <Link
                    className="dropdown-item"
                    to="#"
                    onClick={() =>
                      setCategory?.({
                        endpoint: "tv/on_the_air",
                        title: "On TV",
                      })
                    }
                  >
                    On TV
                  </Link>
                </li>

              </ul>
            </li>
          </ul>

          {/* ======================
              Search + Theme Controls
          ====================== */}

          <div className="mobile-controls">

            {/* Search Form */}

            <form
              className="d-flex search-form"
              role="search"
            >
              <div className="position-relative">

                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={searchQuery}
                  onChange={handleSearch}
                />

                {/* Search Suggestions */}

                <div
                  className="position-absolute bg-dark w-100 mt-3"
                  style={{ zIndex: 2 }}
                >
                  {searchResults
                    .slice(0, 5)
                    .map((item) => (
                      <Link
                        key={item.id}
                        to={`/details/${item.media_type}/${item.id}`}
                        className="text-decoration-none text-white"
                        onClick={() => {
                          setSearchResults([]);
                          setSearchQuery("");
                        }}
                      >
                        <div className="d-flex p-2">

                          <img
                            src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
                            width="50"
                            alt=""
                          />

                          <div className="ms-2">

                            <h6 className="mb-0">
                              {item.title || item.name}
                            </h6>

                            <small className="text-warning">
                              ⭐ {item.vote_average?.toFixed(1)}
                            </small>

                            <br />

                            <small className="text-secondary">
                              {item.release_date?.slice(0, 4) ||
                                item.first_air_date?.slice(0, 4)}
                            </small>

                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>

              <button
                className="btn btn-outline-success"
                type="submit"
              >
                Search
              </button>
            </form>

            {/* Desktop Theme Toggle */}

            <button
              className="btn btn-secondary ms-2 theme-toggle"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode
                ? "☀️ Light"
                : "🌙 Dark"}
            </button>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;