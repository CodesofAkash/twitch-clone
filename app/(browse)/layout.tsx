import { Navbar } from "./_components/navbar";

const BrowseLAyout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return ( 
        <>
        <Navbar />
        <div className="flex h-full pt-4">
            {children}
        </div>
        </>
    );
}

export default BrowseLAyout;