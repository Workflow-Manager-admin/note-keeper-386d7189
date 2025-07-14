import { ReactNode } from "react";
import { AppHeader } from "./AppHeader";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader />
      <main className="flex-grow flex flex-col items-center px-2 sm:px-0 py-8">{children}</main>
    </div>
  );
}
