"use client";

import { createTweet } from "@/app/(home)/actions";
import Button from "./button";
import Input from "./input";
import { useFormState, useFormStatus } from "react-dom";

export default function AddTweet() {
  // 이 Hook은 action을 실행하는 form과는 같은 곳에서 사용할 수 없다!
  // form의 자식에서만 사용할 수 있다!
  // 이 hook은 자동으로 부모 form을 찾을 것이다
  // const { pending } = useFormStatus();
  const [state, action] = useFormState(createTweet, null);

  return (
    <div className="w-full mb-10">
      <form action={action} className="flex flex-col gap-5">
        <Input
          name="tweet"
          required
          placeholder="120자 이내로 적어주세요..."
          type="text"
          errors={state?.fieldErrors.tweet}
        />
        <Button text="작성완료" />
      </form>
    </div>
  );
}
