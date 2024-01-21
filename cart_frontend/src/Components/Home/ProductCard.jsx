import { Button } from '@mantine/core';
import './ProductCard.css'


const ProductCard = ({product}) => {
    return (
        <div className="product_card">
            <div className="product_card_image">
                <img src={product.image} alt="product" />
            </div>
            <div className="product_card_info">
                <h3>{product.title}</h3>
                <p>{product.description}</p>
            </div>
            <p className='price'>Price: {product.price}</p>
            <Button className="product_card_btn">Add to Cart</Button>
        </div>
    )
}


export default ProductCard;