"use client";

import css from './NotePreview.module.css';

type Props = {
    note: {
        title: string;
        content: string;
        createdAt?: string;
        tag: string;
    };
    onClose: () => void;
};

export default function NotePreviewClient({ note, onClose }: Props) {
    return (
        <div className={css.container}>
            <div className={css.item}>
                <div className={css.header}>
                    <h2>{note.title}</h2>
                </div>
                <p className={css.content}>{note.content}</p>
                {note.createdAt && (
                    <p className={css.date}>
                        {new Date(note.createdAt).toLocaleString('uk-UA')}
                    </p>
                )}
            </div>
            <div className={css.footer}>
                <span className={css.tag}>{note.tag}</span>
                <button className={css.backBtn} onClick={onClose}>Close</button>
            </div>
        </div>
    );
}