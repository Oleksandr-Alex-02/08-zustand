// app/notes/action/create

import { getCategories } from '@/lib/api';
import NoteForm from '@/components/NoteForm/NoteForm';

export default async function CreateNote() {
    const categories = await getCategories();

    return (
        <>
            <NoteForm categories={categories} />
        </>
    );
};
