"use client";

import CodeEditor from "@/components/CodeEditor";
import CodeEditorPageButton from "@/components/CodeEditorPageButton";
import Preview from "@/components/CodeEditorPreview";
import Cursor from "@/components/Cursor";
import { COLORS, PAGES } from "@/constants/collaborative-code-editor";
import { useMutation, useMyPresence, useOthers, useStorage } from "@liveblocks/react/suspense";

export function CollaborativeApp() {
  const others = useOthers();
  // const userCount = others.length;

  const [{ }, updateMyPresence] = useMyPresence();

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
    console.log('click left', pageLeftLabel)
    leftCode.set('pageSelected', pageLeftLabel);
  }, []);

  const updateRightPageEditorSelected = useMutation(({ storage }, pageRightLabel: string) => {
    const rightCode = storage.get("rightCode");
    rightCode.set('pageSelected', pageRightLabel);
  }, []);

  return (
    <main
      className="flex flex-row w-screen h-screen text-white"
      onPointerMove={(event) => {
        // Update the user cursor position on every pointer move
        updateMyPresence({
          cursor: {
            x: Math.round(event.clientX),
            y: Math.round(event.clientY),
          },
        });
      }}
      onPointerLeave={() =>
        // When the pointer goes out, set cursor to null
        updateMyPresence({
          cursor: null,
        })
      }
    >
      {/* LEFT SECTION */}
      <section className="w-full flex flex-col">
        <div className="h-full">
          {/* iframe */}
          <Preview htmlCode={leftCodeStorage.html} cssCode={leftCodeStorage.css} javascriptCode={leftCodeStorage.javascript} />
        </div>
        <div className="h-full border-t-1">
          <div className="flex flex-row w-fit">
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
      <section className="w-full flex flex-col border-l-1">
        <div className="h-full">
          <Preview htmlCode={rightCodeStorage.html} cssCode={rightCodeStorage.css} javascriptCode={rightCodeStorage.javascript} />
        </div>
        <div className="relative h-full border-t-1">
          <div className="flex flex-row">
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

      {
        // CURSORS PRESENCE
        others.map(({ connectionId, presence }) => {
          if (presence.cursor === null) {
            return null;
          }

          return (
            <Cursor
              key={`cursor-${connectionId}`}
              // connectionId is an integer that is incremented at every new connections
              // Assigning a color with a modulo makes sure that a specific user has the same colors on every clients
              color={COLORS[connectionId % COLORS.length]}
              x={presence.cursor.x}
              y={presence.cursor.y}
            />
          );
        })
      }
    </main>
  );
}