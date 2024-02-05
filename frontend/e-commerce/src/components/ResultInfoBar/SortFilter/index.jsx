import './SortFilter.css'
import { useContext } from 'react';
import { SearchContext } from '../../../contexts/SearchContext'

function SortFilter () {

    const {
        setOrderByPrice
    } = useContext(SearchContext);

    const handleSetOrderChange = (event) => {
        setOrderByPrice(event.target.value);
    }

    return (
        <div className='SortFilterContainer'>
            <select name="order" id="order" onChange={(e) => handleSetOrderChange(e)}>
                <option value="Name">Name</option>
                <option value="Price_Low">Price: Low to High</option>
                <option value="Price_High">Price: High to Low</option>
            </select>
        </div>
    )
}

export { SortFilter }
