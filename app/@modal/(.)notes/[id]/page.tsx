
import { getIdNotes } from '@/lib/api';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NotePreviewClient from './NotePreview.client';

type Props = {
    // onClose: () => void;
    params: Promise<{ id: string }>;
};

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

