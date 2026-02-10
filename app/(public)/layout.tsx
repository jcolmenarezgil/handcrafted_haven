// app/(public)/layout.tsx
import Header from "../ui/header";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            {children}
        </>
    );
}