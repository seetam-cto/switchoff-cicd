import React, {useState, useEffect} from 'react'
import "./style.scss"
import DashboardWrapper, { DashboardWrapperMain, DashboardWrapperRight } from "../../components/dashboard-wrapper/DashboardWrapper"
import { Link, Outlet, useLocation } from 'react-router-dom'
import SummaryBox from "../../components/summary-box/SummaryBox"

//Main Component
const Attributes = () => {
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
                <div className="attr-right">
                    <h3>Manage Attributes</h3>
                    <p>&nbsp;</p>
                    <ul className="attr-right-menu">
                        <li className={`${activeIndex === "experiences" ? 'active' : ''}`}>
                            <Link to={"/attributes/experiences"}>
                                <i class={`bx bx${activeIndex === "experiences" ? 's' : ''}-left-arrow-alt`}></i> &nbsp;Experiences
                            </Link>
                        </li><li className={`${activeIndex === "property-type" ? 'active' : ''}`}>
                            <Link to={"/attributes/property-type"}>
                                <i class={`bx bx${activeIndex === "property-type" ? 's' : ''}-left-arrow-alt`}></i> &nbsp;Property Type
                            </Link>
                        </li>
                        <li className={`${activeIndex === "amenities" ? 'active' : ''}`}>
                            <Link to={"/attributes/amenities"}>
                                <i class={`bx bx${activeIndex === "amenities" ? 's' : ''}-left-arrow-alt`}></i> &nbsp;Amenities
                            </Link>
                        </li>
                    </ul>
                </div>
            </DashboardWrapperRight>
        </DashboardWrapper>
    )
}

export const AttribbutesStats = () => {
    const [attribStat, setAttribStat] = useState([
        {
            title: 'Experiences',
            subtitle: 'Total experiences',
            value: '10',
            percent: 50,
            dont: true,
            to: '/attributes/experiences'
        },
        {
            title: 'Amenities',
            subtitle: 'Total amenities',
            value: '20',
            percent: 49.99,
            dont: true,
            to: '/attributes/amenities'
        },{
            title: 'Property Types',
            subtitle: 'Total property types',
            value: '3',
            percent: 50,
            dont: true,
            to: '/attributes/property-type'
        }
    ])
    return(
        <div className="attr-container">
            <div className="row">
                {
                    attribStat.map((item, index) => (
                        <Link to={item.to} key={`summary-${index}`} className="col-4 col-md-4 col-sm-12 mb">
                            <SummaryBox item={item} />
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default Attributes