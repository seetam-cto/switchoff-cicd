import React, {useState, useEffect} from 'react'
import "./style.scss"
import DashboardWrapper, { DashboardWrapperMain, DashboardWrapperRight } from "../../components/dashboard-wrapper/DashboardWrapper"
import { Link, Outlet, useLocation } from 'react-router-dom'
import SummaryBox from "../../components/summary-box/SummaryBox"
import { allAttributes } from '../../actions/attributes'

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
    let sts = [
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
    ]
    const [attribStat, setAttribStat] = useState()
    useEffect(() => {
        const loadData = async () => {
            try{
                let res = await allAttributes()
                let newStat = sts
                newStat[0].value = res.propTypes
                newStat[1].value = res.amenities
                newStat[2].value = res.experiences
                setAttribStat(newStat)
            }catch(err){
                console.log(err)
            }
        }
        loadData()
    },[])
    return(
        <div className="attr-container">
            <div className="row">
                {
                    attribStat && attribStat.map((item, index) => (
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