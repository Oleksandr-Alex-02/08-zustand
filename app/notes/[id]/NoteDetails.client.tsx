"use client";

import css from './NoteDetails.module.css';
import { useParams, useRouter } from 'next/navigation';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getIdNotes } from '@/lib/api';
import { Note } from '@/types/note'

export default function NoteDetailsClient() {
    const { id } = useParams<{ id: string }>()
    const router = useRouter();

    const { data, isLoading, error } = useQuery<Note>({
        queryKey: ["note", { id }],
        queryFn: () => getIdNotes(id),
        placeholderData: keepPreviousData,
        refetchOnMount: false,
    })

    if (isLoading) {
        return <p>Loading please wait...</p>
    }

    if (error || !data) {
        return <p>Something went wrong.</p>
    }

    const close = () => router.back();

    return (
        <div className={css.container}>
            <div className={css.item}>
                <div className={css.header}>
                    <h2>{data?.title}</h2>
                </div>
                <p className={css.content}>{data?.content}</p>
                <div className={css.modal}>
                    <button onClick={close}>Close</button>
                </div>
                {data?.createdAt && (
                    <p className={css.date}>
                        {new Date(data.createdAt).toLocaleString('uk-UA')}
                    </p>
                )}
            </div>
        </div>
    )
}


