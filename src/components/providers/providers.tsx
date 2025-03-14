import { ProtectedRoutes, PublicRoutes } from "@/lib/routes";
import { ClerkProvider } from "@clerk/nextjs";
import { Provider as JotaiProvider } from "jotai";
import { ClientProvider } from "./query-client-provider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider
      signInForceRedirectUrl={ProtectedRoutes.Dashboard}
      afterSignOutUrl={PublicRoutes.SignIn}
      signInUrl={PublicRoutes.SignIn}
      signUpUrl={PublicRoutes.SignUp}
    >
      <JotaiProvider>
        <ClientProvider>{children}</ClientProvider>
      </JotaiProvider>
    </ClerkProvider>
  );
};
