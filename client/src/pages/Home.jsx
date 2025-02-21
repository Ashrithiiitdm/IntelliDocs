import Header from "@/components/Header";
import { UserButton } from "@clerk/clerk-react";
import React from "react";

export default function Home() {
  return (
    <div>
      <Header />
      <UserButton />
    </div>
  );
}
