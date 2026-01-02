"use client"

import { Button } from "@/components/ui/button"
import {
<<<<<<< HEAD
=======
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
>>>>>>> git-chesta
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
<<<<<<< HEAD
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/lib/axios";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
=======
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { axiosInstance } from "@/lib/axios"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
>>>>>>> git-chesta

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
})

type LoginFormType = z.infer<typeof formSchema>

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()

  const form = useForm<LoginFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  })

  const { mutateAsync: login, isPending } = useMutation({
<<<<<<< HEAD
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      const result = await axiosInstance.post("/auth/login", {
        email: data.email,
        password: data.password,
      });

      return result.data;
    },
    onSuccess: async (result) => {
      await signIn("credentials", {
        email: result.email,
        objectId: result.objectId,
        userToken: result.accessToken,
        role: result.role,
        redirect: false,
      });
=======
    mutationFn: async (payload: LoginFormType) => {
      const res = await axiosInstance.post("/auth/login", payload)
      return res.data
    },
>>>>>>> git-chesta

    onSuccess: (user) => {
      localStorage.setItem("token", user.accessToken)
      toast.success("Login success")
      router.push("/")
    },

    onError: () => toast.error("Login failed"),
  })

  async function onSubmit(data: LoginFormType) {
    await login(data)
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
<<<<<<< HEAD
      {/* Header Section */}
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>

      {/* Form Section */}
      <form id="form-login" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup className="grid gap-6">
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="grid gap-2">
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  {...field}
                  id="email"
                  type="email"
                  aria-invalid={fieldState.invalid}
                  placeholder="m@example.com"
                  className="bg-background"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="grid gap-2">
                <div className="flex items-center justify-between">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Link
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  {...field}
                  id="password"
                  type="password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Your password"
                  className="bg-background"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Button
            type="submit"
            form="form-login"
            disabled={isPending}
            className="w-full bg-blue-600 text-white hover:bg-blue-700"
          >
            {isPending ? "Logging in..." : "Login"}
          </Button>

          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="hover:text-primary underline underline-offset-4"
            >
              Sign up
            </Link>
          </div>
        </FieldGroup>
      </form>
=======
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Email</FieldLabel>
                    <Input {...field} type="email" />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Password</FieldLabel>
                    <Input {...field} type="password" />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Button type="submit" disabled={isPending}>
                {isPending ? "Loading..." : "Login"}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
>>>>>>> git-chesta
    </div>
  )
}