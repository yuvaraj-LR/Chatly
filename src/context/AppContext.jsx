import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { useNavigate } from "react-router";

const appContext = createContext();

const useAppContextHook = () => {
    const value = useContext(appContext);
    return value;
}

const AppContext = ({ children }) => {

    const [userData, setUserData] = useState(null);
    const [chatData, setChatData] = useState(null);
    const [message, setMessage] = useState([]);
    const [messageId, setMessageId] = useState(null);
    const [chatUser, setChatUser] = useState(null);

    const navigator = useNavigate();

    const loadUserData = async(uid) => {
        const userRef = doc(db, "users", uid);
        const userSnap = await getDoc(userRef);
        const userData = userSnap.data();
        console.log(userData, "userDataa...");
        
        setUserData(userData);

        if (userData.name && userData.avatar) {
            navigator("/");
        } else {
            navigator("/profile");
        }

        await updateDoc(userRef, {
            lastseen: Date.now()
        })

        setInterval(async () => {
            if (auth.chatUser) {
                await updateDoc(userRef, {
                    lastseen: Date.now()
                })
            }
        }, 60000);
    }

    useEffect(() => {
        if (userData) {
            const chatRef = doc(db, "chats", userData.id);            
    
            const unSub = onSnapshot(chatRef, async (docSnap) => {
                if (!docSnap.exists()) return;
    
                const chatData = docSnap.data().chatData || [];
                const tempChatData = [];
    
                // Use Promise.all to resolve all getDoc() calls concurrently
                const userPromises = chatData.map(async (item) => {
                    const userRef = doc(db, "users", item.rId);
                    const userSnap = await getDoc(userRef);
                    return userSnap.exists() ? userSnap.data() : null;
                });
    
                const resolvedChatData = (await Promise.all(userPromises)).filter(user => user !== null);
    
                setChatData(resolvedChatData.sort((a, b) => b.updatedAt - a.updatedAt));
            });
    
            return () => unSub();
        }
    }, [userData]);
    

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

        navigator("/")
    }

    const value = { 
        userData, setUserData, chatData, setChatData, loadUserData, handleProfileSubmit, message, setMessage, messageId, setMessageId, chatUser, setChatUser
    }

    return (
        <appContext.Provider value={ value }>
            {children}
        </appContext.Provider>
    )
};

export { useAppContextHook };
export default AppContext;