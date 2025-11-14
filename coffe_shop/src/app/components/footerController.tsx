"use client"
import Footer from "./footer";
import { usePathname } from "next/navigation";
export default function ControlFooter(){
     const pathname = usePathname()
     const isProductPage = pathname.startsWith("/dasdboard");

  if (isProductPage) return null;

  return (
    <>
      <Footer />
    </>
  );
}