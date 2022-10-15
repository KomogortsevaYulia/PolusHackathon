import { useEffect, useRef, useState } from 'react'
import { Calendar } from 'react-date-range'
import format from 'date-fns/format'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar} from "@fortawesome/free-solid-svg-icons";

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

const DateRangeComp= () => {    
    const [calendar, setCalendar] = useState('');
    const [open, setOpen] = useState(false);
    const refOne = useRef(null)

    useEffect(() =>{
        setCalendar(format(new Date(),'MM/dd/yyyy'))
        document.addEventListener("keydown", hideOnEscape, true)
        document.addEventListener("click", hideOnClickOutside, true)
    }, [])

    const hideOnEscape = (e) => {
        if (e.key === "Escape"){
            setOpen(false)
        }
    }

    const hideOnClickOutside = (e) => {
        if (refOne.current && ! refOne.current.contains(e.target)){
            setOpen(false)
        }
    }

    const handleSelect = (date) => {
        setCalendar(format(date,'MM/dd/yyyy'))
    }

    return(
        <div className = "calendarWrap ">
            <button 
                className = "btn btn-calendar btn-secondary dropdown-toggle"
                type="button" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
                onClick={() => setOpen(open => !open)}>
                     <FontAwesomeIcon icon={faCalendar} className = ""/>
                        {calendar}
            </button>
            <div ref = {refOne}>    
                {open &&
                    <Calendar
                        date = {new Date()}
                        onChange = {handleSelect}
                        className = "calendarElement"
                    /> 
                }
            </div>
        </div>
    );
}

export default DateRangeComp;