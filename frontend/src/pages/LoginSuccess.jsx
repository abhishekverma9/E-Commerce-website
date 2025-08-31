import React from 'react'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginSuccess = () => {

    const navigate = useNavigate();
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");

        if (token) {
            localStorage.setItem("token", token);
            navigate("/"); 
        } else {
            navigate("/login");
        }
    }, [navigate]);
    return (
        <p>Redirecting...</p>
    )
}

export default LoginSuccess
