import { Link, useLocation } from "react-router-dom";
import { LogoutButton } from "./logout-button";
import { ModeToggle } from "./mode-toggle";
import { NotificationsMenu } from "./notifications-menu";
import { cn } from "@/lib/utils";
import { Book, Calendar, Home } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useLocation();
  return (
    <div className="relative flex min-h-screen flex-col">
      <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link to="/" className="mr-6 flex items-center space-x-2">
              <span className="hidden font-bold sm:inline-block">
                booking/dashboard
              </span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="flex items-center">
              <NotificationsMenu />
              <ModeToggle />
              <LogoutButton />
            </div>
          </div>
        </div>
      </header>
      <div className="flex-1">
        <div className="border-b">
          <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
            <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 border-r md:sticky md:block">
              <div className="relative h-full overflow-hidden py-6 pl-8 pr-6 lg:py-8">
                <Link
                  to="/"
                  className={cn(
                    "text-muted-foreground flex w-full items-center rounded-md border border-transparent px-2 py-1 font-medium hover:underline",
                    pathname === "/home" && "text-foreground",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Home size={20} />
                    Home
                  </div>
                </Link>
                <Link
                  to="/bookings"
                  className={cn(
                    "text-muted-foreground flex w-full items-center rounded-md border border-transparent px-2 py-1 font-medium hover:underline",
                    pathname === "/bookings" && "text-foreground",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Book size={20} />
                    Bookings
                  </div>
                </Link>
                <Link
                  to="/calendar"
                  className={cn(
                    "text-muted-foreground flex w-full items-center rounded-md border border-transparent px-2 py-1 font-medium hover:underline",
                    pathname === "/calendar" && "text-foreground",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Calendar size={20} />
                    Calendar
                  </div>
                </Link>
              </div>
            </aside>
            <main className="relative h-full py-6 lg:py-8 ">{children}</main>
          </div>
        </div>
        <footer className="py-6 md:px-8 md:py-0">
          <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
            <p className="text-muted-foreground text-center text-sm leading-loose md:text-left">
              The source code is available on
              <a
                href="https://github.com/fozuzip/booking-utilities"
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4"
              >
                GitHub
              </a>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};
