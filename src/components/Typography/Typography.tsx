import React from "react";
import classNames from "classnames";

import './Typography.scss';

type TypographyProps = {
    variant: 'title' | 'navbar' | 'body' | 'error' ;
    children: React.ReactNode | string;
    className?: string;
    center?: boolean;
}


const Typography = (props) => {

    const {variant, className, center=false} = props;

    const typographyClassName = classNames(`typography typography-${variant}`, {center}, className);

    if (variant === 'title') {
        return (
            <h1 className={typographyClassName}>
                {props.children}
            </h1>
        );
    }

    return (
        <p className={typographyClassName}>
            {props.children}
        </p>
    );
}

export default Typography;
