import Image from "next/image";
import { getUserData } from "./actions";
import { getTweetsByUserId } from "@/app/(home)/actions";
import ListTweet from "@/components/list-tweet";
import { HomeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import getSession from "@/lib/session";
import db from "@/lib/db";
import { notFound } from "next/navigation";

async function getIsOwner(userId: number) {
  const session = await getSession();

  if (session.id) {
    return session.id === userId;
  }
  return false;
}

export default async function UserDetail({
  params,
}: {
  params: { username: string };
}) {
  const encodedUsername = params.username;
  const decodedUsername = decodeURIComponent(encodedUsername);

  const userData = await getUserData(decodedUsername);
  const isOwnerUser = await getIsOwner(userData!.id);
  const tweets = await getTweetsByUserId(userData!.id);

  return (
    <>
      <div className="flex flex-col gap-24 border border-x-1 bg-gray-100 border-x-gray-300 max-w-96 min-h-screen p-6 m-auto">
        <Link href="/">
          <HomeIcon className="size-6 cursor-pointer" />
        </Link>
        {/* profile */}
        <div className="flex flex-col justify-start items-center gap-6">
          <div>
            <Image
              src="/images/default_img.png"
              width={100}
              height={100}
              alt="유저 기본 이미지"
            />
          </div>
          <div className="flex flex-col justify-start items-center gap-1">
            <h1 className="font-bold text-xl">{userData!.username}님</h1>
            <span>Email: {userData!.email}</span>
            <span>한줄 소개: {userData!.bio}</span>
          </div>
          {isOwnerUser ? (
            <Link
              href={`/users/${userData!.username}/edit`}
              className="bg-[#533566] text-white rounded-md px-2 py-1"
            >
              Edit profile
            </Link>
          ) : (
            <></>
          )}
        </div>
        <div>
          <div className="mb-4">{userData!.username}님이 작성한 글</div>
          <div className="flex flex-col gap-4">
            {tweets.map((tweets) => (
              <ListTweet key={tweets.id} {...tweets} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
