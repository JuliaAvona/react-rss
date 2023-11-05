import React from 'react';
import './ProductList.css';

interface Product {
    id: string;
    title: string;
    description: string;
    brand: string;
    images: string[];
}

interface Props {
    products: Product[];
}

const ProductList: React.FC<Props> = ({ products }) => {
    return (
        <div className="results">
            {products.map(product => (
                <div className="product" key={product.id}>
                    <p>{product.title}</p>
                    <img src={product.images[0]} alt={product.title} />
                </div>
            ))}
        </div>
    );
};

export default ProductList;
