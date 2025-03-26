import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Outlet } from "react-router"

export default function MainLayout() {
    return (
        <SidebarProvider>
            <Outlet />
        </SidebarProvider>
    )
}

