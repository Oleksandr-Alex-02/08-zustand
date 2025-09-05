
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { fetchNotes } from "@/lib/api"
import Notes from './Notes.client'

type Props = {
    params: Promise<{ slug: string[] }>;
};

export default async function App({ params }: Props) {
    const { slug } = await params;

    const queryClient: QueryClient = new QueryClient()
    const qp = {
        name: "notes",
        search: "",
        initPage: Number(1),
        perPage: Number(12),
        tag: slug[0] === "All" ? undefined : slug[0]
    };
    const { name, search, initPage, perPage, tag } = qp

    await queryClient.prefetchQuery({
        queryKey: [name, search, initPage, tag],
        queryFn: () => fetchNotes(initPage, search, perPage, tag)
    })
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Notes searchParams={qp} />
        </HydrationBoundary>
    )
}