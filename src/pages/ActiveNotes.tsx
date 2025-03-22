import { updateNote } from "@/api/notes.api";
import RichTextEditor from "@/components/rich-text-editor";
import { useNotes } from "@/hooks/use-notes";
import { Note } from "@/lib/types";
import { useRef } from "react";
import { useSearchParams } from "react-router";

const ActiveNotes = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const noteIdParam = searchParams.get("id")

    const notesQuery = useNotes();
    const note: Note = notesQuery.issueQuery.data?.find((note: Note) => note.id === noteIdParam)

    // Debouncing
    const lastChange = useRef<NodeJS.Timeout | null>(null)
    const handleUpdate = ({ editor }: { editor: any }) => {
        if (lastChange.current) {
            clearTimeout(lastChange.current)
        }

        lastChange.current = setTimeout(() => {
            // remove the current ref (the timeref doesnt dissapear automatically)
            lastChange.current = null

            const newContent = editor.getHTML()
            updateNote({ ...note, content: newContent })
        }, 500)
    }

    if (!noteIdParam) {
        return <p>No note selected!</p>
    } else if (!note) {
        return <p>Note does not exist!</p>
    } else {
        return (
            <RichTextEditor key={note.id} content={note.content} handleUpdate={handleUpdate} />
        )
    }
}

export default ActiveNotes
