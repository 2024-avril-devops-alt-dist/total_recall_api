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
            {/* If you want to link to docs which is admin only, just add a link here */}
            {session.user.role === "ADMIN" && (
              <p>
                <Link href="/docs">Go to Swagger Docs (Admin Only)</Link>
              </p>
            )}
          </div>
        ) : (
          <Link href="/pages/login">Sign In</Link>
        )}
      </main>
      <footer>
        <p>No footer yet</p>
      </footer>
    </div>
  );
}
