import AddEmployee from "../pages/Dashboard/Admin/AddEmployee.jsx";
import React from "react";
import localAdmin from "./localAdmin.jsx";
import AddAdmin from "../pages/Dashboard/Admin/AddAdmin.jsx";
import Branches from "../pages/Dashboard/Admin/Branches.jsx";
import HomePage from "../pages/Dashboard/Admin/HomePage.jsx";
import ChangePassword from "../pages/Dashboard/Admin/ChangePassword.jsx";
import {baseUrl, getToken} from "../helper/tools.jsx";

export default {
    routes : [
        {
            label : "HOME",
            path : "/home",
            element : <HomePage />
        },
        {
            label: "Change Password",
            path: "/change-password",
            element: <ChangePassword />
        },
        {
          label: "Add Admin",
          path: "/add-admin",
          element: <AddAdmin />
        },
        {
            label: "Add Employee",
            path: "/add-employee",
            element: <AddEmployee/>
        },
        {
            label: "Branches",
            path: "/branches",
            element: <Branches/>
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
        ...localAdmin.hiddenRoutes,
    ]
}
