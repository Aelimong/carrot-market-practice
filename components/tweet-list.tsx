"use client";

import { InitialTweets } from "@/app/(home)/page";
import ListTweet from "./list-tweet";
import { useState } from "react";
import { getMoreTweets } from "@/app/(home)/actions";

interface TweetListProps {
  initialTweets: InitialTweets;
}

export default function TweetList({ initialTweets }: TweetListProps) {
  const [tweets, setTweets] = useState(initialTweets);
  const [isLoading, setIsLoading] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const [page, setPage] = useState(0);
  const onLoadMoreClick = async () => {
    setIsLoading(true);

    const newTweets = await getMoreTweets(page + 1);

    if (newTweets.length !== 0) {
      setPage((prev) => prev + 1);
      setTweets((prev) => [...prev, ...newTweets]);
    } else {
      setIsLastPage(true);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      {tweets.map((tweets) => (
        <ListTweet key={tweets.id} {...tweets} />
      ))}
      {isLastPage ? null : (
        <button
          onClick={onLoadMoreClick}
          disabled={isLoading}
          className="text-white text-sm font-semibold bg-[#533566] w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95"
        >
          {isLoading ? "로딩 중" : "Load more"}
        </button>
      )}
    </div>
  );
}
