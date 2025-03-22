import { useNotes } from "@/hooks/use-notes";
import { Note } from "@/lib/types";
import { useSearchParams } from "react-router";

const ActiveNotes = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const noteId = searchParams.get("id")
    const notesQuery = useNotes();

    return (
        <div>
            {!noteId
                ? <p>No notes yet!</p>
                : <p>{JSON.stringify(notesQuery.issueQuery.data?.find(note => note.id === noteId))}</p>}
        </div>
    )
}

export default ActiveNotes
