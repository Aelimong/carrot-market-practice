import db from "@/lib/db";
import getSession from "@/lib/session";
import { formatToTimeAgo } from "@/lib/utils";
import { notFound } from "next/navigation";

async function getIsOwner(userId: number) {
  const session = await getSession();

  // 제품을 업로드한 아이디와 cookie에 있는 User Id가 같다면
  if (session.id) {
    return session.id === userId;
  }
  return false;
}

async function getTweet(id: number) {
  const tweet = await db.tweet.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });
  return tweet;
}

export default async function TweetDetail({
  params,
}: {
  params: { id: string };
}) {
  //아이디는 숫자여야만 한다! -> 아이디가 숫자인지 확인하는 코드
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }

  const tweet = await getTweet(id);

  // 존재하지 않는 아이디로 요청했을 때의 처리
  if (!tweet) {
    return notFound();
  }

  const isOwner = await getIsOwner(tweet.userId);

  return (
    <div className="flex flex-col border border-x-1 bg-gray-100 border-x-gray-300 max-w-96 min-h-screen p-6 m-auto">
      <div className="w-full flex flex-col gap-6 *:text-black py-6 px-5 border-2 border-dashed rounded-md">
        <span className="text-lg">{tweet.tweet}</span>
        <div className="flex justify-between items-center">
          <div className="text-sm text-neutral-500">
            {formatToTimeAgo(tweet.create_at.toString())}
          </div>
          <div className="text-base font-semibold">{tweet.user.username}</div>
        </div>
      </div>
    </div>
  );
}
