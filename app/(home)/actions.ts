"use server";

import db from "@/lib/db";

export async function getMoreTweets(page: number) {
  const products = await db.tweet.findMany({
    select: {
      id: true,
      tweet: true,
      create_at: true,
      userId: true,
      user: true,
    },
    // 실제로 사용할 page size 적용해주기!
    skip: page * 1,
    take: 1,
    orderBy: {
      create_at: "desc",
    },
  });
  return products;
}
