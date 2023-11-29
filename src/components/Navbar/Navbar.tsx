import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <Link to="/form1">Form 1</Link>
            <Link to="/form2">Form 2</Link>
        </nav>
    );
};

export default Navbar;