import { useContext } from 'react';
import { SearchContext } from '../../contexts/SearchContext';
import { Card } from './Card'
import { Modal } from '../Modal'
import './ResultTable.css'

function ResultTable ({isCartComponentCartComponentVisible}) {
    const {
        searchedProducts,
        isLoading,
        isOpen,
      } = useContext(SearchContext);
    return (
        <div className='ResultContainer'>
            <h2 className="ResultContainer__title">  Results:</h2>
            <div className={isCartComponentCartComponentVisible?'CardResultsContainer': 'CardResultsContainer-withoutCart'}>
                {   isLoading ?
                    <span className="loader"></span>
                    :
                    searchedProducts.map((product, index) => 
                        <Card
                            id={product.id}
                            key={index}
                            image = {product.image}
                            title = {product.title}
                            price = {product.price}
                            description = {product.description}
                        />
                    )
                }
            </div>
            {isOpen && <Modal />}
        </div>
    )
}

export { ResultTable }
