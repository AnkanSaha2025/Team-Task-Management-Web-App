"use client";

import { useEffect } from "react";

export default function Inital(){
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            // Redirect to the dashboard if token exists
            window.location.href = "/dashboard";
        } else {
            // Redirect to the login page if no token exists
            window.location.href = "/login";
        }
    }, []);
}