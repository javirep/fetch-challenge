import React, { useContext, createContext, useState} from "react";

type InfoMessageContextType = {
    infoMessage: string;
    setInfoMessage: (value: string) => void;
  };

const InfoMessageContext = React.createContext<InfoMessageContextType>({
    infoMessage: '',
    setInfoMessage: () => {},
});

export const InfoMessageProvider = (props) => {
    const {children} = props;
    const [ infoMessage, setInfoMessage ] = useState<string>('');
  
    const value = {
        infoMessage,
        setInfoMessage,
    };
    // @ts-ignore
    return <InfoMessageContext.Provider value={value}>{children}</InfoMessageContext.Provider>;
};
  
export const useInfoMessage = () => {
  return useContext(InfoMessageContext);
};



  