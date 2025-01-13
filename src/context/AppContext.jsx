import { createContext, useContext } from "react";

const appContext = createContext();

const useAppContextHook = () => {
    const value = useContext(appContext);
    return value;
}

const AppContext = ({ children }) => {
    let data = {name: "yuvaraj"};

    return (
        <appContext.Provider value={ {data} }>
            {children}
        </appContext.Provider>
    )
};

export { useAppContextHook };
export default AppContext;