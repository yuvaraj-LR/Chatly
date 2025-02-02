import { doc, getDoc, updateDoc } from "firebase/firestore";
import { createContext, useContext, useState } from "react";
import { db } from "../config/firebase";
import { useNavigate } from "react-router";

const appContext = createContext();

const useAppContextHook = () => {
    const value = useContext(appContext);
    return value;
}

const AppContext = ({ children }) => {

    const [userData, setUserData] = useState(null);
    const [chatData, setChatData] = useState(null);

    const navigator = useNavigate();

    const loadUserData = async(uid) => {
        const userRef = doc(db, "users", uid);
        const userSnap = await getDoc(userRef);
        const userData = userSnap.data();
        console.log(userData, "userDataa...");
        
        if (userData.name && userData.avatar) {
            setUserData(userData)
            navigator("/");
        } else {
            navigator("/profile");
        }
    }

    const handleProfileSubmit = async(id, avatar, name, bio) => {
        // console.log(avatar, name, bio, "details");
        const userRef = doc(db, "users", id);
        const updateUserProfile = await updateDoc(userRef, {
            avatar,
            name, 
            bio 
        })

        const userSnap = await getDoc(userRef);
        const userData = userSnap.data();

        setUserData(userData)

        if (updateUserProfile) {
            navigator("/")
        }
    }

    const value = { 
        userData, setUserData, chatData, setChatData, loadUserData, handleProfileSubmit
    }

    return (
        <appContext.Provider value={ value }>
            {children}
        </appContext.Provider>
    )
};

export { useAppContextHook };
export default AppContext;