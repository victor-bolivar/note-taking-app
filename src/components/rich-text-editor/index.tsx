import './styles.scss'

import { updateNote } from '@/api/notes.api'
import { useEffect, useRef } from 'react'
import { useNotes } from '@/hooks/use-notes'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import { extensions } from './extensions'
import MenuBar from './MenuBar'
import { Note } from '@/lib/types'

type RichTextEditorParams = {
    note: Note
}

const RichTextEditor = ({ note }: RichTextEditorParams) => {
    const notesQuery = useNotes();

    const lastChange = useRef<NodeJS.Timeout | null>(null)
    const handleUpdate = async ({ editor }: { editor: any }) => {
        if (lastChange.current) {
            clearTimeout(lastChange.current);
        }

        lastChange.current = setTimeout(async () => {
            lastChange.current = null;

            const newContent = editor.getHTML();
            await updateNote({ id: note.id, content: newContent });

            await notesQuery.issueQuery.refetch(); // Ensures the sidebar updates immediately
        }, 500);
    };

    return (
        <EditorProvider slotBefore={<MenuBar note={note} />} extensions={extensions} autofocus={'end'} onUpdate={handleUpdate} >
        </EditorProvider>
    )
}

export default RichTextEditor