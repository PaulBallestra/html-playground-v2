'use client'

import { cn } from "@/lib/utils";
import { Editor } from "@monaco-editor/react";

export default function CodeEditor({ language, defaultValue, value, onChange, className }: { language: "html" | "css" | "javascript", defaultValue?: string, value: string, onChange: (value: any, event: any) => void, className?: string }) {
  return (
    <div className={cn("relative h-fit", className)}>
      <Editor 
        theme="vs-dark" 
        height="50vh" 
        width="100%"
        defaultLanguage={language} 
        defaultValue={defaultValue}
        value={value}
        onChange={onChange} 
        options={{
          tabSize: 2,
        }} 
      />
    </div>
  );
}
