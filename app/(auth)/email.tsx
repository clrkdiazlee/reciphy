import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, View } from "react-native";
import { ScrollView } from "../../src/components/ui/ScrollView";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router, useLocalSearchParams } from "expo-router";
import { Controller, useForm } from "react-hook-form";

import { Button } from "../../src/components/ui/Button";
import { Input } from "../../src/components/ui/Input";
import { Text } from "../../src/components/ui/Text";
import { useAuth } from "../../src/features/auth/hooks/useAuth";
import {
  signInSchema,
  type SignInFormValues,
} from "../../src/features/auth/schemas/auth.schema";

export default function EmailLoginScreen() {
  const { registered } = useLocalSearchParams<{ registered?: string }>();
  const { signInWithEmail, requestPasswordReset } = useAuth();
  const [formError, setFormError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isResettingPassword, setIsResettingPassword] = useState(false);

  useEffect(() => {
    if (registered === "1") {
      setStatusMessage(
        "Account created. Check your email to confirm your address, then sign in."
      );
    }
  }, [registered]);

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: SignInFormValues) {
    setFormError(null);
    setStatusMessage(null);

    const result = await signInWithEmail(values);

    if (!result.success) {
      setFormError(result.message);
      return;
    }

    router.replace("/(tabs)");
  }

  async function handleForgotPassword() {
    const email = getValues("email").trim();

    if (!email) {
      setFormError("Enter your email above, then tap Forgot password.");
      return;
    }

    setFormError(null);
    setStatusMessage(null);
    setIsResettingPassword(true);

    const result = await requestPasswordReset(email);
    setIsResettingPassword(false);

    if (!result.success) {
      setFormError(result.message);
      return;
    }

    setStatusMessage(result.message);
  }

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerClassName="flex-grow py-12"
        keyboardShouldPersistTaps="handled"
      >
        <Pressable onPress={() => router.back()} className="mb-8 self-start">
          <Text className="font-nunito-semibold text-primary">Back</Text>
        </Pressable>

        <View className="mx-auto w-full max-w-[340px] gap-8">
          <View className="gap-2">
            <Text className="font-fredoka-bold text-4xl text-primary">
              Welcome back
            </Text>
            <Text className="font-nunito text-base text-[#949494]">
              Sign in with your email and password.
            </Text>
          </View>

          <View className="gap-5">
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Email"
                  placeholder="you@example.com"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect={false}
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  error={errors.email?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Password"
                  placeholder="Your password"
                  secureTextEntry
                  autoCapitalize="none"
                  autoComplete="password"
                  textContentType="password"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  error={errors.password?.message}
                />
              )}
            />

            <Pressable
              onPress={handleForgotPassword}
              disabled={isResettingPassword}
              className="self-end"
            >
              <Text className="font-nunito-semibold text-sm text-primary">
                {isResettingPassword ? "Sending reset link..." : "Forgot password?"}
              </Text>
            </Pressable>
          </View>

          {formError ? (
            <Text className="font-nunito text-sm text-red-500">{formError}</Text>
          ) : null}

          {statusMessage ? (
            <Text className="font-nunito text-sm text-accent">{statusMessage}</Text>
          ) : null}

          <Button
            title="Sign in"
            loading={isSubmitting}
            onPress={handleSubmit(onSubmit)}
          />

          <View className="flex-row justify-center gap-1">
            <Text className="font-nunito text-[#949494]">
              Don&apos;t have an account?
            </Text>
            <Link href="/(auth)/register" asChild>
              <Pressable>
                <Text className="font-nunito-bold text-primary">Sign up</Text>
              </Pressable>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
