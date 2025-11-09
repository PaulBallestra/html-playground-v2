'use client'

import { useMyPresence } from "@liveblocks/react";
import { useEffect, useRef } from "react";

function CodeEditorIframe({ htmlCode, cssCode, javascriptCode }: { htmlCode: string, cssCode: string, javascriptCode: string }) {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [{ }, updateMyPresence] = useMyPresence();

    useEffect(() => {
        function handleMessage(event: MessageEvent) {
            if (event.data?.type === "cursor-move") {
                updateMyPresence({
                    cursor: event.data.cursor,
                });
            }
        }

        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, []);

    useEffect(() => {
        if (iframeRef.current) {
            iframeRef.current.srcdoc = `
            <html>
                <style>
                    ${cssCode}
                </style>
                <body>
                    ${htmlCode}
                    <script>
                        window.addEventListener("pointermove", (e) => {
                            parent.postMessage(
                                {
                                    type: "cursor-move",
                                    cursor: { x: e.clientX, y: e.clientY }
                                },
                                "*"
                            );
                        });

                        window.addEventListener("pointerleave", () => {
                            parent.postMessage({ type: "cursor-move", cursor: null }, "*");
                        });
                    </script>
                    <script>
                        ${javascriptCode}
                    </script>
                </body>
            </html>`;
        }
    }, [htmlCode, javascriptCode, cssCode]);

    return (
        <div className="relative w-full h-full">
            <iframe
                ref={iframeRef}
                className="w-full h-full border-none"
                sandbox="allow-scripts"
                allow="fullscreen"
                allowFullScreen
            />
        </div>
    );
}

export default CodeEditorIframe