import React from 'react';
import { useRouteError } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Page404 from './page-404';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

vi.mock('react-router-dom', async () => ({
    ...await vi.importActual('react-router-dom'),
    useRouteError: vi.fn(),
}));

describe('Page404', () => {
    it('displays the 404 error page on invalid route', () => {

        const mockError: HttpError = {
            name: 'NotFound',
            message: 'Page not found',
            statusText: '404 page not found.',
        };

        vi.mocked(useRouteError).mockReturnValue(mockError);

        render(
            <MemoryRouter initialEntries={['/non-existent-route']}>
                <Routes>
                    <Route path="*" element={<Page404 />} />
                </Routes>
            </MemoryRouter>
        );
        expect(screen.getByText('404 page not found.')).toBeInTheDocument();
        expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Return Home' })).toHaveAttribute('href', '/');
    });
});
