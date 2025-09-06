
// import { getIdNotes } from "@/lib/api";
// import type { Metadata } from "next";

// interface NoteDetailsProps {
//     params: { id: string };
// }

// export async function generateNoteMetadata({ params }: NoteDetailsProps): Promise<Metadata> {
//     const { id } = params;
//     const note = await getIdNotes(id);

//     return {
//         title: `Note: ${note.title}`,
//         description: note.content.slice(0, 30),
//         openGraph: {
//             title: `Note: ${note.title}`,
//             description: note.content.slice(0, 100),
//             url: `https://notehub.com/notes/${id}`,
//             images: [
//                 {
//                     url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
//                     width: 1200,
//                     height: 630,
//                     alt: note.title,
//                 },
//             ],
//         },
//     };
// }



// import { generateNoteMetadata } from "@/lib/metadata/noteMetadata";
// export { generateNoteMetadata as generateMetadata };