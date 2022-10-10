import React, { useState } from 'react';
import AutoComplete from './Map';
import "./style.scss"

const AnyReactComponent = ({ text }) => (
    <div className="property-map-marker">
        {/* <span className="property-map-marker-text">
            {text}
        </span> */}
        <i className='bx bxs-map property-map-marker' ></i>
    </div>
);
const UpdateProperty = () => {
    const [address, setAddress] = useState(null)
    return(
        <div className="property-map">
            <AutoComplete setAddress={setAddress}/>
            {address && JSON.stringify(address, null, 4)}
            <p>&nbsp;</p>
            {/* {address && address.geometry.location.lat()} &nbsp;
            {address && address.geometry.location.lng()} */}
        </div>
    )
}

export default UpdateProperty
