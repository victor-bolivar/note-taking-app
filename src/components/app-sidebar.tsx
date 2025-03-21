"use client"

import * as React from "react"
import { ArchiveX, Command, File, Inbox, Send, Trash2 } from "lucide-react"

import { NavUser } from "./nav-user"
import { Label } from "@/components/ui/label"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useNavigate, useSearchParams } from "react-router"

// This is sample data
type Note = {
  id: string,
  title: string,
  content: string,
  created_at: string
}
const notesData: Note[] = [
  {
    id: "1",
    title: "title",
    content: "content loremidedede dededddddd dedede deded ed e de d ed ededededede dededededed edededede dedededede d",
    created_at: "2025-03-20 15:30:00"
  },
  {
    id: "2",
    title: "title 2",
    content: "content",
    created_at: "2025-01-20 15:30:00"
  },
  {
    id: "3",
    title: "title 3",
    content: "content",
    created_at: "2024-03-20 15:30:00"
  }
]
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  }
}

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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // Note: I'm using state to show active item.
  // IRL you should use the url/router.
  const [activeItem, setActiveItem] = React.useState(navMain[0])
  const [notes, setNotes] = React.useState(notesData)
  const { setOpen } = useSidebar()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <Sidebar
      collapsible="offcanvas"
      className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row md:[&>[data-sidebar=sidebar]]:flex-row [&>[data-sidebar=sidebar]]:flex-col sm:[&>[data-sidebar=sidebar]]:flex-col"
      {...props}
    >
      <Sidebar collapsible="none" className="border-r w-full md:w-[200px] border-b md:border-b-0">
        <SidebarHeader>
          <NavUser user={data.user} />
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
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="px-0">
            <SidebarGroupContent>
              {notes.map((note) => (
                <a
                  onClick={() => {
                    setSearchParams((prev) => {
                      prev.set("id", note.id);
                      return prev;
                    });
                  }}
                  key={note.id}
                  className="flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <div className="flex w-full items-center gap-2">
                    <span className="font-medium">{note.title}</span> <span className="ml-auto text-xs">{note.created_at}</span>
                  </div>
                  <span className="line-clamp-2 w-[260px] whitespace-break-spaces text-xs">{note.content}</span>
                </a>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  )
}

