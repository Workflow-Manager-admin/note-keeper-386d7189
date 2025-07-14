import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { FaStickyNote, FaSignOutAlt } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";

export function AppHeader() {
  const { data: session } = useSession();

  return (
    <header className="w-full flex justify-between items-center py-4 px-6 bg-primary text-white shadow-md">
      <Link href="/notes" className="flex items-center gap-2 font-bold text-xl">
        <FaStickyNote />
        NoteKeeper
      </Link>
      <nav className="flex gap-4 items-center">
        {session ? (
          <>
            <span className="hidden sm:inline">Hello, {session.user?.name || session.user?.email}</span>
            <button
              className="ml-2 flex items-center gap-1 bg-accent text-secondary px-3 py-1 rounded font-medium"
              onClick={() => signOut()}
            >
              <FaSignOutAlt />Sign out
            </button>
          </>
        ) : (
          <Link href="/login" className="flex items-center gap-1 bg-accent text-secondary px-3 py-1 rounded font-medium">
            <FiLogIn />
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}
