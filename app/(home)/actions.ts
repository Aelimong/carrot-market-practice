"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
// import { useRouter } from "next/navigation";
import { z } from "zod";

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

const tweetSchema = z.object({
  tweet: z.string().max(120),
});

// 첫번째에는 formState가 오니 formData을 두 번째로 이동
export async function createTweet(_: any, formData: FormData) {
  const data = { tweet: formData.get("tweet") };
  const result = tweetSchema.safeParse(data);
  // const router = useRouter();

  if (!result.success) {
    return result.error.flatten();
  } else {
    //누가 생성했는지 데이터 먼저 불러오기
    const session = await getSession();

    // 로그인된 유저가 있다면
    if (session.id) {
      const tweet = await db.tweet.create({
        data: {
          tweet: result.data.tweet,
          user: {
            connect: {
              id: session.id,
            },
          },
        },
        select: {
          id: true,
        },
      });

      // .refresh();
      redirect(`/tweets/${tweet.id}`);
      // window.location.reload;
    }
  }
}
