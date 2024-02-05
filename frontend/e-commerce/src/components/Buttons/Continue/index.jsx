import './Continue.css'
import { useContext } from 'react';
import { SearchContext } from '../../../contexts/SearchContext';

function ContinueButton () {
    return (
        <button 
            className="ContinueButton" 
        >
           Continue
        </button>
    )
}

export { ContinueButton }