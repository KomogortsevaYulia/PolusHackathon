import { useEffect, useRef, useState } from 'react'
import { Calendar } from 'react-date-range'
import format from 'date-fns/format'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

const CalendarComp = () => {    
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
        <div className = "calendarWrap">

            <input
                value = { calendar }
                readOnly
                className='inputBox'    
                onClick={() => setOpen(open => !open)}
            />

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

export default CalendarComp;