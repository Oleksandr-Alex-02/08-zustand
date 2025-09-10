// "use client";

// import css from './NoteForm.module.css';
// import * as Yup from 'yup';
// import { useId } from 'react';
// import { Formik, Form, Field, FormikHelpers, ErrorMessage } from 'formik';

// import { createNote } from '@/lib/api'
// import { NoteFormType } from '@/types/note';
// import { useMutation, useQueryClient } from '@tanstack/react-query';

// const validationForm = Yup.object().shape({
//     title: Yup.string()
//         .min(3, "Title must be at least 3 characters")
//         .max(50, "Content must be less than 50 characters")
//         .required("Title is required"),
//     content: Yup.string().max(500, "Content must be less than 500 characters"),
//     tag: Yup.string()
//         .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"], "Invalid tag")
//         .required("Tag is required"),
// });

// interface NoteFormProps {
//     onSuccess: () => void,
// }

// const initialValues: NoteFormType = {
//     title: "",
//     content: "",
//     tag: "",
// }

// export default function NoteForm({ onSuccess }: NoteFormProps) {
//     const fieldId = useId();
//     const queryClient = useQueryClient();

//     const { mutate, isPending } = useMutation({
//         mutationFn: (noteData: NoteFormType) => createNote(noteData),
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: ["notes"] });
//             onSuccess();
//         },
//     });

//     const handleSubmit = (
//         values: NoteFormType,
//         FormikHelpers: FormikHelpers<NoteFormType>
//     ) => {
//         mutate(values);
//         FormikHelpers.resetForm();
//     }

//     return (
//         < Formik
//             initialValues={initialValues}
//             onSubmit={handleSubmit}
//             validationSchema={validationForm}
//         >
//             <Form className={css.form}>
//                 <div className={css.formGroup}>
//                     <label htmlFor={`${fieldId}-title`}>Title</label>
//                     <Field id={`${fieldId}-title`} type="text" name="title" className={css.input} />
//                     <ErrorMessage
//                         name="title"
//                         component="span"
//                         className={css.error}
//                     />
//                 </div>

//                 <div className={css.formGroup}>
//                     <label htmlFor={`${fieldId}-content`}>Content</label>
//                     <Field
//                         as="textarea"
//                         id={`${fieldId}-content`}
//                         name="content"
//                         rows={8}
//                         className={css.textarea}
//                     />
//                     <ErrorMessage
//                         name="content"
//                         component="span"
//                         className={css.error}
//                     />
//                 </div>

//                 <div className={css.formGroup}>
//                     <label htmlFor={`${fieldId}-tag`}>Tag</label>
//                     <Field
//                         as="select"
//                         id={`${fieldId}-tag`}
//                         name="tag"
//                         className={css.select}>
//                         <option value="Todo">Todo</option>
//                         <option value="Work">Work</option>
//                         <option value="Personal">Personal</option>
//                         <option value="Meeting">Meeting</option>
//                         <option value="Shopping">Shopping</option>
//                     </Field>
//                     <ErrorMessage
//                         name="tag"
//                         component="span"
//                         className={css.error}
//                     />
//                 </div>

//                 <div className={css.actions}>
//                     <button onClick={onSuccess} type="button" className={css.cancelButton}>
//                         Cancel
//                     </button>
//                     <button
//                         type="submit"
//                         className={css.submitButton}
//                         disabled={isPending}
//                     >
//                         Create note
//                     </button>
//                 </div>
//             </Form>
//         </Formik >
//     )
// }

'use client';

import css from './NoteForm.module.css';

import { useId } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { createNote } from '@/lib/api';
import { NoteFormType } from '@/types/note';
import { useStore } from '@/lib/store/noteStore';

export default function NoteForm() {
    const fieldId = useId();
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
        <div className={css.form}>
            <form action={handleSubmit}>
                <div className={css.formGroup}>
                    <label htmlFor={`${fieldId}-title`}>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={draft.title}
                        id={`${fieldId}-title`}
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
                    <button className={css.submitButton} type="submit">Create note</button>
                    <button className={css.cancelButton} type="button" onClick={() => router.push('/notes/filter/All')}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}