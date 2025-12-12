import type { ISidebarItem } from "@/types";
// import { lazy } from "react";

// const Analytics = lazy(() => import("@/pages/Admin/Analytics"))

export const superAdminSiderbarItems: ISidebarItem[] = [
  {
    title: "User Management",
    items: [
      {
        title: "Verify Users",
        url: "/super_admin/verify-users",
        // component: VerifyUsers,
      },
      {
        title: "Manage Users",
        url: "/super_admin/manage-users",
        // component: (() => AllUsers({role:IRole.USER}) ),
      },
      {
        title: "Manage Agents",
        url: "/super_admin/manage-agents",
        // component: (() => AllUsers({role:IRole.AGENT})),
      },
      {
        title: "Manage Merchants",
        url: "/super_admin/manage-merchants",
        // component: (() => AllUsers({role:IRole.MERCHANT})),
      },
      {
        title: "Manage Admins",
        url: "/super_admin/manage-admin",
        // component: (() => AllUsers({role:IRole.ADMIN})),
      },
    ],
  },
  {
    title: "Transactions",
    items: [
      {
        title: "All Transactions",
        url: "/super_admin/all-transactions",
        // component: AllTransactions,
      },
      {
        title: "Overview",
        url: "/super_admin",
        // component: AdminOverview,
      },
    ],
  },
  {
    title: "Profile",
    items: [
      {
        title: "Update Profile",
        url: "/super_admin/update-profile",
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
