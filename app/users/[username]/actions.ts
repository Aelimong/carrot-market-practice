"use server";

import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_MIN_LENGTH_ERROR,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
import { z } from "zod";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import { revalidatePath, revalidateTag } from "next/cache";
import bcrypt from "bcrypt";
import getSession from "@/lib/session";

export async function getUserData(username: string) {
  try {
    const userResults = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
        username: true,
        email: true,
        bio: true,
        tweets: true,
      },
    });
    revalidateTag(`user-data-${username}`);
    return userResults;
  } catch (e) {}
}

export async function getUserProfileData(username: string) {
  try {
    const userResults = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
        username: true,
        email: true,
        bio: true,
      },
    });
    revalidateTag(`user-profile-${username}`);
    return userResults;
  } catch (e) {}
}

const checkPasswords = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "Username must be a string!",
        required_error: "이름을 입력해주세요!",
      })
      .toLowerCase()
      .trim(),
    email: z
      .string({
        invalid_type_error: "email must be a string!",
        required_error: "이메일을 입력해주세요!",
      })
      .email()
      .toLowerCase(),
    bio: z.string().max(130),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH, PASSWORD_MIN_LENGTH_ERROR)
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirm_password: z
      .string()
      .min(PASSWORD_MIN_LENGTH, PASSWORD_MIN_LENGTH_ERROR)
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
  })
  .superRefine(async ({ username }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "이 사용자명은 이미 사용중입니다.",
        path: ["username"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .superRefine(async ({ email }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });

    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "이 이메일은 이미 사용중입니다.",
        path: ["email"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .refine(checkPasswords, {
    message: "두 비밀번호가 일치하지 않습니다.",
    path: ["confirm_password"],
  });

export async function updateAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    bio: formData.get("bio"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };

  const result = await formSchema.safeParseAsync(data);

  if (!result.success) {
    console.log(result.error);
    return result.error.flatten();
  } else {
    // 통과한 부분

    const session = await getSession();
    const hashedPassword = await bcrypt.hash(result.data.password, 12);

    const updatedUser = await db.user.update({
      where: { id: session.id }, // 업데이트할 사용자의 ID
      data: {
        username: result.data.username,
        email: result.data.email,
        bio: result.data.bio,
        password: hashedPassword,
      },
    });

    redirect("/profile");
  }
}
