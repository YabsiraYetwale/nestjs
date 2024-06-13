import { User } from "@/models/user";
import { create } from "zustand";

interface SignUpStore {
  user: User;
  change: (user: User) => void;
  reset: () => void;
}

const useSignUpStore = create<SignUpStore>((set) => ({
  user: {
    username: "",
    email: "",
    password: "",
  },
  change: (user) =>
    set((store) => ({
      user: user,
    })),
  reset: () =>
    set((store) => ({
      user: {
        username: "",
        email: "",
        password: "",
      },
    })),
}));

export default useSignUpStore;
