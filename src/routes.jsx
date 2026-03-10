import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";

export const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >
        <Route path="/" element={<Home />} />
        {/* Ruta ajustada para recibir tipo (people/planets/vehicles) e ID */}
        <Route path="/single/:type/:theId" element={<Single />} />
      </Route>
    )
);