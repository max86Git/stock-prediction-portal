import { useState, useContext, createContext} from 'react'

// Créer le contexte
const AuthContext = createContext()


const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(
        //localStorage.getItem('accessToken') ? true : false
        // 2ème méthode, renvoit true ou false si existe
        !!localStorage.getItem('accessToken')
    )

    return (
    <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
        {children}
    </AuthContext.Provider>
    )
}

export default AuthProvider
export {AuthContext};