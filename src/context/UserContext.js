import { createContext, useState } from 'react';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);

    const setUser = (newUserData) => {
        const { cart_id, email, first_name, last_name, _id } = newUserData;
        setUserData(newUserData);
        localStorage.setItem('user', 
        JSON.stringify({ cart_id, email, first_name, last_name, _id }));
    };

    const removeUser = () => {
        setUserData(null);
        localStorage.removeItem('user');
    };

    return (
        <UserContext.Provider
            value={{
                userData,
                setUser,
                removeUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};