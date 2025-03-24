import RichTextEditor from "@/components/rich-text-editor";
import { useNotes } from "@/hooks/use-notes";
import { Note } from "@/lib/types";
import { useParams } from 'react-router-dom';

const ActiveNotes = () => {
    const { noteId } = useParams();

    const notesQuery = useNotes();

    if (notesQuery.issueQuery.isLoading) {
        return <p>Retrieving data...</p>
    }

    if (!noteId) {
        // escenario en que no hayan notas previas
        const numNotes = notesQuery.issueQuery.data.length
        if (numNotes > 0) {
            const lastNote: Note = notesQuery.issueQuery.data[notesQuery.issueQuery.data.length - 1]
            return <RichTextEditor key={lastNote.id} noteId={lastNote.id} content={lastNote.content} />
        } else {
            return <p>Press here to create a new note!</p>
        }

    } else {
        const note: Note = notesQuery.issueQuery.data?.find((note: Note) => note.id === noteId)
        if (!note) {
            return <p>Note does not exist!</p>
        } else {
            return (
                <RichTextEditor key={note.id} noteId={note.id} content={note.content} />
            )
        }
    }
}
export default ActiveNotes
