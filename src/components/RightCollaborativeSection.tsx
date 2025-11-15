'use client'

import CodeEditorIframe from "./CodeEditorIframe"
import CodeEditorPageButton from "./CodeEditorPageButton"
import CodeEditor from "./CodeEditor"
import { useMutation, useStorage } from "@liveblocks/react"
import { PAGES } from "@/constants/collaborative-code-editor"

const RightCollaborativeSection = () => {
    const rightCodeStorage = useStorage((root) => root.rightCode);

    const updateRightHtmlEditor = useMutation(({ storage }, newRightHtml: string) => {
        const rightCode = storage.get("rightCode");
        rightCode.set('html', newRightHtml);
    }, []);

    const updateRightCssEditor = useMutation(({ storage }, newRightCss: string) => {
        const rightCode = storage.get("rightCode");
        rightCode.set('css', newRightCss);
    }, []);

    const updateRightJavascriptEditor = useMutation(({ storage }, newRightJs: string) => {
        const rightCode = storage.get("rightCode");
        rightCode.set('javascript', newRightJs);
    }, []);

    const updateRightPageEditorSelected = useMutation(({ storage }, pageRightLabel: string) => {
        const rightCode = storage.get("rightCode");
        rightCode.set('pageSelected', pageRightLabel);
    }, []);

    return (
        <section className="min-w-[50vw] flex flex-col border-l-1 border-white/20">
            <CodeEditorIframe
                htmlCode={rightCodeStorage ? rightCodeStorage.html : ""}
                cssCode={rightCodeStorage ? rightCodeStorage.css : ""}
                javascriptCode={rightCodeStorage ? rightCodeStorage.javascript : ""}
            />
            <div className="relative h-full border-t-1 border-white/20">
                <div className="flex flex-row bg-[#1E1E1E] border-b-1 border-white/20">
                    {
                        PAGES.map((page, key) => {
                            return <CodeEditorPageButton key={key} onClick={() => { updateRightPageEditorSelected(page.label) }} label={page.label} isActive={rightCodeStorage ? rightCodeStorage.pageSelected === page.label : false} />
                        })
                    }
                </div>
                <CodeEditor className={rightCodeStorage && rightCodeStorage.pageSelected === "index.html" ? "block" : "hidden"} value={rightCodeStorage ? rightCodeStorage.html : ""} language={"html"} onChange={updateRightHtmlEditor} defaultValue={"<!-- Some comments -->"} />
                <CodeEditor className={rightCodeStorage && rightCodeStorage.pageSelected === "style.css" ? "block" : "hidden"} value={rightCodeStorage ? rightCodeStorage.css : ""} language={"css"} onChange={updateRightCssEditor} defaultValue="/* Some comments */" />
                <CodeEditor className={rightCodeStorage && rightCodeStorage.pageSelected === "script.js" ? "block" : "hidden"} value={rightCodeStorage ? rightCodeStorage.javascript : ""} language="javascript" onChange={updateRightJavascriptEditor} defaultValue="// Some comments" />
            </div>
        </section>
    )
}

export default RightCollaborativeSection