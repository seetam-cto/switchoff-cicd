import React, { useState, useEffect } from 'react'
import "./style.scss"
import { useSelector, useDispatch } from "react-redux";
import { getProperties, getProperty } from '../../actions/property';
import { useNavigate } from 'react-router-dom';

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

const POCBox = ({poc_info}) => {
    return (
        <div className="property-poc">
            <p className="property-poc-name"><i className='bx bxs-user' ></i>&nbsp;{poc_info.name}</p>
        </div>
    )
}

const PropertyRow = ({ppt, i}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleUpdateNav = async (id) => {
        try{
            console.log(id)
            let res = await getProperty(id)
            let {data} = res
            dispatch({
                type: "PROPERTY_UPDATE",
                payload: {
                    ...data,
                    basic_info: {
                        ...data.basic_info,
                        experience_tags: data.basic_info.experience_tags.map((tgs) => tgs._id)
                    }
                }
            })
            console.log(data)
        }catch(err){
            console.log("Couldn't Fetch Property Details")
        }
        navigate("/properties/update/"+id)
    }
    return(
        <div
        key={i}
        className="row property-list-li">
            <div className="col-1 property-list-body">
                {i+1}
            </div>
            <div
            className="col-5 property-list-body title">
                <div className="row">
                <div onClick={() => navigate("/properties/preview/"+ppt._id)} className="col-12 linkc">
                {(ppt.basic_info.name.length > 20) ? ppt.basic_info.name.substring(0,17) + "..." : ppt.basic_info.name }
                {ppt.status 
                    ? <> - <span className="property-list-body-tag published">Published</span></>
                    : <> - <span className="property-list-body-tag draft">Completed {((ppt.step)/5)*100}%</span></>}
                </div>
                <div className="col-12 property-list-body-title-buttons">
                    <button className="property-list-body-button edit">
                        <i class='bx bxs-building' ></i>&nbsp;Rooms
                    </button>
                    <button
                    onClick={() => navigate("/properties/calendar/"+ppt._id)}
                    className="property-list-body-button edit">
                        <i class='bx bxs-calendar'></i>&nbsp;Calender
                    </button>
                    <button className="property-list-body-button delete">
                        <i class='bx bxs-message-square-dots' ></i>&nbsp;Enquiries
                        <span className="count">{3}</span>
                    </button>
                </div>
                </div>
            </div>
            <div className="col-2 property-list-body">
                <POCBox poc_info={ppt.basic_info.poc_info}/>
            </div>
            <div className="col-2 property-list-body">
                {ppt.createdBy.name}
            </div>
            <div className="col-2 property-list-body d-flex justify-between">
                <button
                onClick={() => handleUpdateNav(ppt._id)}
                className="property-list-body-button edit">
                    <i class='bx bxs-pencil' ></i>Edit
                </button>
                {ppt.trash 
                ? ( <button className="property-list-body-button restore">
                        <i class='bx bx-refresh' ></i>Restore
                    </button>)
                : ( <button className="property-list-body-button delete">
                        <i class='bx bxs-trash' ></i>Trash
                    </button>)
                }
            </div>
        </div>
    )
}

const ListProperty = () => {
    const [properties, setProperties] = useState([])
    const dispatch = useDispatch()
    const {auth} = useSelector((state) => ({...state}))
    const {token} = auth
    const [trash, setTrash] = useState(false)

    const loadProperties = async () => {
        try{
            let res = await getProperties()
            let {data} = res
            setProperties(data)
        }catch(err){
            console.log(err)
        }
    }
    useEffect(() => {
        loadProperties()
        dispatch({
            type: "PROPERTY_CLEAR",
            payload: propertyStructure
        })
    },[])
    return(
        <div className="property">
            <div className="property-header">
                All Properties
            </div>
            <div className="row">
                <div className="col-5">
                    <div className="form-group">
                        <input type="text"
                        placeholder="Search for property"
                        className="form-control" />
                    </div>
                </div>
                <div className="col-4">
                    <div className="form-group-h">
                        <label className="form-label">Filter by</label>
                        <select 
                        className="form-control">
                            <option value="all">All</option>
                            <option value="latest">Latest</option>
                            <option value="top">Top Revenue</option>
                        </select>
                    </div>
                </div>
                <div className="col-1">
                    <button
                    onClick={() => setTrash(!trash)}
                    className={`form-button trash ${trash && 'active'}`}>
                        <i class='bx bx-trash' ></i> Trash
                    </button>
                </div>
                <div className="col-2">
                    <button className="form-button full">Search</button>
                </div>
            </div>
            <div className="property-list">
                <div className="row property-list-ul" key={'random-key-3eyudg'}>
                    <div className="col-1 property-list-head">
                        #
                    </div>
                    <div className="col-5 property-list-head">
                        Property
                    </div>
                    <div className="col-2 property-list-head">
                        POC
                    </div>
                    <div className="col-2 property-list-head">
                        Posted By
                    </div>
                    <div className="col-2 property-list-head">
                        Actions
                    </div>
                </div>
                {
                    properties && trash ? properties.filter((pt) => pt.trash).map((ppt, i) => (
                        <PropertyRow ppt={ppt} key={i} i={i} />
                    )) : properties.filter((pt) => !pt.trash).map((ppt, i) => (
                        <PropertyRow ppt={ppt} key={i} i={i} />
                    ))
                }
            </div>
        </div>
    )
}

export default ListProperty
