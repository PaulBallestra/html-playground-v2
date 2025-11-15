"use client";

import CodeEditor from "@/components/CodeEditor";
import CodeEditorPageButton from "@/components/CodeEditorPageButton";
import CodeEditorIframe from "@/components/CodeEditorIframe";
import Cursor from "@/components/Cursor";
import { COLORS, PAGES } from "@/constants/collaborative-code-editor";
import { useMutation, useMyPresence, useOthers, useStorage } from "@liveblocks/react/suspense";

export function CollaborativeApp() {
  const others = useOthers();

  const [, updateMyPresence] = useMyPresence();

  const leftCodeStorage = useStorage((root) => root.leftCode);
  const rightCodeStorage = useStorage((root) => root.rightCode);

  const updateLeftHtmlEditor = useMutation(({ storage }, newLeftHtml: string) => {
    const leftCode = storage.get("leftCode");
    leftCode.set("html", newLeftHtml);
  }, []);

  const updateRightHtmlEditor = useMutation(({ storage }, newRightHtml: string) => {
    const rightCode = storage.get("rightCode");
    rightCode.set('html', newRightHtml);
  }, []);

  const updateLeftCssEditor = useMutation(({ storage }, newLeftCss: string) => {
    const leftCode = storage.get("leftCode");
    leftCode.set("css", newLeftCss);
  }, []);

  const updateRightCssEditor = useMutation(({ storage }, newRightCss: string) => {
    const rightCode = storage.get("rightCode");
    rightCode.set('css', newRightCss);
  }, []);

  const updateLeftJavascriptEditor = useMutation(({ storage }, newLeftJs: string) => {
    const leftCode = storage.get("leftCode");
    leftCode.set("javascript", newLeftJs);
  }, []);

  const updateRightJavascriptEditor = useMutation(({ storage }, newRightJs: string) => {
    const rightCode = storage.get("rightCode");
    rightCode.set('javascript', newRightJs);
  }, []);

  const updateLeftPageEditorSelected = useMutation(({ storage }, pageLeftLabel: string) => {
    const leftCode = storage.get("leftCode");
    leftCode.set('pageSelected', pageLeftLabel);
  }, []);

  const updateRightPageEditorSelected = useMutation(({ storage }, pageRightLabel: string) => {
    const rightCode = storage.get("rightCode");
    rightCode.set('pageSelected', pageRightLabel);
  }, []);

  const onPointerMove = (event: React.PointerEvent) => {

    // console.log('Xpct : ', (event.clientX * 100) / window.innerWidth)
    // console.log('Ypct : ', (event.clientY * 100) / window.innerHeight)

    updateMyPresence({
      cursor: {
        x: (event.clientX * 100) / window.innerWidth,
        y: (event.clientY * 100) / window.innerHeight,
      }
    })
  }

  const onPointerLeave = () => {
    updateMyPresence({
      cursor: null,
    })
  }

  return (
    <main
      className="flex flex-row w-screen h-screen text-white"
      onPointerMove={(event) => { onPointerMove(event) }}
      onPointerLeave={onPointerLeave}
    >
      {/* LEFT SECTION */}
      <section className="min-w-[50vw] flex flex-col">
        <div className="h-full">
          {/* iframe */}
          <CodeEditorIframe
            htmlCode={leftCodeStorage.html}
            cssCode={leftCodeStorage.css}
            javascriptCode={leftCodeStorage.javascript}
          />
        </div>
        <div className="h-full border-t-1 border-white/20">
          <div className="flex flex-row bg-[#1E1E1E] border-b-1 border-white/20">
            {
              PAGES.map((page, key) => {
                return <CodeEditorPageButton key={key} onClick={() => updateLeftPageEditorSelected(page.label)} label={page.label} isActive={leftCodeStorage.pageSelected === page.label} />
              })
            }
          </div>
          <CodeEditor className={leftCodeStorage.pageSelected === "index.html" ? "block" : "hidden"} value={leftCodeStorage.html} language="html" onChange={updateLeftHtmlEditor} defaultValue={"<!-- Some comments -->"} />
          <CodeEditor className={leftCodeStorage.pageSelected === "style.css" ? "block" : "hidden"} value={leftCodeStorage.css} language="css" onChange={updateLeftCssEditor} defaultValue="/* Some comments */" />
          <CodeEditor className={leftCodeStorage.pageSelected === "script.js" ? "block" : "hidden"} value={leftCodeStorage.javascript} language="javascript" onChange={updateLeftJavascriptEditor} defaultValue="// Some comments" />
        </div>
      </section>
      {/* RIGHT SECTION */}
      <section className="min-w-[50vw] flex flex-col border-l-1 border-white/20">
        <div className="h-full">
          <CodeEditorIframe
            htmlCode={rightCodeStorage.html}
            cssCode={rightCodeStorage.css}
            javascriptCode={rightCodeStorage.javascript}
          />
        </div>
        <div className="relative h-full border-t-1 border-white/20">
          <div className="flex flex-row bg-[#1E1E1E] border-b-1 border-white/20">
            {
              PAGES.map((page, key) => {
                return <CodeEditorPageButton key={key} onClick={() => { updateRightPageEditorSelected(page.label) }} label={page.label} isActive={rightCodeStorage.pageSelected === page.label} />
              })
            }
          </div>
          <CodeEditor className={rightCodeStorage.pageSelected === "index.html" ? "block" : "hidden"} value={rightCodeStorage.html} language={"html"} onChange={updateRightHtmlEditor} defaultValue={"<!-- Some comments -->"} />
          <CodeEditor className={rightCodeStorage.pageSelected === "style.css" ? "block" : "hidden"} value={rightCodeStorage.css} language={"css"} onChange={updateRightCssEditor} defaultValue="/* Some comments */" />
          <CodeEditor className={rightCodeStorage.pageSelected === "script.js" ? "block" : "hidden"} value={rightCodeStorage.javascript} language="javascript" onChange={updateRightJavascriptEditor} defaultValue="// Some comments" />
        </div>
      </section>

      {others.map(({ connectionId, presence }) => {
        if (presence.cursor === null) return null;

        const x = (presence.cursor.x * window.innerWidth) / 100;
        const y = (presence.cursor.y * window.innerHeight) / 100;

        return (
          <Cursor
            key={`cursor-${connectionId}`}
            color={COLORS[connectionId % COLORS.length]}
            x={x}
            y={y}
          />
        );
      })
      }
    </main>
  );
}