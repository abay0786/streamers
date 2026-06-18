
// ======================
// Imports
// ======================

import React from 'react'

import { Link } from "react-router-dom";

// import "bootstrap-icons/font/bootstrap-icons.css";


// ======================
// Card Component
// ======================

const Card = ({
  image,
  id,
  mediaType,
  title,
  overview,
  darkMode,
}) => {

  // ======================
  // Render UI
  // ======================

  return (

    <div
      className={`card h-100 ${
        darkMode
          ? "bg-dark text-white"
          : ""
      }`}
    >

      {/* ======================
          Movie / TV Poster
      ====================== */}

      <img
        src={image}
        className="card-img-top"
        alt={title}
        style={{
          height: "350px",
          objectFit: "cover",
        }}
      />

      {/* ======================
          Card Content
      ====================== */}

      <div className="card-body d-flex flex-column">

        {/* Title */}

        <h5 className="card-title">
          {title}
        </h5>

        {/* Overview */}

        <p
          className="card-text"
          style={{
            height: "90px",
            overflow: "hidden",
          }}
        >
          {overview
            ? overview
                .split(" ")
                .slice(0, 15)
                .join(" ") + "..."
            : "No description available"}
        </p>

        {/* Details Button */}

        <Link
          to={`/details/${mediaType}/${id}`}
          className="btn btn-primary mt-auto align-self-start"
        >
          Details
        </Link>

      </div>

    </div>
  );
};

export default Card;
