import React from 'react';
import './ResultsControl.css';
import { ResultsControlProps } from '../../types/types';

const ResultsControl: React.FC<ResultsControlProps> = ({ inputLimit, handleUpdateClick, setInputLimit }) => {
    return (
        <form onSubmit={handleUpdateClick} className="control">
            <input
                type="text"
                value={inputLimit}
                onChange={e => setInputLimit(e.target.value)}
                placeholder="Results per page... #10"
            />
            <button type="submit">
                Update Results
            </button>
        </form>
    );
};

export default ResultsControl;
