"use client";

import FormButton from "@/components/button";
import FormInput from "@/components/input";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";
import { useFormState } from "react-dom";
import { logIn } from "./actions";

export default function Login() {
  const [state, dispatch] = useFormState(logIn, null);

  return (
    <div className="flex flex-col border border-x-1 bg-gray-100 border-x-gray-300 max-w-96 justify-between min-h-screen p-6 m-auto">
      <div className="flex flex-col gap-2 mt-4 *:font-medium">
        <h1 className="text-2xl text-left">로그인</h1>
      </div>
      <form action={dispatch} className="w-full flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <FormInput
            name="email"
            type="email"
            placeholder="Email"
            required
            errors={state?.fieldErrors.email}
          />
          <FormInput
            name="password"
            type="password"
            placeholder="Password"
            required
            minLength={PASSWORD_MIN_LENGTH}
            errors={state?.fieldErrors.password}
          />
        </div>
        <FormButton text="로그인" />
      </form>
    </div>
  );
}
