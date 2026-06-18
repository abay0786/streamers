

import { Link } from 'react-router-dom'

import 'bootstrap-icons/font/bootstrap-icons.css';


const Card = ({ image, id, mediaType, title, overview, darkMode }) => {
  return (
    <>

      {/* <h2>Trending</h2> */}
      <div className={`card h-100 ${ darkMode ? "bg-dark text-white" : "" }}`}>

  <img
    src={image}
    className="card-img-top"
    alt={title}
    style={{
      height: "350px",
      objectFit: "cover"
    }}
  />

  <div className="card-body d-flex flex-column">

    <h5 className="card-title">
      {title}
    </h5>

    <p
      className="card-text"
      style={{
        height: "90px",
        overflow: "hidden"
      }}
    >
        {overview
        ? overview.split(" ").slice(0, 15).join(" ") + "..."
        : "No description available"}
    </p>

    <Link
      to={`/details/${mediaType}/${id}`}
      className="btn btn-primary mt-auto align-self-start"
    >
      Details
    </Link>

  </div>

</div>



    </>
  )
}

export default Card


