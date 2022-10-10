import React from 'react'
import "./style.scss"

const ListProperty = () => {
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
            </div>
        </div>
    )
}

export default ListProperty
