// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import jwt from "jsonwebtoken";

// // export const runtime = "nodejs"; // Required for jsonwebtoken

// type UserRole = "ADMIN" | "USER" | "AGENT" | "SUPER_ADMIN";

// type RouteConfig = {
//   exact: string[];
//   patterns: RegExp[];
// };

// const authRoutes = ["/login", "/register"];
// const publicRoutes = ["/"]; // Add other public routes here

// const userProtectedRoutes: RouteConfig = {
//   exact: ["/user"],
//   patterns: [/^\/user(\/.*)?$/],
// };

// const adminProtectedRoutes: RouteConfig = {
//   exact: ["/admin"],
//   patterns: [/^\/admin(\/.*)?$/],
// };

// const superAdminProtectedRoutes: RouteConfig = {
//   exact: ["/super_admin"],
//   patterns: [/^\/super_admin(\/.*)?$/],
// };

// const agentProtectedRoutes: RouteConfig = {
//   exact: ["/agent"],
//   patterns: [/^\/agent(\/.*)?$/],
// };

// const isAuthRoute = (pathname: string): boolean => {
//   return authRoutes.some((route) => pathname.startsWith(route));
// };

// const isPublicRoute = (pathname: string): boolean => {
//   return publicRoutes.includes(pathname);
// };

// const isRouteMatches = (
//   pathname: string,
//   routesObject: RouteConfig
// ): boolean => {
//   if (routesObject.exact.includes(pathname)) {
//     return true;
//   }
//   return routesObject.patterns.some((pattern) => pattern.test(pathname));
// };

// const getRouteOwner = (
//   pathname: string
// ): "auth" | "admin" | "super_admin" | "user" | "public" | "agent" => {
//   if (isAuthRoute(pathname)) return "auth";
//   if (isPublicRoute(pathname)) return "public";
//   if (isRouteMatches(pathname, superAdminProtectedRoutes)) return "super_admin";
//   if (isRouteMatches(pathname, adminProtectedRoutes)) return "admin";
//   if (isRouteMatches(pathname, userProtectedRoutes)) return "user";
//   if (isRouteMatches(pathname, agentProtectedRoutes)) return "agent";
//   return "public";
// };

// const getDefaultDashboard = (role: UserRole): string => {
//   console.log(role)
//   switch (role) {
//     case "ADMIN":
//       return "/admin";
//     case "SUPER_ADMIN":
//       return "/super_admin";
//     case "USER":
//       return "/user";
//     case "AGENT":
//       return "/agent";
//     default:
//       return "/";
//   }
// };

// export async function proxy(request: NextRequest) {
//   const pathName = request.nextUrl.pathname;
//   // Use consistent cookie name - should match what you set during login
//   const token = request.cookies.get("accessToken")?.value || null;

//   let userRole: UserRole | null = null;

//   if (token) {
//     try {
//       const verifiedToken = jwt.verify(token, process.env.JWT_SECRET as string);
//       if (typeof verifiedToken === "string" || !verifiedToken?.role) {
//         throw new Error("Invalid token payload");
//       }
//       userRole = verifiedToken.role as UserRole;
//     } catch (error) {
//       // Invalid token - clear it and redirect to login
//       const response = NextResponse.redirect(new URL("/login", request.url));
//       response.cookies.delete("accessToken");
//       return response;
//     }
//   }

//   const routeOwner = getRouteOwner(pathName);

//   // Handle unauthenticated users
//   if (!userRole) {
//     if (routeOwner !== "auth" && routeOwner !== "public") {
//       return NextResponse.redirect(new URL("/login", request.url));
//     }
//     return NextResponse.next();
//   }

//   // Handle authenticated users on auth routes
//   if (routeOwner === "auth") {
//     return NextResponse.redirect(
//       new URL(getDefaultDashboard(userRole), request.url)
//     );
//   }

//   // Check role-based access for protected routes
//   const hasAccess =
//     routeOwner === "public" ||
//     (routeOwner === "admin" && userRole === "ADMIN") ||
//     (routeOwner === "super_admin" && userRole === "SUPER_ADMIN") ||
//     (routeOwner === "user" && userRole === "USER") ||
//     (routeOwner === "agent" && userRole === "AGENT");

//   if (!hasAccess) {
//     return NextResponse.redirect(
//       new URL(getDefaultDashboard(userRole), request.url)
//     );
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/((?!api|_next/static|_next/image|favicon.ico).*)",
//   ],
//   // async rewrites() {
//   //   return [
//   //     {
//   //       source: '/api/v1/:path*',
//   //       destination: 'http://localhost:5000/:path*' // your backend
//   //     }
//   //   ];
//   // },
// };

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import envVars from "./config";

// export const runtime = "nodejs"; // Use Node.js runtime for jsonwebtoken

type UserRole = "admin" | "user" | "public" | "auth" | "agent" | "super_admin" | "merchant";

type RouteConfig = {
  exact: string[];
  patterns: RegExp[];
};

const authRoutes = ["/login", "/register"];
// const publicRoutes = ["/", "/about", "/contact"]; // Add other public routes here

const userProtectedRoutes: RouteConfig = {
  exact: ["/user"],
  patterns: [/^\/user(\/.*)?$/],
};

const adminProtectedRoutes: RouteConfig = {
  exact: ["/admin"],
  patterns: [/^\/admin(\/.*)?$/],
};

const superAdminProtectedRoutes: RouteConfig = {
  exact: ["/super_admin"],
  patterns: [/^\/super_admin(\/.*)?$/],
};

const agentProtectedRoutes: RouteConfig = {
  exact: ["/agent"],
  patterns: [/^\/agent(\/.*)?$/],
};

const merchantProtectedRoutes: RouteConfig = {
  exact: ["/merchant"],
  patterns: [/^\/merchant(\/.*)?$/],
};

const isAuthRoute = (pathname: string): boolean => {
  return authRoutes.some((route) => route === pathname);
};

const isRouteMatches = (
  pathname: string,
  routesObject: RouteConfig
): boolean => {
  if (routesObject.exact.includes(pathname)) {
    return true;
  }

  return routesObject.patterns.some((pattern) => pattern.test(pathname));
};

const getRouteOwner = (
  pathname: string
): "auth" | "admin" | "user" | "public" | "agent" | "super_admin" | "merchant" => {
  if (isAuthRoute(pathname)) {
    return "auth";
  }

  if (isRouteMatches(pathname, adminProtectedRoutes)) {
    return "admin";
  }

  if (isRouteMatches(pathname, userProtectedRoutes)) {
    return "user";
  }

  if (isRouteMatches(pathname, agentProtectedRoutes)) {
    return "agent";
  }

  if (isRouteMatches(pathname, superAdminProtectedRoutes)) {
    return "super_admin";
  }

  if (isRouteMatches(pathname, merchantProtectedRoutes)) {
    return "merchant";
  }

  return "public";
};

const getDefaultDashboard = (role: UserRole): string => {
  switch (role) {
    case "admin":
      return "/admin";
    case "user":
      return "/user";
    case "agent":
      return "/agent";
    case "super_admin":
      return "/super_admin";
    case "merchant":
      return "/merchant";
    default:
      return "/";
  }
};

// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  const token = request.cookies.get("accessToken")?.value || null;

  let userRole: UserRole | null = null;

  // console.log("Token from cookie:", token);

  if (token) {
    try {
      const verifiedToken = jwt.verify(token, envVars.jwtSecret as string);
      console.log(verifiedToken)
      if (typeof verifiedToken === "string") {
        throw new Error("Invalid token payload");
      }
      userRole = verifiedToken.role.toLowerCase() as UserRole;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // Token is invalid or expired, redirect to login and clear cookie
      const response = NextResponse.redirect(new URL("/login", request.url));
      // response.cookies.delete("accessToken");
      return response;
    }
  }

  const routeOwner = getRouteOwner(pathName);
  
  // console.log("user role", userRole, "routeowner", routeOwner)
  if (!token) {
    if (routeOwner === "public" || routeOwner === "auth") {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }
  // Redirect logged-in users from auth pages (login/register)
  if (userRole) {
    if (routeOwner === "auth") {
      return NextResponse.redirect(
        new URL(getDefaultDashboard(userRole), request.url)
      );
    }
    if (routeOwner === "public") {
      return NextResponse.next();
    }
    if (userRole !== routeOwner) {
      return NextResponse.redirect(
        new URL(getDefaultDashboard(userRole as UserRole), request.url)
      );
    }
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
