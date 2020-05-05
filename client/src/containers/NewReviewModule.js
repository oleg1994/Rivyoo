import React from 'react'

function NewReviewModule(props) {
    return (
        <div className='bandPreview'>
            {props.bandsData.artists ?
                <div className='bandContainer'>
                    <img className='bandLogo' src={props.bandsData.artists[0].strArtistThumb + '/preview'}></img>
                    <div className='bandShortInfo'>
                        <div className='bandname'>Name: {props.bandsData.artists[0].strArtist}</div>
                        <div className='bandname'>Formed: {props.bandsData.artists[0].intFormedYear}</div>
                        <div className='bandname'>Genre: {props.bandsData.artists[0].strGenre}</div>
                    </div>
                </div>
                :
                <div className='bandContainer'>
                    <div className='bandLogo'>LOGO</div>
                    <div className='bandShortInfo'>
                        <div className='bandname'>Name: unknown</div>
                        <div className='bandname'>Formed: unknown</div>
                        <div className='bandname'>Genre: unknown</div>
                    </div>
                </div>
            }
        </div>
    )
}



export default NewReviewModule

