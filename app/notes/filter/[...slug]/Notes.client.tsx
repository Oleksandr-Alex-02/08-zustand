
"use client"
import css from "./page.module.css";
import Link from "next/link";

import { useDebounce, useDebouncedCallback } from "use-debounce";
import { useEffect, useRef, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";

import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";

interface NotesClientProps {
    searchParams: {
        name: string,
        search: string,
        initPage: number,
        perPage?: number,
        tag?: string
    },
}

export default function NotesClient({ searchParams: { name, search, initPage, perPage, tag } }: NotesClientProps) {
    const [page, setPage] = useState<number>(initPage);
    const [query, setQuery] = useState<string>(search);

    const [queryDebounced] = useDebounce(query, 1000);
    const debouncedSetSearchQuery = useDebouncedCallback((query: string) => {
        setQuery(query);
        setPage(1);
    }, 1000);

    const { data, isLoading, isError, isSuccess } = useQuery({
        queryKey: [name, queryDebounced, page, tag],
        queryFn: () => fetchNotes(queryDebounced, page, perPage, tag),
        placeholderData: keepPreviousData,
        refetchOnMount: false
    });

    const firstUpdate = useRef(true);

    useEffect(() => {
        if (!firstUpdate.current && isSuccess && !data?.notes.length) {
            <p>No notes found for your request.</p>
        }
        else firstUpdate.current = false;
    }, [data, isSuccess]);

    useEffect(() => setPage(1), [queryDebounced])

    return (
        <div className={css.app}>
            <header className={css.toolbar}>
                {<SearchBox onChange={(query) => setQuery(query)} />}
                {data && data.totalPages > 0 && (
                    <Pagination
                        page={page}
                        totalPages={data.totalPages}
                        setPage={(selected) => setPage(selected)}
                    />
                )}
                <Link href="/notes/action/create">
                    <button className={css.button} >Create</button>
                </Link>
            </header>
            {query && isLoading && !data && <>Loading notes...</>}
            {query && isError && <>Error occured</>}
            {data && data.notes.length > 0 && <NoteList notes={data.notes} />}

        </div>
    );
}
