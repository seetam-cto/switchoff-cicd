import React, {useState} from 'react'
import "./style.scss"
import {Country} from 'country-state-city'
import getSymbolFromCurrency from 'currency-symbol-map'

const FLAG_PATH = "https://countryflagsapi.com/svg/"

const CountryAutoComplete = (props) => {
    const allCon =  Country.getAllCountries()
    const [active, setActive] = useState(0);
    const [filtered, setFiltered] = useState([]);
    const [isShow, setIsShow] = useState(false);
    const [input, setInput] = useState("")

    const setFields = (nameInp) => {
        const contr = allCon[props.suggestions.indexOf(nameInp)]
        props.setter({...props.value, 
            name: nameInp,
            code: contr.isoCode,
            isd: contr.phonecode,
            cur: contr.currency,
            cur_symbol: getSymbolFromCurrency(contr.currency),
            lat_lon: {
                lat: contr.latitude,
                lon: contr.longitude
            },
            icon: `${FLAG_PATH}${allCon[props.suggestions.indexOf(nameInp)].isoCode.toString().toLowerCase()}`
        })
    }
  
    const onChange = e => {
        const { suggestions } = props;
        const input = e.currentTarget.value;
        const newFilteredSuggestions = suggestions.filter(
        suggestion =>
            suggestion.toLowerCase().indexOf(input.toLowerCase()) > -1
        );

            

        setActive(0);
        setFiltered(newFilteredSuggestions);
        setIsShow(true);
        setInput(e.currentTarget.value)
        // props.setter({...props.value, name: input})
    };
    const onClick = e => {
        setActive(0);
        setFiltered([]);
        setIsShow(false);
        setInput(e.currentTarget.innerText)
        setFields(e.currentTarget.innerText)
        // props.setter({...props.value, name: e.currentTarget.innerText})
    };
    const onKeyDown = e => {
        if (e.keyCode === 13) { // enter key
        setActive(0);
        setIsShow(false);
        setInput(filtered[active])
        setFields(filtered[active])
        // props.setter({...props.value, name: filtered[active]})
        }
        else if (e.keyCode === 38) { // up arrow
        return (active === 0) ? null : setActive(active - 1);
        }
        else if (e.keyCode === 40) { // down arrow
        return (active - 1 === filtered.length) ? null : setActive(active + 1);
        }
    };
    const renderAutocomplete = () => {
        if (isShow && input) {
        if (filtered.length) {
            return (
            <ul className="autocomplete">
                {filtered.map((suggestion, index) => {
                let className;
                if (index === active) {
                    className = "active";
                }
                return (
                    <li className={className} key={suggestion} onClick={onClick}>
                    {suggestion}
                    </li>
                );
                })}
            </ul>
            );
        } else {
            return (
            <div className="no-autocomplete">
                <em>Not found</em>
            </div>
            );
        }
        }
        return <></>;
    }
    return (
        <div className="country">
        <input
            type="text"
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={input}
            className="form-control"
            placeholder='Select Country'
        />
        {renderAutocomplete()}
        </div>
    );
}

export default CountryAutoComplete