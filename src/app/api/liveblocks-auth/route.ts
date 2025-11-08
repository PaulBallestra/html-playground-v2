export const runtime = 'nodejs'

import { auth } from "@/lib/auth";
import { Liveblocks } from "@liveblocks/node";
import prisma from "@/lib/prisma";

const liveblocks = new Liveblocks({
    secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST() {
    try {
        const nextAuthSession = await auth();
        if (!nextAuthSession?.user?.id) return new Response("Unauthorized", { status: 401 });

        const user = await prisma.user.findUnique({
            where: { id: nextAuthSession.user.id },
            select: {
                id: true,
                name: true,
                image: true,
                avatarUrl: true,
                colorArray: true,
                organization: true,
                group: true,
            },
        });

        // console.log("\n\nPRISMA USER", user, "\n\n")

        if (!user) return new Response("User not found", { status: 404 });

        const session = liveblocks.prepareSession(user.id, {
            userInfo: {
                name: user.name && user.name || "",
                avatar: user.image && user.image || "",
                colors: user.colorArray,
                organization: user.organization,
                group: user.group,
            },
        });

        // console.log("\n\nSESSION : ",session, "\n\n")

        session.allow("my-room-1", session.FULL_ACCESS);
        session.allow(`${user.organization}:*`, session.READ_ACCESS);
        session.allow(`${user.organization}:${user.group}:*`, session.FULL_ACCESS);

        const { status, body } = await session.authorize();
        return new Response(body, { status });

    } catch (err) {
        console.error(err);
        return new Response("Internal Server Error", { status: 500 });
    }
}
