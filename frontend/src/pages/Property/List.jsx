import React, { useState, useEffect } from 'react'
import "./style.scss"
import { useSelector } from "react-redux";
import { getProperties } from '../../actions/property';

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
                        Revenue
                    </div>
                    <div className="col-2 property-list-head">
                        Bookings
                    </div>
                    <div className="col-2 property-list-head">
                        Actions
                    </div>
                </div>
                {
                    properties && properties.map((ppt, i) => (
                        <div className="row attr-list-li">
                            <div className="col-1 attr-list-body">
                                {i+1}
                            </div>
                            <div className="col-4 attr-list-body">
                                {ppt.basic_info.name}
                            </div>
                            <div className="col-2 attr-list-body">
                                {ppt.basic_info.poc_info.name}
                            </div>
                            <div className="col-2 attr-list-body">
                                <img src={ppt.gallery.cover_image} alt="" />
                            </div>
                            <div className="col-3 attr-list-body">
                                Edit/Delete
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ListProperty
