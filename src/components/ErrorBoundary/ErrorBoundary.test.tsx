import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ErrorBoundary from './ErrorBoundary';

const ProblemChild = () => {
    throw new Error('Error thrown from problem child');
};

describe('ErrorBoundary', () => {
    it('should catch errors with problem child', () => {
        const consoleSpy = vi.spyOn(console, 'error');
        consoleSpy.mockImplementation(() => { });

        render(
            <ErrorBoundary>
                <ProblemChild />
            </ErrorBoundary>
        );

        expect(screen.getByText(/something went wrong/i)).toBeDefined();
        consoleSpy.mockRestore();
    });

    it('should render children when no error is thrown', () => {
        render(
            <ErrorBoundary>
                <h1>Test Child</h1>
            </ErrorBoundary>
        );

        expect(screen.getByText('Test Child')).toBeDefined();
    });
});
