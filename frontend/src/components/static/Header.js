import React from "react";

import Navigation from "./navigation/Navigation";

const Header = () => {
    return (
        <header className="header">
            <div className="container">
                <div className="header__content">
                    <Navigation />
                    <h1>RMS</h1>
                </div>
            </div>
        </header>
    );
};

export default Header;

// useEffect(() => {
//     const fetchData = async () => {
//         const result = await axios.get(`${API_URL}/spools`);
//         console.log(result.data);
//     };

//     fetchData();
// }, []);
