import { AuthLayout } from "@/ui/auth/AuthLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
    return <AuthLayout>
        {children}
    </AuthLayout>
}