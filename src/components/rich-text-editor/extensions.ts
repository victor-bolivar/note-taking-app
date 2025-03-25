import Document from '@tiptap/extension-document'
import Placeholder from '@tiptap/extension-placeholder'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import StarterKit from '@tiptap/starter-kit'

const funnyPlaceholders = [
    "Write something brilliant... or at least spellcheck it.",
    "This note will self-destruct in 10 seconds. Just kidding. Or am I?",
    "Don’t forget to actually read this later.",
    "Another great idea that I’ll totally act on.",
    "Just writing this so I feel productive.",
    "This is where genius begins… or just a grocery list.",
    "Dear Future Me, figure this out.",
    "Note to self: Find better placeholders.",
    "If this was important, I’d remember it… right?",
    "Random thoughts go here. No judgment.",
    "Probably something super insightful… or nonsense.",
    "Ideas? Rants? Conspiracies? You decide.",
    "Don't forget to delete this before someone sees it.",
    "Step 1: Write note. Step 2: ??? Step 3: Profit.",
    "Brain dump zone – enter at your own risk."
];

const CustomDocument = Document.extend({
    content: 'heading block*',
})

export const extensions = [
    CustomDocument,
    Placeholder.configure({
        placeholder: ({ node }) => {
            if (node.type.name === 'heading') {
                return 'New note'
            }

            return funnyPlaceholders[Math.floor(Math.random() * funnyPlaceholders.length)]
        },
    }),
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ types: [ListItem.name] }),
    StarterKit.configure({
        document: false,
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