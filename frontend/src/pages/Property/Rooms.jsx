import React, { useState, useEffect } from "react"
import "./rooms.scss"
import "./style.scss"
import { useParams, useNavigate } from "react-router-dom"
import MediaHandler from "../../components/media"
import { toast } from "react-toastify"
import { addRoom, getRooms } from "../../actions/property"
import { useSelector } from "react-redux"
const placeImg = "https://placehold.jp/30/a8a8a8/ffffff/300x150.png?text="

const RoomCard = ({room}) => {
    return (
        <div className="property-rooms-card">
            <div className="row">
                <div className="col-12 card-title d-flex justify-between">
                    {room.title}
                    <span className="card-number">
                        Room No: {room.roomNo}
                    </span>
                </div>
                <div className="col-4 card-specs">
                    <p><i class='bx bx-area' ></i>{room.area}</p>
                    <p><i class='bx bx-dock-left'></i>{room.view}</p>
                    <p><i class='bx bx-bed' ></i>{room.area}</p>
                </div>
            </div>
        </div>
    )
}

const AllRooms = ({propId}) => {
    const [rooms, setRooms] = useState([])
    
    useEffect(() => {
        const loadRooms = async() => {
            try{
                let res = await getRooms(propId)
                let {data} = res
                setRooms(data)
            }catch(err){
                console.log(err)
            }
        }
        loadRooms()
    },[])
    return(
        <div className="property-rooms">
            {rooms.length > 0 
            ? rooms.map((room, i) => <RoomCard key={i} room={room} />)
            : "No Rooms Available"
            }
        </div>
    )
}

const Rooms = () => {
    const navigate = useNavigate()
    const params = useParams()
    const [addView, setAddView] = useState(false)
    const {auth} = useSelector((state) => ({...state}))
    const {token} = auth
    const [modalState, setModalState] = useState(false)
    const [modalFor, setModalFor] = useState('')
    const [sameRooms, setSameRooms] = useState(1)
    const roomTypes = ["Single","Double","Twin", "Twin/Double","Triple","Quadruple","Family","Studio","Suite","Apartment","Villa","Hostel"]
    const [room, setRoom] = useState({
        title: '',
        roomNo: '',
        about: '',
        area: '',
        view: '',
        roomType: 'Single',
        beds: {
            single: 0,
            double: 0,
            queen: 0,
            king: 0,
            bunk: 0,
            sofa: 0,
            mat: 0
        },
        capacity: 2,
        extraBed: true,
        specialNote: '',
        amenities: [],
        images: [],
        policies: {
            cancellation: [],
            refund: ''
        },
        basePrice: {
            mrp: null,
            sale: null
        },
        propertyId: params.propertyId
    })

    //handle Amenities
    const [amenity, setAmenity] = useState('')
    const [amenityCategory, setAmenityCategory] = useState("Basic Facilities")
    const [amCategories, setAmCategories] = useState(["Basic Facilities","Transportation","Family and kids","Food and Drinks","Safety and Security","Other Facilities"])
    const addAmenity = (e) => {
        e.preventDefault()
        if(amenity.trim().length > 0 && !room.amenities.filter(ams => ams.category === amenityCategory).map((item) => item.title).includes(amenity)){
            let ament = {
                category: amenityCategory,
                title: amenity
            }
            setRoom({...room, amenities: [...room.amenities, ament]})
        }else{
            toast.error("Policy Exists!")
        }
        setAmenity('')
    }
    const removeAmenity = (cat, amen) => {
        let amens = room.amenities.filter(item => JSON.stringify(item) !== JSON.stringify({category: cat, title: amen}))
        setRoom({...room, amenities: amens})
    }

    //handle cancellation policies
    const [cancellationPolicy, setCancellationPolicy] = useState('')
    const addCancellationPolicy = (e) => {
        e.preventDefault()
        if(cancellationPolicy.trim().length > 0 && !room.policies.cancellation.includes(cancellationPolicy)){
            setRoom({...room, policies: {...room.policies, cancellation: [...room.policies.cancellation, cancellationPolicy]}})
        }else{
            toast.error("Policy Exists!")
        }
        setCancellationPolicy('')
    }
    const removePolicy = (policy) => {
        setRoom({...room, policies: {...room.policies, cancellation: room.policies.cancellation.filter(item => item !== policy)}})
    }

    const [validate, setValidate] = useState(false)

    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            let res = await addRoom(token, room)
            if(res.status === 200){
                toast.success("Room Added")
                setAddView(false)
            }

        }catch(err){
            if(err.response.status === 400) toast.error(`${err.response.data}`)
        }
    }
    const handleImageSelection = (e,msg) => {
        e.preventDefault()
        setModalFor(msg)
        setModalState(true)
    }

    const handleCaption = (caption, i) => {
        let imageArray = room.images
        imageArray[i].caption = caption
        setRoom({...room, images: imageArray})
    }
    
    const removeImage = (image) => {
        setRoom({...room, images: room.images.filter(item => item !== image)})
    }
    useEffect(() => {
        setValidate(room.title && room.about && room.area
            && room.beds && room.capacity
            && room.images && room.policies.cancellation.length && room.policies.refund && room.basePrice.mrp
            && room.propertyId)
    },[room])
    return (
        <div className="property">
            <div className="preview-header">
                <div onClick={() => navigate("/properties")} className="preview-header-back">
                    <i class='bx bx-left-arrow-alt'></i> Back
                </div>
                <p>&nbsp;</p>
            </div>
            <div className="property-header">
                    {addView ? 
                    <div className="d-flex justify-between">
                        Add New Room
                        <button
                        onClick={() => setAddView(false)}
                        className="form-button">
                            View All Rooms
                        </button>
                    </div>
                    : 
                    <div className="d-flex justify-between">
                        Rooms
                        <button
                        onClick={() => setAddView(true)}
                        className="form-button">
                            Add Room
                        </button>
                    </div> }
            </div>
            {addView ? (
                <div className="property-form">
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className="row">
                            <div className="col-12">
                                <div className="form-group">
                                    <label className="form-label">Room Title*</label>
                                    <input
                                    value={room.title}
                                    required
                                    placeholder="e.g. Double Delux Room"
                                    onChange={(e) => setRoom({...room, title: e.target.value})}
                                    type="text" className="form-control" />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group">
                                    <label className="form-label">About Room*</label>
                                    <textarea
                                    value={room.about}
                                    required
                                    placeholder="Short info of the room"
                                    onChange={(e) => setRoom({...room, about: e.target.value})}
                                    className="form-control ta" />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="row">
                                    <div className="col-5">
                                        <div className="form-group">
                                            <label className="form-label">Room Type*</label>
                                            <select
                                            value={room.roomType}
                                            onChange={(e) => setRoom({...room, roomType: e.target.value})}
                                            className="form-control">
                                                {roomTypes.map((r,i) => <option value={r} key={i}>{r}</option>)}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Room Capacity*</label>
                                            <select
                                            value={room.capacity}
                                            onChange={(e) => setRoom({...room, capacity: e.target.value})}
                                            className="form-control">
                                                {[...Array(9).keys()].map((i) => (
                                                    <option key={i} value={i+2}>{i+2} Persons</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Extra Beds</label>
                                            <select
                                            value={room.extraBed}
                                            onChange={(e) => setRoom({...room, extraBed: e.target.value})}
                                            className="form-control">
                                                <option value={true}>Available</option>
                                                <option value={false}>Not Available</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-7">
                                        <div className="form-group">
                                            <label className="form-label">
                                                Bed Options
                                            </label>
                                            <div className="property-rooms-greybox">
                                        <div className="row scale-down">
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label className="form-label">Single Beds*</label>
                                                <input
                                                value={room.beds.single}
                                                placeholder="e.g. 625 sq.ft"
                                                required
                                                onChange={(e) => setRoom({...room, beds: {...room.beds, single: e.target.value}})}
                                                type="number" className="form-control" />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Double Beds*</label>
                                                <input
                                                value={room.beds.single}
                                                placeholder="e.g. 625 sq.ft"
                                                required
                                                onChange={(e) => setRoom({...room, beds: {...room.beds, single: e.target.value}})}
                                                type="number" className="form-control" />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Queen Size Beds*</label>
                                                <input
                                                value={room.beds.single}
                                                placeholder="e.g. 625 sq.ft"
                                                required
                                                onChange={(e) => setRoom({...room, beds: {...room.beds, single: e.target.value}})}
                                                type="number" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label className="form-label">King Size Beds*</label>
                                                <input
                                                value={room.beds.single}
                                                placeholder="e.g. 625 sq.ft"
                                                required
                                                onChange={(e) => setRoom({...room, beds: {...room.beds, single: e.target.value}})}
                                                type="number" className="form-control" />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Bunk Beds*</label>
                                                <input
                                                value={room.beds.single}
                                                placeholder="e.g. 625 sq.ft"
                                                required
                                                onChange={(e) => setRoom({...room, beds: {...room.beds, single: e.target.value}})}
                                                type="number" className="form-control" />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Sofa Beds*</label>
                                                <input
                                                value={room.beds.single}
                                                placeholder="e.g. 625 sq.ft"
                                                required
                                                onChange={(e) => setRoom({...room, beds: {...room.beds, single: e.target.value}})}
                                                type="number" className="form-control" />
                                            </div>
                                        </div>
                                        </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="form-group">
                                    <label className="form-label">Room Area*</label>
                                    <input
                                    value={room.area}
                                    placeholder="e.g. 625 sq.ft"
                                    required
                                    onChange={(e) => setRoom({...room, area: e.target.value})}
                                    type="text" className="form-control" />
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="form-group">
                                    <label className="form-label">View</label>
                                    <input
                                    value={room.view}
                                    placeholder="e.g. Jungle View"
                                    onChange={(e) => setRoom({...room, view: e.target.value})}
                                    type="text" className="form-control" />
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="form-group">
                                    <label className="form-label">Special Note</label>
                                    <input
                                    value={room.specialNote}
                                    placeholder="e.g. Honeymoon Suite"
                                    onChange={(e) => setRoom({...room, specialNote: e.target.value})}
                                    type="text" className="form-control" />
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="form-group">
                                    <label className="form-label">MRP*</label>
                                    <input
                                    value={room.basePrice.mrp}
                                    placeholder="e.g. 2500"
                                    required
                                    onChange={(e) => setRoom({...room, basePrice: {...room.basePrice, mrp: e.target.value}})}
                                    type="number" className="form-control" />
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="form-group">
                                    <label className="form-label">Sale Price</label>
                                    <input
                                    value={room.basePrice.sale}
                                    placeholder="e.g. 2000"
                                    onChange={(e) => setRoom({...room, basePrice: {...room.basePrice, sale: e.target.value}})}
                                    type="number" className="form-control" />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label className="form-label">Number of rooms (of this type)</label>
                                    <input
                                    value={sameRooms}
                                    onChange={(e) => setSameRooms(e.target.value)}
                                    type="number" className="form-control" />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group">
                                    <label className="form-label">
                                        Select Images* (One at a time)
                                    </label>
                                    <div className="form-icon-select multiple caption">
                                        <ul>
                                            {room && room.images && room.images.map((image, i) => (
                                                <li key={i}>
                                                    <img src={image.url ? image.url : `${placeImg}1000x1000`} alt="" />
                                                    <input
                                                    onChange={(e) => handleCaption(e.target.value, i)}
                                                    placeholder="Image for..."
                                                    type="text" value={image.caption} />
                                                    <i onClick={() => removeImage(image)} class='bx bx-x'></i>
                                                </li>
                                            ))}
                                        </ul>
                                        <button
                                        onClick={(e) => handleImageSelection(e, "ROOM_IMAGES")}
                                        className="form-icon-select-button minw">
                                            Add Images
                                            <i className='bx bx-image-alt'></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="form-group">
                                    <label className="form-label">Amenity Type</label>
                                    <select
                                    value={amenityCategory}
                                    onChange={(e) => setAmenityCategory(e.target.value)}
                                    className="form-control">
                                        {amCategories.map((amCat, i) => 
                                            <option key={i} value={amCat}>{amCat}</option>
                                        )}
                                        
                                    </select>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-group">
                                    <label className="form-label">Amenity</label>
                                    <input
                                    value={amenity}
                                    required
                                    placeholder="e.g. Double Delux Room"
                                    onChange={(e) => setAmenity(e.target.value)}
                                    type="text" className="form-control" />
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="form-group">
                                    <label className="form-label">&nbsp;</label>
                                <button
                                disabled={amenity.trim().length === 0}
                                onClick={(e) => addAmenity(e) }
                                className="form-button full">
                                    Add
                                </button>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group">
                                    <label className="form-label">Amenities Added</label>
                                    <div className="form-lists">
                                        {room && room.amenities.length > 0 ? amCategories.map((amCat, i) => room.amenities.filter(am => am.category === amCat).length > 0 && (
                                            <div key={i}>
                                                <div className="form-lists-header">
                                                    {amCat}
                                                </div>
                                                <ul start="1">
                                                    {room.amenities && room.amenities.filter((fl) => fl.category === amCat).map((item, i) => (
                                                        <li key={i} className="row">
                                                            <div className="col-1"><strong>{i+1}.</strong></div>
                                                            <div className="col-10"><p>{item.title}</p></div>
                                                            <div className="col-1">
                                                                <i onClick={() => removeAmenity(item.category, item.title)} className='bx bxs-x-circle'></i>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )): "No Amenities Added"}
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="form-group">
                                    <label className="form-label">
                                        Add Cancellation Policies*
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
                                            {room.policies.cancellation && room.policies.cancellation.map((policy, i) => (
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
                            <div className="col-12">
                                <div className="form-group">
                                    <label className="form-label">Refund Policy*</label>
                                    <textarea
                                    value={room.policies.refund}
                                    placeholder="e.g. This booking is non-refundable and the tariff cannot be cancelled with zero fee."
                                    onChange={(e) => setRoom({...room, policies: {...room.policies, refund: e.target.value}})}
                                    className="form-control ta" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="form-section-footer d-flex justify-end">
                                    <button
                                    disabled={!validate}
                                    onClick={(e) => handleSubmit(e)}
                                    className="form-button bg-purple">
                                        Publish Room
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            ) : (
                <AllRooms propId={params.propertyId} />
            )}
            
            <MediaHandler modalFor={modalFor} clearModal={setModalFor} media={room} setSelectedMedia={setRoom} modalState={modalState} setModalState={setModalState} />
        </div>
    )
}

export default Rooms