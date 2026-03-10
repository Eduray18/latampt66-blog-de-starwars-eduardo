import React from "react";
import { useParams, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Single = () => {
  const { store } = useGlobalReducer();
  const { type, theId } = useParams();

  const listName = type === "people" ? "people" : type === "planets" ? "planets" : "vehicles";
  const item = store[listName]?.find(i => i.uid === theId);

  if (!item) return <div className="container text-center mt-5"><h1>Loading...</h1></div>;

  return (
    <div className="container mt-5">
      <div className="row d-flex align-items-center mb-5">
        <div className="col-md-6">
          <img 
            src={`https://starwars-visualguide.com/assets/img/${type === "people" ? "characters" : type}/${theId}.jpg`} 
            className="img-fluid rounded" 
            alt={item.name}
            onError={(e) => { e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg"; }}
          />
        </div>
        <div className="col-md-6 text-center">
          <h1 className="display-4 fw-bold">{item.name}</h1>
          <p className="lead mt-4">A long time ago in a galaxy far, far away... Descubre todo sobre {item.name}.</p>
        </div>
      </div>

      <hr className="border-danger border-2 mb-4" />

      <div className="row text-danger text-center fw-bold small">
        <div className="col border-end border-danger">Name<br/><span className="text-dark fw-normal">{item.name}</span></div>
        {type === "people" && (
          <>
            <div className="col border-end border-danger">Birth Year<br/><span className="text-dark fw-normal">{item.birth_year}</span></div>
            <div className="col border-end border-danger">Gender<br/><span className="text-dark fw-normal">{item.gender}</span></div>
            <div className="col">Height<br/><span className="text-dark fw-normal">{item.height}</span></div>
          </>
        )}
        {type === "planets" && (
          <>
            <div className="col border-end border-danger">Climate<br/><span className="text-dark fw-normal">{item.climate}</span></div>
            <div className="col border-end border-danger">Population<br/><span className="text-dark fw-normal">{item.population}</span></div>
            <div className="col">Diameter<br/><span className="text-dark fw-normal">{item.diameter}</span></div>
          </>
        )}
        {type === "vehicles" && (
          <>
            <div className="col border-end border-danger">Model<br/><span className="text-dark fw-normal">{item.model}</span></div>
            <div className="col border-end border-danger">Class<br/><span className="text-dark fw-normal">{item.vehicle_class}</span></div>
            <div className="col">Length<br/><span className="text-dark fw-normal">{item.length}</span></div>
          </>
        )}
      </div>

      <div className="text-center mt-5 pb-5">
        <Link to="/" className="btn btn-primary btn-lg">Back home</Link>
      </div>
    </div>
  );
};