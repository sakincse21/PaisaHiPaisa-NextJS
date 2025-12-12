
// import AddMoneyRequest from "@/pages/Agent/AddMoneyRequest";
import type { ISidebarItem } from "@/types";
// import { lazy } from "react";

// const Analytics = lazy(() => import("@/pages/Admin/Analytics"))

export const agentSiderbarItems: ISidebarItem[] = [
  {
    title: "Operations",
    items: [
      // {
      //   title: "Add Money Requests",
      //   url: "/agent/add-money-requests",
      //   component: AddMoneyRequest,
      // },
      {
        title: "Add Money",
        url: "/agent/add-money",
        // component: AddMoney,
      },
      {
        title: "Cash In",
        url: "/agent/cash-in",
        // component: CashIn,
      },
      {
        title: "Send Money",
        url: "/agent/send-money",
        // component: SendMoney,
      },
    ],
  },
  {
    title: "Wallet",
    items: [
      {
        title: "Check Wallet",
        url: "/agent/check-wallet",
        // component: CheckWallet,
      },
      {
        title: "All Transactions",
        url: "/agent/all-transactions",
        // component: AllTransactions,
      },
      {
        title: "Overview",
        url: "/agent",
        // component: AgentOverview,
      },
    ],
  },
  {
    title: "Profile",
    items: [
      {
        title: "Update Profile",
        url: "/agent/update-profile",
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
