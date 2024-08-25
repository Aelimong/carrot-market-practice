"use client";

import { updateAccount } from "@/app/users/[username]/actions";
import Input from "./input";
import { useFormState } from "react-dom";
import Button from "./button";
import { UserProfileType } from "@/types/RiceballTypes";
import { useState } from "react";

interface UpdateAccountProps {
  initialData: UserProfileType | null | undefined;
}

export default function UpdateAccount(props: UpdateAccountProps) {
  const { initialData } = props;
  const [state, dispatch] = useFormState(updateAccount, null);
  const [username, setUsername] = useState(initialData?.username);
  const [email, setEmail] = useState(initialData?.email);
  const [bio, setBio] = useState(initialData?.bio);

  return (
    <>
      <form action={dispatch} className="flex flex-col gap-4">
        <Input
          name="username"
          type="text"
          placeholder="이름을 입력해 주세요."
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          errors={state?.fieldErrors.username}
        />
        <Input
          name="email"
          type="email"
          placeholder="이메일을 입력해 주세요."
          required
          value={email?.toString()}
          onChange={(e) => setEmail(e.target.value)}
          errors={state?.fieldErrors.email}
        />
        <Input
          name="bio"
          type="text"
          placeholder="한줄 소개를 입력해 주세요."
          value={bio?.toString()}
          onChange={(e) => setBio(e.target.value)}
          errors={state?.fieldErrors.bio}
        />
        <Input
          name="password"
          type="password"
          placeholder="변경하실 비밀번호를 입력해 주세요."
          errors={state?.fieldErrors.password}
        />
        <Input
          name="confirm_password"
          type="password"
          placeholder="변경하실 비밀번호를 한 번 더 입력해 주세요."
          errors={state?.fieldErrors.confirm_password}
        />
        <Button text="수정하기" />
      </form>
    </>
  );
}
