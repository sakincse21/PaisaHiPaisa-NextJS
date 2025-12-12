// /* eslint-disable @typescript-eslint/no-explicit-any */
// 'use client'
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { loginAction, setCookieFunction } from "@/lib/authActions";
// import { useState } from "react";

// const loginSchema = z.object({
//   email: z.string().email("Enter a valid Email.").toLowerCase(),
//   password: z
//     .string()
//     .min(8, { message: "Password should be at least 8 characters." }),
// });

// export function LoginForm() {
//   const navigate = useRouter();
//   const [isLoading, setIsLoading] = useState(false);

//   const form = useForm<z.infer<typeof loginSchema>>({
//     resolver: zodResolver(loginSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   async function onSubmit(formData: z.infer<typeof loginSchema>) {
//     const toastId = toast.loading("Logging in...");
//     setIsLoading(true);
    
//     try {
//       // ✅ Create FormData for server action
//       const formDataObj = new FormData();
//       formDataObj.append("email", formData.email);
//       formDataObj.append("password", formData.password);

//       // Call your backend
//       const res = await fetch(`http://localhost:5000/api/v1/auth/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email: formData.email, password: formData.password }),
//       });

//       const data = await res.json();

//       if (!res.ok || !data.success) {
//         return toast.error(data.message || "Login failed", { id: toastId });
//       }

//       toast.success("Login successful.", { id: toastId });
//       await setCookieFunction(data?.data?.accessToken);
//       // ✅ Navigate and refresh to apply middleware
//       const role = data.data?.role?.toLowerCase();
//       navigate.push(`/${role}`);
//       navigate.refresh(); // Important: refreshes the page to apply cookie
//     } catch (error: any) {
//       console.error(error);
//       toast.error("Something went wrong. Try again.", { id: toastId });
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   return (
//     <div className={"flex flex-col gap-6"}>
//       <Card>
//         <CardHeader className="text-center">
//           <CardTitle className="text-xl">Welcome back</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//               <FormField
//                 control={form.control}
//                 name="email"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Email</FormLabel>
//                     <FormControl>
//                       <Input placeholder="me@email.com" {...field} disabled={isLoading} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="password"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Password</FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder="********"
//                         {...field}
//                         type="password"
//                         disabled={isLoading}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <Button type="submit" className="w-full" disabled={isLoading}>
//                 {isLoading ? "Logging in..." : "Login"}
//               </Button>
//             </form>
//           </Form>
//         </CardContent>
//         <CardFooter className="flex flex-col gap-2">
//           <Link href={"/register"} className="w-full">
//             <Button type="button" className="w-full bg-ring">
//               Register Now
//             </Button>
//           </Link>
//         </CardFooter>
//       </Card>
//       <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
//         By clicking continue, you agree to our{" "}
//         <Link href={"/about"}>Terms of Service</Link> and{" "}
//         <Link href={"/about"}>Privacy Policy</Link>.
//       </div>
//     </div>
//   );
// }


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