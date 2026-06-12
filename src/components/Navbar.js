import React ,{useState} from 'react'

import { Link } from 'react-router-dom';


import { BASE_URL, API_KEY } from '../Services/MovieService'





const Navbar = ({  setCategory,
  searchQuery,
  setSearchQuery,
darkMode,
  setDarkMode }) => {

  const [searchResults, setSearchResults] = useState([]);


    const handleSearch = async (e) => {

  const value = e.target.value;

  setSearchQuery(value);

  if (value.length < 3){
    setSearchResults([]);
    return;
  }

  const response = await fetch(
    `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${value}`
  );

  const data = await response.json();

  setSearchResults(data.results);
};

  return (
    <>
   <div>

<nav className={`navbar navbar-expand-lg ${
    darkMode
      ? "navbar-dark bg-dark"
      : "navbar-light bg-light"
  }`}
>
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">
  <img 
  // src="/logo-light.svg"
    src={darkMode ? "/logo-dark.png" : "/logo-light.png"}
    alt="Streamers"
  //    style={{
  //   // height: darkMode ? "60px" : "55px",
  //   width: "auto",
  //   display: "block"
  // }}
    height="50"
    //  height={darkMode ? "192" : "50"}
     className="logo"
  />
</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarScroll">
      <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style={{ '--bs-scroll-height': '100px' }}>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">
            Home
          </Link>
        </li>
        {/* <li className="nav-item">
          <Link className="nav-link" to="/link">
            Link
          </Link>
        </li> */}
        <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="true">
            Movies
          </Link>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" to="#" onClick={() => setCategory?.({ endpoint: "movie/popular", title: "Popular Movies" })}>Popular</Link></li>
            <li><Link className="dropdown-item" to="#" onClick={() => setCategory?.({ endpoint: "movie/now_playing", title: "Now Playing" })}>Now Playing</Link></li>
            <li><hr className="dropdown-divider" /></li>
            <li><Link className="dropdown-item" to="#" onClick={() => setCategory?.({ endpoint: "movie/upcoming", title: "Upcoming" })}>Upcoming</Link></li>
          </ul>
        </li>
        <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Series
          </Link>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" to="#" onClick={() => setCategory?.({ endpoint: "discover/tv", title: "TV Shows" })}>TV</Link></li>
            <li><Link className="dropdown-item" to="#" onClick={() => setCategory?.({ endpoint: "tv/airing_today", title: "Airing Today" })}>Airing Today</Link></li>
            <li><hr className="dropdown-divider" /></li>
            <li><Link className="dropdown-item" to="#" onClick={() => setCategory?.({ endpoint: "tv/on_the_air", title: "On TV" })}>On TV</Link></li>
          </ul>
        </li>
      </ul>
      <form className="d-flex" role="search">
        <div className="position-relative"></div>
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"   value={searchQuery}
 onChange={handleSearch}/>

 <div className="position-absolute bg-dark w-100 mt-5" style={{ zIndex: 2 }}>

  {searchResults.slice(0,5).map((item) => (

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
  {item.release_date?.slice(0,4) ||
   item.first_air_date?.slice(0,4)}
</small>

        </div>

      </div>

    </Link>

))}

</div>
        <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
        <button
  className="btn btn-secondary ms-2"
  onClick={() => setDarkMode(!darkMode)}
>
  {darkMode ? "☀️ Light" : "🌙 Dark"}
</button>

    </div>
  </div>
</nav>
</div>
</>

)
}
     
     
     
export default Navbar