import { useUser } from "./useUser";

export default function useAuth() {
  const { user, logout } = useUser();
}
