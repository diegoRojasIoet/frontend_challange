import { Rating } from './Rating'
import './RatingFilter.css'
import { useContext } from 'react';
import { SearchContext } from '../../../contexts/SearchContext';

function RatingFilter() {
    const {
        setRateFilter
    } = useContext(SearchContext);

    const handleRate = (newRate) => {
        setRateFilter(newRate)
    }
    return (
        <div className='RatingFilterContainer'>
            <h2>Rates:</h2>
            <div className='RatingsContainer'>
                <div className="RateContainer" onClick={() => handleRate(4)}>
                    <Rating stars={4} />
                </div>
                <div className="RateContainer" onClick={() => handleRate(3)}>
                    <Rating stars={3} />
                </div>
                <div className="RateContainer" onClick={() => handleRate(2)}>
                    <Rating stars={2} />
                </div>
                <div className="RateContainer" onClick={() => handleRate(1)}>
                    <Rating stars={1} />
                </div>
            </div>
        </div>
    )
}

export { RatingFilter }