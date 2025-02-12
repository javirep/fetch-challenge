import React, { useContext, createContext, useState} from "react";

type AuthContextType = {
    authenticated: boolean;
    setAuthenticated: (value: boolean) => void;
    authName: string;
    setAuthName: (value: string) => void;
  };

const AuthContext = React.createContext<AuthContextType>({
  authenticated: false,
  setAuthenticated: () => {},
  authName: '',
  setAuthName: () => {}
});

export const AuthProvider = (props) => {
    const {children} = props;
    const [authenticated, setAuthenticated] = useState(false);
    const [authName, setAuthName] = useState('');
  
    const value = {
        authenticated,
        setAuthenticated,
        authName,
        setAuthName
    };
    // @ts-ignore
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
  
export const useAuth = () => {
  return useContext(AuthContext);
};



  