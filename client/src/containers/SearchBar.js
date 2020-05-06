import React from 'react'
import searchIcon from '../media/magnifying-glass.svg'

const SearchBar = (props) => {
    return (
        <div className='bandSearch'>
            <input className='reviewBandinput' name='searchValue' value={props.value} onChange={props.onchange} onKeyDown={(e)=>e.key === 'Enter'?props.fetchArtist():null} placeholder={props.placeholder} />
            <div  className='submitSearch' onClick={props.fetchArtist}>
                <img className='searchButton' src={searchIcon} alt='search icon'></img>
            </div>
        </div>
    )
}



export default SearchBar
