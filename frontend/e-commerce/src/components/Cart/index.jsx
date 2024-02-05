import { useContext } from 'react';
import { SearchContext } from '../../contexts/SearchContext';
import './Cart.css'
import { ContinueButton } from '../Buttons/Continue';
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { ImCancelCircle } from "react-icons/im";
import { Item } from './Item';

function Cart({ isCartComponentCartComponentVisible }) {
    const {
        cartProducts
    } = useContext(SearchContext);

    return (
        <div className={isCartComponentCartComponentVisible ? 'CartContainer' : 'hidden'} >
            <div className="CartSectionContainer">
                <div className='container SubTotalConatiner'>
                    <h3 className='SubTotalConatiner__title'>Subtotal</h3>
                    <p className='SubTotalConatiner__price'>$2000</p>
                    <ContinueButton />
                </div>
            </div>
            <div>
                {
                    cartProducts.map((item) => (
                        <Item key={item.id} id={item.id} price={item.price} quantity={item.quantity} image={item.image} />
                    ))
                }

            </div>


        </div>
    )
}

export { Cart }