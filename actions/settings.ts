"use server";

import { SettingsSchema } from "@/schemas";
import * as z from "zod";
import { db } from "@/lib/db";
import { unstable_update } from "@/auth";
import { currentUser } from "@/lib/auth";
import { getUserByEmail, getUserById } from "@/data/user";
import bcrypt from "bcryptjs";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  // check if user exists in db
  const dbUser = await getUserById(user.id as string);

  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email as string);

    if (existingUser) {
      return { error: "Email already in use" };
    }
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordMatch = await bcrypt.compare(
      values.password,
      dbUser.password
    );
    if (!passwordMatch) {
      return { error: "Incorrect password!" };
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);

    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  const updatedUser = await db.user.update({
    where: { id: dbUser.id },
    data: { ...values },
  });

  unstable_update({
    user: {
      name: updatedUser.name,
      email: updatedUser.email,
    },
  });

  return { success: "Settings updated successfully" };
};
