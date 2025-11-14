"use client";
import Navbar from "./nav";
import { usePathname } from "next/navigation";

export default function ControlNavbar() {
  const pathname = usePathname();

  const isProductPage = pathname.startsWith("/dasdboard");

  if (isProductPage) return null;

  return (
    <>
      <Navbar />
    </>
  );
}
