import { useContext } from 'react';
import { SearchContext } from '../../../contexts/SearchContext';
import './Item.css'
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { ImCancelCircle } from "react-icons/im";

function Item({ id, price, quantity, image}) {
    const {
        deleteItemFromCart,
        subtractItemQuantity,
        addToCart
    } = useContext(SearchContext);

    return (

        <div className="TotalItemContainer">
            <div className="container ItemInfoContainer">
                <figure className='TotalItemContainer__img-container'>
                    <img className="TotalItemContainer__img" src={image} alt="item-img" />
                </figure>
                <p className='TotalItemContainer__price'>${price * quantity}</p>
                <div className="TotalItemContainer__quantity-container">
                    <CiCirclePlus 
                        onClick={() => addToCart({ "id": id, "price": price, "image": image, "quantity": quantity})}
                        className='TotalItemContainer__icon' />
                    <p className='TotalItemContainer__quantity' >{quantity}</p>
                    <CiCircleMinus 
                        onClick={() => subtractItemQuantity({ "id": id, "price": price, "image": image, "quantity": quantity})}
                        className='TotalItemContainer__icon' />
                </div>

            </div>
            <ImCancelCircle 
                onClick={() => deleteItemFromCart(id)}
                className='Item__cancelIcon' />

        </div>


    )
}

export { Item }