import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

import Footer from "./components/Footer";
import { fetchUserDetails } from "@/app/(Engine)/actions/fetchUserDetails";
import { ProductCartProvider } from "../contextProvider/Prod";
import { CarouselContextProvider } from "../contextProvider/CarouselContextProvider";
import Provider from "../contextProvider/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Eureka",
    template: "%s | Eureka",
  },
  icons: {
    icon: [{ url: "../favicon.ico", type: "image/x-icon", sizes: "900x1291" }],
  },
  description:
    "Eureka.com, Igwe Princewill, Portfolio Website, Graphics, web development, react, next js, vercel app, ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Provider>
        <body className={inter.className}>
          <ProductCartProvider>
            <CarouselContextProvider>
              <Navbar Action={fetchUserDetails} />
              {children}
              <Footer />
            </CarouselContextProvider>
          </ProductCartProvider>
        </body>
      </Provider>
    </html>
  );
}
