/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { loginSchema, registerSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { CardWrapper } from "./card-wrapper";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormSuccess } from "@/components/form-success";
import { register } from "node:module";
import { FormError } from "@/components/form-error";
import { login } from "@/actions/login";
// import { register } from "@/actions/register";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email is already in use with other provider!"
      : "";

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState<boolean>(true);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    startTransition(() => {
      login(values)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }
        })
        .catch(() => {
          setError("Something went wrong");
        });
    });
    console.log(values);
  };

  const handlePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setShowPassword((show) => !show);
  };

  return (
    <CardWrapper
      headerLabel="Login to your account"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="example@gmail.com"
                      disabled={isPending}
                      {...field}
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <div className="flex">
                    <FormControl>
                      <Input
                        placeholder="******"
                        {...field}
                        type={showPassword ? "text" : "password"}
                        disabled={isPending}
                      />
                    </FormControl>
                    <Button className=" font-normal" onClick={handlePassword}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </div>
                  <Button
                    size="sm"
                    variant="link"
                    className="px-0 font-normal"
                    asChild
                  >
                    <Link href="/auth/reset">Forgot Password?</Link>
                  </Button>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full" disabled={isPending}>
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
