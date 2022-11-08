import React, { useState, useEffect } from 'react'
import "./style.scss"
import DashboardWrapper from "../../components/dashboard-wrapper/DashboardWrapper"
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
            <Outlet />
        </DashboardWrapper>        
    )
}

export default Property
