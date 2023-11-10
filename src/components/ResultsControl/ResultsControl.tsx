import React from 'react';
import './ResultsControl.css';

interface Props {
    inputLimit: string;
    handleUpdateClick: (e: React.FormEvent) => void;
    setInputLimit: (value: string) => void;
}

const ResultsControl: React.FC<Props> = ({ inputLimit, handleUpdateClick, setInputLimit }) => {
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
