import React from 'react';

const Navbar = () => {
    return (
        <div className="top-section-container">
            <div className="top-left">
                <div className="app-title">PIXALIVE</div>
            </div>
            <div className="top-middle">
                <div className="sprite-title">Untitled</div>
            </div>
            <div className="top-right">
                <div className="top-button">Create Sprite</div>
                <div className="top-button">Resize</div>
                <div className="top-button">Save</div>
                <div className="top-button">Export</div>
            </div>
        </div>
    )
}

export default Navbar;
