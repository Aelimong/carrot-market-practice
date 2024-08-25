import Button from "@/components/button";
import Input from "@/components/input";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { formatToTimeAgo } from "@/lib/utils";
import { notFound } from "next/navigation";
import { unstable_cache as nextCache } from "next/cache";
import Link from "next/link";
import BackNav from "@/components/back-nav";
import { useEffect, useOptimistic } from "react";

async function getIsOwner(userId: number) {
  const session = await getSession();

  // 제품을 업로드한 아이디와 cookie에 있는 User Id가 같다면
  if (session.id) {
    return session.id === userId;
  }
  return false;
}

async function getTweet(id: number) {
  try {
    const tweet = await db.tweet.update({
      where: {
        id,
      },
      data: {
        views: {
          increment: 1,
        },
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
        _count: {
          select: {
            responses: true,
            likes: true,
          },
        },
      },
    });
    return tweet;
  } catch (e) {
    return null;
  }
}

const getCachedTweet = nextCache(getTweet, ["post-detail"], {
  tags: ["post-detail"],
  revalidate: 60,
});

async function getLikeStatus(tweetId: number, userId: number) {
  try {
    const isLiked = await db.like.findUnique({
      where: {
        id: {
          tweetId,
          userId,
        },
      },
    });
    const likeCount = await db.like.count({
      where: {
        tweetId,
      },
    });
    return {
      likeCount,
      isLiked: Boolean(isLiked),
    };
  } catch (e) {
    return null;
  }
}

function getCachedLikeStatus(tweetId: number, userId: number) {
  const cachedOperation = nextCache(getLikeStatus, ["product-like-status"], {
    tags: [`like-status-${tweetId}`],
  });
  return cachedOperation(tweetId, userId);
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

  const tweet = await getCachedTweet(id);

  // 존재하지 않는 아이디로 요청했을 때의 처리
  if (!tweet) {
    return notFound();
  }

  // 세션 정보를 캐시된 함수 밖에서 가져옴
  const session = await getSession();
  let data;

  if (!session.id) {
    // 로그인 된 경우!
    data = await getCachedLikeStatus(id, session.id!);
  }

  // const { likeCount, isLiked } = data;

  return (
    <div className="flex flex-col border border-x-1 bg-gray-100 border-x-gray-300 max-w-96 min-h-screen p-6 m-auto">
      <div className="mb-4">
        <BackNav />
      </div>
      <div className="flex flex-col justify-between gap-12">
        <div className="w-full flex flex-col gap-6 *:text-black py-6 px-5 border-2 border-dashed rounded-md">
          <span className="text-lg">{tweet.tweet}</span>
          <div className="flex justify-between items-center">
            <div className="text-sm text-neutral-500">
              {formatToTimeAgo(tweet.create_at.toString())}
            </div>
            <Link href={`/users/${tweet.user.username}`}>
              <div className="text-base font-semibold">
                {tweet.user.username}
              </div>
            </Link>
          </div>
          {/* <LikeButton isLiked={isLiked} likeCount={likeCount} tweetId={id} /> */}
        </div>
        <div>
          <form className="flex flex-col gap-5">
            <Input
              name="comment"
              required
              placeholder="댓글을 작성해주세요."
              type="text"
              // errors={state?.fieldErrors.tweet}
            />
            <Button text="댓글 작성" />
          </form>
        </div>
      </div>
    </div>
  );
}
