
// import AddMoneyRequest from "@/pages/Agent/AddMoneyRequest";
import type { ISidebarItem } from "@/types";
// import { lazy } from "react";

// const Analytics = lazy(() => import("@/pages/Admin/Analytics"))

export const merchantSiderbarItems: ISidebarItem[] = [
  {
    title: "Operations",
    items: [
      
      {
        title: "Withdraw Money",
        url: "/merchant/withdraw-money",
        // component: WithdrawMoney,
      },
    ],
  },
  {
    title: "Wallet",
    items: [
      {
        title: "Check Wallet",
        url: "/merchant/check-wallet",
        // component: CheckWallet,
      },
      {
        title: "All Transactions",
        url: "/merchant/all-transactions",
        // component: AllTransactions,
      },
      {
        title: "Overview",
        url: "/merchant",
        // component: AgentOverview,
      },
    ],
  },
  {
    title: "Profile",
    items: [
      {
        title: "Update Profile",
        url: "/merchant/update-profile",
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
