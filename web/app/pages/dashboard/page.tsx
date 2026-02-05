import { me } from "@/app/_lib/auth";
import DashboardPage from "./Dashboard";

const Page = async () => {
  return <div>
    <h1>Dashboard</h1>
    <DashboardPage />
  </div>;
};

export default Page;
