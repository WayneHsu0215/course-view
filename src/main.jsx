import React, { useEffect, useContext } from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter, Route,
    RouterProvider, Routes,
    Navigate,
} from "react-router-dom";

import './index.css'
import {BrowserRouter} from 'react-router-dom';
import Ntunhssu  from "./routes/ntunhssu.jsx";
const App = () => {



    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/ntunhssu"/>}/>
                <Route path="/ntunhssu" element={<Ntunhssu />}/>

            </Routes>
        </BrowserRouter>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>

            <App />
    </React.StrictMode>,
    document.getElementById('root')
);
