
import { dehydrate, HydrationBoundary, QueryClient, } from "@tanstack/react-query";
import { getIdNotes } from "@/lib/api";
import { Metadata } from "next";

import NoteDeteilsClient from './NoteDetails.client';

type NoteDetailsProps = {
    params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: NoteDetailsProps): Promise<Metadata> {
    const { id } = await params
    const note = await getIdNotes(id)

    return {
        title: `Note: ${note.title}`,
        description: note.content.slice(0, 30),
        openGraph: {
            title: `Note: ${note.title}`,
            description: note.content.slice(0, 100),
            url: `https://notehub.com/notes/${id}`,
            images: [
                {
                    url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                    width: 1200,
                    height: 630,
                    alt: note.title,
                },
            ],
        },
    }
}

export default async function NoteDetails({ params }: NoteDetailsProps) {
    const queryClient = new QueryClient()
    const { id } = await params

    await queryClient.prefetchQuery({
        queryKey: ["note", id],
        queryFn: () => getIdNotes(id),
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NoteDeteilsClient />
        </HydrationBoundary>
    )
}