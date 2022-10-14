import React, { useRef, useEffect, useState } from 'react';
import "./map.scss"
import { State } from 'country-state-city';

const AutoComplete = ({address, setAddress, disabled}) => {
    const autoCompleteRef = useRef();
    const inputRef = useRef();
    const [location, setLocation] = useState({
        full_address: '',
        state: '',
        country: '',
        region: '',
        pincode: '',
        map: {
            lat: '',
            lng: ''
        }
    })

    useEffect(() => {
        setLocation(address)
    },[])

    const checkState = (stateName, countryCode) => {
        let states = State.getStatesOfCountry(countryCode)
        states = states.map((st) => st.name)
        if(states.includes(stateName)){
            return stateName
        }else{
            return false
        }
    }

    const options = {
     fields: ["address_components", "formatted_address", , "geometry", "name"],
     types: ["establishment"]
    };
    useEffect(() => {
        autoCompleteRef.current = new window.google.maps.places.Autocomplete(
         inputRef.current,
         options
        );
        autoCompleteRef.current.addListener("place_changed", async function () {
         const place = await autoCompleteRef.current.getPlace();
         let {address_components, geometry, name} = place
         console.log(address_components, geometry, name)
         setAddress({
            full_address: name + " " + address_components.map((a) => a.long_name).join(", "),
            country: address_components[address_components.length - 2].long_name,
            code: address_components[address_components.length - 2].short_name,
            pincode: address_components[address_components.length - 1].long_name,
            state: checkState(address_components[address_components.length - 3].long_name, address_components[address_components.length - 2].short_name),
            map: {
                lat: geometry.location.lat(),
                lng: geometry.location.lng()
            }
         })
        });
       }, []);
    return (
     <div className="form-group">
      <label className="form-label">Search your Property</label>
      <input disabled={disabled} className="form-control" ref={inputRef} />
     </div>
    );
};

   export default AutoComplete;