import React from 'react'
import toiletPaper from '../media/toilet-paper.svg'
import toiletPaperGolden from '../media/toiletpaperGolden.svg'

function StarStatic(props) {
    return (
        <div>
            <div className='starWrapper'>
                {[...Array(5)].map((star, i) => {
                    const ratingValue = i + 1;
                    return (
                        <label key={i}>
                            {
                                <img
                                    className='star'
                                    src={ratingValue <= props.rating ? toiletPaperGolden : toiletPaper}
                                />
                            }
                        </label>
                    )
                })}
            </div>
        </div>
    )
}

StarStatic.propTypes = {

}

export default StarStatic

