import { useContext } from 'react';
import { SearchContext } from '../../contexts/SearchContext';
import './Cart.css'
import { ContinueButton } from '../Buttons/Continue';
import { Item } from './Item';

function Cart({ isCartComponentCartComponentVisible }) {
    const {
        cartProducts,
        subTotal
    } = useContext(SearchContext);

    return (
        <div className={isCartComponentCartComponentVisible ? 'CartContainer' : 'hidden'} >
            <div className="CartSectionContainer">
                <div className='container SubTotalConatiner'>
                    <h3 className='SubTotalConatiner__title'>Subtotal</h3>
                    <p className='SubTotalConatiner__price'>$ {subTotal>0? subTotal.toFixed(2): 0}</p>
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