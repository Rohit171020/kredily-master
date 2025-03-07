import { currentUser } from "@/lib/auth";
import { Settings } from "./_components/settings";

const SettingsPage = async () => {
  const user = await currentUser();
  if (!user?.id) return <>No user found</>;

  return <Settings user={user} />;
};

export default SettingsPage;
