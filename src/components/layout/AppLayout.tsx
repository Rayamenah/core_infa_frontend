"use client";
import { ReactNode } from "react";
import { AppSidebar } from "../organisms/Sidebar";
import TopNavbar from "../organisms/TopNavbar";

interface DashboardLayoutProps {
    children: ReactNode;
}

const AppLayout: React.FC<DashboardLayoutProps> = ({ children }) => {

    return (
        <div className="relative flex w-full h-screen overflow-hidden">
            {/* Sidebar */}
            <AppSidebar />

            {/* Main content area */}
            <div className="w-full flex flex-col h-full">
                <TopNavbar />

                {/* Ensure main takes up full height */}
                <main className="w-full px-5 pt-2 flex-1 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AppLayout;
