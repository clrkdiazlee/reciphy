import { AuthError } from "@supabase/supabase-js";

const AUTH_ERROR_MESSAGES: Record<string, string> = {
  invalid_credentials: "Invalid email or password.",
  email_not_confirmed:
    "Please confirm your email before signing in. Check your inbox for a verification link.",
  user_already_exists: "An account with this email already exists.",
  weak_password: "Password is too weak. Use at least 8 characters.",
  over_request_rate_limit: "Too many attempts. Please wait a moment and try again.",
  signup_disabled: "Sign up is currently unavailable. Please try again later.",
};

export function getAuthErrorMessage(error: AuthError | null): string {
  if (!error) {
    return "Something went wrong. Please try again.";
  }

  if (error.code && AUTH_ERROR_MESSAGES[error.code]) {
    return AUTH_ERROR_MESSAGES[error.code];
  }

  const message = error.message.toLowerCase();

  if (message.includes("invalid login credentials")) {
    return AUTH_ERROR_MESSAGES.invalid_credentials;
  }

  if (message.includes("email not confirmed")) {
    return AUTH_ERROR_MESSAGES.email_not_confirmed;
  }

  if (message.includes("user already registered")) {
    return AUTH_ERROR_MESSAGES.user_already_exists;
  }

  return "Something went wrong. Please try again.";
}
