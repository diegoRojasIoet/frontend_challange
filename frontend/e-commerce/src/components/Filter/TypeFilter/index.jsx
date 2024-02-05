import './TypeFilter.css'
import { useContext } from 'react';
import { SearchContext } from '../../../contexts/SearchContext'

function TypeFilter ({name, options}) {
    const {
        updateFilterCategories,
    } = useContext(SearchContext);

    const handleOnChange = (event) => {
        updateFilterCategories(event.target.id);
    };


    return (
        <div className='TypeFilterContainer'>
            <h2>{name}:</h2>
            {options.map((option, id) => 
                <div
                    key={id}
                    className='CheckBox'
                >
                    <input type="checkbox" id={option.id} name={option.label} onChange={(e) => handleOnChange(e)} />
                    <label htmlFor={option.id}>{option.label}</label>
                </div>
            )}
        </div>
    )
}

export { TypeFilter }