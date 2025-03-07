import { ErrorCard } from "@/components/auth/error-card";

const AuthErrorPage = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <ErrorCard />
    </div>
  );
};

export default AuthErrorPage;
