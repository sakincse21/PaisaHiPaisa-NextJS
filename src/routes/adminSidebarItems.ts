import type { ISidebarItem } from "@/types";
// import { lazy } from "react";

// const Analytics = lazy(() => import("@/pages/Admin/Analytics"))

export const adminSiderbarItems: ISidebarItem[] = [
  {
    title: "User Management",
    items: [
      {
        title: "Verify Users",
        url: "/admin/verify-users",
        // component: VerifyUsers,
      },
      {
        title: "Manage Users",
        url: "/admin/manage-users",
        // component: (() => AllUsers({role:IRole.USER}) ),
      },
      {
        title: "Manage Agents",
        url: "/admin/manage-agents",
        // component: (() => AllUsers({role:IRole.AGENT})),
      },
      {
        title: "Manage Merchants",
        url: "/admin/manage-merchants",
        // component: (() => AllUsers({role:IRole.MERCHANT})),
      },
    ],
  },
  {
    title: "Transactions",
    items: [
      {
        title: "All Transactions",
        url: "/admin/all-transactions",
        // component: AllTransactions,
      },
      {
        title: "Overview",
        url: "/admin",
        // component: ,
      },
    ],
  },
  {
    title: "Profile",
    items: [
      {
        title: "Update Profile",
        url: "/admin/update-profile",
        // component: UpdateProfile,
      }
    ],
  },
  //   {
  //     title: "Profile",
  //     items: [
  //       {
  //         title: "Update Profile",
  //         url: "/agent/update",
  //         component: AddTour,
  //       },
  //     ],
  //   },
];
