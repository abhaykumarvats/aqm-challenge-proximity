// dependencies
import React from 'react';

const Header = ({ onCompareAllClick }) => {
    return (
        <nav className='navbar navbar-light bg-light'>
            <div className='container-fluid'>
                <span className='navbar-brand mb-0 h1'>
                    Air Quality Monitoring
                </span>
                <button
                    className='btn btn-sm btn-outline-dark'
                    onClick={onCompareAllClick}
                >
                    Compare All
                </button>
            </div>
        </nav>
    );
};

export default Header;
