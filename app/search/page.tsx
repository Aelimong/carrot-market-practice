"use client";

import ListSearchResults from "@/components/list-search-results";
import SearchKeyword from "@/components/search-keyword";
import { TweetType } from "@/types/RiceballTypes";
import { useState } from "react";
import { number } from "zod";

export default function Search() {
  const [searchKeyData, setSearchKeyData] = useState<TweetType[]>([]);

  return (
    <>
      <div className="w-full flex flex-col gap-12 border border-x-1 bg-gray-100 border-x-gray-300 items-center max-w-96 min-h-screen p-6 m-auto">
        <SearchKeyword setSearchKeyData={setSearchKeyData} />
        <ListSearchResults searchKeyData={searchKeyData} />
      </div>
    </>
  );
}
