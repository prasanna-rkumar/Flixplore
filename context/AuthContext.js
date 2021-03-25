import propTypes from 'prop-types';
import {
  createContext, useEffect, useState,
} from 'react';
import supabase from '../utils/initSupabase';

export const AuthContext = createContext();

const signOut = () => supabase.auth.signOut();

const user = () => supabase.auth.user();

const signIn = (provider) => supabase.auth.signIn({ provider });

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleEventChange = (event) => {
    if (event === 'SIGNED_IN') {
      setLoggedIn(true);
    }
    if (event === 'SIGNED_OUT') {
      setLoggedIn(false);
    }
  };

  useEffect(() => {
    if (user) setLoggedIn(true);
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      handleEventChange(event);
      fetch('/api/auth', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        credentials: 'same-origin',
        body: JSON.stringify({ event, session }),
      }).then((res) => res.json());
    });

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{
      loggedIn,
      signIn,
      signOut,
      user,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: propTypes.instanceOf(Object).isRequired,
};
