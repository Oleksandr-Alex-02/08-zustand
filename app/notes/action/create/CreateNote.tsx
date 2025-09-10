
'use client';

import css from './CreateNote.module.css'
import NoteForm from "@/components/NoteForm/NoteForm";

export default function CreateNoteClient() {

    return (
        <main className={css.backdrop}>
            <NoteForm />
        </main>
    );
}