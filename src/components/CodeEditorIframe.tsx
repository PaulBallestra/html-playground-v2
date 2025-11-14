'use client'

import { useMyPresence } from "@liveblocks/react";
import { useEffect, useRef } from "react";

function CodeEditorIframe({ htmlCode, cssCode, javascriptCode, offsetX }: { htmlCode: string, cssCode: string, javascriptCode: string, offsetX: number }) {
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
                        const offsetX = ${offsetX};
                        window.addEventListener("pointermove", (e) => {
                            parent.postMessage(
                                {
                                    type: "cursor-move",
                                    cursor: { 
                                        x: e.clientX + offsetX,
                                        y: e.clientY
                                    }
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
        <div className="relative">
            <iframe
                ref={iframeRef}
                className="border-none"
                sandbox="allow-scripts"
                allow="fullscreen"
                allowFullScreen
            />
        </div>
    );
}

export default CodeEditorIframe