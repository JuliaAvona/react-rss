import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav>
            <Link to="/form1"><button>Form 1</button></Link>
            <Link to="/form2"><button>Form 2</button></Link>
        </nav>
    );
};

export default Navbar;