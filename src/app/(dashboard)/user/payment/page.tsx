import Payment from "@/components/modules/AllRoles/Payment";
import LoadingScreen from "@/components/layout/LoadingScreen";
import { Suspense } from "react";

const SendMoneyPage = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Payment />
    </Suspense>
  );
};

export default SendMoneyPage;