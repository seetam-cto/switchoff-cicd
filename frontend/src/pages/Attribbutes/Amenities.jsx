import React, { useState } from 'react'
import "./style.scss"
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import MediaHandler, {IconSelector} from "../../components/media"
import { addAmenity, getAmenities } from '../../actions/attributes';
import { useEffect } from 'react';

const Amenities = () => {
    const {auth} = useSelector((state) => ({...state}))
    const {token} = auth
    const [propType, setProptype] = useState({
        title: '',
        icon: '',
        for: 'property',
        exclusive: false
    })
    const [modalFor, setModalFor] = useState('')
    const [modalState, setModalState] = useState(false)
    const handleIcon = (e) => {
        e.preventDefault()
        setModalFor("AMENITY_ICON")
        setModalState(true)
    }

    const [propertyTypes, setPropertyTypes] = useState([])
    const loadPropertyTypes = async () => {
        try{
            let res = await getAmenities()
            let {data} = res
            setPropertyTypes(data)
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        loadPropertyTypes()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            let res = await addAmenity(token, propType)
            if(res.status === 200) toast.success("Property Type Added!")
        }catch(err){
            if(err.response.status === 400) toast.error(`${err.response.data}`)
        }
        loadPropertyTypes()
        setProptype({
            title: '',
            icon: '',
            for: 'property',
            exclusive: false
        })
    }
    return (
        <div className="attr-container">
            <div className="attr-header">
               Add Amenity
            </div>
            <div className="attr-form">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="row">
                        <div className="col-4 col-sm-12">
                            <div className="form-group">
                                <label className="form-label">
                                    Amenity Name
                                </label>
                                <input type="text"
                                value={propType.title}
                                onChange={(e) => setProptype({...propType, title: e.target.value})}
                                placeholder='e.g. Swimming Pool, Spa, etc.'
                                className="form-control" />
                            </div>
                        </div>
                        <div className="col-3 col-sm-12">
                            <div className="form-group">
                                <label className="form-label">
                                    Amenity For
                                </label>
                                <select
                                value={propType.for}
                                onChange={(e) => setProptype({...propType, for: e.target.value})}
                                className="form-control">
                                    <option value="property">Property</option>
                                    <option value="room">Room</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-3 col-sm-12">
                            <div className="form-group">
                                <label className="form-label">Select Icon</label>
                                <IconSelector handler={handleIcon} iconurl={propType.icon} />
                            </div>
                        </div>
                        <div className="col-1">
                            <div className="form-group">
                                <label className="form-label">Exclusive</label>
                                <input
                                checked={propType.exclusive}
                                onChange={(e) => setProptype({...propType, exclusive: e.target.checked})}
                                type="checkbox" className="form-control ch" />
                            </div>
                        </div>
                        <div className="col-12 col-sm-12">
                            <div className="row">
                                <div className="col-9"></div>
                                <div className="col-3">
                                    <div className="form-group">
                                        <button
                                        onClick={(e) => handleSubmit(e)}
                                        className='form-button full'>
                                            Add
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className="attr-list">
                <div className="row attr-list-ul" key={'random-key-3eyudg'}>
                    <div className="col-1 attr-list-head">
                        #
                    </div>
                    <div className="col-4 attr-list-head">
                        Amenity
                    </div>
                    <div className="col-2 attr-list-head">
                        For
                    </div>
                    <div className="col-2 attr-list-head">
                        Icon
                    </div>
                    <div className="col-3 attr-list-head">
                        Actions
                    </div>
                </div>
                {
                    propertyTypes && propertyTypes.map((ppt, i) => (
                        <div className="row attr-list-li">
                            <div className="col-1 attr-list-body">
                                {i+1}
                            </div>
                            <div className="col-4 attr-list-body">
                                {ppt.title}
                            </div>
                            <div className="col-2 attr-list-body">
                                {(ppt.for)[0].toUpperCase() + ppt.for.substring(1)}
                            </div>
                            <div className="col-2 attr-list-body">
                                <img src={ppt.icon} alt="" />
                            </div>
                            <div className="col-3 attr-list-body">
                                Edit/Delete
                            </div>
                        </div>
                    ))
                }
            </div>
            <MediaHandler modalFor={modalFor} clearModal={setModalFor} media={propType} setSelectedMedia={setProptype} modalState={modalState} setModalState={setModalState} />
        </div>
    )
}

export default Amenities