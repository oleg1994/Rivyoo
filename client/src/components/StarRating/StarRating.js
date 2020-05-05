import React, { useState } from 'react'
import './StarRating.css'
import starEmpty from '../../media/starEmpty.svg'
import starFull from '../../media/starFull.svg'


function StarRating(props) {
    const [hover, sethover] = useState(null)
    return (
        <div className='starWrapper'>
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                    <label key={i} style={{pointerEvents:props.clickable}}>
                        <input
                            className='radioStar'
                            type='radio'
                            name='rating'
                            value={ratingValue}
                            onClick={props.onclick}
                        />
                        {
                            <img
                                className='star'
                                src={ratingValue <= (hover || props.rating) ? starFull : starEmpty}
                                onMouseEnter={() => sethover(ratingValue)}
                                onMouseOut={() => sethover(null)} 
                                />
                        }

                    </label>
                )
            })}
        </div>
    )
}



export default StarRating


