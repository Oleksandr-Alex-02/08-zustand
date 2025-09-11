"use client";

import css from "./page.module.css";

import Link from "next/link";
import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import { useDebouncedCallback } from "use-debounce";

import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";

interface AppProps {
    searchParams: {
        // notes: string;
        search: string;
        initPage: number;
        perPage?: number;
        tag?: string;
    };
}

export default function App({ searchParams }: AppProps) {
    const { search, initPage, perPage, tag } = searchParams;

    const [inputValue, setInputValue] = useState<string>(search);
    const [searchQuery, setSearchQuery] = useState<string>(search);
    const [currentPage, setCurrentPage] = useState<number>(initPage);

    const debouncedSetSearchQuery = useDebouncedCallback((value: string) => {
        setSearchQuery(value);
        setCurrentPage(1);
    }, 1000);

    const { data, isLoading, isError } = useQuery({
        queryKey: [searchQuery, currentPage, tag],
        queryFn: () => fetchNotes(currentPage, searchQuery, perPage, tag),
        placeholderData: keepPreviousData,
        refetchOnMount: false,
    });

    const totalPages = data?.totalPages || 0;

    return (
        <div className={css.app}>
            <header className={css.toolbar}>
                <SearchBox
                    text={inputValue}
                    onChange={(value) => {
                        setInputValue(value);
                        debouncedSetSearchQuery(value);
                    }}
                />
                {totalPages > 1 && (
                    <Pagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                    />
                )}
                <Link href="/notes/action/create">
                    <button className={css.button} >Create</button>
                </Link>

            </header>

            {searchQuery && isLoading && !data && <>Loading notes...</>}
            {searchQuery && isError && <>Error occurred</>}
            {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
        </div>
    );
}