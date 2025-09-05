'use client';

import Link from 'next/link';
import css from './NoteDetails.module.css'

type Props = {
    error: Error;
};

const Error = ({ error }: Props) => {
    return (
        <div className={css.container}>
            <p className={css.header}>Could not fetch note details. {error.message}</p>
            <Link href="/notes" className={css.content}>Turn back</Link>
        </div>
    );
}

export default Error;
