import { useEffect } from "react";
import { useParams } from "react-router-dom";
import RichTextEditor from "@/components/rich-text-editor";
import { useNotes } from "@/hooks/use-notes";
import { Note } from "@/lib/types";

const ActiveNotes = () => {
    const { noteId } = useParams();
    const notesQuery = useNotes();

    useEffect(() => {
        if (noteId) {
            notesQuery.issueQuery.refetch();
        }
    }, [noteId, notesQuery.issueQuery]);

    if (notesQuery.issueQuery.isLoading) {
        return <p>Fetching data...</p>;
    }

    const notes = notesQuery.issueQuery.data || [];
    let selectedNote;

    if (!noteId) {
        if (notes.length == 0) {
            return <p>Click here to create a new note!</p>
        }
        selectedNote = notes[notes.length - 1]
    } else {
        selectedNote = notes.find((note: Note) => note.id === noteId)
        if (!selectedNote) {
            return <p>Note not found!</p>
        }
    }

    return (
        <RichTextEditor
            // key={selectedNote.id} // Ensure React correctly tracks re-renders
            noteId={selectedNote.id}
            content={selectedNote.content}
        />
    );
};

export default ActiveNotes;
