import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import { Quicksand } from "@next/font/google";

const quicksand = Quicksand({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head />
      <body
        className={`max-w-[1920px] w-full px-4 md:px-12 lg:px-16 ${quicksand.className}`}
      >
        <Navbar />
        <div>{children}</div>
      </body>
    </html>
  );
}
