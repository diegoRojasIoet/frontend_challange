import './AddToCart.css'
import { useContext } from 'react';
import { SearchContext } from '../../../contexts/SearchContext';

function AddToCartButton ({item}) {
    const {
        addToCart
    } = useContext(SearchContext);

    return (
        <button 
            className="AddToCartButton" 
            onClick={() => addToCart(item)}
        >
           Add To Cart
        </button>
    )
}

export { AddToCartButton }
