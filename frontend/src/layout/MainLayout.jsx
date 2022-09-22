import React from 'react'
import './main-layout.scss'
import { Outlet, Navigate } from 'react-router-dom'
import Sidebar from '../components/sidebar/Sidebar'
import TopNav from '../components/topnav/TopNav'
import { useSelector } from "react-redux";

const MainLayout = () => {
    const {auth} = useSelector((state) => ({...state}))
    return auth && auth.token ? (
        <>
            <Sidebar />
            <div className="main">
                <div className="main__content">
                    <TopNav />
                    <Outlet />
                </div>
            </div>
        </>
    ) : (<Navigate to="/login" />)
}

export default MainLayout
