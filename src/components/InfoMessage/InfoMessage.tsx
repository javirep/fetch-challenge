import React, { useEffect, useRef } from 'react';

import './InfoMessage.scss';
import Typography from '../Typography/Typography.tsx';
import { useInfoMessage } from '../../provider/InfoMessageProvider.tsx';


export const InfoMessage = () => {
    const { infoMessage, setInfoMessage} = useInfoMessage();
    const infoMessageRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (infoMessage) {
            displayInfoMessage()
            setTimeout(hideInfoMessage, 3000);
        }
    }, [infoMessage]);

    const displayInfoMessage = () => {
        if (infoMessageRef.current) infoMessageRef.current.style.top = '20px';
    }

    const hideInfoMessage = () => {
        if (infoMessageRef.current) infoMessageRef.current.style.top = '-20px';
        setInfoMessage('');
    }

    return (
        <div className="info-message-container" ref={infoMessageRef}>
            <Typography variant="body" className="info-message">{infoMessage}</Typography>
        </div>
    );
}