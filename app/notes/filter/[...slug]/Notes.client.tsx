"use client";

import css from "./page.module.css";

// import { useNavigate, useLocation } from "react-router-dom";
// import { useSearchParams, useRouter } from 'next/navigation';

import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import { useDebouncedCallback } from "use-debounce";

import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import SearchBox from "@/components/SearchBox/SearchBox";

interface AppProps {
    searchParams: {
        name: string;
        search: string;
        initPage: number;
        perPage?: number;
        tag?: string;
    };
}

export default function App({ searchParams }: AppProps) {
    const { name, search, initPage, perPage, tag } = searchParams;

    // const searchParam = useSearchParams();
    // const router = useRouter();
    // const isModalOpen = searchParam.get('modal') === 'true';

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // const openModal = () => {
    //     const params = new URLSearchParams(searchParam.toString());
    //     params.set('modal', 'true');
    //     router.replace(`?${params.toString()}`);
    // };

    // const closeModal = () => {
    //     const params = new URLSearchParams(searchParams.toString());
    //     params.delete('modal');
    //     router.replace(`?${params.toString()}`);
    // };

    const [inputValue, setInputValue] = useState<string>(search);
    const [searchQuery, setSearchQuery] = useState<string>(search);
    const [currentPage, setCurrentPage] = useState<number>(initPage);

    const debouncedSetSearchQuery = useDebouncedCallback((value: string) => {
        setSearchQuery(value);
        setCurrentPage(1);
    }, 1000);

    const { data, isLoading, isError } = useQuery({
        queryKey: [name, searchQuery, currentPage, tag],
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
                <button className={css.button} onClick={openModal}>
                    Create note +
                </button>
            </header>

            {searchQuery && isLoading && !data && <>Loading notes...</>}
            {searchQuery && isError && <>Error occurred</>}
            {data && data.notes.length > 0 && <NoteList notes={data.notes} />}

            {isModalOpen && (
                <Modal onClose={closeModal}>
                    <NoteForm onSuccess={closeModal} />
                </Modal>
            )}
        </div>
    );
}