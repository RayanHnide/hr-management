import HomePage from "../pages/Dashboard/Admin/HomePage.jsx";
import React from "react";
import ChangePassword from "../pages/Dashboard/Admin/ChangePassword.jsx";
import ViewDetails from "../pages/Dashboard/Admin/ViewDetails.jsx";
import AddEmployee from "../pages/Dashboard/Admin/AddEmployee.jsx";
import {baseUrl, getToken} from "../helper/tools.jsx";

export default {
    routes : [
        {
            label : "HOME",
            path : "/home",
            element : <HomePage />
        },
        {
            label: "Add Employee",
            path: "/add-employee",
            element: <AddEmployee hideBranches />
        },
        {
            label: "Change Password",
            path: "/change-password",
            element: <ChangePassword />
        },
        {
            label: "Logout",
            onClick: () => {
                axios.post(baseUrl("/logout"),{},{
                    headers:{
                        Authorization:getToken()
                    }
                })
                localStorage.clear();
                window.location.href = baseUrl()
            }
        },
    ],
    hiddenRoutes : [
        {
            path: "/user/:id",
            element: <ViewDetails/>
        },


    ]
}
