
'use client';

import css from './NoteForm.module.css';
import * as Yup from 'yup';

import { useId, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store/noteStore';

import { useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';
import { NoteFormType } from '@/types/note';

const validationForm = Yup.object().shape({
    title: Yup.string()
        .min(3, "Title must be at least 3 characters")
        .max(50, "Content must be less than 50 characters")
        .required("Title is required"),
    content: Yup.string().max(500, "Content must be less than 500 characters"),
    tag: Yup.string()
        .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"], "Invalid tag")
        .required("Tag is required"),
});

export default function NoteForm() {
    const fieldId = useId();
    const router = useRouter();
    const queryClient = useQueryClient();

    const { draft, setDraft, clearDraft } = useStore();
    const [errors, setErrors] = useState<Partial<Record<keyof NoteFormType, string>>>({});

    const mutation = useMutation({
        mutationFn: (noteData: NoteFormType) => createNote(noteData),
        onSuccess: () => {
            clearDraft();
            queryClient.invalidateQueries({ queryKey: ['notes'] });
            router.push('/notes/filter/All');
        },
    });

    const handleSubmit = async () => {
        try {
            await validationForm.validate(draft, { abortEarly: false });
            setErrors({});
            mutation.mutate(draft);
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const formattedErrors: Partial<Record<keyof NoteFormType, string>> = {};
                error.inner.forEach((error) => {
                    if (error.path) {
                        formattedErrors[error.path as keyof NoteFormType] = error.message;
                    }
                });
                setErrors(formattedErrors);
            }
        }
    };

    return (
        <div className={css.main} >
            <div className={css.form}>
                <form action={handleSubmit} >
                    <div className={css.formGroup}>
                        <label htmlFor={`${fieldId}-title`}>Title</label>
                        <input
                            type="text"
                            name="title"
                            className={css.input}
                            value={draft.title}
                            id={`${fieldId}-title`}
                            onChange={(e) => setDraft({ title: e.target.value })}
                            required
                        />
                        {errors.title && <span className={css.error}>{errors.title}</span>}
                    </div>

                    <div className={css.formGroup}>
                        <label htmlFor={`${fieldId}-content`}>Content</label>
                        <textarea
                            name="content"
                            className={css.textarea}
                            value={draft.content}
                            id={`${fieldId}-content`}
                            onChange={(e) => setDraft({ content: e.target.value })}
                            required
                        />
                        {errors.content && <span className={css.error}>{errors.content}</span>}
                    </div>

                    <div className={css.formGroup}>
                        <label htmlFor={`${fieldId}-tag`}>Tag</label>
                        <select
                            name="tag"
                            className={css.select}
                            value={draft.tag}
                            id={`${fieldId}-tag`}
                            onChange={(e) => setDraft({ tag: e.target.value as typeof draft['tag'] })}
                            required>
                            <option value="Todo">Todo</option>
                            <option value="Work">Work</option>
                            <option value="Personal">Personal</option>
                            <option value="Meeting">Meeting</option>
                            <option value="Shopping">Shopping</option>
                        </select>
                        {errors.tag && <span className={css.error}>{errors.tag}</span>}
                    </div>

                    <div className={css.actions}>
                        <button className={css.submitButton} type="submit">Create note</button>
                        <button className={css.cancelButton} type="button" onClick={() => router.push('/notes/filter/All')}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}