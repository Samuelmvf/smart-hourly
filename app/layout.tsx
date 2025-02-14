import type { Metadata } from "next";
import "../styles/globals.css";


export const metadata: Metadata = {
  title: "Smart Hourly",
  description: "Modern web application that helps freelancers and independent professionals calculate their hourly rate",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
