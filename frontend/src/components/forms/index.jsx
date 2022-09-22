import React from "react";
import "./style.scss"

export const LoginForm = ({
    handleSubmit,
    email,
    setEmail,
    password,
    setPassword
}) => (
    <div className="form-container">
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="form-label">
                    Email Address
                </label>
                <input
                    type="email" 
                    className="form-control"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
            </div>
            <div className="form-group">
                <label className="form-label">
                    Password
                </label>
                <input
                    type="password" 
                    className="form-control"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
            </div>
            <button disabled={!email || !password} className="form-button">Login</button>
        </form>
    </div>
)

export const LocationForm = ({
    handleSubmit,
    location,
    setLocation,
    content,
    setContent,
    latLon,
    setLatLon
}) => (
    <div className="form-container">
        
    </div>
)