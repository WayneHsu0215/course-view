import React, { useEffect, useContext } from 'react'
import ReactDOM, {createRoot} from 'react-dom/client'
import {
    createBrowserRouter, Route,
    RouterProvider, Routes,
    Navigate,
} from "react-router-dom";

import './index.css'
import {BrowserRouter} from 'react-router-dom';
import Ntunhssu  from "./routes/ntunhssu.jsx";
import Login from './routes//login.jsx';
import {AuthProvider} from "./routes/AuthContext.jsx";
import Manage1 from './routes/manage-part1.jsx';

const App = () => {



    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/ntunhssu"/>}/>
                <Route path="/ntunhssu" element={<Ntunhssu />}/>
                <Route path="/login" element={<Login />} />
                <Route path="/manage1" element={<Manage1 />} />

            </Routes>
        </BrowserRouter>
    );
};

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
    <React.StrictMode>
        <AuthProvider>

                <App />

        </AuthProvider>
    </React.StrictMode>
);
