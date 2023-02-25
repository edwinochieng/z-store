import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import { Inter } from "@next/font/google";
import Provider from "@/components/provider/Provider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head />
      <body
        className={`max-w-[1920px] w-full px-3 md:px-12 lg:px-16 ${inter.className}`}
      >
        <Provider>
          <Navbar />
          <div>{children}</div>
        </Provider>
      </body>
    </html>
  );
}
