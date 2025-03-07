"use client";

import { useRouter } from "next/navigation";

interface LoginButtonPorps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const LoginButton = ({ children }: LoginButtonPorps) => {
  const router = useRouter();
  const onClick = () => {
    router.push("/auth/login");
  };

  return (
    <span className="cursor-pointer" onClick={onClick}>
      {children}
    </span>
  );
};
