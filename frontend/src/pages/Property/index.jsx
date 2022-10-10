import React, { useState, useEffect } from 'react'
import "./style.scss"
import DashboardWrapper, { DashboardWrapperMain, DashboardWrapperRight } from "../../components/dashboard-wrapper/DashboardWrapper"
import { Link, Outlet, useLocation } from 'react-router-dom'

const Property = () => {
    return (
        <DashboardWrapper>
            <DashboardWrapperMain>
                <Outlet />
            </DashboardWrapperMain>
            <DashboardWrapperRight>
                <Link to={"/properties/add"}>Add</Link>
                <Link to={"/properties/update"}>Update</Link>
            </DashboardWrapperRight>
        </DashboardWrapper>        
    )
}

export default Property
