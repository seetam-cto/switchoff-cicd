import React, { useState, useEffect } from 'react'
import "./style.scss"
import { useSelector } from "react-redux";
import { getProperties } from '../../actions/property';

const POCBox = ({poc_info}) => {
    return (
        <div className="property-poc">
            <p className="property-poc-name"><i class='bx bxs-user' ></i>&nbsp;{poc_info.name}</p>
            <a className="property-poc-phone" href={`tel:+${poc_info.phone}`}>
            <i class='bx bxs-phone' ></i>&nbsp;{poc_info.phone}
            </a>
        </div>
    )
}

const ListProperty = () => {
    const [properties, setProperties] = useState([])
    const {auth} = useSelector((state) => ({...state}))
    const {token} = auth

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
    },[])
    return(
        <div className="property">
            <div className="property-header">
                All Properties
            </div>
            <div className="row">
                <div className="col-6">
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
                    properties && properties.map((ppt, i) => (
                        <div className="row property-list-li">
                            <div className="col-1 property-list-body">
                                {i+1}
                            </div>
                            <div className="col-5 property-list-body title">
                                {(ppt.basic_info.name.length > 20) ? ppt.basic_info.name.substring(0,17) + "..." : ppt.basic_info.name }
                                {ppt.status 
                                    ? <> - <span className="property-list-body-tag published">Published</span></>
                                    : <> - <span className="property-list-body-tag draft">Completed {((ppt.step)/5)*100}%</span></>}
                            </div>
                            <div className="col-2 property-list-body">
                                <POCBox poc_info={ppt.basic_info.poc_info}/>
                            </div>
                            <div className="col-2 property-list-body">
                                {ppt.createdBy.name}
                            </div>
                            <div className="col-2 property-list-body d-flex justify-between">
                                <button className="form-button bg-blue">
                                    <i class='bx bxs-pencil' ></i>
                                </button>
                                <button className="form-button bg-red">
                                    <i class='bx bxs-trash' ></i>
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ListProperty
