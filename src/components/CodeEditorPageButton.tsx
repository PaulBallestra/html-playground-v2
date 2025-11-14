'use client'

import { cn } from "@/lib/utils"

const CodeEditorPageButton = ({onClick, label, isActive}: {onClick: () => void, label: string, isActive: boolean}) => {
    return (
        <button onClick={onClick} className={cn("px-2 py-1 cursor-pointer bg-gray-900 text-white/80 hover:bg-gray-700 border-b-1 border-transparent", isActive && "bg-white/80 text-black hover:bg-white/80")}>{label}</button>
    )
}

export default CodeEditorPageButton