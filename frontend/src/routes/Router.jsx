import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Layout from "./Layout";
import EditApi from "../pages/EditApi/EditApi";


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout/>} >
            <Route path="/" element={<Home/>} />
            <Route path="/edit/:apiId/:apiName" element={<EditApi/>} />
        </Route>
    )
)

export default router;