'use client'

import { useEffect, useRef } from "react";

function CodeEditorIframe({ htmlCode, cssCode, javascriptCode }: { htmlCode: string, cssCode: string, javascriptCode: string}) {
    const iframeRef = useRef<HTMLIFrameElement>(null);

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
                        ${javascriptCode}
                    </script>
                </body>
            </html>`;
        }
    }, [htmlCode, javascriptCode, cssCode]);

    return (
        <div className="h-full">
            <iframe
                ref={iframeRef}
                className="border-none w-full h-full"
                sandbox="allow-scripts"
                allow="fullscreen"
                allowFullScreen
            />
        </div>
    );
}

export default CodeEditorIframe