import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RichTextEditor from "@/components/rich-text-editor";
import { useNotes } from "@/hooks/use-notes";
import { Note } from "@/lib/types";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarInput,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    useSidebar,
    SidebarInset,
    SidebarTrigger
} from "@/components/ui/sidebar"
import { NavUser } from "@/components/nav-user";
import { ArchiveX, File } from "lucide-react"
import { createNewNote } from "@/api/notes.api";
import Button from "@/components/common/Button";
import { FaPlus } from "react-icons/fa";
import { getContentFromNote, getTitleFromNote, timeAgo } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

const navMain = [
    {
        title: "Active",
        url: "/notes",
        icon: File,
        isActive: false,
    },
    {
        title: "Archived",
        url: "/archived",
        icon: ArchiveX,
        isActive: false,
    }
]
const user = {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
}


const ActiveNotes = () => {

    // Note: I'm using state to show active item.
    // IRL you should use the url/router.
    const [activeItem, setActiveItem] = useState(navMain[0])
    const notesQuery = useNotes()
    const { setOpen } = useSidebar()
    const navigate = useNavigate()
    const { noteId } = useParams();

    console.log(`re-rendering active notes with id: ${noteId}`)

    useEffect(() => {
        if (noteId) {
            notesQuery.issueQuery.refetch();
        }
    }, [noteId]);

    const notes = notesQuery.issueQuery.data || [];
    const isLoading = notesQuery.issueQuery.isLoading;
    const noNotes = !noteId && notes.length === 0;
    const selectedNote = noteId ? notes.find((note: Note) => note.id === noteId) : notes[notes.length - 1];

    const handleCreateNewNote = async () => {
        const newNote: Note = await createNewNote() // TODO block button while waiting
        navigate(`/notes/${newNote.id}`)
    }


    return (
        <>
            <Sidebar
                collapsible="offcanvas"
                className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row md:[&>[data-sidebar=sidebar]]:flex-row [&>[data-sidebar=sidebar]]:flex-col sm:[&>[data-sidebar=sidebar]]:flex-col"
            >
                <Sidebar collapsible="none" className="border-r w-full md:w-[200px] border-b md:border-b-0">
                    <SidebarHeader>
                        <NavUser user={user} />
                    </SidebarHeader>
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupContent className="px-1.5 md:px-0">
                                <SidebarMenu>
                                    {navMain.map((item) => (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton
                                                tooltip={{
                                                    children: item.title,
                                                    hidden: false,
                                                }}
                                                onClick={() => {
                                                    setActiveItem(item)
                                                    navigate(item.url)
                                                    setOpen(true)
                                                }}
                                                isActive={activeItem?.title === item.title}
                                                className="px-2.5 md:px-2"
                                            >
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                </Sidebar>

                <Sidebar collapsible="none" className="flex-1 flex">
                    <SidebarHeader className="gap-3.5 border-b p-4">
                        <SidebarInput placeholder="Type to search..." />

                        <Button variant="primary" icon={<FaPlus />} onClick={handleCreateNewNote}>New note</Button>

                    </SidebarHeader>
                    <SidebarContent>
                        <SidebarGroup className="px-0">
                            <SidebarGroupContent>
                                {notesQuery.issueQuery.isLoading && 'Loading...'}
                                {notesQuery.issueQuery.error && 'Error'}
                                {notesQuery.issueQuery.data && notesQuery.issueQuery.data.sort((noteA: Note, noteB: Note) =>
                                    new Date(noteB.created_at).getTime() - new Date(noteA.created_at).getTime()
                                ).map((note: Note) => (
                                    <a
                                        onClick={() => {
                                            navigate(`/notes/${note.id}`)
                                        }}
                                        key={note.id}
                                        className="flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                    >
                                        <div className="flex w-full items-center gap-2">
                                            <span className="font-medium text-md">{getTitleFromNote(note.content)}</span> <span className="ml-auto text-xs">{timeAgo(note.created_at)}</span>
                                        </div>
                                        <span className="line-clamp-2 w-[260px] whitespace-break-spaces text-xs">{getContentFromNote(note.content)}</span>
                                    </a>
                                ))}
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                </Sidebar>
            </Sidebar>

            <SidebarInset>
                <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <h1>Notes</h1>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4">

                    {
                        isLoading ? (
                            <p>Fetching data...</p>
                        ) : noNotes ? (
                            <p>Click here to create a new note!</p>
                        ) : selectedNote ? (
                            <RichTextEditor note={selectedNote} />
                        ) : (
                            <p>Note does not exist!</p>
                        )
                    }
                </div>
            </SidebarInset>

        </>
    );
};

export default ActiveNotes;
