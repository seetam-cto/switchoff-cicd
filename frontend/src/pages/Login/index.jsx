import React from "react";
import { useSelector } from "react-redux";
const Login = () => {
    const state = useSelector((state) => state)
    return (
        <div>
            {JSON.stringify(state, null, 4)}
        </div>
    )
}

export default Login