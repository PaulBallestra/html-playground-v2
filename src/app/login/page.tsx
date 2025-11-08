import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

const LoginForm = dynamic(() => import('@/components/LoginForm'))

export default function LoginPage(){
    const baseStyles = "h-screen w-screen flex flex-col items-center justify-center p-8";
    const backgroundStyles = "bg-radial-[at_50%_0%] from-base-100/50 via-base-200/50 to-base-300/50";

    return (
        <div className={cn(baseStyles, backgroundStyles)}>
            <LoginForm />
        </div>
    );
}