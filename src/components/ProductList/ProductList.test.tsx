import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProductList from './ProductList';

describe('ProductList', () => {
    const mockProducts = [
        { id: '1', title: 'Product 1', description: 'Description 1', brand: 'Brand 1', images: ['image1.jpg'] },
        { id: '2', title: 'Product 2', description: 'Description 2', brand: 'Brand 2', images: ['image2.jpg'] }
    ];

    it('renders a list of products', () => {
        render(<ProductList products={mockProducts} onProductClick={() => { }} />);

        const firstProductTitle = screen.getByText(mockProducts[0].title);
        const secondProductTitle = screen.getByText(mockProducts[1].title);

        expect(firstProductTitle).toBeInTheDocument();
        expect(secondProductTitle).toBeInTheDocument();
    });

    it('calls onProductClick when a product is clicked', () => {
        const onProductClick = vi.fn();
        render(<ProductList products={mockProducts} onProductClick={onProductClick} />);

        const firstProduct = screen.getByText(mockProducts[0].title);
        fireEvent.click(firstProduct);

        expect(onProductClick).toHaveBeenCalledWith(mockProducts[0]);
    });
});
