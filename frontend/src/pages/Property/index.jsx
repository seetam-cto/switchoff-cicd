import React, { useState, useEffect } from 'react'
import "./style.scss"
import DashboardWrapper, { DashboardWrapperMain, DashboardWrapperRight } from "../../components/dashboard-wrapper/DashboardWrapper"
import { Link, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Property = () => {
    const location = useLocation()
    const [activeIndex, setActiveIndex] = useState("")
    useEffect(() => {
        const curPath = window.location.pathname.split('/')[2]
        curPath ? setActiveIndex(curPath.length === 0 ? "" : curPath) : setActiveIndex("")
    }, [location])
    return (
        <DashboardWrapper>
            <DashboardWrapperMain>
                <Outlet />
            </DashboardWrapperMain>
            <DashboardWrapperRight>
                <Link to={"/properties/add"}>Add</Link>
                <Link to={"/properties/update"}>Update</Link>
                <div className="attr-right">
                    <h3>Manage Attributes</h3>
                    <p>&nbsp;</p>
                    <ul className="attr-right-menu">
                        {activeIndex === "add" ? <li>
                            <Link to={"/properties/"}>
                                <i class={`bx bx${activeIndex === "add" ? 's' : ''}-left-arrow-alt`}></i> &nbsp;Back
                            </Link>
                        </li> : 
                        <li className={`active`}>
                            <Link to={"/properties/add"}>
                                <i class={`bx bx${activeIndex === "add" ? '-left-arrow-alt' : '-plus-circle'}`}></i> &nbsp;Add Property
                            </Link>
                        </li>
                        }
                    </ul>
                </div>
            </DashboardWrapperRight>
        </DashboardWrapper>        
    )
}

export default Property
