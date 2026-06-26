import { useCallback, useEffect } from "react";

import {
  resetPassword,
  signIn,
  signOut,
  signUp,
} from "../api/auth.api";
import { getAuthErrorMessage } from "../utils/auth.errors";
import { supabase } from "../../../services/supabase";
import { useAuthStore } from "../../../store/auth.store";
import type { SignInFormValues, SignUpFormValues } from "../schemas/auth.schema";

export function useAuth() {
  const user = useAuthStore((s) => s.user);
  const loading = useAuthStore((s) => s.loading);
  const setUser = useAuthStore((s) => s.setUser);
  const setLoading = useAuthStore((s) => s.setLoading);

  useEffect(() => {
    let mounted = true;

    async function initialize() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (mounted) {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    }

    initialize();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [setLoading, setUser]);

  const signInWithEmail = useCallback(async (values: SignInFormValues) => {
    const { error } = await signIn(values.email, values.password);

    if (error) {
      return { success: false as const, message: getAuthErrorMessage(error) };
    }

    return { success: true as const };
  }, []);

  const signUpWithEmail = useCallback(async (values: SignUpFormValues) => {
    const { data, error } = await signUp(values.email, values.password);

    if (error) {
      return { success: false as const, message: getAuthErrorMessage(error) };
    }

    if (data.session) {
      return { success: true as const, autoSignedIn: true as const };
    }

    return {
      success: true as const,
      autoSignedIn: false as const,
      message:
        "Account created. Check your email to confirm your address, then sign in.",
    };
  }, []);

  const requestPasswordReset = useCallback(async (email: string) => {
    const { error } = await resetPassword(email);

    if (error) {
      return { success: false as const, message: getAuthErrorMessage(error) };
    }

    return {
      success: true as const,
      message: "If an account exists for that email, a reset link has been sent.",
    };
  }, []);

  const signOutUser = useCallback(async () => {
    const { error } = await signOut();

    if (error) {
      return { success: false as const, message: getAuthErrorMessage(error) };
    }

    return { success: true as const };
  }, []);

  return {
    user,
    loading,
    isAuthenticated: !!user,
    signInWithEmail,
    signUpWithEmail,
    requestPasswordReset,
    signOut: signOutUser,
  };
}
