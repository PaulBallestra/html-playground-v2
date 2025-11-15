'use client'

import CodeEditor from "./CodeEditor"
import CodeEditorIframe from "./CodeEditorIframe"
import CodeEditorPageButton from "./CodeEditorPageButton"
import { useMutation, useStorage } from "@liveblocks/react"
import { PAGES } from "@/constants/collaborative-code-editor"

const LeftCollaborativeSection = () => {
    const leftCodeStorage = useStorage((root) => root.leftCode);

    const updateLeftHtmlEditor = useMutation(({ storage }, newLeftHtml: string) => {
        const leftCode = storage.get("leftCode");
        leftCode.set("html", newLeftHtml);
    }, []);

    const updateLeftCssEditor = useMutation(({ storage }, newLeftCss: string) => {
        const leftCode = storage.get("leftCode");
        leftCode.set("css", newLeftCss);
    }, []);

    const updateLeftJavascriptEditor = useMutation(({ storage }, newLeftJs: string) => {
        const leftCode = storage.get("leftCode");
        leftCode.set("javascript", newLeftJs);
    }, []);


    const updateLeftPageEditorSelected = useMutation(({ storage }, pageLeftLabel: string) => {
        const leftCode = storage.get("leftCode");
        leftCode.set('pageSelected', pageLeftLabel);
    }, []);

    return (
        <section className="min-w-[50vw] flex flex-col">
            <CodeEditorIframe
                htmlCode={leftCodeStorage ? leftCodeStorage.html : ""}
                cssCode={leftCodeStorage ? leftCodeStorage.css : ""}
                javascriptCode={leftCodeStorage ? leftCodeStorage.javascript : ""}
            />
            <div className="h-full border-t-1 border-white/20">
                <div className="flex flex-row bg-[#1E1E1E] border-b-1 border-white/20">
                    {
                        PAGES.map((page, key) => {
                            return <CodeEditorPageButton key={key} onClick={() => updateLeftPageEditorSelected(page.label)} label={page.label} isActive={leftCodeStorage ? leftCodeStorage.pageSelected === page.label : false} />
                        })
                    }
                </div>
                <CodeEditor className={leftCodeStorage && leftCodeStorage.pageSelected === "index.html" ? "block" : "hidden"} value={leftCodeStorage ? leftCodeStorage.html : ""} language="html" onChange={updateLeftHtmlEditor} defaultValue={"<!-- Some comments -->"} />
                <CodeEditor className={leftCodeStorage && leftCodeStorage.pageSelected === "style.css" ? "block" : "hidden"} value={leftCodeStorage ? leftCodeStorage.css : ""} language="css" onChange={updateLeftCssEditor} defaultValue="/* Some comments */" />
                <CodeEditor className={leftCodeStorage && leftCodeStorage.pageSelected === "script.js" ? "block" : "hidden"} value={leftCodeStorage ? leftCodeStorage.javascript : ""} language="javascript" onChange={updateLeftJavascriptEditor} defaultValue="// Some comments" />
            </div>
        </section>
    )
}

export default LeftCollaborativeSection