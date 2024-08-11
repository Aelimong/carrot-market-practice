"use client";

import FormButton from "@/components/button";
import FormInput from "@/components/input";
import { useFormState } from "react-dom";
import { createAccount } from "./actions";

export default function CreateAccount() {
  const [state, dispatch] = useFormState(createAccount, null);

  return (
    <div className="flex flex-col border border-x-1 bg-gray-100 border-x-gray-300 items-center max-w-96 justify-between min-h-screen p-6 m-auto">
      <div className="flex flex-col w-full gap-10 py-8">
        <div className="flex flex-col gap-2 *:font-medium">
          <h1 className="text-xl">
            로그인에 사용하실
            <br />
            계정 정보를 입력해 주세요!
          </h1>
        </div>
        <form action={dispatch} className="flex flex-col gap-12">
          <div className="flex flex-col gap-4">
            <FormInput
              name="username"
              type="text"
              placeholder="이름을 입력해주세요."
              required
              errors={state?.fieldErrors.username}
            />
            <FormInput
              name="email"
              type="email"
              placeholder="이메일을 입력해주세요."
              required
              errors={state?.fieldErrors.email}
            />
            <FormInput
              name="password"
              type="password"
              placeholder="비밀번호를 입력해 주세요."
              required
              errors={state?.fieldErrors.password}
            />
            <FormInput
              name="confirm_password"
              type="password"
              placeholder="비밀번호를 한 번 더 입력해 주세요."
              required
              errors={state?.fieldErrors.confirm_password}
            />
          </div>

          <FormButton text="계정 생성하기" />
        </form>
      </div>
    </div>
  );
}
