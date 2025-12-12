'use client'; // ✅ Changed to a client component
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Logo from "@/assets/icons/logo";
import { authApi } from "@/redux/features/Auth/auth.api";
import { getSidebarItems } from "@/lib/getSidebarItems";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/redux/hook";
import { useUserInfoQuery } from "@/redux/features/User/user.api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { logoutAction } from "@/lib/authActions"; // ✅ Import the server action

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userData } = useUserInfoQuery(undefined);

  const data = {
    navMain: getSidebarItems(userData?.data?.role),
  };

  const navigate = useRouter();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    const toastId = toast.loading("Logging you out. :'(");
    try {
      // ✅ Call the server action to delete the cookie
      const res = await logoutAction();

      navigate.refresh(); // ✅ Refresh to ensure all server state is cleared
      if (res?.success) {
        // ✅ Reset Redux state after successful logout
        dispatch(authApi.util.resetApiState());
        toast.success("Log out successful.", { id: toastId });
        navigate.push("/login");
        navigate.refresh(); // ✅ Refresh to ensure all server state is cleared
      } else {
        toast.error(res?.message || "Logout failed.", { id: toastId });
      }
    } catch (error: any) {
      console.error(error);
      const errorMessage =
        error?.message || "Something went wrong. Try again.";
      toast.error(errorMessage, { id: toastId });
    }
  };

  return (
    <Sidebar {...props} className="z-50">
      <SidebarHeader>
        <Link href="/">
          <Logo />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <h2 className="m-2 mt-4 text-lg font-semibold">
          {userData?.data?.role} Dashboard
        </h2>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item:any) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
      <Button
        variant={"outline"}
        size={"lg"}
        className="text-sm m-4"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Sidebar>
  );
}
