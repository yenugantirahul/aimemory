import { apiClient } from "@/lib/api/client";
import type { LoginInput, SignupInput } from "./auth.schema";

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Session {
  user: User;
  session: {
    id: string;
    expiresAt: string;
  };
}

export const authApi = {
  // better-auth responds 200 with a null body when there is no session.
  async getSession() {
    const { data } = await apiClient.get<Session | null>("/auth/get-session");
    return data ?? null;
  },

  async signIn(input: LoginInput) {
    const { data } = await apiClient.post<{ user: User }>("/auth/sign-in/email", input);
    return data;
  },

  // Email sign-up also signs the user in (better-auth autoSignIn default).
  async signUp(input: SignupInput) {
    const { data } = await apiClient.post<{ user: User }>("/auth/sign-up/email", input);
    return data;
  },

  async signOut() {
    await apiClient.post("/auth/sign-out");
  },
};
