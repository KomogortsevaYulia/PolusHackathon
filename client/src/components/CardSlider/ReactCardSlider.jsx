import React from 'react'
import "./ReactCardSliderStyle.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft, faChevronCircleRight} from "@fortawesome/free-solid-svg-icons";

const ReactCardSlider = () =>{
    return(
        <div className = "main-slider-container col-8">
            <FontAwesomeIcon className='left-slider-icon' icon={faChevronCircleLeft} color = "white" size = "3x"/>
            <div className='slider'></div>
            <FontAwesomeIcon className='right-slider-icon' icon={faChevronCircleRight} color = "white" size = "3x" />
        </div>
    );
}

export default ReactCardSlider;