import { auth } from "@/lib/auth";
import { CollaborativeApp } from "./CollaborativeApp";
import { Room } from "./Room";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <Room>
      <CollaborativeApp />
    </Room>
  );
}
