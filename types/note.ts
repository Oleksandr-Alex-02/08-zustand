export interface Note {
    id: string,
    tag: string,
    title: string,
    content: string,
    createdAt: string,
    updatedAt: string,
}

export interface NoteFormType {
    tag: string,
    title: string,
    content?: string,
}

export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";