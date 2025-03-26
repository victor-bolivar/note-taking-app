import { BubbleMenu, useCurrentEditor } from '@tiptap/react'
import { GoHorizontalRule } from "react-icons/go";
import { MdFormatQuote } from "react-icons/md";
import { GoListOrdered, GoListUnordered } from "react-icons/go";
import { RiBold, RiItalic, RiStrikethrough, RiCodeAiFill, RiCodeBlock, RiParagraph, RiH1, RiH2, RiH3 } from "react-icons/ri";
import { useEffect } from 'react';
import { Note } from '@/lib/types';

type MenuBarProps = {
    note: Note
}

const MenuBar = ({ note }: MenuBarProps) => {
    const { editor } = useCurrentEditor();

    if (!editor) {
        return null;
    }

    // The RichTextEditor has problems when re-rendering a new one wehn using a key={noteId}
    // Instead, we'll just update the content without having to destroy and generate a new <RichTextEditor/>
    useEffect(() => {
        if (editor) {
            editor.commands.setContent(note.content)
        }
    }, [note])

    const menuOptions = <>
        {[
            { label: <RiBold />, action: () => editor.chain().focus().toggleBold().run(), active: "bold" },
            { label: <RiItalic />, action: () => editor.chain().focus().toggleItalic().run(), active: "italic" },
            { label: <RiStrikethrough />, action: () => editor.chain().focus().toggleStrike().run(), active: "strike" },
            { label: <RiCodeAiFill />, action: () => editor.chain().focus().toggleCode().run(), active: "code" },
        ].map(({ label, action, active }) => (
            <button key={active} onClick={action} className={editor.isActive(active) ? "is-active" : ""}>
                {label}
            </button>
        ))}

        {
            [
                { label: <RiParagraph />, type: "paragraph", action: () => editor.chain().focus().setParagraph().run() },
                { label: <RiH1 />, type: "heading", level: 1, action: () => editor.chain().focus().toggleHeading({ level: 1 }).run() },
                { label: <RiH2 />, type: "heading", level: 2, action: () => editor.chain().focus().toggleHeading({ level: 2 }).run() },
                { label: <RiH3 />, type: "heading", level: 3, action: () => editor.chain().focus().toggleHeading({ level: 3 }).run() }
            ].map(({ label, type, level, action }) => (
                <button
                    key={type + (level || "")}
                    onClick={action}
                    className={editor.isActive(type, level ? { level } : {}) ? "is-active" : ""}
                >
                    {label}
                </button>
            ))
        }

        <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive("bulletList") ? "is-active" : ""}>
            <GoListUnordered />
        </button>
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive("orderedList") ? "is-active" : ""}>
            <GoListOrdered />
        </button>

        <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={editor.isActive("codeBlock") ? "is-active" : ""}>
            <RiCodeBlock />
        </button>
        <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={editor.isActive("blockquote") ? "is-active" : ""}>
            <MdFormatQuote />
        </button>

        <button onClick={() => editor.chain().focus().setHorizontalRule().run()}><GoHorizontalRule /></button>
    </>

    return (
        <>
            <BubbleMenu className="bubble-menu" tippyOptions={{ duration: 100 }} editor={editor}>
                {menuOptions}
            </BubbleMenu>
            {/* <FloatingMenu className="floating-menu" tippyOptions={{ duration: 100 }} editor={editor}> {menuOptions} </FloatingMenu> */}
        </>
    );
};

export default MenuBar