import { useContext } from 'react';
import { SearchContext } from '../../contexts/SearchContext';
import './Cart.css'
import { ContinueButton } from '../Buttons/Continue';
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";

function Cart ({ id, image, title, price, description }) {
    return (
        <div className='CartContainer' >
            <div className='SubTotalConatiner'>
                <h3 className='SubTotalConatiner__title'>Subtotal</h3>
                <p className='SubTotalConatiner__price'>$2000</p>
                <ContinueButton/>
            </div>
            <div className="TotalItemContainer">
                <figure>
                    <img src="src/assets/Logo/ioetLogo.png" alt="item-img" />
                </figure>
                <p className='TotalItemContainer__price'>$2000</p>
                <div className="TotalItemContainer">
                    <CiCirclePlus/>
                    <p>3</p>
                    <CiCircleMinus/>
                </div>

            </div>

        </div>
    )
}

export { Cart }