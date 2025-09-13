
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { fetchNotes } from "@/lib/api";
import { Metadata } from "next";

import NotesClient from "./Notes.client"

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

export default async function Notes({ params }: Props) {
    const { slug } = await params;

    const qc: QueryClient = new QueryClient()
    const qp = {
        name: "notes",
        search: "",
        initPage: 1,
        perPage: 12,
        tag: slug[0] === "All" ? undefined : slug[0]
    };
    const { name, search, initPage, perPage, tag } = qp
    const tagNote = slug[0] === "All" ? undefined : slug[0] as "Todo" | "Work" | "Personal" | "Meeting" | "Shopping" | undefined;

    await qc.prefetchQuery({
        queryKey: ["notes", name, search, initPage, tag],
        queryFn: () => fetchNotes(search, initPage, perPage, tag),
    })

    console.log(slug[0])

    return (
        <HydrationBoundary state={dehydrate(qc)}>
            <NotesClient category={tagNote} />
        </HydrationBoundary>
    )
}