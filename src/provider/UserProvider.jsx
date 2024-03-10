import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { UserContext } from '../context/user'
import { auth, db } from '../config/firebase'
import { getUserById } from '../controllers/auth'
import { useNavigate } from 'react-router-dom'
import { doc, onSnapshot } from 'firebase/firestore'

export default function UserProvider({children}) {
    const [user, setUser] = useState(null)

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (user) {
              const fullUser = await getUserById(user.uid);
              if (fullUser) {
                  setUser({
                      ...fullUser,
                      email: user.email,
                      uid: user?.uid
                  });
              } else {
                  setUser(user);
              }
              
              // Subscribe to changes in the user document
            onSnapshot(doc(db, "users", user.uid), (doc) => {
                setUser({
                  ...doc.data(),
                  email: user.email,
                  uid: user?.uid
              });
              console.log({
                ...doc.data(),
                email: user.email,
                uid: user?.uid
            })
            
            });
          } else {
              setUser(null);
          }
      });
      return () => unsubscribe();
    }, []);
    
    return (<UserContext.Provider value={{ user, setUser }}>
        {children}
    </UserContext.Provider>)
    
}