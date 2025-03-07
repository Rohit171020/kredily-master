import { UserButton } from "@/app/(protected)/app/account/_components/user-button";

export const Header = () => {
  return (
    <div className="flex flex-row items-center w-full bg-slate-700 justify-center">
      <h1 className="text-2xl font-light text-white p-3">Kredily</h1>
      <UserButton />
    </div>
  );
};
