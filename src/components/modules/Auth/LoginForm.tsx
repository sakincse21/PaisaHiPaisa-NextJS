
"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { loginAction } from "@/lib/authActions"
import { toast } from "sonner"
import Link from "next/link"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()
  const [state, formAction, isPending] = useActionState(loginAction, null)

  useEffect(() => {
    if (state?.success === true) {
      toast.success(state.message);
      // Redirect to the correct dashboard based on role
      const role = state.role?.toLowerCase();
      if (role) {
        router.push(`/${role}`);
      } else {
        router.push('/'); // Fallback to home
      }
    }
    if (state?.success === false) {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  name="email"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>
                <Input id="password" type="password" name="password" required />
              </Field>
              <Field>
                <Button type="submit" disabled={isPending} className="w-full">{
                  isPending ? "Logging in..." : "Login"
                }</Button>
                <div className="mt-4 text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link href="/register" className="underline">
                    Sign up
                  </Link>
                </div>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
