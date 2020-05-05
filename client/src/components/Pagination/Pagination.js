import React from 'react'
import './Pagination.css'

const Pagination = ({ postPerPage, totalPosts,paginate }) => {
    console.log(paginate)
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
        pageNumbers.push(i)

    }
    return (
        <ul className='Pagination'>
            {pageNumbers.map(number => (
                <li onClick={()=> paginate(number)} key={number} className='page'>
                    {number}
                </li>
            ))}
        </ul>
    )
}

export default Pagination;
