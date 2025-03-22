import './styles.scss'

import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { BubbleMenu, EditorProvider, FloatingMenu, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { GoHorizontalRule } from "react-icons/go";
import { MdFormatQuote } from "react-icons/md";
import { GoFileCode } from "react-icons/go";
import { GoListOrdered, GoListUnordered } from "react-icons/go";
import { RiBold, RiItalic, RiStrikethrough, RiCodeAiFill, RiCodeBlock, RiParagraph, RiH1, RiH2, RiH3 } from "react-icons/ri";

const MenuBar = () => {
    const { editor } = useCurrentEditor();

    if (!editor) {
        return null;
    }

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


            <FloatingMenu className="floating-menu" tippyOptions={{ duration: 100 }} editor={editor}>
                {menuOptions}
            </FloatingMenu>
        </>
    );
};


const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ types: [ListItem.name] }),
    StarterKit.configure({
        bulletList: {
            keepMarks: true,
            keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
            keepMarks: true,
            keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
    }),
]

type RichTextEditorParams = {
    content: string,
    handleUpdate: ({ editor }: { editor: any; }) => void
}
const RichTextEditor = ({ content, handleUpdate }: RichTextEditorParams) => {
    return (
        <EditorProvider slotBefore={<MenuBar />} extensions={extensions} content={content} autofocus={'end'} onUpdate={handleUpdate} >
        </EditorProvider>
    )
}

export default RichTextEditor