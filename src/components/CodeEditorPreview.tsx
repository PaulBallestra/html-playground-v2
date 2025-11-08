'use client'

import { useEffect, useRef } from "react";

function Preview({ htmlCode, cssCode, javascriptCode }: { htmlCode: string, cssCode: string, javascriptCode: string,  }) {
    // const code = useStorage((root) => root.code);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        if (iframeRef.current) {
            iframeRef.current.srcdoc = `
            <html><style>${cssCode}</style><body>${htmlCode}<script>${javascriptCode}</script></body></html>`;
            //   iframeRef.current.srcdoc = `
            //     <html><style>${code.css ? code.css : ""}</style><body>${code.html}<script>${code.js}</script></body></html>`;
        }
    }, [htmlCode, javascriptCode, cssCode]);

    return <iframe ref={iframeRef} className="w-full h-full border-none" sandbox="allow-scripts" />;
}

export default Preview