import { useAuthStore } from "store/auth"
import { useUserStore } from "store/user";



export const logout = () => {
  useAuthStore.getState().logout();
  useUserStore.getState().logout();
}
