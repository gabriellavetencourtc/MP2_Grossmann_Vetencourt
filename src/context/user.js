import { createContext, useContext } from 'react';

export const UserContext = createContext(null);

export function useUser() {
  const { user, setUser } = useContext(UserContext);
  return { user, setUser };
}
