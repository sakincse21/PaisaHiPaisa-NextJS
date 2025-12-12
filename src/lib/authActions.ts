/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import envVars from "@/config";
import { cookies } from "next/headers";

export async function loginAction(_currentState: any, formData: FormData): Promise<any> {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // 1. Call your backend API
    const res = await fetch(`${envVars.backendBaseUrl}/api/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const responseData = await res.json();

    // 2. Check for login failure
    if (!res.ok || !responseData.success) {
      return {
        success: false,
        message: responseData.message || "Login failed. Please check your credentials.",
      };
    }

    // 3. Extract token from the JSON body
    const token = responseData?.data?.accessToken;
    if (!token) {
      return {
        success: false,
        message: "Login successful, but no access token was provided.",
      };
    }

    // 4. Set the cookie securely on the server
    (await cookies()).set("accessToken", token, {
      httpOnly: true,
      secure: true, // Use 'secure' in production
      sameSite: "none",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      domain: ".vercel.app"
    });

    // 5. Return success state to the client
    return {
      success: true,
      message: "Login successful!",
      role: responseData.data.role, // Pass role for redirection
    };

  } catch (error) {
    console.error("Login Action Error:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}


export async function logoutAction(): Promise<any> {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("accessToken")?.value;

    if (token) {
      // Optional: Call backend logout endpoint
      await fetch(`${envVars.backendBaseUrl}/api/v1/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${token}`,
        },
      });
    }

    // Delete the cookie from the browser
    (await cookieStore).delete("accessToken");

    return {
      success: true,
      message: "Logout successful",
    };
  } catch (error) {
    console.error("Logout error:", error);
    return {
      success: false,
      message: "An error occurred during logout",
    };
  }
}

export async function getCookie(): Promise<any> {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("accessToken")?.value;

    return token;
  } catch (error) {
    console.error("Get Cookie error:", error);
    return {
      success: false,
      message: "An error occurred while retrieving the cookie",
    };
  }
}