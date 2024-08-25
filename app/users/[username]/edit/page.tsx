import BackNav from "@/components/back-nav";
import { getUserProfileData } from "../actions";
import UpdateAccount from "@/components/update-account";

export default async function EditUser({
  params,
}: {
  params: { username: string };
}) {
  const encodedUsername = params.username;
  const decodedUsername = decodeURIComponent(encodedUsername);

  const initialData = await getUserProfileData(decodedUsername);

  return (
    <>
      <div className="flex flex-col gap-12 border border-x-1 bg-gray-100 border-x-gray-300 max-w-96 min-h-screen p-6 m-auto">
        <BackNav />
        <h6 className="text-xl font-bold">프로필 업데이트</h6>
        <UpdateAccount initialData={initialData} />
      </div>
    </>
  );
}
