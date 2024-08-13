import Link from "next/link";

export default function Splash() {
  return (
    <div className="flex flex-col border border-x-1 bg-gray-100 border-x-gray-300 items-center max-w-96 justify-between min-h-screen p-6 m-auto">
      {/* 서비스 안내 */}
      <div className="w-full h-[320px] flex flex-col gap-4 items-center justify-end">
        <span className="text-5xl">🍙</span>
        <h1 className="text-3xl font-extrabold">주먹밥 마켓</h1>
        <h6 className="text-base">주먹밥 마켓에 오신 것을 환영합니다!</h6>
      </div>
      {/* 회원가입 */}
      <div className="flex flex-col items-center w-full py-4 rounded-md">
        <Link href="/create-account" className="primary-btn">
          시작하기
        </Link>
      </div>
      {/* 로그인 */}
      <div className="flex gap-2">
        <span>이미 계정이 있나요?</span>
        <Link href="/login" className="hover:underline">
          로그인
        </Link>
      </div>
    </div>
  );
}
