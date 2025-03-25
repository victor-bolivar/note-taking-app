import './styles.scss'

import { updateNote } from '@/api/notes.api'
import { useRef } from 'react'
import { useNotes } from '@/hooks/use-notes'
import { EditorProvider } from '@tiptap/react'
import { extensions } from './extensions'
import MenuBar from './MenuBar'

type RichTextEditorParams = {
    noteId: string
    content: string,
}

const RichTextEditor = ({ noteId, content }: RichTextEditorParams) => {
    const notesQuery = useNotes();

    const lastChange = useRef<NodeJS.Timeout | null>(null)
    const handleUpdate = async ({ editor }: { editor: any }) => {
        if (lastChange.current) {
            clearTimeout(lastChange.current);
        }

        lastChange.current = setTimeout(async () => {
            lastChange.current = null;

            const newContent = editor.getHTML();
            await updateNote({ id: noteId, content: newContent });

            await notesQuery.issueQuery.refetch(); // Ensures the sidebar updates immediately
        }, 500);
    };

    return (
        <EditorProvider slotBefore={<MenuBar />} extensions={extensions} content={content} autofocus={'end'} onUpdate={handleUpdate} >
        </EditorProvider>
    )
}

export default RichTextEditor