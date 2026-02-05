import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();
  const { logout } = useAuth();
  const handleLogout = async () => {
    await logout();
    router.push("/auth/signin");
  };
  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
