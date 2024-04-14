import mainBranchAdmin from "../menu/mainBranchAdmin.jsx";
import localAdmin from "../menu/localAdmin.jsx";
import React from "react";

//TODO Fourth Step
// const schema = "https";
// const host = "te.cmpo-ns.com";
// const port = "443";
const schema = "http";
const host = "localhost";
const port = "8000";
export const baseUrl = (url) => `${schema}://${host}:${port}${url ? url : ""}`;

export const saveToken = (token) => {
    localStorage.setItem("t",token);
}

export const getToken = () => {
    const t = localStorage.getItem("t")
    if (t) {
        return `Bearer ${t}`;
    }
    return "";
}

export const saveRole = (role) => {
    localStorage.setItem("r",role);
}

export const getRole = () => {
    return localStorage.getItem("r") ?? "user";
}

export const isMainBranch = () => {
    return localStorage.getItem("b") === "y";
}


export const getRoutes = (onlyRoutes = false) => {
    const role = getRole();
    const isMain = isMainBranch();
    if (role === "admin") {
        if (isMain) {
            return onlyRoutes ? mainBranchAdmin.routes : [...mainBranchAdmin.routes,...mainBranchAdmin.hiddenRoutes].filter(r => r?.element);
        } else {
            return onlyRoutes ? localAdmin.routes : [...localAdmin.routes,...localAdmin.hiddenRoutes].filter(r => r?.element);
        }
    }
    return [
        {
            path : "/home",
            element : <>welcome user</>,
        }
    ]
}
