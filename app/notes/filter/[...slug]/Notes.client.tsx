"use client";

import css from "./page.module.css";

import Link from "next/link";
import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getCategories, NoteData } from "@/lib/api";
import { useDebouncedCallback } from "use-debounce";

import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import { useParams } from "next/navigation";
import { Note } from "@/types/note";


export default function App() {

    const { tag } = useParams<{ tag: string }>();

    const [inputValue, setInputValue] = useState<string>();
    const [searchQuery, setSearchQuery] = useState<string>();
    const [currentPage, setCurrentPage] = useState<number>();

    const debouncedSetSearchQuery = useDebouncedCallback((value: string) => {
        setSearchQuery(value);
        setCurrentPage(1);
    }, 1000);

    const { data, isLoading, isError } = useQuery({
        queryKey: ["notes", searchQuery, currentPage, tag],
        queryFn: () => getCategories(tag),
        placeholderData: keepPreviousData,
        refetchOnMount: false,
    });

    console.log(data)
    const totalPages = data?.length || 0;

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
            {data && data.length > 0 && <NoteList notes={data} />}
        </div>
    );
}
