import React from "react";

import Navigation from "./navigation/Navigation";

const Header = ({ isAuthenticated }) => {
    return (
        <header className="header">
            <div className="container">
                <div className="header__content">
                    <Navigation isAuthenticated={isAuthenticated} />
                    <h1>RMS</h1>
                </div>
            </div>
        </header>
    );
};

export default Header;
