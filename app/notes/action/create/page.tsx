
import NoteForm from '@/components/NoteForm/NoteForm'
import css from './CreateNote.module.css'

export default function CreateNotePage() {

    return (
        <main className={css.main}>
            <div className={css.container}>
                <h1 className={css.title}>Create note</h1>
            </div>
            <NoteForm />
        </main>

    )
}