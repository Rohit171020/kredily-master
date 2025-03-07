import { auth } from "@/auth";
import type { User } from "next-auth";
import _ from "lodash";

export const currentUser = async (): Promise<User | null> => {
  const session = await auth();

  const user = _.get(session, "user", null) as User | null;

  console.log("Current user:", user);

  return user;
};
