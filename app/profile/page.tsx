import db from "@/lib/db";
import getSession from "@/lib/session";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }

  notFound();
}

export default async function Profile() {
  const user = await getUser();

  const logOut = async () => {
    "use server";

    const session = await getSession();
    await session.destroy();
    redirect("/");
  };

  return (
    <div className="flex flex-col border border-x-1 bg-gray-100 border-x-gray-300 items-center max-w-96 justify-between min-h-screen p-6 m-auto">
      <div className="font-bold text-xl">My Profile</div>
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
          <h1 className="font-bold text-xl">{user.username}님</h1>
          <h6>안녕하세요. {user.username}입니다!</h6>
          <span>{user.email}</span>
        </div>
      </div>
      <form action={logOut}>
        <button className="text-xs hover:underline text-gray-500">
          로그아웃
        </button>
      </form>
    </div>
  );
}
