"use client";

import LoadingScreen from "@/components/layout/LoadingScreen";
import SendMoney from "@/components/modules/AllRoles/SendMoney";
import { Suspense } from "react";

const SendMoneyPage = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <SendMoney />
    </Suspense>
  );
};

export default SendMoneyPage;
