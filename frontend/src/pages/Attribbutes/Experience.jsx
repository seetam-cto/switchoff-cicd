import React, { useState } from 'react'
import "./style.scss"
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import MediaHandler, {IconSelector} from "../../components/media"
import { addExperience, getExperiences, updateExperience } from '../../actions/attributes';
import { useEffect } from 'react';
import Modal from 'react-modal';

const UpdateForm = ({experience, setSelectedExperience, handleUpdate, state, setState}) => {
    const [propType, setProptype] = useState(experience)
    const [modalFor, setModalFor] = useState('')
    const [modalState, setModalState] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        handleUpdate(e, experience._id, propType)
        clearAll()
    }

    const clearAll = () => {
        setSelectedExperience({
            title: '',
            icon: ''
        })
        setState(false)
    }
    const handleIcon = (e) => {
        e.preventDefault()
        setModalFor("EXPERIENCE_ICON")
        setModalState(true)
    }
    useEffect(() => {
        setProptype(experience)
    },[experience])
    return (
        <Modal
        isOpen={state}
        onRequestClose={() => setState(false)}
        className="attr-modal"
        >
            <div className="attr-modal-container">
                <div className="attr-header">
                    Update Experience
                </div>
                <div className="attr-form">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="row">
                        <div className="col-6 col-sm-12">
                            <div className="form-group">
                                <label className="form-label">
                                    Experience Title
                                </label>
                                <input type="text"
                                value={propType.title}
                                onChange={(e) => setProptype({...propType, title: e.target.value})}
                                placeholder='e.g. Beaches, Lakefront, etc'
                                className="form-control" />
                            </div>
                        </div>
                        <div className="col-3 col-sm-12">
                            <div className="form-group">
                                <label className="form-label">Select Icon</label>
                                <IconSelector handler={handleIcon} iconurl={propType.icon} />
                            </div>
                        </div>
                        <div className="col-12 col-sm-12">
                                <div className="row">
                                    <div className="col-7"></div>
                                    <div className="col-2">
                                        <div className="form-group">
                                            <button
                                            onClick={() => clearAll()}
                                            className='form-button clear full'>
                                                Cancle
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col-3">
                                        <div className="form-group">
                                            <button
                                            onClick={(e) => handleSubmit(e)}
                                            className='form-button full'>
                                                Update
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </form>
            </div>
                <MediaHandler modalFor={modalFor} clearModal={setModalFor} media={propType} setSelectedMedia={setProptype} modalState={modalState} setModalState={setModalState} />
            </div>
        </Modal>
    )
}

const Experiences = () => {
    const {auth} = useSelector((state) => ({...state}))
    const {token} = auth
    const [propType, setProptype] = useState({
        title: '',
        icon: ''
    })
    const [modalFor, setModalFor] = useState('')
    const [modalState, setModalState] = useState(false)
    const handleIcon = (e) => {
        e.preventDefault()
        setModalFor("EXPERIENCE_ICON")
        setModalState(true)
    }

    const [propertyTypes, setPropertyTypes] = useState([])
    const loadPropertyTypes = async () => {
        try{
            let res = await getExperiences()
            let {data} = res
            setPropertyTypes(data)
        }catch(err){
            console.log(err)
        }
    }

    //updatemodal
    const [modalIsOpen, setIsOpen] = useState(false);
    const [selectedExperience, setSelectedExperience] = useState({
        title: '',
        icon: ''
    })

    const openUpdate = (amenity) => {
        setSelectedExperience(amenity)
        setIsOpen(true)
    }

    const handleUpdate = async (e, id, data) => {
        e.preventDefault()
        try{
            let res = await updateExperience(token, data, id)
            if(res.status === 200) toast.success("Experience Updated")
        }catch(err){
            if(err.response.status === 400) toast.error(`${err.response.data}`)
        }
    }

    //end update

    useEffect(() => {
        loadPropertyTypes()
    }, [selectedExperience])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            let res = await addExperience(token, propType)
            if(res.status === 200) toast.success("Experience Added!")
        }catch(err){
            if(err.response.status === 400) toast.error(`${err.response.data}`)
        }
        loadPropertyTypes()
        setProptype({
            title: '',
            icon: ''
        })
    }
    return (
        <div className="attr-container">
            <div className="attr-header">
               Add Experience
            </div>
            <div className="attr-form">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="row">
                        <div className="col-6 col-sm-12">
                            <div className="form-group">
                                <label className="form-label">
                                    Experience Title
                                </label>
                                <input type="text"
                                value={propType.title}
                                onChange={(e) => setProptype({...propType, title: e.target.value})}
                                placeholder='e.g. Beaches, Lakefront, etc'
                                className="form-control" />
                            </div>
                        </div>
                        <div className="col-3 col-sm-12">
                            <div className="form-group">
                                <label className="form-label">Select Icon</label>
                                <IconSelector handler={handleIcon} iconurl={propType.icon} />
                            </div>
                        </div>
                        <div className="col-3 col-sm-12">
                            <div className="form-group">
                                <label className="form-label">&nbsp;</label>
                                <button
                                onClick={(e) => handleSubmit(e)}
                                className='form-button full'>
                                    Add
                                </button>
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
                    <div className="col-5 attr-list-head">
                        Experience
                    </div>
                    <div className="col-2 attr-list-head">
                        Icon
                    </div>
                    <div className="col-4 attr-list-head">
                        Actions
                    </div>
                </div>
                {
                    propertyTypes && propertyTypes.map((ppt, i) => (
                        <div className="row attr-list-li">
                            <div className="col-1 attr-list-body">
                                {i+1}
                            </div>
                            <div className="col-5 attr-list-body">
                                {ppt.title}
                            </div>
                            <div className="col-2 attr-list-body">
                                <img src={ppt.icon} alt="" />
                            </div>
                            <div className="col-3 attr-list-body">
                                <button
                                onClick={() => openUpdate(ppt)}
                                className="form-button update">
                                    <i class='bx bxs-pencil'></i> Edit
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
            <UpdateForm experience={selectedExperience} setSelectedExperience={setSelectedExperience} state={modalIsOpen} setState={setIsOpen} handleUpdate={handleUpdate} />
            <MediaHandler modalFor={modalFor} clearModal={setModalFor} media={propType} setSelectedMedia={setProptype} modalState={modalState} setModalState={setModalState} />
        </div>
    )
}

export default Experiences