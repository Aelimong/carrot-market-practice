import Link from "next/link";
import { UserType } from "@/types/RiceballTypes";
import { formatToTimeAgo } from "@/lib/utils";
interface ListProductProps {
  id: number;
  tweet: string;
  create_at: Date;
  userId: number;
  user: UserType;
}

export default function ListTweet(props: ListProductProps) {
  const { id, tweet, create_at, userId, user } = props;
  return (
    <>
      <Link
        href={`/tweets/${id}`}
        className="flex gap-5 bg-white w-full rounded-md px-3 py-4"
      >
        <div className="w-full flex flex-col gap-1 *:text-black">
          <span className="text-lg">{tweet}</span>
          <div className="flex justify-between items-center">
            <div className="text-sm text-neutral-500">
              {formatToTimeAgo(create_at.toString())}
            </div>
            <div className="text-base font-semibold">{user.username}</div>
          </div>
        </div>
      </Link>
    </>
  );
}
