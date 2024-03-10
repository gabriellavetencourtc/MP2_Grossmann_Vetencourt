import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { UserContext } from '../context/user'
import { auth } from '../config/firebase'
import { getUserById } from '../controllers/auth'
import { useNavigate } from 'react-router-dom'

export default function UserProvider({children}) {
    const [user, setUser] = useState(null)

    useEffect(() => {
      onAuthStateChanged(auth, async (user) => {
        // TODO: traer el resto de la data de firestore
        if(user){
          const fullUser = await getUserById(user.uid);
          if(fullUser){
            setUser({
              ...fullUser,
              email: user.email,
            })
            console.log({
              ...fullUser,
              email: user.email,
            })
          }else{
            setUser(user)
          }
        }
      })
    }, [])
    
    return (<UserContext.Provider value={{ user, setUser }}>
        {children}
    </UserContext.Provider>)
    
}