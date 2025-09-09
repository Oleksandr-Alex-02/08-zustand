import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Draft = {
    title: string;
    content: string;
    tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
};

type DraftStore = {
    draft: Draft;
    setDraft: (newDraft: Partial<Draft>) => void;
    clearDraft: () => void;
};

export const useStore = create<DraftStore>()(
    persist(
        (set) => ({
            draft: {
                title: '',
                content: '',
                tag: 'Todo',
            },
            setDraft: (newDraft) =>
                set((state) => ({
                    draft: { ...state.draft, ...newDraft },
                })),

            clearDraft: () =>
                set(() => ({
                    draft: {
                        title: '',
                        content: '',
                        tag: 'Todo',
                    },
                })),
        }),
        {
            name: "draft",
            partialize: (state) => ({ draft: state.draft }),
        }
    )
);