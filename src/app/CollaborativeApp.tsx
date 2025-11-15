"use client";

import Cursor from "@/components/Cursor";
import { COLORS } from "@/constants/collaborative-code-editor";
import { useMyPresence, useOthers } from "@liveblocks/react/suspense";
import LeftCollaborativeSection from "@/components/LeftCollaborativeSection";
import RightCollaborativeSection from "@/components/RightCollaborativeSection";

export function CollaborativeApp() {
  const others = useOthers();

  const [, updateMyPresence] = useMyPresence();

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
      <LeftCollaborativeSection />
      <RightCollaborativeSection />

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