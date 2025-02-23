import { Home, LogOut } from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    // SidebarMenuSub,
    SidebarTrigger,
    useSidebar
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { tabs } from "@/data/tabs";



export function AppSidebar() {



    const { isMobile } = useSidebar()
    return (
        <Sidebar
            className="block bg-[#002F6C] p-0"
            variant="inset"
            collapsible="offcanvas">
            <SidebarHeader className='p-0 flex-row'>
                <div className="pt-7 pl-[10px] flex gap-2 justify-beween lg:justify-start">
                    <Image
                        alt=""
                        height={45}
                        width={138}
                        src="/logo.svg"
                        className="mx-auto"
                    />
                    {isMobile ? <SidebarTrigger /> : null}
                </div>
            </SidebarHeader>
            <SidebarContent className="font-supreme pl-[10px]">
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu >
                            <SidebarMenuItem
                                className="flex justify-center mt-8">
                                <SidebarMenuButton className="py-6 gap-4 bg-[#E4F0FF] rounded-[8px]" asChild>
                                    <Link href='/'>
                                        <Home className='text-[#014DAF]' />
                                        <span className="text-xs font-normal tracking-[0.5px] text-[#014DAF]">Dashboard</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarGroupLabel className="text-[#7E8B9C] text-[8px] font-normal tracking-[0.5px] w-fit mt-4 mb-2">MAIN MENU</SidebarGroupLabel>

                            {tabs?.map((tab) => (
                                <SidebarMenuItem
                                    className="flex justify-center"
                                    key={tab.name}>
                                    <SidebarMenuButton className="py-3 gap-3 h-9 rounded-none hover:bg-white hover:text-primary-500 hover:border-r-2 hover:border-r-primary-500" asChild>
                                        <Link href={tab.link || ""}>
                                            {tab.icon && <tab.icon className='text-[#00000080]' />}
                                            <span className="text-xs font-normal tracking-[0.5px] text-[#00000080]">{tab.name}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                            <SidebarMenuItem
                                className="flex justify-center mt-[165px]">
                                <SidebarMenuButton className="py-6 gap-4 rounded-none hover:bg-white hover:text-primary-500 hover:border-r-2 hover:border-r-primary-500" asChild>
                                    <Link href="/">
                                        <LogOut className='text-[#00000080]' />
                                        <span className="text-xs font-normal tracking-[0.5px] text-[#00000080]">Logout</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="mb-6 flex flex-row justify-center gap-[2px] mt-11">
                <div className="flex flex-col items-start gap-1">
                    <div className="text-[8px] text-[#808080]">POWERED BY</div>
                    <Image
                        alt="core-infra logo"
                        src="/footer-logo.svg"
                        width={93.33}
                        height={42}
                    />
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}
