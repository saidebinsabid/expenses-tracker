import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: role,
    isLoading: roleLoading,
    refetch,
  } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !authLoading && !!user?.email,
queryFn: async () => {
  try {
    const encodedEmail = encodeURIComponent(user?.email);
    const res = await axiosSecure.get(`/users/role/${encodedEmail}`);
    return res.data.role;
  } catch (err) {
    console.error("Role fetch error:", err);
    return "user"; 
  }
}
});

  return { role, roleLoading: authLoading || roleLoading, refetch };
};

export default useUserRole;
