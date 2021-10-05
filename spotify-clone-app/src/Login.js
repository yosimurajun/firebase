import React from 'react';
import './Login.css';
import { loginUrl } from './spotify';   

function Login() {
    return (
        <div className="login">
        {/* Spotify logo */}
        <img 
            src="https://thumbs.dreamstime.com/b/vinnytsia-ukraine-may-spotify-logo-dark-mode-cool-music-service-offers-legal-streaming-music-spotify-logo-dark-mode-218033923.jpg"
            alt="" />
        {/* Login with Spotify button */}
            <a href={loginUrl}>LOGIN WITH SPOTIFY</a>
        </div>
    )
}
// Spotify logo
// Login with Spotify button
export default Login
