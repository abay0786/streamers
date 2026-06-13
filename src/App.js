import logo from './logo.svg';
import './App.css';

import Navbar from './components/Navbar';
import MovieApi from './Services/MovieService';

import Caroulsel2 from './components/Carousel2';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Details from './components/Details';


import { useState,useEffect } from 'react';

function App() {


  // const [darkMode, setDarkMode] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
  const savedTheme = localStorage.getItem("darkMode");
  return savedTheme ? JSON.parse(savedTheme) : false;
  });

  const [searchQuery, setSearchQuery] = useState("");

const [category, setCategory] = useState({
  endpoint: "movie/popular",
  title: "Popular Movies"
});

 // local storage for darkmode
  useEffect(() => {
    localStorage.setItem(
      "darkMode",
      JSON.stringify(darkMode)
    );
  }, [darkMode]);

  return (


    < div className={darkMode ? "dark-theme" : "light-theme"}>
  <BrowserRouter>

    <Routes>

      <Route
        path="/"
        element={
          <>
            <Navbar setCategory={setCategory} 
            searchQuery={searchQuery}
  setSearchQuery={setSearchQuery}
  darkMode={darkMode}
                  setDarkMode={setDarkMode}
/>

            {/* <Carousel /> */}
            <Caroulsel2 />

            {category && (
              <MovieApi category={category} 
              searchQuery={searchQuery}/>
            )}
          </>
        }
      />

      <Route
        path="/details/:type/:id"
        element={<Details darkMode={darkMode}
                setDarkMode={setDarkMode}/>}
      />

    </Routes>

  </BrowserRouter>
  </div>
);
}

export default App;
