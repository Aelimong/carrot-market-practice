"use client";

import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

const BackNav = () => {
  const router = useRouter();

  const handleBackMove = () => {
    router.back();
  };

  return (
    <>
      <ChevronLeftIcon
        onClick={handleBackMove}
        className="size-6 cursor-pointer"
      />
    </>
  );
};

export default BackNav;
