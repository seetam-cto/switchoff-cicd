import React, {useState} from "react";
import {toast} from "react-toastify"
import { login } from "../../actions/auth";
import { LoginForm } from "../../components/forms";
import "./style.scss"
import {useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import { useEffect } from "react";

const Login = ({history}) => {
    const [email, setEmail] = useState('seetam@gmail.com')
    const [password, setPassword] = useState('seetam123')

    const dispatch = useDispatch()
    const {auth} = useSelector((state) => ({...state}))
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("SEND LOGIN DATA", {email, password})
        try{
            //
            let res = await login({email, password})
            console.log('LOGIN RESPONSE', res)
            if(res.data){
                toast.success("Logged In Successfully!")
                console.log('SAVE USER RES IN REDUX AND LOCAL STORAFE THEN REDIRECT ===> DASHBOARD')
            }
            //user and token to local storage
            window.localStorage.setItem('auth', JSON.stringify(res.data))
            //save user and token to redux
            dispatch({
                type: "LOGGED_IN_USER",
                payload: res.data
            })
            navigate("/")
        }catch(err){
            console.log(err)
            if(err.response.status === 400) toast.error(err.response.data)
        }
    }

    useEffect(() => {
        auth && auth.token && navigate("/")
    },[auth, navigate])

    return (
        <div className="login">
            <div className="login-container">
                <div className="login-head">
                    <h1>Admin Login</h1>
                </div>
                <div className="login-form-container">
                    <LoginForm
                        handleSubmit={handleSubmit}
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                    />
                </div>
            </div>
        </div>
    )
}

export default Login