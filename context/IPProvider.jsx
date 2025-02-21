import React, { createContext, useState, useContext , useEffect} from "react";
const IPContext = createContext();
export const useIPContext = () => useContext(IPContext);

// IPProvider
const IPProvider = ({ children }) => {
    const [ip, setIP] = useState("");
    return (
        <IPContext.Provider value={{ ip, setIP }}>
            {children}
        </IPContext.Provider>
    );
}

export default IPProvider;