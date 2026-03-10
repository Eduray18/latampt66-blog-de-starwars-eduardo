import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    const fetchData = async (endpoint) => {
      try {
        const res = await fetch(`https://www.swapi.tech/api/${endpoint}`);
        const data = await res.json();
        const detailedData = await Promise.all(
          data.results.map(async (item) => {
            const detailRes = await fetch(item.url);
            const detailData = await detailRes.json();
            return { ...item, ...detailData.result.properties };
          })
        );
        dispatch({ type: `set_${endpoint}`, payload: detailedData });
      } catch (err) { console.error(err); }
    };
    ["people", "planets", "vehicles"].forEach(endpoint => fetchData(endpoint));
  }, []);

  const renderSection = (title, data, type) => (
    <div className="my-5">
      <h1 className="text-danger mb-4">{title}</h1>
      <div className="d-flex flex-row flex-nowrap overflow-auto pb-4" style={{ gap: "1rem" }}>
        {data?.map((item) => (
          <div key={item.uid} className="card m-2 bg-dark text-light border-secondary" style={{ minWidth: "18rem", maxWidth: "18rem" }}>
            <img 
              // Intentamos cargar la imagen oficial
              src={`https://starwars-visualguide.com/assets/img/${type === "people" ? "characters" : type}/${item.uid}.jpg`} 
              className="card-img-top" 
              alt={item.name} 
              style={{ height: "250px", objectFit: "cover" }}
              // Si falla, usamos un generador de placeholders que incluye el nombre
              onError={(e) => { 
                e.target.onerror = null; 
                e.target.src = `https://placehold.co/400x250/212529/white?text=${item.name.replace(/ /g, '+')}`; 
              }}
            />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title text-truncate">{item.name}</h5>
              <div className="card-text small mb-3 flex-grow-1">
                {type === "people" && <p className="m-0 text-secondary">Gender: {item.gender}<br/>Eye Color: {item.eye_color}</p>}
                {type === "planets" && <p className="m-0 text-secondary">Population: {item.population}<br/>Terrain: {item.terrain}</p>}
                {type === "vehicles" && <p className="m-0 text-secondary">Model: {item.model}<br/>Class: {item.vehicle_class}</p>}
              </div>
              <div className="d-flex justify-content-between align-items-center mt-auto">
                <Link to={`/single/${type}/${item.uid}`} className="btn btn-outline-primary">Learn more!</Link>
                <button 
                  className="btn btn-outline-warning" 
                  onClick={() => dispatch({ type: "add_favorite", payload: item.name })}
                >
                  <i className={store.favorites.includes(item.name) ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="container mt-3">
      {renderSection("Characters", store.people, "people")}
      {renderSection("Planets", store.planets, "planets")}
      {renderSection("Vehicles", store.vehicles, "vehicles")}
    </div>
  );
};