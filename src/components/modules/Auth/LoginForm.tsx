
// "use client"

// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import {
//   Field,
//   FieldGroup,
//   FieldLabel,
// } from "@/components/ui/field"
// import { Input } from "@/components/ui/input"
// import { useActionState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { loginAction } from "@/lib/authActions"
// import { toast } from "sonner"
// import Link from "next/link"

// export function LoginForm({
//   className,
//   ...props
// }: React.ComponentProps<"div">) {
//   const router = useRouter()
//   const [state, formAction, isPending] = useActionState(loginAction, null)

//   useEffect(() => {
//     if (state?.success === true) {
//       toast.success(state.message);
//       // Redirect to the correct dashboard based on role
//       const role = state.role?.toLowerCase();
//       if (role) {
//         router.push(`/${role}`);
//       } else {
//         router.push('/'); // Fallback to home
//       }
//     }
//     if (state?.success === false) {
//       toast.error(state.message);
//     }
//   }, [state, router]);

//   return (
//     <div className={cn("flex flex-col gap-6", className)} {...props}>
//       <Card>
//         <CardHeader>
//           <CardTitle>Login to your account</CardTitle>
//           <CardDescription>
//             Enter your email below to login to your account
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form action={formAction}>
//             <FieldGroup>
//               <Field>
//                 <FieldLabel htmlFor="email">Email</FieldLabel>
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="m@example.com"
//                   name="email"
//                   required
//                 />
//               </Field>
//               <Field>
//                 <div className="flex items-center">
//                   <FieldLabel htmlFor="password">Password</FieldLabel>
//                 </div>
//                 <Input id="password" type="password" name="password" required />
//               </Field>
//               <Field>
//                 <Button type="submit" disabled={isPending} className="w-full">{
//                   isPending ? "Logging in..." : "Login"
//                 }</Button>
//                 <div className="mt-4 text-center text-sm">
//                   Don&apos;t have an account?{" "}
//                   <Link href="/register" className="underline">
//                     Sign up
//                   </Link>
//                 </div>
//               </Field>
//             </FieldGroup>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

'use client'
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { authApi, useLoginMutation } from "@/redux/features/Auth/auth.api";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hook";
import { useUserInfoQuery } from "@/redux/features/User/user.api";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const loginSchema = z.object({
  email: z.email({ error: "Enter a valid Email." }).toLowerCase(),
  password: z
    .string()
    .min(8, { error: "Password should be atleast 8 characters." }),
});

export function LoginForm() {
  const [login] = useLoginMutation();
    const { data: userData } = useUserInfoQuery(undefined);
  const navigate = useRouter();
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(formData: z.infer<typeof loginSchema>) {
    // console.log(formData);
    // const loginInfo:ILogin = {
    //   email: formData.email,
    //   password: formData.password
    // }
    // console.log("showing res",res);
    const toastId = toast.loading("Logging in...");
    try {
      dispatch(authApi.util.resetApiState());
      const res = await login(formData).unwrap();
      if (res?.success) {
        toast.success("Login successful.", { id: toastId });

        // navigate(`/${(res?.data?.role as string)?.toLowerCase()}`);
        
          navigate.push(`/${(res?.data?.role as string)?.toLowerCase()}`);
        
      } else {
        toast.error(res?.data?.message, { id: toastId });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      const errorMessage =
        error?.data?.message || "Something went wrong. Try again.";
      toast.error(errorMessage, { id: toastId });
    }
  }
  if(userData?.data?.email){
    navigate.push(`/${(userData?.data?.role as string)?.toLowerCase()}`);
  }
  return (
    <div className={"flex flex-col gap-6"}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="me@email.com" {...field} />
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
                    <FormControl>
                      <Input
                        placeholder="********"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Link href={"/register"} className="w-full">
            <Button type="button" className="w-full bg-ring">
              Register Now
            </Button>
          </Link>
        </CardFooter>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our{" "}
        <Link href={"/about"}>Terms of Service</Link> and{" "}
        <Link href={"/about"}>Privacy Policy</Link>.
      </div>
    </div>
  );
}