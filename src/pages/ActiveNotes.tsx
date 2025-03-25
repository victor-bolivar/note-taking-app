import RichTextEditor from "@/components/rich-text-editor";
import { useNotes } from "@/hooks/use-notes";
import { Note } from "@/lib/types";
import { useEffect } from "react";
import { useParams } from 'react-router-dom';

const ActiveNotes = () => {
    const { noteId } = useParams();
    const notesQuery = useNotes();

    useEffect(() => {
        if (noteId) {
            notesQuery.issueQuery.refetch(); // Refetch notes when noteId changes
        }
    }, [noteId, notesQuery.issueQuery]);

    if (notesQuery.issueQuery.isLoading) {
        return <p>Fetching data...</p>
    }

    if (!noteId) {
        // Re-use the previously fetched data
        const numNotes = notesQuery.issueQuery.data.length
        if (numNotes > 0) {
            const lastNote: Note = notesQuery.issueQuery.data[notesQuery.issueQuery.data.length - 1]
            return <p>{JSON.stringify(lastNote)}</p>

            // TODO this causes Node.removeChild: The node to be removed is not a child of this node
            //return <RichTextEditor key={lastNote.id} noteId={lastNote.id} content={lastNote.content} />
        } else {
            return <p>Press here to create a new note!</p>
        }
    } else {
        const note: Note = notesQuery.issueQuery.data?.find((note: Note) => note.id === noteId)
        if (!note) {
            return <p>Note does not exist!</p>
        } else {
            // TODO this causes Node.removeChild: The node to be removed is not a child of this node
            return <RichTextEditor key={note.id} noteId={note.id} content={note.content} />
            //return <p>{JSON.stringify(note)}</p>
        }
    }
}
export default ActiveNotes
