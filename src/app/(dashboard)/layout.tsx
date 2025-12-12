"use client";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Separator } from "@/components/ui/separator";
import { DotPattern } from "@/components/ui/shadcn-io/dot-pattern";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { store } from "@/redux/store";
import { Provider } from "react-redux";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-screen min-h-screen">
      <Provider store={store}>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className="relative">
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <div className="ml-auto right-0">
                <ModeToggle />
              </div>
            </header>
            <div className="w-full h-full flex flex-1 flex-col items-center justify-center gap-4 p-4">
              <DotPattern
                className="fixed inset-0 w-full h-full text-accent-foreground opacity-55 dark:opacity-15 z-0"
                width={20}
                height={20}
                // glow={true}
              />
              {children}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </Provider>
    </div>
  );
}
