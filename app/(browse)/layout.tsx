import { Suspense } from "react";
import { Container } from "./_components/container";
import { Navbar } from "./_components/navbar";
import { Sidebar, SidebarSkeleton } from "./_components/sidebar";
import { AutoRefresh } from "./_components/auto-refresh";

const BrowseLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return ( 
        <>
        <Navbar />
        <div className="flex h-full pt-20">
            <Suspense fallback={<SidebarSkeleton />}>
                <Sidebar />
            </Suspense>
            <Container>
                {children}
            </Container>
        </div>
        <AutoRefresh />
        </>
    );
}

export default BrowseLayout;