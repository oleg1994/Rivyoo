import React, { useReducer, useState } from 'react'
import { withRouter } from 'react-router-dom'
import './NewReview.css'
import NewReviewModule from '../../containers/NewReviewModule'
import SearchBar from '../../containers/SearchBar'
import StarRating from '../StarRating/StarRating'

const initialForm = {
    author: '',
    review: '',
    rating: 1,
    artistName: '',
    banner: '',
    searchValue: '',
}

const reducer = (state, { field, value }) => {
    return {
        ...state,
        [field]: value
    }
}
function NewReview(props) {
    const [state, dispatch] = useReducer(reducer, initialForm)
    const [artist, setartist] = useState('')
    const [checkIfSearched, setcheckIfSearched] = useState(false)
    const [errors, setErrors] = useState({})
    const { author, review, rating, artistName, searchValue, banner } = state;

    const onChange = (e) => {
        if (e.target.name === 'searchValue') {
            dispatch({ field: e.target.name, value: e.target.value })
        } else {
            dispatch({ field: e.target.name, value: e.target.value })
        }
    }

    const fetchArtist = () => {
        setcheckIfSearched(false)
        if (searchValue) {
            fetch(`https://theaudiodb.com/api/v1/json/2/search.php?s=coldplay&s=${searchValue.split(' ').join('_')}`)
                .then(res => res.json())
                .then(data => {
                    if (data.artists) {
                        setcheckIfSearched(true)
                        setartist(data)
                        setErrors(prevState => ({
                            ...prevState,
                            ['searchValue']: ``
                        }));
                        console.log(data)
                        state.artistName = data.artists[0].strArtist
                        state.banner = data.artists[0].strArtistBanner ? data.artists[0].strArtistBanner : `https://via.placeholder.com/468x60?text=${data.artists[0].strArtist}`
                    } else {
                        setErrors(prevState => ({
                            ...prevState,
                            ['searchValue']: `Your search - ${searchValue} - did not match any artist.`
                        }));
                        triggerErrorsTransition()

                    }
                })
                .catch((err) => console.log(err));
        }
    }

    const submit = () => {
        let errorsCheck = {}
        // validation
        for (let [key, value] of Object.entries(state)) {
            if (value) {
                // inputs too short
                if (value.length < 3 && key === 'author') {
                    errorsCheck[key] = `input too short`
                }
                //review input too short
                if (key === 'review' && value.length < 20) {
                    errorsCheck[key] = `review too short`
                }
                if (key === 'searchValue' && !checkIfSearched) {
                    errorsCheck[key] = `didnt search`
                }
            } else {
                // empty inputs
                errorsCheck[key] = `input empty`
            }
        }

        triggerErrorsTransition()
        setErrors(errorsCheck)
        // all validated and good to save to DB
        if (Object.keys(errorsCheck).length === 0 && errorsCheck.constructor === Object) {
            console.log(state)
            fetch('/newReview', {
                method: 'POST',
                body: JSON.stringify({ state }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .then(data => {
                    props.history.push("/")

                })
                .catch(error => console.error('Error:', error));
        }
    }

    const triggerErrorsTransition = () => {
        let errorsEle = document.getElementsByClassName('error')
        let errorsEleTop = document.getElementsByClassName('errorTop')
        for (let index = 0; index < [...errorsEle, ...errorsEleTop].length; index++) {
            const element = [...errorsEle, ...errorsEleTop][index];
            element.style.maxHeight = '100px'
        }
    }


    return (
        <div className='newReviewWrapper'>
            <h1 className='review__Title'>New Review</h1>
            <hr></hr>
            <h3>Search for artist to review</h3>
            <SearchBar value={searchValue} onchange={(e) => { onChange(e) }} fetchArtist={(e) => { fetchArtist(e) }} placeholder={`Type artist name`}></SearchBar>
            <div className='errorTop'>{errors.searchValue}</div>
            <NewReviewModule artistData={artist} />
            <div className='reviewForm'>
                <div className='nameAndRating'>
                    <div>
                        <label htmlFor="author">
                            Author name:
                            <div>
                                <input className='reviewInput' name='author' value={author} onChange={onChange} placeholder="Author Name" />
                                <div className='error'>{errors.author}</div>
                            </div>
                        </label>
                    </div>
                    <label htmlFor="rating">
                        Artist rating:
                        <div>
                            <StarRating rating={rating} onclick={(e) => { onChange(e) }} clickable={'auto'} />
                        </div>
                    </label>
                </div>
                <div className='reviewContainer'>
                    <label htmlFor="review">Review:</label>
                    <textarea className='reviewText' name='review' value={review} onChange={onChange} rows="" maxLength="1500" placeholder={artist.artists ? artist.artists[0].strArtist + ' ' + 'is...' : 'This Artist..'}></textarea>
                    <div className='reviewLength'>{Math.max(0, 1500 - review.length)}</div>
                    <div>{errors.review}</div>
                </div>
                <div onClick={submit} className='submitButton'>Submit &rarr;</div>
            </div>
        </div>
    )
}

export default withRouter(NewReview)
