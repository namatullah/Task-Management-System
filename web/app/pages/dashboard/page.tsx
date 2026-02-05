import { me } from "@/app/_lib/auth";

const Page = async () => {
  const user = await me();
  console.log(user);
  return <div>Dashboard page</div>;
};

export default Page;
