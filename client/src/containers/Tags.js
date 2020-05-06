import React from 'react'

function Tags(props) {
    return (
        <div className='tagsWrapper'>
            <div className='tagsStatic' onClick={props.sort}>Latest</div>
            <div className='tagsStatic' onClick={props.sort}>Oldest</div>
            {props.array[0] ?
                props.array.map((review, i) => {
                    return (
                        <div key={i} className='tags' onClick={props.sort}>{review.artist.toLowerCase()}</div>
                    )
                })
                : null
            }
            <div className='tagsStatic' onClick={props.sort}>Show All</div>
        </div>
    )
}



export default Tags

