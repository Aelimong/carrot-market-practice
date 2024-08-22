import SearchKeyword from "@/components/search-keyword";

export default function Search() {
  return (
    <>
      <div className="w-full flex flex-col border border-x-1 bg-gray-100 border-x-gray-300 items-center max-w-96 min-h-screen p-6 m-auto">
        <SearchKeyword />
        {/* <ListSearchResults/> */}
      </div>
    </>
  );
}
