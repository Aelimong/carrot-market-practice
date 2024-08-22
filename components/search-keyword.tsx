"use client";

import { useFormState } from "react-dom";
import Button from "./button";
import Input from "./input";
import { search } from "@/app/search/actions";

export default function SearchKeyword() {
  const [state, dispatch] = useFormState(search, null);

  // console.log(s);
  return (
    <>
      <div className="w-full">
        <form action={dispatch} className="flex flex-col gap-5">
          <Input
            name="search"
            required
            placeholder="검색어를 입력해주세요"
            type="text"
            errors={state?.fieldErrors.search}
          />
          <Button text="검색" />
        </form>
      </div>
    </>
  );
}
