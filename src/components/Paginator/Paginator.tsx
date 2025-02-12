import React from "react";

import './Paginator.scss';
import { Button } from "../Button/Button.tsx";
import Typography from "../Typography/Typography.tsx";

type PaginatorProps = {
    totalPages: number;
    currentPage: number;
    nextPage: () => void;
    previousPage: () => void;
}


export const Paginator = (props: PaginatorProps) => {
    const { totalPages, currentPage, nextPage, previousPage } = props;

    if (totalPages < 2 ) {return <></>}

    return (
        <div className="paginator">
            {
                currentPage !== 1 && <Button variant='secondary' text={'< Previous Page'} onClick={previousPage} />
            }
            <Typography variant='body'>{`Page ${currentPage} of ${totalPages}`}</Typography>
            {
                currentPage !== totalPages && <Button variant='secondary' text={'Next Page >'} onClick={nextPage} />
            }
        </div>
    );
}