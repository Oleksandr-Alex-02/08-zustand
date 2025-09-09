
'use client';

import css from './CreateNote.module.css';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { createNote } from '@/lib/api';
import { NoteFormType } from '@/types/note';
import { useStore } from '@/lib/store/noteStore';

export default function NoteForm() {
    const router = useRouter();
    const { draft, setDraft, clearDraft } = useStore();

    const mutation = useMutation({
        mutationFn: (noteData: NoteFormType) => createNote(noteData),
        onSuccess: () => {
            clearDraft();
            router.push('/notes/filter/All');
        },
    });

    const handleSubmit = () => {
        mutation.mutate(draft);

    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className={css.formGroup}>
                    <input
                        type="text"
                        name="title"
                        value={draft.title}
                        onChange={(e) => setDraft({ title: e.target.value })}

                        required
                    />
                </div>

                <div className={css.formGroup}>
                    <textarea
                        name="content"
                        value={draft.content}
                        onChange={(e) => setDraft({ content: e.target.value })}
                        required
                    />
                </div>

                <div className={css.formGroup}>
                    <select name="tag" value={draft.tag} onChange={(e) => setDraft({ tag: e.target.value as typeof draft['tag'] })}

                        required>
                        <option value="Todo">Todo</option>
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                        <option value="Meeting">Meeting</option>
                        <option value="Shopping">Shopping</option>
                    </select>
                </div>

                <div className={css.actions}>
                    <button type="submit">Create note</button>
                    <button type="button" onClick={() => router.push('/notes/filter/All')}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}