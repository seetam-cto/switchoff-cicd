// import { Route, Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// const PrivateRoute = ({children, ...rest}) => {
//     const auth = useSelector((state) => ({...state}))

//     if (auth && auth.token) {
//         return children;
//     }
//     // not logged in so redirect to login page with the return url
//     return <Navigate to="/login" />
    
// }

// export default PrivateRoute