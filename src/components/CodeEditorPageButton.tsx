'use client'

import { cn } from "@/lib/utils"

const CodeEditorPageButton = ({onClick, label, isActive}: {onClick: () => void, label: string, isActive: boolean}) => {
    return (
        <button onClick={onClick} className={cn("px-2 py-1 cursor-pointer bg-white text-black/80 hover:bg-gray-100 border-b-1 border-transparent", isActive && "bg-black border-white/50 text-white")}>{label}</button>
    )
}

export default CodeEditorPageButton