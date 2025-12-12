<div align="center">
  
  <h1>🏦 PaisaHiPaisa - Digital Wallet System</h1>
  <p>
    A robust, secure, and feature-rich digital wallet and payment management system built with Next.js, Redux, and Shadcn/UI.
  </p>
</div>

---

## Table of Contents

- [Table of Contents](#table-of-contents)
- [About The Project](#about-the-project)
- [Key Features](#key-features)
  - [User Roles \& Permissions](#user-roles--permissions)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Folder Structure](#folder-structure)
- [Deployment](#deployment)
- [License](#license)

---

## About The Project

**PaisaHiPaisa** is a full-stack digital wallet application designed to simulate real-world financial transactions. It provides a multi-role architecture with distinct dashboards and functionalities for regular users, agents, merchants, and administrators.

The application is built using the latest web technologies, focusing on performance, security, and a clean user experience, powered by the Next.js App Router and server-side components.

---

## Key Features

- **Secure Authentication**: Role-based authentication using JWT and Next.js Middleware.
- **Role-Based Dashboards**: Tailored user interfaces and functionalities for each user role.
- **Real-time Transactions**: Perform actions like sending money, cashing in, and making payments.
- **Transaction History**: Detailed logs of all financial activities for users.
- **User Management**: Comprehensive control panels for administrators to manage the system's users.
- **Responsive Design**: A seamless experience across desktop and mobile devices, thanks to Tailwind CSS and Shadcn/UI.
- **State Management**: Centralized and efficient state management with Redux Toolkit and RTK Query.

### User Roles & Permissions

The system supports five distinct user roles, each with a specific set of permissions:

| Role | Key Responsibilities & Features |
| :--- | :--- |
| 👤 **User** | - Send Money to other users<br>- Add Money (Via SSLCommerz)<br>- Make payments<br>- View personal transaction history<br>- Check wallet balance<br>- Update personal profile |
| 💼 **Agent** | - Facilitate Cash-in for Users<br>- Add Money (Via SSLCommerz)<br>- Send Money<br>- Manage their own transaction history<br>- Check wallet balance |
| 🏪 **Merchant** | - Withdraw money from their wallet<br>- View incoming payments and transaction history<br>- Check wallet balance |
| 🛡️ **Admin** | - Manage all Users, Agents, and Merchants<br>- Verify new user registrations<br>- Monitor system-wide activity |
| 👑 **Super Admin** | - Has all permissions of an Admin<br>- Manage Admin accounts<br>- Oversee the entire system and all roles |

---

## Tech Stack

This project is built with a modern, scalable, and efficient technology stack.

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Shadcn/UI](https://ui.shadcn.com/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) & [RTK Query](https://redux-toolkit.js.org/rtk-query/)
- **Authentication**: [Next.js Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware), Server Actions, JWT
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **UI/UX**: [Sonner](https://sonner.emilkowal.ski/) (for notifications)

---

## Getting Started

Follow these instructions to set up the project locally for development and testing.

### Prerequisites

Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/en) (v18.x or later)
- [pnpm](https://pnpm.io/) (or npm/yarn)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/sakincse21/pasiahipaisa-nextjs.git
    cd pasiahipaisa
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add the necessary environment variables. See the [Environment Variables](#environment-variables) section for the template.

4.  **Run the development server:**
    ```bash
    npm dev
    ```

The application will be available at `http://localhost:3000`.

---

## Environment Variables

To run this project, you need to create a `.env` file in the root directory and add the following variables.

```env
# URL of your backend server
NEXT_PUBLIC_BACKEND_BASE_URL=http://localhost:5000/api/v1

# URL of your frontend server
NEXT_PUBLIC_FRONTEND_BASE_URL=http://localhost:5000/api/v1

# Secret key for signing JWTs (must match the backend)
NEXT_PUBLIC_JWT_SECRET=your-super-secret-jwt-key
```

---

## Folder Structure

The project follows a feature-sliced design, organized for scalability and maintainability.

```
/src
├── app/                # Next.js App Router: pages and layouts
│   ├── (auth)/         # Routes for authentication (login, register)
│   ├── (dashboard)/    # Protected routes for different user roles
│   └── (public)/       # Publicly accessible pages (home, about)
├── components/         # Shared UI components (layout, modules, ui)
├── lib/                # Core logic, utilities, and server actions
├── providers/          # Global context providers (Redux, Theme)
├── redux/              # Redux Toolkit setup (store, baseApi, features)
└── routes/             # Sidebar item configurations for each role
```

---

## Deployment

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new).

- Ensure your backend is deployed and the `NEXT_PUBLIC_BACKEND_BASE_URL` environment variable is set correctly in your Vercel project settings.
- Set the `NEXT_PUBLIC_JWT_SECRET` to match your production backend.

For more details, check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

---

## License

Distributed under the MIT License. See `LICENSE` for more information.
