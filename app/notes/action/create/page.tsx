
import { Metadata } from 'next';

import CreateNoteClient from './CreateNote';

export const metadata: Metadata = {
    title: "CreateNote",
    description: "Create your note with NOTEHUB",
    openGraph: {
        title: `CreateNote`,
        description: `Create your note with NOTEHUB`,
        url: `https://notehub.com/notes/action/create`,
        images: [
            {
                url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                width: 1200,
                height: 630,
                alt: `NOTEHUB`,
            },],
    }
};

export default async function CreateNote() {


    return (
        <main>
            <h1>Create a new note</h1>
            <CreateNoteClient />
        </main>
    );
};
