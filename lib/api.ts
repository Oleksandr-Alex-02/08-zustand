
import axios from 'axios';
import { Note, NoteFormType } from "../types/note"

export interface NoteData {
    notes: Note[];
    totalPages: number;
}
const NOTEHUB_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
axios.defaults.baseURL = "https://notehub-public.goit.study/api";

export const fetchNotes = async (
    currentPage: number,
    searchQuery: string,
    perPage?: number,
    // tag?: string
): Promise<NoteData> => {
    const response = await axios.get<NoteData>("/notes", {
        params: {
            search: searchQuery,
            page: currentPage,
            perPage,
            // tag,
        },
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${NOTEHUB_TOKEN}`,
        },
    });

    return response.data;
};
// Нотатка по ID
export const getIdNotes = async (noteId: string) => {
    const res = await axios.get<Note>(
        `/notes/${noteId}`, {
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${NOTEHUB_TOKEN}`,
        }
    }
    );
    return res.data;
}
//Видалення нотатки
export const deleteNote = async (noteId: string) => {
    const res = await axios.delete<Note>(
        `/notes/${noteId}`, {
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${NOTEHUB_TOKEN}`,
        }
    }
    );
    return res.data;
}
// Нова нотатка
export const createNote = async (noteData: NoteFormType) => {
    const res = await axios.post<Note>(
        `/notes`, noteData, {
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${NOTEHUB_TOKEN}`,
        }
    }
    );
    return res.data;
}
// Фільтрація за категоріями
export const getCategories = async (
    tag?: string
): Promise<Note[]> => {
    const res = await axios.get<NoteData>('/notes', {
        params: {
            tag,
        },
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${NOTEHUB_TOKEN}`,
        }
    });
    return res.data.notes;
};


// interface NoteUpdate {
//     id: string;
//     title: string,
//     content: string,
//     tag: string,
// }

// export const patchNote = async (noteUpdate: NoteUpdate) => {
//     const res = await axios.patch<NoteData>(
//         `/notes/${noteUpdate.id}`, {
//         params: {
//             title: noteUpdate.title,
//             content: noteUpdate.content,
//             tag: noteUpdate.tag,
//         },
//         headers: {
//             accept: "application/json",
//             Authorization: `Bearer ${NOTEHUB_TOKEN}`,
//         }
//     });
//     return res.data;
// }