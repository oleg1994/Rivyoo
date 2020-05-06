import React from 'react'
import * as utils from '../../utilities/utils.js'
import ReviewModule from '../../containers/ReviewModule.js'
import './Home.css';
import Tags from '../../containers/Tags.js';
import SearchBar from '../../containers/SearchBar.js';
import Pagination from '../Pagination/Pagination.js'



export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: [],
            searchValue: '',
            searchBy: 'artist',
            currentPage: 1,
            postPerPage: 6
        };
        // This binding is necessary to make `this` work in the callback
        this.Sorting = this.Sorting.bind(this);
        this.Search = this.Search.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onRadioChange = this.onRadioChange.bind(this);
        this.paginate = this.paginate.bind(this);

    }
    async componentDidMount() {
        fetch('/getReviews', {
            method: 'POST',
            body: JSON.stringify({}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({ reviews: data });
            })
            .catch(error => console.error('Error:', error));
    }




    Sorting = (criteria) => {
        fetch('/sortfindReviews', {
            method: 'POST',
            body: JSON.stringify({ criteria }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                this.setState({ reviews: data });
            })
            .catch(error => console.error('Error:', error));
    }

    Search = () => {
        let criteria = this.state.searchValue
        let searchBy = this.state.searchBy
        fetch('/sortfindReviews', {
            method: 'POST',
            body: JSON.stringify({ criteria, searchBy }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                this.setState({ reviews: data });
            })
            .catch(error => console.error('Error:', error));
    }

    onChange = (e) => {
        this.setState({ searchValue: e.target.value })
    }
    onRadioChange = (e) => {
        this.setState({ searchBy: e.target.value })
    }
    onRadioChange = (e) => {
        this.setState({ searchBy: e.target.value })
    }
    //Change Page
    paginate = (pageNumber) => {
        this.setState({ currentPage: pageNumber })
    }



    render() {
        //Pagination
            let indexOfLastPost = this.state.currentPage * this.state.postPerPage
            let indexOfFirstPost = indexOfLastPost - this.state.postPerPage
            let currentPosts = this.state.reviews.slice(indexOfFirstPost, indexOfLastPost)
        


        return (
            <div className='Home'>
                <div onChange={(e) => { this.onRadioChange(e) }} className='radioButtons'>
                    <label forhtml="artist">Artist</label>
                    <input type="radio" name="criteria" value="artist" defaultChecked />
                    <label forhtml="author">Author</label>
                    <input type="radio" name="criteria" value="author" />
                </div>
                <SearchBar value={this.state.searchValue} onchange={(e) => { this.onChange(e) }} fetchArtist={(e) => { this.Search(e) }} placeholder={`Type ${this.state.searchBy} name (case sensitive)`}></SearchBar>
                <h1>Latest reviews</h1>
                <hr></hr>
                <div className='homeContainer'>
                    <div className='ReviewModule'>
                        {this.state.reviews[0] ?
                            currentPosts.map((review, i) => {
                                return (
                                    <ReviewModule key={i} banner={review.banner} date={review.date} author={review.author} rating={review.rating} artist={review.artist} review={review.review} />
                                )
                            })
                            :
                            `Theres no reviews or they are loading`
                        }
                        <Pagination postPerPage={this.state.postPerPage} totalPosts={this.state.reviews.length} paginate={this.paginate} />
                    </div>

                    <div className='tagsContainer'>
                        <h3>Sort by</h3>
                        <Tags array={utils.removeDuplicateObjectFromArray(this.state.reviews, 'artist')} sort={(e) => { this.Sorting(e.target.innerText) }}></Tags>
                    </div>
                </div>
            </div>
        )
    }
}
