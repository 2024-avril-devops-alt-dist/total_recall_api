"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div>
      <main>
        <p>This is the total recall API</p>
        {session?.user ? (
          <div>
            <p>
              You are logged in as{" "}
              {session.user.role ? session.user.role : "USER"}
            </p>
            {session.user.role === "ADMIN" && (
              <p>
                <Link href="/docs">Go to Swagger Docs (Admin Only)</Link>
              </p>
            )}
          </div>
        ) : (
          <Link href="/login">Sign In</Link>
        )}
      </main>
      <footer>
        <p>footer kekw</p>
      </footer>
    </div>
  );
}
