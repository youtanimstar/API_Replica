import { createBrowserRouter, createRoutesFromElements, Outlet, Route } from "react-router-dom";
import Home from "../pages/home/Home";


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Outlet/>} >
            <Route path="/" element={<Home/>} />
        </Route>
    )
)

export default router;