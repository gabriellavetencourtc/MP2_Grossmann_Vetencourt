import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { UserContext } from '../context/user'
import { auth } from '../config/firebase'

export default function UserProvider({children}) {
    const [user, setUser] = useState(null)

    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        // TODO: traer el resto de la data de firestore
        setUser(user)
      })
    }, [])
    
    return (<UserContext.Provider value={user}>
        {children}
    </UserContext.Provider>)
    
}