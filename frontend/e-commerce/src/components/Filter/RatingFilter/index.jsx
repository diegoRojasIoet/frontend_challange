import { useContext } from 'react';
import { Rating } from './Rating'
import { SearchContext } from '../../../contexts/SearchContext';
import './RatingFilter.css'

function RatingFilter () {
    const {
        calculateRatings
    } = useContext(SearchContext);
    const [mensRating, womenRating, jeweleryRating, electronicsRating] = calculateRatings()
    debugger
    return (
        <div className='RatingFilterContainer'>
            <h2>Rates:</h2>
            <div className='RatingsContainer'>
                {mensRating && womenRating && jeweleryRating && electronicsRating &&
                    <><Rating stars={mensRating} /><Rating stars={womenRating} /><Rating stars={jeweleryRating} /><Rating stars={electronicsRating} /></>
                }
                
            </div>
        </div>
    )
}

export { RatingFilter }