"use server";

import db from "@/lib/db";
import { z } from "zod";

export async function getSearchResults(search: string) {
  const searchResults = await db.tweet.findMany({
    where: {
      tweet: {
        contains: search,
      },
    },
    select: {
      id: true,
      tweet: true,
      create_at: true,
      userId: true,
      user: true,
    },
  });
  return searchResults;
}

const formSchema = z
  .object({
    search: z
      .string()
      .max(100, { message: "검색어는 100자 이하만 입력해주세요." }),
  })
  .superRefine(async ({ search }, ctx) => {
    const searchResult = await db.tweet.findMany({
      where: {
        tweet: {
          contains: search,
        },
      },
      select: {
        id: true,
      },
    });
    if (searchResult.length === 0) {
      ctx.addIssue({
        code: "custom",
        message: "검색된 결과가 없습니다.",
        path: ["search"],
        fatal: true,
      });
      return z.NEVER;
    }
  });

export async function search(prevState: any, formData: FormData) {
  const data = {
    search: formData.get("search"),
  };

  const result = await formSchema.spa(data);
  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    // 유효성 검사 성공한 부분!
  }
}
