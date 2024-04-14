import React, {useEffect} from 'react';
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {baseUrl, getRoutes, getToken} from "../../helper/tools.jsx";
const MainDashboard = () => {

    const navigate = useNavigate();

    useEffect(() => {
        if (getToken() === "") {
            localStorage.clear();
            navigate("/")
        }
    }, []);

    return (
        <Routes>
            <Route index element={<Navigate to={`/dashboard${getRoutes()[0].path}`} replace />} />
            {getRoutes().map(r => <Route key={r.path} path={r.path} element={r.element} />)}
            {/*<Route path='/dashboard/branches' element={<Branches/>}/>*/}
        </Routes>
    );
};

export default MainDashboard;
