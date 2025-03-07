import { Header } from "@/app/(protected)/app/account/_components/header";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen bg-slate-900">
      <Header />
      <div className="flex flex-col max-w-[1000px] mx-auto mt-10">
        {children}
      </div>
    </div>
  );
}
