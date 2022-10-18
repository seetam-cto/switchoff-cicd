import React, { useState, useEffect } from 'react'
import "./style.scss"
import DashboardWrapper, { DashboardWrapperMain, DashboardWrapperRight } from "../../components/dashboard-wrapper/DashboardWrapper"
import { Link, Outlet, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

const propertyStructure = {
    basic_info: {
        name: '',
        content: '',
        property_type:  '',
        experience_tags: [],
        poc_info: {
            name: '',
            phone: ''
        },
        address: {
            region: '',
            country: '',
            state: '',
            full_address: '',
            pincode: '',
            map: {
                lat: '',
                lng: ''
            }
        }
    },
    amenities: [],
    gallery: {
        cover_image: '',
        images: [],
        external_video: '',
        videos: []
    },
    policies: {
        cancellation: [],
        check_time: {
            check_in: '',
            check_out: ''
        },
        pets: false,
        extra_charges: 0
    },
    documents: {
        gst_info: {
            gst_no: '',
            gst_proof: '',
            verified: false,
        },
        poc_id: {
            id_type: '',
            id_no: '',
            id_proof: '',
            verified: false
        },
        contract: {
            contract_id: '',
            contract_pdf: ''
        },
        comment: ''
    },
    step: 0,
    createdBy: '',
    _id: ''
};

const Property = () => {
    const location = useLocation()
    const [activeIndex, setActiveIndex] = useState("")
    const dispatch = useDispatch()
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
                                <i className={`bx bx${activeIndex === "add" ? 's' : ''}-left-arrow-alt`}></i> &nbsp;Back
                            </Link>
                        </li> : 
                        <li className={`active`}>
                            <Link to={"/properties/add"}>
                                <i className={`bx bx${activeIndex === "add" ? '-left-arrow-alt' : '-plus-circle'}`}></i> &nbsp;Add Property
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
