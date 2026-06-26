import { AuthError, AuthResponse as SupabaseAuthResponse } from "@supabase/supabase-js";

import { supabase } from "../../../services/supabase";

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export type AuthResponse = {
  error: AuthError | null;
};

export type SignUpResponse = SupabaseAuthResponse & AuthResponse;

export async function signUp(
  email: string,
  password: string
): Promise<SignUpResponse> {
  return supabase.auth.signUp({
    email: normalizeEmail(email),
    password,
  });
}

export async function signIn(
  email: string,
  password: string
): Promise<AuthResponse> {
  const { error } = await supabase.auth.signInWithPassword({
    email: normalizeEmail(email),
    password,
  });

  return { error };
}

export async function signOut(): Promise<AuthResponse> {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function resetPassword(email: string): Promise<AuthResponse> {
  const { error } = await supabase.auth.resetPasswordForEmail(
    normalizeEmail(email)
  );

  return { error };
}
