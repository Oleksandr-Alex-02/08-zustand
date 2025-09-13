
"use client"

import css from "./page.module.css";
import Link from "next/link";

import { useDebouncedCallback } from "use-debounce";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/lib/api";

import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";

interface NotesClientProps {
    category: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping" | undefined;
}

export default function NotesClient({ category }: NotesClientProps) {
    const { slug } = useParams<{ slug: string }>()

    const [page, setPage] = useState<number>(1)
    console.log(slug)

    const onQueryChange = useDebouncedCallback(() => {
        setPage(1)
    }, 300)

    const { data: note, isLoading, error } = useQuery({
        queryKey: ["notes", category],
        queryFn: () => getCategories(category),
        refetchOnMount: false,

    });

    console.log(note)

    const totalPages = note?.length ?? 1

    return (
        <div className={css.app}>
            <header className={css.toolbar}>
                {<SearchBox onChange={onQueryChange} />}

                <Pagination
                    page={page}
                    totalPages={totalPages}
                    setPage={(selected) => setPage(selected)}
                />

                <Link href="/notes/action/create">
                    <button className={css.button} >Create</button>
                </Link>
            </header>
            {isLoading && <>Loading notes...</>}
            {error && <>Error occured</>}

            <NoteList notes={note || []} />
        </div>
    );
}
