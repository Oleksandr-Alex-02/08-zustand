
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { fetchNotes } from "@/lib/api"

import Notes from './Notes.client'
import { Metadata } from "next";

type Props = {
    params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    return {
        title: `Note: ${slug[0]}`,
        description: `Filter ${slug[0]}`,
        openGraph: {
            title: `Note: ${slug[0]}`,
            description: `Filter ${slug[0]}`,
            url: `https://notehub.com/notes/filter/${slug[0]}`,
            images: [
                {
                    url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                    width: 1200,
                    height: 630,
                    alt: `Filter ${slug[0]}`,
                },],
        }
    }
}

export default async function App({ params }: Props) {
    const { slug } = await params;

    const queryClient: QueryClient = new QueryClient()
    const qp = {
        notes: "notes",
        search: "",
        initPage: Number(1),
        perPage: Number(12),
        tag: slug[0] === "All" ? undefined : slug[0]
    };
    const { notes, search, initPage, perPage, tag } = qp

    await queryClient.prefetchQuery({
        queryKey: [notes, search, initPage, tag],
        queryFn: () => fetchNotes(initPage, search, perPage, tag)
    })
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Notes searchParams={qp} />
        </HydrationBoundary>
    )
}