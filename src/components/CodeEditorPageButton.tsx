'use client'

import { cn } from "@/lib/utils"

const CodeEditorPageButton = ({onClick, label, isActive}: {onClick: () => void, label: string, isActive: boolean}) => {
    return (
        <button onClick={onClick} className={cn("px-[1vw] py-[.5vh] cursor-pointer bg-transparent text-white/80 hover:bg-white/10 border-b-1 border-transparent", isActive && "bg-white/80 text-black hover:bg-white/80")}>{label}</button>
    )
}

export default CodeEditorPageButton