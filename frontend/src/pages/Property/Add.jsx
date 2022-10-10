import React, {useState, useEffect} from 'react'
import "./style.scss"
import { getPropertyTypes, getExperiences, getAmenities } from '../../actions/attributes'
import { MultiSelect } from "react-multi-select-component";
import AutoComplete from './Map';
import { State } from 'country-state-city';

const BasicInfo = ({data, setData}) => {
    const [propertyTypes, setPropertyTypes] = useState([])
    const [experiences, setExperiences] = useState([])
    const [aboutChar, setAboutChar] = useState(300)
    const [selected, setSelected] = useState([])

    const loadExperiences = async () => {
        try{
            let options = []
            let res = await getExperiences()
            let exps = res.data
            options = exps.map((ex) => ({label: ex.title, value: ex._id, icon: ex.icon}))
            setExperiences(options)
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        setData({
            ...data,
            experience_tags: selected.map((sl) => sl.value)
        })
    },[selected])

    const loadPropertyTypes = async () => {
        try{
            let res = await getPropertyTypes()
            let {data} = res
            setPropertyTypes(data)
        }catch(err){
            console.log(err)
        }
    }

    const loadPreData = () => {
        experiences && data && setSelected(experiences.map((ex) =>
        data.experience_tags.includes(ex._id) && {label: ex.title, value: ex._id, icon: ex.icon}))
    }

    useEffect(() => {
        loadPropertyTypes()
        loadExperiences()
        loadPreData()
    },[])
    return (
        <div className="col-12">
            <div className="row">
                <div className="col-12">
                    <p>&nbsp;</p>
                </div>
                <div className="col-6">
                    <div className="form-group">
                        <label className="form-label">
                            Property Name*
                        </label>
                        <input type="text"
                        value={data.name}
                        placeholder="e.g. Taj Resort"
                        onChange={(e) => setData({...data, name: e.target.value})}
                        className="form-control" />
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-group">
                        <label className="form-label">
                            Property Type*
                        </label>
                        <select
                        onChange={(e) => setData({...data, property_type: e.target.value})}
                        className="form-control">
                            <option value="">Select Property Type</option>
                            {propertyTypes.map((p, i) => (
                                <option key={i} className={"form-control-option"} value={p._id}>
                                    {p.title}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <div className="form-group">
                        <label className="form-label">
                            Point of Contact (POC) Name*
                        </label>
                        <input type="text"
                        value={data.poc_info.name}
                        placeholder="e.g Manager/Owners Name"
                        onChange={(e) =>  setData({...data, poc_info: {name: e.target.value}})}
                        className="form-control" />
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-group">
                        <label className="form-label">
                            POC - Phone*
                        </label>
                        <input type="text"
                        value={data.poc_info.phone}
                        placeholder="e.g +91 99999 99999"
                        onChange={(e) =>  setData({...data, poc_info: {phone: e.target.value}})}
                        className="form-control" />
                    </div>    
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                <div className="form-group">
                    <label className="form-label">
                        About Property - <span style={{color: aboutChar > 300 ? 'red' : 'green'}}>{aboutChar}</span>
                    </label>
                    <textarea
                    placeholder="Try to keep it under 300 characters"
                    value={data.content}
                    onChange={(e) => {setData({...data, content: e.target.value}); setAboutChar(e.target.value.length)}}
                    className="form-control ta" />
                </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="form-group">
                        <label className="form-label">
                            Experience Tags
                        </label>
                        <MultiSelect
                            options={experiences && experiences}
                            value={selected}
                            onChange={setSelected}
                            labelledBy="Select"
                            className="form-tags-control"
                        />
                        <div className="form-tags">
                            {selected.map((tag, i) => (
                                <div className="form-tags-tag" key={i}>
                                    <img src={tag.icon} alt="" />
                                    {tag.label}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Location = ({address, setAddress}) => {
    const [location, setLocation] = useState({
        full: 'India',
        state: '',
        country: '',
        region: '',
        pincode: '',
        map: {
            lat: '',
            lon: ''
        }
    })
    const [states, setStates] = useState([])
    const [allStates, setAllStates] = useState([])

    const initStates = (country) => {
        const allStates =  State.getStatesOfCountry(country)
        let contrs = []
        for(var i=0; i < allStates.length;i++){
            contrs.push(allStates[i].name)
        }
        setAllStates(allStates)
        setStates(contrs)
    }

    useEffect(() => {
        location && initStates(location.code)
    },[location])

    return (
        <div className="col-12">
            <div className="row">
                <div className="col-12">
                    <p>&nbsp;</p>
                </div>
                <div className="col-12">
                    <AutoComplete setAddress={setLocation} />
                </div>
                <div className="col-6">
                    <div className="form-group">
                        <label className="form-label">
                            Please Select State
                        </label>
                        <select
                        value={location.state ? location.state : ""}
                        disabled={!states.length}
                        className="form-control">
                            {states.length ?
                            states.map((st, i) => (
                                <option value={st} key={i}>{st}</option>
                            )) : <option value="">Search your address 🔝</option>}
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="form-label">
                            Country
                        </label>
                        <input type="text"
                        disabled
                        placeholder='e.g. India'
                        value={location && location.country}
                        className="form-control" />
                    </div>
                    <div className="form-group">
                        <label className="form-label">
                            Pincode
                        </label>
                        <input type="text"
                        disabled
                        placeholder='e.g. 500013'
                        value={location && location.pincode}
                        className="form-control" />
                    </div>
                </div>
                <div className="col-6">
                <div className="form-group v-full">
                    <label className="form-label">Map View</label>
                    <iframe
                    width={'100%'}
                    className="form-control map"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBtB0H3LUpHoVHg1QGlSoEonWjcesiXUR0&q=${location && location.full.replace(",","+").replace(" ","").replace("&", "and")}`}>
                    </iframe>
                </div>
                </div>
            </div>
        </div>
    )
}

const Amenities = ({amenities, setAmenities}) => {
    const [amens, setAmens] = useState([])
    const [selected, setSelected] = useState([])

    const loadAmenities = async () => {
        try{
            let options = []
            let res = await getAmenities()
            let exps = res.data
            options = exps.map((ex) => ({label: ex.title, value: ex._id, icon: ex.icon}))
            setAmens(options)
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        setAmenities(selected.map((sl) => sl.value))
    },[selected])

    const loadPreData = () => {
        amens && amenities && setSelected(amens.map((ex) =>
        amenities.includes(ex._id) && {label: ex.title, value: ex._id, icon: ex.icon}))
    }

    useEffect(() => {
        loadAmenities()
        loadPreData()
    },[])
    return (
        <div className="col-12">
            <div className="row">
                <div className="col-12">
                    <p>&nbsp;</p>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="form-group">
                        <label className="form-label">
                            Select Amenities
                        </label>
                        <MultiSelect
                            options={amens && amens}
                            value={selected}
                            onChange={setSelected}
                            labelledBy="Select"
                            className="form-tags-control"
                        />
                        <div className="form-tags">
                            {selected.map((tag, i) => (
                                <div className="form-tags-tag" key={i}>
                                    <img src={tag.icon} alt="" />
                                    {tag.label}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const AddProperty = () => {
    const [step, setStep] = useState(0);
    const [stepsCompl, setStepsCompl] = useState([false, false, false, false, false, false])

    const [basicInfo, setBasicInfo] = useState({
        name: '',
        content: '',
        property_type:  '',
        experience_tags: [],
        poc_info: {
            name: '',
            phone: ''
        },    
    })
    const [address, setAddress] = useState({
        region: '',
        country: '',
        state: '',
        full_address: '',
        pincode: '',
        map: {
            lat: '',
            lon: ''
        }
    })
    const [amenities, setAmenities] = useState([])
    const [gallery, setGallery] = useState({
        cover_image: '',
        images: [],
        external_video: '',
        videos: []
    })
    const [policies, setPolicies] = useState({
        cancellation: [],
        check_time: {
            check_in: '',
            check_out: ''
        },
        pets: false,
        extra_charges: ''
    })
    const [documents, setDocuments] = useState({
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
    })

    const handleSave = () => {

    }

    const handleBack = () => {

    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }
    return(
        <div className="property">
            <div className="property-header">
                Add Property
            </div>
            <div className="property-form">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="row">
                        <div className="col-12">
                            <div className="form-section-header">
                                <ul className="form-section-header-list">
                                    <li onClick={() => setStep(0)} className={`${step === 0 && 'active'} `}>Basic Info {stepsCompl[0] && <i class='bx bxs-check-circle'></i>}</li>
                                    <li onClick={() => setStep(1)} className={`${step === 1 && 'active'} `}>Location {stepsCompl[1] && <i class='bx bxs-check-circle'></i>}</li>
                                    <li onClick={() => setStep(2)} className={`${step === 2 && 'active'} `}>Amenities {stepsCompl[2] && <i class='bx bxs-check-circle'></i>}</li>
                                    <li onClick={() => setStep(3)} className={`${step === 3 && 'active'} `}>Gallery {stepsCompl[3] && <i class='bx bxs-check-circle'></i>}</li>
                                    <li onClick={() => setStep(4)} className={`${step === 4 && 'active'} `}>Policies {stepsCompl[4] && <i class='bx bxs-check-circle'></i>}</li>
                                    <li onClick={() => setStep(5)} className={`${step === 5 && 'active'} `}>Verification {stepsCompl[5] && <i class='bx bxs-check-circle'></i>}</li>
                                </ul>
                            </div>
                        </div>
                        {step === 0 && <BasicInfo data={basicInfo} setData={setBasicInfo} />}
                        {step === 1 && <Location address={address} setAddress={setAddress} />}
                        {step === 2 && <Amenities amenities={amenities} setAmenities={setAmenities} />}
                        
                        <div className="col-12">
                            <div className="form-section-footer d-flex justify-between">
                                <button
                                disabled={step === 0}
                                className="form-button bg-black">
                                    <i class='bx bxs-left-arrow-alt'></i>&nbsp;Back
                                </button>
                                {
                                    step <= 4 ? (
                                        <button
                                        className="form-button bg-black">
                                            Save & Continue &nbsp;<i class='bx bxs-right-arrow-alt'></i>
                                        </button>
                                    ):(
                                        <button
                                        className="form-button bg-purple">
                                            Publish Property
                                        </button>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddProperty
