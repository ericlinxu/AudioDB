import React from "react";
import "./Navigation.css"

export default function Navigation() {
    return (
        <div className="nav">
            <a href="/DailySongs">Daily Songs</a>
            <a href="/Discover">Discover</a>
            <a href="/Recommend">Recommend</a>
            <a href="/Login">Login</a>
            {/* <a href="/CreateAccount">Create Account</a> */}
        </div>
    );
}