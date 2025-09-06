
import { getIdNotes } from '@/lib/api';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NotePreviewClient from './NotePreview.client';

type Props = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props) {
    const { id } = await params
    const note = await getIdNotes(id)
    return {
        title: `Note: ${note.title}`,
        description: note.content.slice(0, 30),
    }
}

export default async function NotePreview({ params, }: Props) {
    const queryClient = new QueryClient()
    const { id } = await params;

    await queryClient.prefetchQuery({
        queryKey: ["note", id],
        queryFn: () => getIdNotes(id),
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotePreviewClient />
        </HydrationBoundary>
    );
};

