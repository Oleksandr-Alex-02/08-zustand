"use client"

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createNote } from "@/lib/api"

export default function NoteForm() {
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: createNote,
        onSuccess: () => router.push("/notes/filter/All"),
    })

    const hendleSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;
        mutation.mutate(title);
        console.log(title)
    };

    return (
        <div>
            <h1>Форма</h1>
            <form
                action={hendleSubmit}>
                <input type="title" name="title" />
                <button type="submit">Submit</button>
                <button type="button" onClick={() => router.push("/notes/filter/All")}>Cancel</button>
            </form>
        </div>
    )
}