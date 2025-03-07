"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export const LogoutButton = () => {
  const handleLogout = async () => {
    await signOut({ redirectTo: "/auth/login" });
  };

  return (
    <Button
      onClick={handleLogout}
      className="mt-10 flex justify-center items-center"
    >
      Logout
    </Button>
  );
};
