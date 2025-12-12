// import { adminSidebarItems } from "@/routes/adminSidebarItems";
import { IRole } from "@/interfaces";
import { adminSiderbarItems } from "@/routes/adminSidebarItems";
import { agentSiderbarItems } from "@/routes/agentSidebarItems";
import { merchantSiderbarItems } from "@/routes/merchantSidebarItems";
import { superAdminSiderbarItems } from "@/routes/superAdminSiderbarItems";
import { userSiderbarItems } from "@/routes/userSidebarItems";
import type { TRole } from "@/types/user";

export const getSidebarItems = (userRole: TRole) => {
  switch (userRole) {
    // case IRole.SUPER_ADMIN:
    //   return [...adminSidebarItems];
    // case role.admin:
    //   return [...adminSidebarItems];
    case IRole.AGENT:
      return [...agentSiderbarItems];
    case IRole.USER:
      return [...userSiderbarItems];
    case IRole.ADMIN:
      return [...adminSiderbarItems];
    case IRole.SUPER_ADMIN:
      return [...superAdminSiderbarItems];
    case IRole.MERCHANT:
      return [...merchantSiderbarItems];
    default:
      return [];
  }
};