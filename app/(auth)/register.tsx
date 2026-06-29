import { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, View } from "react-native";
import { ScrollView } from "../../src/components/ui/ScrollView";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "expo-router";
import { Controller, useForm } from "react-hook-form";

import { Button } from "../../src/components/ui/Button";
import { Input } from "../../src/components/ui/Input";
import { Text } from "../../src/components/ui/Text";
import { useAuth } from "../../src/features/auth/hooks/useAuth";
import {
  signUpSchema,
  type SignUpFormValues,
} from "../../src/features/auth/schemas/auth.schema";

export default function RegisterScreen() {
  const { signUpWithEmail } = useAuth();
  const [formError, setFormError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: SignUpFormValues) {
    setFormError(null);

    const result = await signUpWithEmail(values);

    if (!result.success) {
      setFormError(result.message);
      return;
    }

    if (result.autoSignedIn) {
      router.replace("/(tabs)");
      return;
    }

    router.replace({
      pathname: "/(auth)/email",
      params: { registered: "1" },
    });
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
              Create account
            </Text>
            <Text className="font-nunito text-base text-[#949494]">
              Join ReciPHy with your email and a secure password.
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
                  placeholder="At least 8 characters"
                  secureTextEntry
                  autoCapitalize="none"
                  autoComplete="new-password"
                  textContentType="newPassword"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  error={errors.password?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Confirm password"
                  placeholder="Re-enter your password"
                  secureTextEntry
                  autoCapitalize="none"
                  autoComplete="new-password"
                  textContentType="newPassword"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  error={errors.confirmPassword?.message}
                />
              )}
            />
          </View>

          {formError ? (
            <Text className="font-nunito text-sm text-red-500">{formError}</Text>
          ) : null}

          <Button
            title="Create account"
            loading={isSubmitting}
            onPress={handleSubmit(onSubmit)}
          />

          <View className="flex-row justify-center gap-1">
            <Text className="font-nunito text-[#949494]">
              Already have an account?
            </Text>
            <Link href="/(auth)/email" asChild>
              <Pressable>
                <Text className="font-nunito-bold text-primary">Sign in</Text>
              </Pressable>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
