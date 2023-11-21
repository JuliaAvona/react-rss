import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ResultsControl from './ResultsControl';

describe('ResultsControl', () => {
    it('updates input field correctly', () => {
        const setInputLimit = vi.fn();
        render(<ResultsControl inputLimit="5" handleUpdateClick={() => { }} setInputLimit={setInputLimit} />);

        const inputField = screen.getByPlaceholderText('Results per page... #10');
        fireEvent.change(inputField, { target: { value: '10' } });

        expect(setInputLimit).toHaveBeenCalledWith('10');
    });

    it('submits the form with the current input value', () => {
        const handleUpdateClick = vi.fn();
        render(<ResultsControl inputLimit="5" handleUpdateClick={handleUpdateClick} setInputLimit={() => { }} />);

        const submitButton = screen.getByRole('button', { name: 'Update Results' });
        fireEvent.click(submitButton);

        expect(handleUpdateClick).toHaveBeenCalled();
    });
});
