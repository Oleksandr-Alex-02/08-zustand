
import { dehydrate, HydrationBoundary, QueryClient, } from "@tanstack/react-query";
import { getIdNotes } from "@/lib/api";

import NoteDeteilsClient from './NoteDetails.client';



type NoteDetailsProps = {
    params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: NoteDetailsProps) {
    const { id } = await params
    const note = await getIdNotes(id)
    return {
        title: `Note: ${note.title}`,
        description: note.content.slice(0, 30),
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