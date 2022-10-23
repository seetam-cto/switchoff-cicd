import React, {useEffect, useState} from "react"
import DashboardWrapper, { DashboardWrapperMain, DashboardWrapperRight } from "../../components/dashboard-wrapper/DashboardWrapper"
import "./style.scss"
import "../../components/forms/style.scss"
import Tabs, {TabHead, Tab} from "../../components/tabs"
import { getLocations, addLocation } from "../../actions/locations"
import Table, {TableHead, TH} from "../../components/table"
import MediaHandler from "../../components/media"
import {Country, State} from 'country-state-city'
import CountryAutoComplete from "../../components/forms/specials/CountrySelector"
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const placeImg = "https://placehold.jp/30/a8a8a8/ffffff/300x150.png?text="

const AddCountry = ({refreshCountries, ifUpdate, setIfUpdate}) => {
    const {auth} = useSelector((state) => ({...state}))
    const {token} = auth
    const [country, setCountry] = useState({
        name: '',
        about: '',
        icon: '',
        cover_image: '',
        location_type: 'country',
        code: '',
        isd: '',
        cur: '',
        cur_symbol: '',
        lat_lon: {
            lat: '',
            lon: ''
        }
    })

    const clearForm = (e) => {
        e.preventDefault()
        setCountry({
            name: '',
            about: '',
            icon: '',
            cover_image: '',
            location_type: 'country',
            code: '',
            isd: '',
            cur: '',
            cur_symbol: '',
            lat_lon: {
                lat: '',
                lon: ''
            }
        })
    }

    const handleCountryAdd = async (e) => {
        e.preventDefault()
        try{
            let res = await addLocation(token, country)
            if(res.status === 200) toast.success("Country Added!")
            refreshCountries()
        }catch(err){
            if(err.response.status === 400) toast.error(`${err.response.data}`)
        }
    }

    const [modalState, setModalState] = useState(false)
    const [modalFor, setModalFor] = useState('')
    const [aboutChar, setAboutChar] = useState(300)

    const handleFlag = (e) => {
        e.preventDefault()
        // setModalFor("COUNTRY_FLAG")
        // setModalState(true)
    }

    const handleCover = (e) => {
        e.preventDefault()
        setModalFor("COUNTRY_COVER")
        setModalState(true)
    }

    const [countries, setCountries] = useState([])
    const allCon =  Country.getAllCountries()

    useEffect(() => {
        const initCountries = () => {
            let contrs = []
            for(var i=0; i < allCon.length;i++){
                contrs.push(allCon[i].name)
            }
            setCountries(contrs)
        }
        initCountries()
    },[allCon])

    return (
        <Tab className="bg-white">
            <div className="row">
                <div className="col-12">
                    {ifUpdate.country ? (
                    <button className="form-button">
                        Update Country &nbsp;<i class='bx bx-x-circle' ></i>
                    </button>
                    ) : (
                        <div className="title">
                        Add Country
                    </div>
                    )}
                </div>
                <div className="form-container p-6 np-b">
                    <form onSubmit={(e) => handleCountryAdd(e)}>
                    <div className="row">
                        <div className="col-7">
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group">
                                        <label className="form-label">
                                            Country Name
                                        </label>
                                        <CountryAutoComplete
                                        value={country}
                                        setter={setCountry}
                                        suggestions={countries && countries}/>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="form-group">
                                        <label className="form-label">
                                            Country Code
                                        </label>
                                        <input
                                        placeholder="e.g. IN"
                                        value={country.code}
                                        onKeyDown={(e) => e.preventDefault()}
                                        onChange={(e) => setCountry({...country, code: e.target.value})}
                                        type="text" className="form-control cap" disabled/>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="form-group">
                                        <label className="form-label">
                                            ISD Code
                                        </label>
                                        <input
                                        placeholder="e.g. +91"
                                        value={country.isd }
                                        onKeyDown={(e) => e.preventDefault()}
                                        onChange={(e) => setCountry({...country, isd: e.target.value})}
                                        type="number" className="form-control" disabled/>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="form-group">
                                        <label className="form-label">
                                            Currency
                                        </label>
                                        <div className="currency">
                                        <input
                                        placeholder="e.g. INR"
                                        value={country.cur}
                                        onKeyDown={(e) => e.preventDefault()}
                                        onChange={(e) => setCountry({...country, cur: e.target.value})}
                                        type="text" className="form-control" disabled/>
                                        <span className="currency-symbol">
                                            {country.cur_symbol}
                                        </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-5">
                            <div className="row">
                                <div className="col-5">
                                    <div className="form-group">
                                        <label className="form-label">
                                            Flag
                                        </label>
                                        <div className="form-icon-select">
                                            <img src={country.icon && country.icon ? country.icon : `${placeImg}150x100`} alt="" />
                                            <button
                                            onClick={(e) => handleFlag(e)}
                                            disabled
                                            className="form-icon-select-button">
                                                Select 
                                                <i className='bx bx-image-alt'></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-7">
                                    <div className="form-group">
                                        <label className="form-label">
                                            Cover Image
                                        </label>
                                        <div className="form-icon-select">
                                            <img src={country.cover_image ? country.cover_image : `${placeImg}1500x1200`} alt="" />
                                            <button
                                            onClick={(e) => handleCover(e)}
                                            className="form-icon-select-button">
                                                Select
                                                <i className='bx bx-image-alt'></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="form-group">
                                <label className="form-label">
                                    About Country - <span style={{color: aboutChar > 300 ? 'red' : 'green'}}>{aboutChar}</span>
                                </label>
                                <textarea
                                placeholder="Try to keep it under 300 characters"
                                value={country.about}
                                onChange={(e) => {setCountry({...country, about: e.target.value}); setAboutChar(e.target.value.length)}}
                                className="form-control ta" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 d-flex justify-end">
                            <button
                            onClick={(e) => clearForm(e)}
                            className="form-button clear">
                                Clear
                            </button>
                            <span>&nbsp;&nbsp;&nbsp;</span>
                            <button
                            onClick={(e) => handleCountryAdd(e)}
                            className="form-button">
                                Save
                            </button>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
            <MediaHandler modalFor={modalFor} clearModal={setModalFor} media={country} setSelectedMedia={setCountry} modalState={modalState} setModalState={setModalState} />
        </Tab>
    )
}

const Countries = ({refresh}) => {
    const [countries, setCountries] = useState()
    const loadCountries = async () => {
        try{
            let res = await getLocations("country")
            let {data} = res
            setCountries(data)
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        loadCountries()
    },[refresh])
    return (
            <div className="con-list">
                <div className="row con-list-ul" key={'random-key-3eyudg'}>
                    <div className="col-1 con-list-head">
                        #
                    </div>
                    <div className="col-2 con-list-head">
                        Flag
                    </div>
                    <div className="col-6 con-list-head">
                        Country Name
                    </div>
                    <div className="col-3 con-list-head">
                        Actions
                    </div>
                </div>
                {countries && countries.map((country, i) => (
                    <div className="row con-list-li">
                        <div className="col-1 con-list-body">
                            {i+1}
                        </div>
                        <div className="col-2 con-list-body">
                            <img src={country.icon} alt="" />
                        </div>
                        <div className="col-6 con-list-body">
                            {country.name}
                        </div>
                        <div className="col-3 con-list-body">
                            Edit/Update/Delete
                        </div>
                    </div>
                ))}
            </div>
    )
}

const AddState = ({refreshStates}) => {
    const {auth} = useSelector((state) => ({...state}))
    const {token} = auth
    const [state, setState] = useState({
        name: '',
        about: '',
        icon: '',
        cover_image: '',
        parent: null,
        location_type: 'state',
        code: '',
        isd: '',
        cur: '',
        cur_symbol: '',
        lat_lon: {
            lat: '',
            lon: ''
        }
    })

    const clearForm = (e) => {
        e.preventDefault()
        setState({
            name: '',
            about: '',
            icon: '',
            cover_image: '',
            parent: null,
            location_type: 'state',
            code: '',
            isd: '',
            cur: '',
            cur_symbol: '',
            lat_lon: {
                lat: '',
                lon: ''
            }
        })
    }

    const handleStateAdd = async (e) => {
        e.preventDefault()
        try{
            let res = await addLocation(token, state)
            if(res.status === 200) toast.success("State Added!")
            refreshStates()
        }catch(err){
            if(err.response.status === 400) toast.error(`${err.response.data}`)
        }
    }

    const [modalState, setModalState] = useState(false)
    const [modalFor, setModalFor] = useState('')
    const [aboutChar, setAboutChar] = useState(300)

    const handleCover = (e) => {
        e.preventDefault()
        setModalFor("STATE_COVER")
        setModalState(true)
    }

    const [states, setStates] = useState([])
    const [allStates, setAllStates] = useState([])
    const [selectedCountry, setSelectedCountry] = useState(-1)

    const handleCountrySelect = (e) => {
        let ind = e.target.value
        setSelectedCountry(ind)
        initStates(countries[ind].code)
        setState({...state,
            icon: countries[ind].icon,
            parent: countries[ind]._id,
            isd: countries[ind].isd,
            cur: countries[ind].cur,
            code: countries[ind].code,
            cur_symbol: countries[ind].cur_symbol
        })
    }

    const handleStateSelect = (e) => {
        setState({
            ...state, 
            name: states[e.target.value],
            lat_lon: {
                lat: allStates[e.target.value].latitude,
                lon: allStates[e.target.value].longitude
            }
        })

    }

    const [countries, setCountries] = useState([])
    const loadCountries = async () => {
        try{
            let res = await getLocations("country")
            let {data} = res
            setCountries(data)
        }catch(err){
            console.log(err)
        }
    }

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
        const loadAll = async() => {
            await loadCountries()
        }
        loadAll()
    },[])

    return (
        <Tab className="bg-white">
            <div className="row">
                <div className="col-12">
                    <div className="title">
                        Add State
                    </div>
                </div>
                <div className="form-container p-6 np-b">
                    <form onSubmit={(e) => handleStateAdd(e)}>
                    <div className="row">
                        <div className="col-7">
                            <div className="row z-2">
                                <div className="col-12">
                                    <div className="form-group">
                                        <label className="form-label">
                                            Select Country
                                        </label>
                                        <select
                                        value={selectedCountry}
                                        onChange={(e) => handleCountrySelect(e)}
                                        className="form-control">
                                            <option value={-1}>Select a country</option>
                                            {countries.map((c, i) => (
                                                <option key={i} value={i}>
                                                    {c.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="row z-1">
                                <div className="col-12">
                                    <div className="form-group">
                                        <label className="form-label">
                                            Select State
                                        </label>
                                        <select
                                        onChange={(e) => handleStateSelect(e)}
                                        className="form-control">
                                            {(selectedCountry !== -1 &&  states) ? states.map((s, i) => (
                                                <option key={i} value={i}>
                                                    {s}
                                                </option>
                                            )) : <option>Please Select Country</option>}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-5">
                            <div className="row">
                                <div className="col-7">
                                    <div className="form-group">
                                        <label className="form-label">
                                            Cover Image
                                        </label>
                                        <div className="form-icon-select">
                                            <img src={state.cover_image ? state.cover_image : `${placeImg}1500x1200`} alt="" />
                                            <button
                                            onClick={(e) => handleCover(e)}
                                            className="form-icon-select-button">
                                                Select
                                                <i className='bx bx-image-alt'></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="form-group">
                                <label className="form-label">
                                    About State - <span style={{color: aboutChar > 300 ? 'red' : 'green'}}>{aboutChar}</span>
                                </label>
                                <textarea
                                placeholder="Try to keep it under 300 characters"
                                value={state.about}
                                onChange={(e) => {setState({...state, about: e.target.value}); setAboutChar(e.target.value.length)}}
                                className="form-control ta" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 d-flex justify-end">
                            <button
                            onClick={(e) => clearForm(e)}
                            className="form-button clear">
                                Clear
                            </button>
                            <span>&nbsp;&nbsp;&nbsp;</span>
                            <button
                            onClick={(e) => handleStateAdd(e)}
                            className="form-button">
                                Save
                            </button>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
            <MediaHandler modalFor={modalFor} clearModal={setModalFor} media={state} setSelectedMedia={setState} modalState={modalState} setModalState={setModalState} />
        </Tab>
    )
}

const States = ({refresh}) => {
    const [countries, setCountries] = useState()
    const loadCountries = async () => {
        try{
            let res = await getLocations("state")
            let {data} = res
            setCountries(data)
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        loadCountries()
    },[refresh])
    return (
        <div className="con-list">
                <div className="row con-list-ul" key={'random-key-3eyudg'}>
                    <div className="col-1 con-list-head">
                        #
                    </div>
                    <div className="col-3 con-list-head">
                        Flag/Country
                    </div>
                    <div className="col-5 con-list-head">
                        State Name
                    </div>
                    <div className="col-3 con-list-head">
                        Actions
                    </div>
                </div>
                {countries && countries.map((country, i) => (
                    <div className="row con-list-li">
                        <div className="col-1 con-list-body">
                            {i+1}
                        </div>
                        <div className="col-3 con-list-body">
                            <img src={country.icon} alt="" /> &nbsp; {country.parent.code}
                        </div>
                        <div className="col-5 con-list-body">
                            {country.name}
                        </div>
                        <div className="col-3 con-list-body">
                            Edit/Delete
                        </div>
                    </div>
                ))}
            </div>
    )
}

const Locations = () => {
    const [activeTab, setActiveTab] = useState(1)
    const handleActiveTab = (tid) => {
        setActiveTab(tid)
    } 
    const [crefresh, setCRefresh] = useState('ajskd')
    const [srefresh, setSRefresh] = useState('ajskd')
    const [ifUpdate, setIfUpdate] = useState({
        country: false,
        state: false
    })

    const handleRefreshCountries = () => {
        setCRefresh(Math.random().toString())
    }
    const handleRefreshStates = () => {
        setSRefresh(Math.random().toString())
    }
    return (
        <DashboardWrapper>
            <DashboardWrapperMain>
                <div className="row">
                    <div className="col-4">
                        <TabHead active={activeTab} clickTab={handleActiveTab} tab={1}>
                            <span>
                            <i className='bx bx-map-alt' ></i>
                            Countries
                            </span>
                            <i className='bx bxs-chevron-down-circle'></i>
                        </TabHead>
                    </div>
                    <div className="col-4">
                        <TabHead active={activeTab} clickTab={handleActiveTab} tab={2}>
                            <span>
                            <i className='bx bx-map-pin' ></i>
                            States
                            </span>
                            <i className='bx bxs-chevron-down-circle'></i>
                        </TabHead>
                    </div>
                    <div className="col-4">
                        <TabHead active={activeTab} clickTab={handleActiveTab} tab={3}>
                            <span>
                            <i className='bx bx-map' ></i>
                            Regions
                            </span>
                            <i className='bx bxs-chevron-down-circle'></i>
                        </TabHead>
                    </div>
                </div>
                <Tabs>
                    {activeTab && activeTab === 1 && (
                        <>
                        <AddCountry ifUpdate={ifUpdate} setIfUpdate={setIfUpdate} refreshCountries={handleRefreshCountries} />
                        <Countries refresh={crefresh} />
                        </>
                    )}
                    {activeTab && activeTab === 2 && (
                        <>
                            <AddState refreshStates={handleRefreshStates} />
                            <States refresh={srefresh} />
                        </>
                    )}
                    {activeTab && activeTab === 3 && (
                        <Tab>
                            Hello 3
                        </Tab>
                    )}
                </Tabs>
            </DashboardWrapperMain>
            <DashboardWrapperRight>

            </DashboardWrapperRight>
        </DashboardWrapper>
    )
}

export default Locations
