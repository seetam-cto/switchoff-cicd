import React, {useState, useEffect} from 'react'
import "./style.scss"
import { getPropertyTypes, getExperiences, getAmenities } from '../../actions/attributes'
import { MultiSelect } from "react-multi-select-component";
import AutoComplete from './Map';
import { State } from 'country-state-city';
import { GMapify } from  'g-mapify';
import  'g-mapify/dist/index.css';
import MediaHandler from '../../components/media';
import ReactPlayer from 'react-player'
import { toast } from 'react-toastify';
const placeImg = "https://placehold.jp/30/a8a8a8/ffffff/300x150.png?text="

const BasicInfo = ({data, setData}) => {
    const [propertyTypes, setPropertyTypes] = useState([])
    const [experiences, setExperiences] = useState([])
    const [aboutChar, setAboutChar] = useState(300)
    const [selected, setSelected] = useState([])

    const handleSelected = (e) => {
        setSelected(e)
        let ops = []
        for(var i=0; i < e.length;i++){
            ops.push(e[i].value)
        }
        setData({...data, experience_tags: ops})
    }

    const loadPropertyTypes = async () => {
        try{
            let res = await getPropertyTypes()
            let {data} = res
            setPropertyTypes(data)
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        loadPropertyTypes()
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
        loadExperiences()
    },[])

    useEffect(() => {
        console.log(data.experience_tags)
        let opss = []  
        experiences.map((exps) => data.experience_tags.includes(exps.value) && opss.push(exps))
        setSelected(opss)
    },[experiences])
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
                            onChange={(e) => handleSelected(e)}
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

const checkState = (stateName, countryCode) => {
    let states = State.getStatesOfCountry(countryCode)
    states = states.map((st) => st.name)
    if(states.includes(stateName)){
        return stateName
    }else{
        return false
    }
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
            lng: ''
        }
    })
    const [states, setStates] = useState([])
    const [allStates, setAllStates] = useState([])
    const [notFound, setNotFound] = useState(false)

    const initStates = (country) => {
        const allStates =  State.getStatesOfCountry(country)
        let contrs = []
        for(var i=0; i < allStates.length;i++){
            contrs.push(allStates[i].name)
        }
        setAllStates(allStates)
        setStates(contrs)
    }

    const onMapSelect = (status, data) => {
        console.log(status, data);
        const {address_components, geometry} = data
        setLocation({
            full: address_components.map((a) => a.long_name).join(", "),
            country: address_components[address_components.length - 2].long_name,
            code: address_components[address_components.length - 2].short_name,
            pincode: address_components[address_components.length - 1].long_name,
            state: checkState(address_components[address_components.length - 3].long_name, address_components[address_components.length - 2].short_name),
            map: {
                lat: geometry.location.lat,
                lon: geometry.location.lng
            }
         })
    }

    useEffect(() => {
        setLocation(address)
    },[])

    useEffect(() => {
        location && initStates(location.code)
        setAddress(location)
    },[location])

    return (
        <div className="col-12">
            <div className="row">
                <div className="col-12">
                    <p>&nbsp;</p>
                </div>
                <div className="col-10">
                    <AutoComplete address={address} disabled={notFound} setAddress={setLocation} />
                </div>
                <div className="col-2">
                    <div className="form-group toggle">
                        <label className="form-label">
                            Not found?
                        </label>
                        <div
                        // onClick={() =>  setNotFound(!notFound)}
                        className={`form-toggle ${notFound && 'active'}`}>
                            <span className="form-toggle-switch">&nbsp;
                            </span>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="form-group">
                        <label className="form-label">
                                Full Address
                        </label>
                        <input type="text"
                        placeholder=''
                        disabled
                        value={location && location.full && location.full}
                        className="form-control" />
                    </div>    
                </div>
                {notFound && (
                    <>
                    <div className="col-6">
                        <div className="form-group">
                            <label className="form-label">
                                Latitude
                            </label>
                            <input type="text"
                            placeholder='e.g. 74.76879'
                            onChange={(e) => setLocation({...location, map: {...location.map, lat: e.target.value}})}
                            value={location && location.map.lat}
                            className="form-control" />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label className="form-label">
                                Longitude
                            </label>
                            <input type="text"
                            placeholder='e.g. 24.76879'
                            onChange={(e) => setLocation({...location, map: {...location.map, lng: e.target.value}})}
                            value={location && location.map.lng}
                            className="form-control" />
                        </div>
                    </div>
                    </>
                )}
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
                   {notFound ? (<div className="form-control map">
                    <GMapify
                    mapOptions={{
                        clickableIcons: true
                    }}
                    lat={location.map.lat}
                    lng={location.map.lng}
                    inputClassName={"form-control"}
                    appKey="AIzaSyBtB0H3LUpHoVHg1QGlSoEonWjcesiXUR0" hasSearch hasMarker onSelect={onMapSelect}/>
                    </div>):
                    (<iframe
                    width={'100%'}
                    className="form-control map"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBtB0H3LUpHoVHg1QGlSoEonWjcesiXUR0&q=${!notFound && location && location.full ? location.full.replace(",","+").replace(" ","").replace("&", "and"): (location.map.lat+','+location.map.lon)}`}>
                    </iframe>)}
                </div>
                </div>
            </div>
        </div>
    )
}

const Amenities = ({amenities, setAmenities, loadPre}) => {
    const [amens, setAmens] = useState([])
    const [selected, setSelected] = useState([])

    const handleSelected = (e) => {
        setSelected(e)
        let ops = []
        for(var i=0; i < e.length;i++){
            ops.push(e[i].value)
        }
        setAmenities(ops)
    }

    useEffect(() => {
        const loadAmenities = async () => {
            try{
                let options = []
                let res = await getAmenities()
                let exps = res.data
                options = exps.map((ex) => ({label: `${ex.title}${ex.exclusive ? ' - ✨' : ''}`, value: ex._id, icon: ex.icon, exc: ex.exclusive}))
                setAmens(options)
            }catch(err){
                console.log(err)
            }
        }
        loadAmenities()
    },[])

    useEffect(() => {
        console.log(amenities)
        let opss = []  
        amens.map((ams) => amenities.includes(ams.value) && opss.push(ams))
        setSelected(opss)
    },[amens])
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
                            Select Amenities (SwitchOff Exclusives are marked with ✨)
                        </label>
                        <MultiSelect
                            options={amens && amens}
                            value={selected && selected}
                            onChange={(e) => handleSelected(e)}
                            labelledBy="Select"
                            className="form-tags-control"
                        />
                        <div className='form-tags-head'>
                            SwitchOff Exclusives
                        </div>
                        <div className="form-tags">
                            {selected.map((tag, i) => tag.exc && (
                                <div className="form-tags-tag" key={i}>
                                    <img src={tag.icon} alt="" />
                                    {tag.label}
                                </div>
                            ))}
                        </div>
                        <div className='form-tags-head'>
                            Others
                        </div>
                        <div className="form-tags">
                            {selected.map((tag, i) => !tag.exc && (
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

const Gallery = ({gallery, setGallery}) => {
    const [locGallery, setLocGallery] = useState({
        cover_image: '',
        images: [],
        external_video: '',
        videos: []
    })
    const [modalState, setModalState] = useState(false)
    const [modalFor, setModalFor] = useState('')

    const handleImageSelection = (e,msg) => {
        e.preventDefault()
        setModalFor(msg)
        setModalState(true)
    }

    const removeImage = (image) => {
        setGallery({...gallery, images: gallery.images.filter(item => item != image)})
    }
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
                            Select Cover Image
                        </label>
                        <div className="form-icon-select large">
                            <img src={gallery.cover_image ? gallery.cover_image : `${placeImg}1500x1200`} alt="" />
                            <button
                            onClick={(e) => handleImageSelection(e, "PROPERTY_COVER")}
                            className="form-icon-select-button minw">
                                Select
                                <i className='bx bx-image-alt'></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="form-group">
                        <label className="form-label">
                            Select Gallery Images (One at a time)
                        </label>
                        <div className="form-icon-select multiple">
                            <ul>
                                {gallery && gallery.images && gallery.images.map((image) => (
                                    <li>
                                        <img src={image ? image : `${placeImg}1500x1200`} alt="" />
                                        <i onClick={() => removeImage(image)} class='bx bx-x'></i>
                                    </li>
                                ))}
                            </ul>
                            <button
                            onClick={(e) => handleImageSelection(e, "PROPERTY_GALLERY")}
                            className="form-icon-select-button minw">
                                Add Images
                                <i className='bx bx-image-alt'></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="form-group">
                        <label className="form-label">
                            External Video Link
                        </label>
                        <input type="text"
                        value={gallery.external_video}
                        placeholder="e.g. https://youtu.be/L3BGGVJiPS0"
                        onChange={(e) => setGallery({...gallery, external_video: e.target.value})}
                        className="form-control" />
                        {gallery.external_video ? (<ReactPlayer className="form-video" width={"100%"}  controls={false} light url={gallery.external_video} />) : (
                            <div className="form-video empty">
                                Please enter a video url
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <MediaHandler modalFor={modalFor} clearModal={setModalFor} media={gallery} setSelectedMedia={setGallery} modalState={modalState} setModalState={setModalState} />
        </div>
    )
}

const Policies = ({policies, setPolicies}) => {
    const [cancellationPolicy, setCancellationPolicy] = useState('')
    const addCancellationPolicy = (e) => {
        e.preventDefault()
        if(cancellationPolicy.trim().length > 0 && !policies.cancellation.includes(cancellationPolicy)){
            setPolicies({...policies, cancellation: [...policies.cancellation, cancellationPolicy]})
        }else{
            toast.error("Policy Exists!")
        }
    }

    const removePolicy = (policy) => {
        setPolicies({...policies, cancellation: policies.cancellation.filter(item => item != policy)})
    }
    return (
        <div className="col-12">
            <div className="row">
                <div className="col-12">
                    <p>&nbsp;</p>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <div className="form-group">
                        <label className="form-label">
                            Check-In Time
                        </label>
                        <input
                        type="time"
                        value={policies.check_time.check_in}
                        onChange={(e) => setPolicies({...policies, check_time: {...policies.check_time, check_in: e.target.value}})}
                        className="form-control" />
                    </div>
                </div>
                <div className="col-4">
                    <div className="form-group">
                        <label className="form-label">
                            Check-Out Time
                        </label>
                        <input
                        type="time"
                        value={policies.check_time.check_out}
                        onChange={(e) => setPolicies({...policies, check_time: {...policies.check_time, check_out: e.target.value}})}
                        className="form-control" />
                    </div>
                </div>
                <div className="col-4">
                    <div className="form-group">
                        <label className="form-label">
                            Pet Allowance (Optional)
                        </label>
                        <input
                        type="number"
                        value={policies.extra_charges}
                        onChange={(e) => setPolicies({...policies, extra_charges: e.target.value, pets: e.target.value > 0})}
                        className="form-control" />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="form-group">
                        <label className="form-label">
                            Add Cancellation Policies
                        </label>
                        <div className="row">
                            <div className="col-10">
                                <input type="text"
                                placeholder={"Enter Policy Here"}
                                value={cancellationPolicy}
                                onChange={(e) => setCancellationPolicy(e.target.value)}
                                className="form-control" />
                            </div>
                            <div className="col-2">
                                <button
                                disabled={cancellationPolicy.trim().length === 0}
                                onClick={(e) => addCancellationPolicy(e) }
                                className="form-button full">
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="form-group">
                        <div className="form-lists">
                            <div className="form-lists-header">
                                Cancellation Policies
                            </div>
                            <ul start="1">
                                {policies.cancellation && policies.cancellation.map((policy, i) => (
                                    <li key={i} className="row">
                                        <div className="col-1"><strong>{i+1}.</strong></div>
                                        <div className="col-10"><p>{policy}</p></div>
                                        <div className="col-1">
                                            <i onClick={() => removePolicy(policy)} className='bx bxs-x-circle'></i>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const UpdateProperty = () => {
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
        extra_charges: 0
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

    const handleStep = (step) => {
        if(step === 0 || stepsCompl[step-1]){
            setStep(step)
        }else{
            toast.error("Please complete previous step")
        }
    }

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
                Update Property
            </div>
            <div className="property-form">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="row">
                        <div className="col-12">
                            <div className="form-section-header">
                                <ul className="form-section-header-list">
                                    <li onClick={() => handleStep(0)} className={`${step === 0 && 'active'} `}>Basic Info {stepsCompl[0] && <i class='bx bxs-check-circle'></i>}</li>
                                    <li onClick={() => handleStep(1)} className={`${step === 1 && 'active'} `}>Location {stepsCompl[1] && <i class='bx bxs-check-circle'></i>}</li>
                                    <li onClick={() => handleStep(2)} className={`${step === 2 && 'active'} `}>Amenities {stepsCompl[2] && <i class='bx bxs-check-circle'></i>}</li>
                                    <li onClick={() => handleStep(3)} className={`${step === 3 && 'active'} `}>Gallery {stepsCompl[3] && <i class='bx bxs-check-circle'></i>}</li>
                                    <li onClick={() => handleStep(4)} className={`${step === 4 && 'active'} `}>Policies {stepsCompl[4] && <i class='bx bxs-check-circle'></i>}</li>
                                    <li onClick={() => handleStep(5)} className={`${step === 5 && 'active'} `}>Verification {stepsCompl[5] && <i class='bx bxs-check-circle'></i>}</li>
                                </ul>
                            </div>
                        </div>
                        {step === 0 && <BasicInfo data={basicInfo} setData={setBasicInfo} />}
                        {step === 1 && <Location address={address} setAddress={setAddress} />}
                        {step === 2 && <Amenities amenities={amenities && amenities} loadPre={step === 2} setAmenities={setAmenities} />}
                        {step === 3 && <Gallery gallery={gallery} setGallery={setGallery} />}
                        {step === 4 && <Policies policies={policies} setPolicies={setPolicies} />}
                        
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

export default UpdateProperty
