import { AddToCartButton } from "../../../Buttons/AddToCart"
import { useContext } from 'react';
import { Rating } from "../../../Filter/RatingFilter/Rating"
import { SearchContext } from '../../../../contexts/SearchContext'
import './Detail.css'

function Detail({image, id, title, price, description }) {
    const {
        setIsOpen,
        setImageProduct,
        setTitleProduct,
        setPriceProduct,
        setDescriptionProduct,
    } = useContext(SearchContext);

    const openModal = () => {
        setIsOpen(true)
        setImageProduct(image)
        setTitleProduct(title)
        setPriceProduct(price)
        setDescriptionProduct(description)
    }

    return (
        <div className="DetailsCardContainer">
            <div onClick={openModal}>
                <h3 className="DetailsCard__title">{title}</h3>
                <Rating stars={3} />
                <h3>${price}</h3>

            </div>
            <AddToCartButton item={{ "id": id, "title": title, "price": price, "image": image}} />
        </div>
    )
}

export { Detail }
