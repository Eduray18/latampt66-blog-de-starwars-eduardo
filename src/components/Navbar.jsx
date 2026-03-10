import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();

  return (
    <nav className="navbar navbar-light bg-light mb-3 px-5">
      <Link to="/">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Star_Wars_Logo.svg" 
          alt="Star Wars Logo" 
          style={{ width: "80px" }} 
        />
      </Link>
      <div className="ml-auto">
        <div className="dropdown">
          <button 
            className="btn btn-primary dropdown-toggle" 
            type="button" 
            id="dropdownMenuButton" 
            data-bs-toggle="dropdown" 
            aria-expanded="false"
          >
            Favorites <span className="badge bg-secondary">{store.favorites.length}</span>
          </button>
          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
            {store.favorites.length === 0 ? (
              <li className="dropdown-item text-center">(empty)</li>
            ) : (
              store.favorites.map((fav, index) => (
                <li key={index} className="dropdown-item d-flex justify-content-between align-items-center">
                  <span>{fav}</span>
                  <i 
                    className="fa-solid fa-trash ms-2 text-danger" 
                    style={{ cursor: "pointer" }}
                    onClick={() => dispatch({ type: "delete_favorite", payload: fav })}
                  ></i>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};