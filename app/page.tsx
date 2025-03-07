import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";

const font = Poppins({
  subsets: ["latin"],
  weight: "600",
});

export default function Home() {
  return (
    <main
      className="flex h-full flex-col items-center justify-center
    bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-700 to-black"
    >
      <div className="space-y-6 text-center ">
        <h1
          className={cn(
            "text-6xl font-semibold text-white drop-shadow-md",
            font.className
          )}
        >
          Kredily
        </h1>
        <p className="text-white text-lg  ">
          Secure and seamless authentication for your business.
        </p>
        <div>
          <LoginButton mode="redirect" asChild>
            <Button variant="secondary" size="lg">
              Sign in
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
