import classNames from 'classnames';
import React from 'react';

import './Button.scss';

type ButtonProps = {
    text: string,
    variant: 'primary' | 'secondary', 
    onClick: () => void
    className?: string
    disabled?: boolean
}

export const Button = (props: ButtonProps) => {
    const { text, variant, onClick, className, disabled=false } = props;
    return (
        <div className={classNames('button', {
            primary: variant === 'primary',
            secondary: variant === 'secondary',
            disabled: disabled,
            className: className
        })} onClick={disabled ? undefined : onClick}>
            {text}
        </div>
    );
}