import React from "react";

const spoolsContext = React.createContext({
    spools: [],
    setSpools: () => {},
});

export default spoolsContext;
