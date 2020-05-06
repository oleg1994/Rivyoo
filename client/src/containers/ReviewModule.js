import React, { useState } from 'react'
import StarRating from '../components/StarRating/StarRating'

const ReviewModule = (props) => {
    const [viewFull, setViewFull] = useState(false)
    return (
            <div className='reviewCard'>
                <img className='bandBanner' src={props.banner}></img>
                <div className='reviewDate'>{new Date(props.date).toString().substring(3, 21)}</div>
                <div className='authorAndRating'><div><h3>Review Author:</h3>{props.author}</div><div className='reviewRating'><h3>Rated:</h3><StarRating rating={props.rating} clickable={'none'} /></div></div>
                <div className='reviewParts'><h3>Artist:</h3> {props.artist}</div>
                <div className='reviewParts'><h3>Review:</h3> {viewFull ? props.review : props.review.slice(0, 100)}</div>
                <div className='reviewMore' onClick={() => { setViewFull(!viewFull) }}>{viewFull ? 'Read less...' : 'Read more...'}</div>
            </div>
    )
}



export default ReviewModule








