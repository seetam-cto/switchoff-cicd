import React, {useState, useEffect} from "react"
import "./calendar.scss"
import { useParams } from "react-router-dom"
import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';

const CalendarView = ({}) => {
    const [value, onChange] = useState(new Date());
    const params = useParams()
    return (
        <div className="calendar">
            <Calendar
            minDate={new Date()}
            selectRange={true}
            onChange={onChange}
            value={value} />
            {JSON.stringify(value)}
        </div>
    )
}

export default CalendarView