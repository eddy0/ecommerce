import React from 'react'
import {FaRegStar, FaStar, FaStarHalfAlt} from 'react-icons/fa'


function Rating({value, text, color}) {
    return (
        <div className={'rating '}>
            {
                Array(5).fill(0).map((n, i) => {
                        let t = <FaRegStar color={color} key={i}/>
                        if (value > (i + 1)) {
                            t = (
                                <FaStar color={color} key={i}/>
                            )
                        } else if (value >= (i + 0.5)) {
                            t = <FaStarHalfAlt color={color} key={i}/>
                        }
                        return t

                    }
                )
            }
            <span>{text && text}</span>
        </div>
    )
}

export default Rating