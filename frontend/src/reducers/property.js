let propertyState = {
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

let propCompletedStage = 0;

export const propertyReducer = (state = {...propertyState}, action) => {
    switch(action.type){
        case "PROPERTY_UPDATE":
            return {...state, ...action.payload};
        case "PROPERTY_CLEAR":
            return action.payload;
        default:
            return state;
    }
}

export const propertyAddStageReducer = (state = {...propCompletedStage}, action) => {
    switch(action.type){
        case "PROPERTY_ADD_STATE":
            return {...state, ...action.payload};
        case "PROPERTY_ADD_CLEAR":
            return action.payload;
        default:
            return state;
    }
}