"use server";

import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { registerSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import * as z from "zod";

export const register = async (values: z.infer<typeof registerSchema>) => {
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { name, email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "User already exists" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return { success: "Registered successfully. Please login." };
};
