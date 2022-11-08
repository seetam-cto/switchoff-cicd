import React, {useState, useEffect, useRef} from 'react'
import './new.scss'
import { getPropertyTypes, getExperiences, getAmenities } from '../../actions/attributes'
import { State } from 'country-state-city';
import { GMapify } from  'g-mapify';
import AutoComplete from './Map';
import  'g-mapify/dist/index.css';
import MediaHandler from '../../components/media';
import ReactPlayer from 'react-player'
import { toast } from 'react-toastify';
import { addProperty, updateProperty } from '../../actions/property';
import {useDispatch, useSelector} from "react-redux"
import { useNavigate, useParams } from 'react-router-dom';
const placeImg = "https://placehold.jp/30/a8a8a8/ffffff/300x150.png?text="

//property structure
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



//step 1 - POC Details

const POCDetails = ({state, setState, saveState}) => {
    return (
        <div className="new-box">

        </div>
    )
}


const NewProperty = () => {
    const {property} = useSelector((state) => ({...state}))
    const {auth} = useSelector((state) => ({...state}))
    const params = useParams()
    const [propId, setPropId] = useState({})
    const {token} = auth
    const [stage, setStage] = useState("") 
    const [stages, setStages] = useState({
        poc: {
            name: '',
            phone: '',
            verified: false
        },
        prop_basic: {
            name: '',
            type: '',
            content: '',
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
        },
        amenities: [],
        experience_tags: [],
        gallery: {
            cover_image: '',
            images: [],
            external_video: '',
            videos: []
        },
        verification: {
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
        rooms: [
            {
                roomNo: '',
                roomType: '',
                area: '',
                view: '',
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
                images: [],
                policies: {
                    cancellation: [],
                    refund: ''
                },
                basePrice: {
                    mrp: 0,
                    sale: 0
                },
                amenities: [],
                propertyId: params.propertyId
            }
        ]
    })
  return (
    <div className="new">
        
    </div>
  )
}

export default NewProperty