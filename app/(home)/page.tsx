import AddTweet from "@/components/add-tweet";
import TweetList from "@/components/tweet-list";
import db from "@/lib/db";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/outline";
import { Prisma } from "@prisma/client";
import Link from "next/link";

async function getInitialTweets() {
  const tweets = await db.tweet.findMany({
    select: {
      id: true,
      tweet: true,
      create_at: true,
      userId: true,
      user: true,
    },
    take: 5,
    orderBy: {
      create_at: "desc",
    },
  });

  return tweets;
}

export type InitialTweets = Prisma.PromiseReturnType<typeof getInitialTweets>;

export default async function Home() {
  const initialTweets = await getInitialTweets();

  return (
    <div className="flex flex-col border border-x-1 bg-gray-100 border-x-gray-300 items-center max-w-96 min-h-screen p-6 m-auto">
      <div className="w-full flex justify-end mb-8">
        <Link href="/search">
          <MagnifyingGlassCircleIcon className="size-10 text-slate-400" />
        </Link>
      </div>
      <AddTweet />
      <div className="w-full py-5 flex flex-col gap-5">
        <TweetList initialTweets={initialTweets} />
      </div>
    </div>
  );
}
