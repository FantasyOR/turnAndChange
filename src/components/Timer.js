import React from 'react'

var Timer =  (props) => {
    return(
        <div className="timer">
            <span>Action:</span>
            <ul>
                <li>Countdown: {props.countdown} second</li>
                 <li>Ring: {props.action.ring}</li>
                <li>Direction: {(['clockwise', 'stop', 'counterclockwise'])[props.action.direction]}</li>
                <li>Distance: {props.action.distance} sectors</li> 
            </ul>
        </div>
    )
};


export default Timer;