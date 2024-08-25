"use client";

import { useFormState } from "react-dom";
import Input from "./input";
import { getSearchResults, search } from "@/app/search/actions";
import { useState } from "react";
import { TweetType } from "@/types/RiceballTypes";

interface SearchKeywordProps {
  setSearchKeyData: (props: TweetType[]) => void;
}

export default function SearchKeyword(props: SearchKeywordProps) {
  const [state, dispatch] = useFormState(search, null);
  const { setSearchKeyData } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [keyword, setKeyword] = useState("");

  const onLoadMoreClick = async () => {
    setIsLoading(true);

    const results = await getSearchResults(keyword);
    setSearchKeyData(results);
    setIsLoading(false);
  };

  return (
    <>
      <div className="w-full">
        <form action={dispatch} className="flex flex-col gap-5">
          <div className="flex">
            <Input
              name="search"
              required
              placeholder="검색어를 입력해주세요"
              type="text"
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
              errors={state?.fieldErrors.search}
            />
            <button
              onClick={onLoadMoreClick}
              disabled={isLoading}
              className="text-white text-sm font-semibold bg-[#533566] w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95"
            >
              {isLoading ? "로딩 중" : "검색"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
