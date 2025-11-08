"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { LiveObject } from "@liveblocks/node";

export function Room({ children }: { children: ReactNode }) {
  return (
    <LiveblocksProvider
      authEndpoint="/api/liveblocks-auth"
      throttle={16}
    >
      <RoomProvider
        id="my-room-1"
        // id={`${organization}:${group}:project-1`} 
        initialPresence={{
          cursor: null,
        }}
        initialStorage={{
          leftCode: new LiveObject({pageSelected: "index.html", html: "", css: "", javascript: ""}),
          rightCode: new LiveObject({pageSelected: "index.html", html: "", css: "", javascript: ""})
        }}
      >
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}